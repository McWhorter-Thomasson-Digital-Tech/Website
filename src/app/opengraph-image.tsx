import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MTDT Agency - Engineering High-Velocity Digital Machines'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          color: 'white',
          background: 'linear-gradient(to bottom right, #020617, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 120, background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>
          MTDT Agency
        </div>
        <div style={{ fontSize: 40, fontWeight: 'normal', color: '#94a3b8' }}>
          High-Velocity React Ecosystems & Immutable Backend Pipelines
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
