// solutions/[...slug]/page.tsx
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * 1. DYNAMIC ROUTE NORMALIZATION LAYER
 * Parses flat markdown file titles into semantic, clean URL parameter structures.
 * * - Flat file: nextjs-migration-for-b2b-saas.md -> /solutions/nextjs-migration/b2b-saas
 * - Flat file: nextjs-migration-agency-in-austin.md -> /solutions/locations/nextjs-migration/austin
 */
function parseFileToUrlSegments(filename: string): string[] | null {
  const cleanName = filename.replace('.md', '');
  
  if (cleanName.includes('-for-')) {
    const [service, industry] = cleanName.split('-for-');
    return [service, industry];
  }
  
  if (cleanName.includes('-agency-in-')) {
    const [service, city] = cleanName.split('-agency-in-');
    return ['locations', service, city];
  }
  
  return [cleanName];
}

/**
 * 2. REVERSE URL LOOKUP RESOLVER
 * Converts incoming multi-segment path parameters back to the flat filesystem target.
 */
function getTargetFilenameFromSegments(slugs: string[]): string {
  if (slugs[0] === 'locations' && slugs.length === 3) {
    return `${slugs[1]}-agency-in-${slugs[2]}.md`;
  }
  if (slugs.length === 2) {
    return `${slugs[0]}-for-${slugs[1]}.md`;
  }
  return `${slugs.join('-')}.md`;
}

/**
 * 3. BUILD-TIME STATIC PARAMETERS ENGINES
 * Compiles parameters for Next.js to bake flat HTML fragments during build steps.
 */
export async function generateStaticParams() {
  const targetDir = path.join(process.cwd(), 'data', 'generated-content');
  
  try {
    if (!fs.existsSync(targetDir)) return [];
    
    const files = fs.readdirSync(targetDir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const segments = parseFileToUrlSegments(file);
        return {
          slug: segments || [file.replace('.md', '')],
        };
      });
  } catch (error) {
    console.error("❌ Failed to resolve static pSEO parameter paths:", error);
    return [];
  }
}

/**
 * 4. AUTHORITATIVE ENGINE RECOVERY EXTRACTOR
 * Safely extracts metadata frontmatter parameters and content blobs.
 */
async function getSolutionContent(slugArray: string[]) {
  try {
    const targetFile = getTargetFilenameFromSegments(slugArray);
    const filePath = path.join(process.cwd(), 'data', 'generated-content', targetFile);
    
    if (!fs.existsSync(filePath)) return null;
    
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const segments = rawContent.split('---');
    if (segments.length < 3) return null;

    const frontmatter = segments[1];
    const body = segments[2].trim();

    // Resilient raw parameter clean extraction matching multi-line rules
    const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
    const descMatch = frontmatter.match(/description:\s*["']?([^"'\n]+)["']?/);

    return {
      title: titleMatch ? titleMatch[1] : 'Enterprise Architecture Specification',
      description: descMatch ? descMatch[1] : 'Production-grade integration layout deployed by MTDT systems pipelines.',
      body,
    };
  } catch (error) {
    console.error("❌ Safe markdown file streaming failure:", error);
    return null;
  }
}

/**
 * 5. SEAMLESS INLINE PROGRAMMATIC METADATA GENERATOR
 * Feeds structured metadata attributes straight to search engine index models.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = await getSolutionContent(resolvedParams.slug);
  
  if (!pageData) return { title: 'Solution Blueprint Not Found | MTDT' };

  return {
    title: `${pageData.title} | MTDT Systems`,
    description: pageData.description,
    robots: { index: true, follow: true },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: 'article',
    }
  };
}

/**
 * 6. USER INTERFACE GENERATION LAYER
 */
export default async function DynamicSolutionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const pageData = await getSolutionContent(resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  // Parse markdown content segments smoothly
  const contentBlocks = pageData.body.split('\n\n');

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#F3F4F6] px-6 py-24 md:px-12 lg:px-24 selection:bg-[#2563EB]">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb Tracker */}
        <div className="text-xs uppercase tracking-widest text-[#9CA3AF] mb-8 font-mono">
          <Link href="/" className="hover:text-white transition-colors">MTDT Architecture</Link> 
          <span className="mx-2 text-[#4B5563]">&gt;</span> 
          <span className="text-[#2563EB]">Compiled Layout Matrix</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          {pageData.title.split('|')[0].trim()}
        </h1>
        
        <p className="text-lg md:text-xl text-[#9CA3AF] max-w-3xl mb-12 leading-relaxed">
          {pageData.description}
        </p>

        <hr className="border-[#1F2937] my-12" />

        {/* Dynamic Architectural Section Layout Parsing */}
        <article className="space-y-8 text-[#D1D5DB] text-base md:text-lg leading-relaxed">
          {contentBlocks.map((block, idx) => {
            if (block.startsWith('###')) {
              return (
                <h3 key={idx} className="text-xl md:text-2xl font-bold text-white tracking-tight pt-4">
                  {block.replace('###', '').trim()}
                </h3>
              );
            }
            return <p key={idx} className="font-normal">{block}</p>;
          })}
        </article>

        {/* Call To Action Engagement Terminal Box */}
        <section className="mt-16 p-8 rounded-xl border border-[#1F2937] bg-[#111115] hover:border-[#2563EB] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-2">Deploy This System Topology</h2>
          <p className="text-[#9CA3AF] text-sm md:text-base mb-6 max-w-2xl">
            Our principal engineering practice refactors legacy stacks to modern code architectures, builds distributed real-time workflows, and resolves critical web interface performance traps. Let's build together.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm py-3 px-6 rounded-md transition-colors"
          >
            Initiate Project Alignment Call
          </Link>
        </section>

      </div>
    </main>
  );
}