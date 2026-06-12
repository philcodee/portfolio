// QuotesTable — full v-data-table with status chips and toolbar.

const QUOTE_ROWS = [
  { id: 'CW-198123', dot: '2537062', name: 'SOHIO EXPEDITING LLC',       state: 'OH', units: 12, prem: '$48,200', expires: '06/14/26', status: 'Bindable' },
  { id: 'CW-198114', dot: '2464946', name: 'OHIO VALLEY SAND LLC',       state: 'OH', units: 4,  prem: '$18,640', expires: '06/19/26', status: 'Underwriting Review' },
  { id: 'CW-198091', dot: '1674219', name: 'SCHRAMKE ENTERPRISES',       state: 'PA', units: 28, prem: '$112,300', expires: '06/22/26', status: 'Bound' },
  { id: 'CW-198072', dot: '3873596', name: 'MILESTONE TRANSPORTATION',   state: 'IL', units: 9,  prem: '$36,900', expires: '06/24/26', status: 'Quoted' },
  { id: 'CW-198015', dot: '1101548', name: 'WHITE EAGLE LOGISTICS INC',  state: 'TX', units: 41, prem: '$162,750', expires: '06/29/26', status: 'In Progress' },
  { id: 'CW-197988', dot: '2392456', name: 'DOXA TRANSPORTATION',        state: 'NJ', units: 6,  prem: '$23,400', expires: '07/02/26', status: 'Declined' },
  { id: 'CW-197944', dot: '581874',  name: 'CX NORTHWEST INC',           state: 'WA', units: 15, prem: '$59,800', expires: '07/04/26', status: 'Not Taken Up' },
  { id: 'CW-197908', dot: '3447490', name: 'RS DELIVERY LOGISTICS LLC',  state: 'GA', units: 22, prem: '$87,150', expires: '07/08/26', status: 'Expired' },
];

function QuotesTable({ onOpenQuote }) {
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');

  const filtered = QUOTE_ROWS.filter(r => {
    if (q && !`${r.id} ${r.dot} ${r.name}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (tab === 'bindable')  return r.status === 'Bindable';
    if (tab === 'review')    return r.status === 'Underwriting Review';
    if (tab === 'in-prog')   return r.status === 'In Progress' || r.status === 'Quoted';
    if (tab === 'declined')  return r.status === 'Declined' || r.status === 'Not Taken Up' || r.status === 'Expired';
    return true;
  });

  const tabs = [
    { id: 'all',      label: 'All Quotes',          count: QUOTE_ROWS.length },
    { id: 'bindable', label: 'Bindable',            count: QUOTE_ROWS.filter(r => r.status === 'Bindable').length },
    { id: 'review',   label: 'Underwriting Review', count: QUOTE_ROWS.filter(r => r.status === 'Underwriting Review').length },
    { id: 'in-prog',  label: 'In Progress',         count: QUOTE_ROWS.filter(r => r.status === 'In Progress' || r.status === 'Quoted').length },
    { id: 'declined', label: 'Not Taken Up',        count: QUOTE_ROWS.filter(r => ['Declined','Not Taken Up','Expired'].includes(r.status)).length },
  ];

  return (
    <div>
      <div className="cw-page-header">
        <h1 className="cw-page-header__title">Quotes</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="download" size="sm">Export</Button>
          <Button icon="add" size="sm">New Quote</Button>
        </div>
      </div>

      <div className="cw-tabs">
        {tabs.map(t => (
          <div key={t.id} className={cwClass('cw-tab', tab === t.id && 'is-active')} onClick={() => setTab(t.id)}>
            {t.label} ({t.count})
          </div>
        ))}
      </div>

      <div className="cw-toolbar">
        <div className="cw-toolbar__filters">
          <div style={{ width: 280, height: 36, padding: '0 12px', background: 'var(--cw-surface-secondary)', border: '1px solid var(--cw-border-primary)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="search" size={16} color="var(--cw-icon-secondary)" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by DOT, name, ID…" style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', font: '400 13px/20px Inter' }} />
          </div>
          <Button variant="secondary" icon="filter_list" size="sm">Filter</Button>
          <Button variant="secondary" icon="sort" size="sm">Sort</Button>
        </div>
        <div style={{ color: 'var(--cw-text-secondary)', font: '400 13px/20px Inter' }}>
          Showing <b style={{ color: 'var(--cw-text-primary)' }}>{filtered.length}</b> of {QUOTE_ROWS.length}
        </div>
      </div>

      <div style={{ border: '1px solid var(--cw-border-primary)', borderRadius: 8, overflow: 'hidden' }}>
        <table className="cw-table">
          <thead>
            <tr>
              <th>Quote ID</th>
              <th>DOT</th>
              <th>Legal Name</th>
              <th>State</th>
              <th className="ta-r">Units</th>
              <th className="ta-r">Premium</th>
              <th>Expires</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} onClick={() => onOpenQuote(r)}>
                <td className="num">{r.id}</td>
                <td className="num">{r.dot}</td>
                <td>{r.name}</td>
                <td>{r.state}</td>
                <td className="num ta-r">{r.units}</td>
                <td className="num ta-r">{r.prem}</td>
                <td className="num">{r.expires}</td>
                <td><StatusChip status={r.status} /></td>
                <td className="ta-r"><Icon name="chevron_right" size={20} color="var(--cw-icon-secondary)" /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{ padding: 48, textAlign: 'center', color: 'var(--cw-text-secondary)' }}>No quotes to review.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { QuotesTable, QUOTE_ROWS });
