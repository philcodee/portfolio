// Cover Whale Agent Portal — primitive components
// Loaded via <script type="text/babel"> after React and portal.css.
// Components are exported to window for sibling JSX files.

const cwClass = (...xs) => xs.filter(Boolean).join(' ');

/* Material Symbols icon — uses inline SVGs (no external font dependency). */
const ICON_PATHS = {
  search:        '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  dashboard:     '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  inventory_2:   '<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M3 7l3-4h12l3 4"/><path d="M9 12h6"/>',
  request_quote: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/><path d="M9 14h6M9 17h4"/>',
  shield:        '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/>',
  mail:          '<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>',
  notifications: '<path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  add:           '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  close:         '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  check:         '<polyline points="4 12 9 17 20 6"/>',
  chevron_right: '<polyline points="9 6 15 12 9 18"/>',
  expand_less:   '<polyline points="6 15 12 9 18 15"/>',
  expand_more:   '<polyline points="6 9 12 15 18 9"/>',
  download:      '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="20" x2="20" y2="20"/>',
  filter_list:   '<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  sort:          '<polyline points="6 8 10 4 14 8"/><line x1="10" y1="4" x2="10" y2="14"/><polyline points="14 16 18 20 22 16" transform="translate(-4 0)"/>',
  refresh:       '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/>',
};

function Icon({ name, size, color, style }) {
  const path = ICON_PATHS[name] || '';
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || 20}
      height={size || 20}
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...(style || {}) }}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

function Button({ children, variant = 'primary', size = 'md', icon, onClick, disabled, type = 'button', style }) {
  const cls = cwClass(
    'cw-btn',
    variant === 'primary' && 'cw-btn--primary',
    variant === 'secondary' && 'cw-btn--secondary',
    variant === 'text' && 'cw-btn--text',
    size === 'sm' && 'cw-btn--sm',
    size === 'lg' && 'cw-btn--lg',
  );
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  );
}

const STATUS_VARIANT = {
  'Bound': 'cw-chip--bound',
  'Bindable': 'cw-chip--quoted',
  'Quoted': 'cw-chip--quoted',
  'Underwriting Review': 'cw-chip--uw-review',
  'In Progress': 'cw-chip--in-progress',
  'Cancel Requested': 'cw-chip--cancel-req',
  'Pending Cancellation': 'cw-chip--pending-cancel',
  'Cancelled': 'cw-chip--cancelled',
  'Declined': 'cw-chip--declined',
  'Expired': 'cw-chip--expired',
  'Not Taken Up': 'cw-chip--ntu',
  'Brand': 'cw-chip--brand',
  'Info': 'cw-chip--info',
};

function StatusChip({ status }) {
  const cls = cwClass('cw-chip', STATUS_VARIANT[status] || 'cw-chip--info');
  return <span className={cls}>{status}</span>;
}

function Card({ title, action, children, style }) {
  return (
    <div className="cw-card" style={style}>
      {(title || action) && (
        <div className="cw-card__head">
          {title && <div className="cw-card__title">{title}</div>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function Stat({ label, value, delta }) {
  return (
    <div className="cw-stat">
      <div className="cw-stat__label">{label}</div>
      <div className="cw-stat__value">{value}</div>
      {delta && <div className="cw-stat__delta">{delta}</div>}
    </div>
  );
}

function Field({ label, hint, error, ...inputProps }) {
  return (
    <div className={cwClass('cw-field', error && 'cw-field--error')}>
      {label && <label className="cw-field__label">{label}</label>}
      <input className="cw-field__input" {...inputProps} />
      {(error || hint) && <span className="cw-field__hint">{error || hint}</span>}
    </div>
  );
}

function IconButton({ icon, onClick, title, style }) {
  return (
    <button className="cw-icon-btn" onClick={onClick} title={title} style={style}>
      <Icon name={icon} size={20} />
    </button>
  );
}

Object.assign(window, { Icon, Button, StatusChip, Card, Stat, Field, IconButton, cwClass });
