// AppShell — top app bar + left rail. Children render in the main area.

function AppShell({ active, onNavigate, onNewQuote, children }) {
  const navItems = [
    { id: 'dashboard',   label: 'Dashboard',   icon: 'dashboard' },
    { id: 'submissions', label: 'Submissions', icon: 'inventory_2' },
    { id: 'quotes',      label: 'Quotes',      icon: 'request_quote' },
    { id: 'policies',    label: 'Policies',    icon: 'shield' },
    { id: 'messages',    label: 'Messages',    icon: 'mail' },
  ];

  return (
    <div className="cw-app">
      <header className="cw-appbar">
        <img src="../../assets/cover-whale-wordmark.svg" alt="Cover Whale" style={{ height: 28 }} />
        <div className="cw-appbar__search">
          <Icon name="search" size={16} color="var(--cw-icon-secondary)" />
          <span>Search</span>
        </div>
        <div style={{ flex: 1 }} />
        <Button onClick={onNewQuote} size="sm">New Quote</Button>
        <IconButton icon="notifications" title="Notifications" />
        <div className="cw-appbar__avatar" title="Phil Cote">PC</div>
      </header>
      <div className="cw-body">
        <aside className="cw-rail">
          <div className="cw-rail__section">Agent Portal</div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={cwClass('cw-rail__item', active === item.id && 'is-active')}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </div>
          ))}
        </aside>
        <main className="cw-main">{children}</main>
      </div>
    </div>
  );
}

Object.assign(window, { AppShell });
