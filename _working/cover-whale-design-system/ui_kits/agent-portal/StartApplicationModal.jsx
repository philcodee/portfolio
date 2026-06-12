// StartApplicationModal — the DOT-number-first quote flow modal.

function StartApplicationModal({ open, onClose }) {
  const [step, setStep] = React.useState(1);
  const [dot, setDot] = React.useState('');
  const [legal, setLegal] = React.useState('');
  const [acks, setAcks] = React.useState({ bankruptcy: false, insurance: false });

  React.useEffect(() => {
    if (open) { setStep(1); setDot(''); setLegal(''); setAcks({ bankruptcy: false, insurance: false }); }
  }, [open]);

  if (!open) return null;

  const ack1 = "Under the current legal name, the company has not had any bankruptcies in the last 5 years.";
  const ack2 = "With the exception of non-payment issues, the company's insurance has not been cancelled in the last 3 years.";

  return (
    <React.Fragment>
      <div className="cw-scrim is-open" onClick={onClose} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 102, width: 540, background: 'var(--cw-surface-primary)',
        borderRadius: 8, boxShadow: 'var(--cw-shadow-modal)',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cw-border-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ font: '500 20px/28px Inter' }}>Start Application</div>
            <div style={{ font: '400 13px/20px Inter', color: 'var(--cw-text-secondary)', marginTop: 2 }}>
              Enter the company's DOT Number, Legal Name, or both, to get started.
            </div>
          </div>
          <IconButton icon="close" onClick={onClose} title="Close" />
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field
            label="DOT Number"
            placeholder="00000000"
            value={dot}
            onChange={e => setDot(e.target.value)}
            hint="As appears on FMCSA/SAFER."
          />
          <Field
            label="Legal Name"
            placeholder="Warehouse 2 Warehouse, LLC"
            value={legal}
            onChange={e => setLegal(e.target.value)}
            hint="As appears on FMCSA/SAFER."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
            {[['bankruptcy', ack1], ['insurance', ack2]].map(([key, text]) => (
              <label key={key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
                <div
                  onClick={() => setAcks(a => ({ ...a, [key]: !a[key] }))}
                  style={{
                    width: 18, height: 18, borderRadius: 3,
                    border: `1.5px solid ${acks[key] ? 'var(--cw-purple-default)' : 'var(--cw-border-secondary)'}`,
                    background: acks[key] ? 'var(--cw-purple-default)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2,
                  }}
                >{acks[key] && <Icon name="check" size={14} color="#fff" />}</div>
                <span style={{ font: '400 13px/20px Inter', color: 'var(--cw-text-primary)' }}>{text}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--cw-border-primary)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button
            onClick={onClose}
            disabled={!(acks.bankruptcy && acks.insurance && (dot || legal))}
          >Next</Button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { StartApplicationModal });
