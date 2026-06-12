// Top-level orchestrator. Holds route state and modal state.

function App() {
  const [active, setActive] = React.useState('dashboard');
  const [drawerQuote, setDrawerQuote] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Tiny placeholder views for non-implemented nav items.
  const Placeholder = ({ title, subtitle }) => (
    <div>
      <div className="cw-page-header">
        <h1 className="cw-page-header__title">{title}</h1>
      </div>
      <div style={{ padding: 64, textAlign: 'center', color: 'var(--cw-text-secondary)', border: '1px dashed var(--cw-border-secondary)', borderRadius: 8, background: 'var(--cw-surface-secondary)' }}>
        {subtitle}
      </div>
    </div>
  );

  let main;
  if (active === 'dashboard')   main = <Dashboard onOpenQuotes={() => setActive('quotes')} />;
  else if (active === 'quotes') main = <QuotesTable onOpenQuote={(q) => setDrawerQuote(q)} />;
  else if (active === 'submissions') main = <Placeholder title="Submissions" subtitle="Submissions list — out of scope for this UI kit." />;
  else if (active === 'policies')    main = <Placeholder title="Policies" subtitle="Policies in-force list — out of scope for this UI kit." />;
  else if (active === 'messages')    main = <Placeholder title="Messages" subtitle="Per-policy tickets and events — out of scope for this UI kit." />;

  return (
    <React.Fragment>
      <AppShell
        active={active}
        onNavigate={setActive}
        onNewQuote={() => setModalOpen(true)}
      >
        {main}
      </AppShell>
      <QuoteDrawer quote={drawerQuote} onClose={() => setDrawerQuote(null)} />
      <StartApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
