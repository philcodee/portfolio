// Dashboard — stats row + four list cards mirroring the Figma frame.

function Dashboard({ onOpenQuotes }) {
  const policies = [
    { dot: '581874',  name: 'CX NORTHWEST INC' },
    { dot: '1101548', name: 'WHITE EAGLE LOGISTICS INC' },
    { dot: '2392456', name: 'DOXA TRANSPORTATION' },
    { dot: '3447490', name: 'RS DELIVERY LOGISTICS LLC' },
  ];
  const pending = [
    { dot: '581874',  name: 'CX NORTHWEST INC' },
    { dot: '1101548', name: 'WHITE EAGLE LOGISTICS INC' },
    { dot: '2392456', name: 'DOXA TRANSPORTATION' },
    { dot: '3447490', name: 'RS DELIVERY LOGISTICS LLC' },
  ];
  const bindable = [
    { dot: '2537062', name: 'SOHIO EXPEDITING LLC' },
    { dot: '2464946', name: 'OHIO VALLEY SAND LLC' },
    { dot: '1674219', name: 'SCHRAMKE ENTERPRISES' },
    { dot: '3873596', name: 'MILESTONE TRANSPORTATION' },
  ];
  const renewals = [
    { dot: '2537062', name: 'SOHIO EXPEDITING LLC' },
    { dot: '2464946', name: 'OHIO VALLEY SAND LLC' },
    { dot: '1674219', name: 'SCHRAMKE ENTERPRISES' },
    { dot: '3873596', name: 'MILESTONE TRANSPORTATION' },
  ];

  const MiniTable = ({ rows, openLabel = 'Review' }) => (
    <div>
      <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid var(--cw-border-primary)', color: 'var(--cw-text-secondary)', font: '600 11px/16px var(--cw-font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        <span style={{ width: 80 }}>DOT</span>
        <span style={{ flex: 1 }}>Legal Name</span>
        <span style={{ width: 64 }}></span>
      </div>
      {rows.map(r => (
        <div key={r.dot} style={{ display: 'flex', padding: '10px 0', alignItems: 'center', borderBottom: '1px solid var(--cw-border-primary)', font: '500 13px/20px var(--cw-font-sans)' }}>
          <span style={{ width: 80, fontVariantNumeric: 'tabular-nums' }}>{r.dot}</span>
          <span style={{ flex: 1 }}>{r.name}</span>
          <Button variant="secondary" size="sm" style={{ height: 28, padding: '0 10px', fontSize: 12 }}>{openLabel}</Button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="cw-page-header">
        <h1 className="cw-page-header__title">Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Stat label="Bindable Quotes" value="15" delta="+3 this week" />
        <Stat label="Policies In-Force" value="60" delta="+5 this month" />
        <Stat label="Upcoming Renewals" value="15" />
        <Stat label="Pending Cancellation" value="4" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Policies in-force (60)" action={<Icon name="expand_less" size={20} color="var(--cw-icon-secondary)" />}>
          <MiniTable rows={policies} />
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <a href="#" style={{ color: 'var(--cw-text-brand)', font: '500 13px/20px var(--cw-font-sans)' }}>View all policies in-force</a>
          </div>
        </Card>

        <Card title="Pending Cancellation (4)" action={<Icon name="expand_less" size={20} color="var(--cw-icon-secondary)" />}>
          <MiniTable rows={pending} />
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <a href="#" style={{ color: 'var(--cw-text-brand)', font: '500 13px/20px var(--cw-font-sans)' }}>View all pending cancellation</a>
          </div>
        </Card>

        <Card title="Bindable Quotes (15)" action={<a href="#" onClick={(e) => { e.preventDefault(); onOpenQuotes(); }} style={{ color: 'var(--cw-text-brand)', font: '500 13px/20px var(--cw-font-sans)' }}>View all</a>}>
          <MiniTable rows={bindable} />
        </Card>

        <Card title="Upcoming Renewals (15)" action={<Icon name="expand_less" size={20} color="var(--cw-icon-secondary)" />}>
          <MiniTable rows={renewals} />
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <a href="#" style={{ color: 'var(--cw-text-brand)', font: '500 13px/20px var(--cw-font-sans)' }}>View all upcoming renewals</a>
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
