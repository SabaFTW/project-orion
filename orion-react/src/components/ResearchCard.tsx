// 🃏 Research Card Component - Gemini Visual System

interface ResearchCardProps {
  id: number;
  title: string;
  category: string;
  ehi: number;
  promise: string;
  reality: string;
  location: string;
  date: string;
  slug: string;
}

const getEhiClass = (ehi: number) => {
  if (ehi >= 0.8) return 'ehi-critical';
  if (ehi >= 0.6) return 'ehi-high';
  if (ehi >= 0.3) return 'ehi-medium';
  return 'ehi-low';
};

export default function ResearchCard(props: ResearchCardProps) {
  const trimmedPromise = props.promise?.length > 80 ? `${props.promise.slice(0, 77)}…` : props.promise;
  const trimmedReality = props.reality?.length > 80 ? `${props.reality.slice(0, 77)}…` : props.reality;
  return (
    <article className="card research-card" style={{ width: '100%', maxWidth: 360 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="category-badge">{props.category || 'Neznano'}</span>
        <span className={`ehi-badge ${getEhiClass(props.ehi)}`}>
          EHI: {props.ehi.toFixed(2)}
        </span>
      </header>

      <h3 style={{ marginBottom: 12, color: 'var(--primary)' }}>{props.title}</h3>

      <section style={{ marginBottom: 12, fontSize: 'var(--text-small)' }}>
        {trimmedPromise && (
          <p style={{ color: 'var(--ehi-low)', marginBottom: 4 }}>“{trimmedPromise}”</p>
        )}
        {trimmedReality && (
          <p style={{ color: 'var(--ehi-critical)' }}>Reality: {trimmedReality}</p>
        )}
      </section>

      <section
        style={{
          marginBottom: 16,
          fontSize: 'var(--text-small)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div>📍 {props.location || 'Lokacija ni navedena'}</div>
        <div>📅 {props.date}</div>
      </section>

      <a
        href={`/raziskave/${props.slug}`}
        className="btn-primary"
        style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', textAlign: 'center' }}
      >
        Read Full Research →
      </a>
    </article>
  );
}
