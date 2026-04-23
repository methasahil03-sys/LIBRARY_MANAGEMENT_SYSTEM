import { useEffect, useState } from "react";
import axios from "axios";
import { 
  ClipboardList, 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Search,
  BookOpen,
  User,
  Calendar,
  AlertTriangle,
  History
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

const STATUS_CONFIG = {
  Pending:   { color: "#eab308", bg: "#fef9c3", icon: Clock, label: "Pending" },
  Notified:  { color: "#3b82f6", bg: "#dbeafe", icon: Bell, label: "Notified" },
  Fulfilled: { color: "#10b981", bg: "#dcfce7", icon: CheckCircle2, label: "Fulfilled" },
  Cancelled: { color: "#64748b", bg: "#f1f5f9", icon: XCircle, label: "Cancelled" },
  Expired:   { color: "#ef4444", bg: "#fee2e2", icon: AlertCircle, label: "Expired" },
};

export default function AllReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("All");
  const [search, setSearch]             = useState("");
  const headers = { Authorization: `Bearer ${getAuthToken()}` };

  const fetchReservations = async () => {
    setLoading(true);
    try { 
      const r = await axios.get(`${Server_URL}reservations`, { headers }); 
      setReservations(r.data.reservations || []); 
    }
    catch { showErrorToast("Failed to fetch reservations"); }
    finally { setLoading(false); }
  };

  const notifyMember = async (bookId) => {
    try { 
      const r = await axios.put(`${Server_URL}reservations/notify/${bookId}`, {}, { headers }); 
      showSuccessToast(r.data.message); 
      fetchReservations(); 
    }
    catch (e) { showErrorToast(e.response?.data?.message || "Failed to notify"); }
  };

  useEffect(() => { fetchReservations(); }, []);

  const statuses  = ["All", "Pending", "Notified", "Fulfilled", "Cancelled", "Expired"];
  
  const filtered = reservations.filter(r => {
    const matchesFilter = filter === "All" || r.status === filter;
    const matchesSearch = 
      r.bookId?.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.userId?.membershipId?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCount = (s) => s === "All" ? reservations.length : reservations.filter(r => r.status === s).length;

  return (
    <div className="section-viewport">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Reservation Queue</h1>
          <p>Monitor book requests and notify members when items are available.</p>
        </div>
        <div className="header-actions">
           <span className="badge badge-purple" style={{ padding: '0.75rem 1.25rem' }}>
              <ClipboardList size={16} style={{ marginRight: '8px' }} />
              {reservations.length} Active Requests
           </span>
        </div>
      </header>

      {/* Modern Status Stats */}
      <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
        {[
          { label: "Pending", status: "Pending", icon: Clock },
          { label: "Notified", status: "Notified", icon: Bell },
          { label: "Fulfilled", status: "Fulfilled", icon: CheckCircle2 },
          { label: "Cancelled", status: "Cancelled", icon: XCircle }
        ].map(item => (
          <div key={item.label} className="stat-card" style={{ borderLeft: `4px solid ${STATUS_CONFIG[item.status].color}` }}>
            <div className="stat-icon-wrapper" style={{ background: STATUS_CONFIG[item.status].bg, color: STATUS_CONFIG[item.status].color }}>
              <item.icon size={24} />
            </div>
            <span className="stat-label">{item.label}</span>
            <span className="stat-value">{getCount(item.status)}</span>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="chart-container" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {statuses.map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`admin-nav-btn ${filter === s ? 'active' : ''}`}
                style={{ 
                  width: 'auto', 
                  padding: '0.6rem 1.2rem', 
                  fontSize: '0.85rem'
                }}
              >
                {s} <span style={{ opacity: 0.6, marginLeft: '4px' }}>{getCount(s)}</span>
              </button>
            ))}
          </div>
          
          <div className="fine-input-wrapper" style={{ minWidth: '350px' }}>
            <input
              type="text"
              className="fine-input-field"
              placeholder="Search book or member..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search size={18} className="fine-input-icon" />
          </div>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
           <div className="spinner" />
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Request Details</th>
                  <th>Member Information</th>
                  <th>Timeline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                       <AlertTriangle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} /><br/>
                       No reservations found for this selection.
                    </td>
                  </tr>
                ) : filtered.map((r) => {
                  const config = STATUS_CONFIG[r.status] || STATUS_CONFIG.Cancelled;
                  const StatusIcon = config.icon;
                  return (
                    <tr key={r._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div className="item-avatar" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}><BookOpen size={18} /></div>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{r.bookId?.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ISBN: {r.bookId?.isbn || "N/A"}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{r.userId?.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: {r.userId?.membershipId}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                          {new Date(r.reservationDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ 
                          background: config.bg, 
                          color: config.color,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <StatusIcon size={12} /> {config.label}
                        </span>
                      </td>
                      <td>
                        {r.status === "Pending" && (
                          <button 
                            onClick={() => notifyMember(r.bookId?._id)} 
                            className="fine-button-primary"
                            style={{ 
                              width: 'auto', 
                              padding: '0.5rem 1rem',
                              fontSize: '0.8rem'
                            }}
                          >
                            <Bell size={14} style={{ marginRight: '6px' }} /> Notify
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}