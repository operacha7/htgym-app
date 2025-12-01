import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        padding: '4rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1f2933' }}>
        Operacha Projects
      </h1>

      <p style={{ marginBottom: '2rem', color: '#4b5563' }}>
        Welcome! This will host my new experimental tools and apps.
      </p>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#111827' }}>
        Current Project
      </h2>
      <ul style={{ marginBottom: '2rem', paddingLeft: '1.2rem' }}>
        <li>
          <strong>
            {/* Link into the HT Gym app */}
            <Link to="/ht-gym" style={{ color: '#111827', textDecoration: 'underline' }}>
              HT Gym Project
            </Link>
          </strong>{' '}
          <span style={{ color: '#4b5563' }}>(coming soon)</span>
        </li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#111827' }}>
        Other Apps
      </h2>
      <ul style={{ paddingLeft: '1.2rem' }}>
        <li>
          <a
            href="https://crghouston.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb' }}
          >
            Community Resources Guide (crghouston.org)
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;