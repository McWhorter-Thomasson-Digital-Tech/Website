/**
 * Next.js Instrumentation — runs once per server startup.
 *
 * On Vercel, each deployment creates fresh serverless instances. We use
 * Upstash Redis with an atomic NX set to ensure wallet updates fire exactly
 * once per deployment, regardless of how many functions cold-start.
 */
export async function register() {
  // Only run in Node.js runtime (not Edge) — APNs requires Node APIs
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const deploymentId = process.env.VERCEL_DEPLOYMENT_ID;
  if (!deploymentId) {
    console.log('[deploy-hook] Not a Vercel deployment, skipping auto wallet update');
    return;
  }

  try {
    // Try Redis deduplication to ensure we only fire once per deployment.
    // If Redis is unavailable, still run the update — it's idempotent.
    const redisUrl = process.env.UPSTASH_REDIS_KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

    if (redisUrl && redisToken) {
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({ url: redisUrl, token: redisToken });

      // Atomic check-and-set: only the first cold-start for this deployment succeeds.
      // Key expires after 24h to avoid Redis clutter.
      const wasSet = await redis.set(`deploy-update:${deploymentId}`, '1', { nx: true, ex: 86400 });

      if (!wasSet) {
        // Another function instance already processed this deployment
        return;
      }
    } else {
      console.log('[deploy-hook] Redis not available, running update without deduplication');
    }

    console.log('[deploy-hook] New deployment detected:', deploymentId);
    console.log('[deploy-hook] Triggering wallet updates for all registered passes...');

    const { sendAllWalletUpdates } = await import('./lib/sendWalletUpdates');
    const result = await sendAllWalletUpdates();

    console.log('[deploy-hook] Wallet update complete:', result);

  } catch (error) {
    // Non-fatal — don't crash the server if the deploy hook fails
    console.error('[deploy-hook] Error during post-deploy wallet update:', error);
  }
}
