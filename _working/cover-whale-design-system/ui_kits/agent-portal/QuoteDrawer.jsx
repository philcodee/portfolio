// QuoteDrawer — slide-in detail with tabs (Overview, Coverages, Drivers, Vehicles).

function QuoteDrawer({ quote, onClose }) {
  const [tab, setTab] = React.useState('overview');
  if (!quote) return null;

  const Field = ({ label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ font: '500 11px/16px Inter', color: 'var(--cw-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ font: '500 14px/20px Inter', color: 'var(--cw-text-primary)' }}>{value}</span>
    </div>
  );

  const Overview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', font: '500 16px/24px Inter' }}>Business</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="DOT" value={quote.dot} />
          <Field label="Legal Name" value={quote.name} />
          <Field label="State" value={quote.state} />
          <Field label="Entity Type" value="Carrier" />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', font: '500 16px/24px Inter' }}>Operations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Operating Status" value="Authorized for Property" />
          <Field label="Operation" value="Authorized-for-Hire" />
          <Field label="Carrier Operations" value="Interstate" />
          <Field label="Cargo Carried" value="General Freight" />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', font: '500 16px/24px Inter' }}>Premium</h3>
        <div style={{ background: 'var(--cw-surface-secondary)', border: '1px solid var(--cw-border-primary)', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ font: '500 11px/16px Inter', color: 'var(--cw-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total annual</div>
            <div style={{ font: '500 28px/36px Inter', color: 'var(--cw-text-primary)' }}>{quote.prem}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '500 11px/16px Inter', color: 'var(--cw-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Expires</div>
            <div style={{ font: '500 16px/24px Inter', color: 'var(--cw-text-primary)' }}>{quote.expires}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const Coverages = () => (
    <table className="cw-table" style={{ border: '1px solid var(--cw-border-primary)', borderRadius: 8 }}>
      <thead><tr><th>Coverage</th><th className="ta-r">Limit</th><th className="ta-r">Premium</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Auto Liability (AL)</td><td className="num ta-r">$1,000,000</td><td className="num ta-r">$28,400</td><td><StatusChip status="Bound" /></td></tr>
        <tr><td>Motor Truck Cargo (MTC)</td><td className="num ta-r">$100,000</td><td className="num ta-r">$8,200</td><td><StatusChip status="Bound" /></td></tr>
        <tr><td>General Liability (GL)</td><td className="num ta-r">$1,000,000</td><td className="num ta-r">$6,100</td><td><StatusChip status="Quoted" /></td></tr>
        <tr><td>Trailer Interchange (TI)</td><td className="num ta-r">$50,000</td><td className="num ta-r">$3,400</td><td><StatusChip status="Not Taken Up" /></td></tr>
        <tr><td>Physical Damage (PD)</td><td className="num ta-r">$200,000</td><td className="num ta-r">$2,100</td><td><StatusChip status="In Progress" /></td></tr>
      </tbody>
    </table>
  );

  const Drivers = () => (
    <table className="cw-table" style={{ border: '1px solid var(--cw-border-primary)', borderRadius: 8 }}>
      <thead><tr><th>Name</th><th>DOB</th><th>License State</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Marcus Reynolds</td><td className="num">04/12/1978</td><td>OH</td><td><StatusChip status="Bound" /></td></tr>
        <tr><td>Phil Cote</td><td className="num">07/02/1985</td><td>OH</td><td><StatusChip status="Bound" /></td></tr>
        <tr><td>Daniela Pérez</td><td className="num">11/19/1991</td><td>PA</td><td><StatusChip status="Underwriting Review" /></td></tr>
        <tr><td>Travis Okafor</td><td className="num">01/05/1980</td><td>OH</td><td><StatusChip status="Bound" /></td></tr>
      </tbody>
    </table>
  );

  const Vehicles = () => (
    <table className="cw-table" style={{ border: '1px solid var(--cw-border-primary)', borderRadius: 8 }}>
      <thead><tr><th>VIN</th><th>Year</th><th>Make / Model</th><th>Body</th><th className="ta-r">Value</th></tr></thead>
      <tbody>
        <tr><td className="num">1FUJGBDV3CLBT0091</td><td className="num">2019</td><td>Freightliner Cascadia</td><td>Tractor</td><td className="num ta-r">$78,000</td></tr>
        <tr><td className="num">3HSDJAPR6JN664401</td><td className="num">2018</td><td>International LT</td><td>Tractor</td><td className="num ta-r">$64,500</td></tr>
        <tr><td className="num">1XPBDP9X6JD441829</td><td className="num">2020</td><td>Peterbilt 579</td><td>Tractor</td><td className="num ta-r">$92,300</td></tr>
        <tr><td className="num">1V4WT9SH3GN229104</td><td className="num">2017</td><td>Volvo VNL</td><td>Tractor</td><td className="num ta-r">$58,000</td></tr>
      </tbody>
    </table>
  );

  return (
    <React.Fragment>
      <div className={cwClass('cw-scrim', quote && 'is-open')} onClick={onClose} />
      <aside className={cwClass('cw-drawer', quote && 'is-open')}>
        <div className="cw-drawer__head">
          <div>
            <div style={{ font: '600 11px/16px Inter', color: 'var(--cw-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{quote.id}</div>
            <div className="cw-drawer__title">{quote.name}</div>
          </div>
          <IconButton icon="close" onClick={onClose} title="Close" />
        </div>
        <div style={{ padding: '0 24px', background: 'var(--cw-surface-primary)', borderBottom: '1px solid var(--cw-border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 8 }}>
            <StatusChip status={quote.status} />
            <span style={{ font: '500 13px/20px Inter', color: 'var(--cw-text-secondary)' }}>{quote.units} units · {quote.state} · Expires {quote.expires}</span>
          </div>
          <div className="cw-tabs" style={{ borderBottom: 'none' }}>
            {[['overview','Overview'],['coverages','Coverages'],['drivers','Drivers'],['vehicles','Vehicles']].map(([id,label]) => (
              <div key={id} className={cwClass('cw-tab', tab === id && 'is-active')} onClick={() => setTab(id)}>{label}</div>
            ))}
          </div>
        </div>
        <div className="cw-drawer__body">
          {tab === 'overview' && <Overview />}
          {tab === 'coverages' && <Coverages />}
          {tab === 'drivers' && <Drivers />}
          {tab === 'vehicles' && <Vehicles />}
        </div>
        <div className="cw-drawer__foot">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          {quote.status === 'Bindable' && <Button>Bind Policy</Button>}
          {quote.status === 'Quoted' && <Button>Send to Insured</Button>}
          {quote.status === 'Underwriting Review' && <Button variant="secondary">Add Note</Button>}
        </div>
      </aside>
    </React.Fragment>
  );
}

Object.assign(window, { QuoteDrawer });
