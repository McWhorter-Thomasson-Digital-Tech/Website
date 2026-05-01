import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MTDT Agency - Engineering High-Velocity Digital Machines'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // Load the logo from the public directory
  const logoData = await fetch(
    new URL('../../public/Logo_Clear_Center.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle Background Glows matching the site aesthetic */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '50px',
          }}
        >
          {/* @ts-ignore */}
          <img
            src={logoData}
            width={480}
            height={154}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Tagline / Headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to right, #ffffff, #94a3b8)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            maxWidth: '1000px',
            lineHeight: 1.1,
            padding: '0 40px',
          }}
        >
          Engineering High-Velocity React Ecosystems &<br />
          Immutable Backend Pipelines
        </div>

        {/* Brand Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            fontSize: 22,
            color: '#64748b',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: '500',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            width: '80%',
            textAlign: 'center',
          }}
        >
          MTDT Agency • Professional Digital Infrastructure
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
