import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Settings, 
  IndianRupee, 
  Calendar, 
  ShieldAlert, 
  Save, 
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

function FineConfig() {
  const [config, setConfig]   = useState({ ratePerDay: 5, maxFineCap: 500, gracePeriod: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const headers = { Authorization: `Bearer ${getAuthToken()}` };

  const fetchConfig = async () => {
    try {
      const res = await axios.get(`${Server_URL}admin/fine-config`, { headers });
      setConfig(res.data.config);
    } catch { showErrorToast("Failed to load fine config"); }
    finally { setLoading(false); }
  };

  const saveConfig = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      showErrorToast("Only administrators can update fine settings.");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put(`${Server_URL}admin/fine-config`, config, { headers });
      showSuccessToast(res.data.message);
      setConfig(res.data.config);
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Failed to save");
    } finally { setSaving(false); }
  };

  useEffect(() => { fetchConfig(); }, []);

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
           <Settings size={14} style={{ marginRight: '6px' }} /> Configuration
        </span>
        <h1>System Rules & Fines</h1>
        <p>Global configuration for overdue books and member penalties.</p>
      </header>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
           <div className="spinner" />
        </div>
      ) : (
        <div className="cool-form-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Configuration Form */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="section-title"><Settings size={18} /> Edit Rules</h3>
            <form onSubmit={saveConfig} className="fine-form-container">
              <div className="fine-form-group">
                <label className="fine-label">
                  <IndianRupee size={14} /> Fine Rate (₹ per day)
                </label>
                <input
                  type="number" min="0" step="0.5"
                  className="fine-input-field"
                  value={config.ratePerDay}
                  onChange={e => setConfig({ ...config, ratePerDay: Number(e.target.value) })}
                  disabled={!isAdmin}
                  required
                />
                <p className="item-meta" style={{ marginTop: '4px' }}>Amount charged for every day a book is kept past its due date.</p>
              </div>

              <div className="fine-form-group">
                <label className="fine-label">
                  <ShieldAlert size={14} /> Maximum Fine Cap (₹)
                </label>
                <input
                  type="number" min="0"
                  className="fine-input-field"
                  value={config.maxFineCap}
                  onChange={e => setConfig({ ...config, maxFineCap: Number(e.target.value) })}
                  disabled={!isAdmin}
                  required
                />
                <p className="item-meta" style={{ marginTop: '4px' }}>The highest possible fine amount per book.</p>
              </div>

              <div className="fine-form-group">
                <label className="fine-label">
                  <Calendar size={14} /> Grace Period (Days)
                </label>
                <input
                  type="number" min="0"
                  className="fine-input-field"
                  value={config.gracePeriod}
                  onChange={e => setConfig({ ...config, gracePeriod: Number(e.target.value) })}
                  disabled={!isAdmin}
                  required
                />
                <p className="item-meta" style={{ marginTop: '4px' }}>Allowed delay before fines begin to accrue.</p>
              </div>

              {isAdmin && (
                <div style={{ marginTop: '1rem' }}>
                  <button type="submit" className="fine-button-primary" disabled={saving}>
                    {saving ? (
                      <><div className="spinner" style={{ width: '20px', height: '20px', borderThickness: '2px' }} /> Saving...</>
                    ) : (
                      <><Save size={18} /> Save Configuration</>
                    )}
                  </button>
                </div>
              )}
              {!isAdmin && (
                <p className="item-meta" style={{ marginTop: '1rem' }}>
                  Fine rules are view-only for librarians. Contact an administrator to change settings.
                </p>
              )}
            </form>
          </div>

          {/* Preview Section */}
          <div className="recent-activity-card">
            <h3 className="section-title"><Info size={18} /> Logic Preview</h3>
            <div className="activity-list" style={{ marginBottom: '2.5rem' }}>
              <div className="activity-item">
                <div className="item-avatar" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>₹</div>
                <div className="item-info">
                  <span className="item-title">Active Rate</span>
                  <span className="item-meta">₹{config.ratePerDay} per overdue day</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="item-avatar" style={{ background: '#fff1f2', color: '#ef4444' }}><ShieldAlert size={20} /></div>
                <div className="item-info">
                  <span className="item-title">Ceiling Limit</span>
                  <span className="item-meta">Maximum ₹{config.maxFineCap} fine per book</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="item-avatar" style={{ background: '#f0fdf4', color: '#10b981' }}><Calendar size={20} /></div>
                <div className="item-info">
                  <span className="item-title">Grace Period</span>
                  <span className="item-meta">{config.gracePeriod} days allowed for free</span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}><IndianRupee size={120} /></div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Sample Scenario</h4>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
                If a book is returned <strong>10 days</strong> late:<br/>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.4rem', display: 'block', marginTop: '0.75rem' }}>
                   <CheckCircle2 size={24} /> Total Fine: ₹{Math.min(config.ratePerDay * Math.max(0, 10 - config.gracePeriod), config.maxFineCap)}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.5rem' }}>
                  Calculation: ({config.ratePerDay} × (10 days - {config.gracePeriod} grace days)) capped at ₹{config.maxFineCap}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FineConfig;