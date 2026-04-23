import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  Search, 
  History, 
  UserX, 
  UserCheck, 
  X, 
  BookOpen,
  Calendar,
  Info,
  AlertCircle
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

export default function ManageMembers() {
  const [members, setMembers]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [history, setHistory]     = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const headers = { Authorization: `Bearer ${getAuthToken()}` };

  const fetchMembers = async () => {
    setLoading(true);
    try { 
      const r = await axios.get(`${Server_URL}admin/members`, { headers }); 
      setMembers(r.data.members || []); 
    }
    catch { showErrorToast("Failed to fetch members"); }
    finally { setLoading(false); }
  };

  const toggleStatus = async (id) => {
    try { 
      const r = await axios.put(`${Server_URL}admin/users/${id}/toggle`, {}, { headers }); 
      showSuccessToast(r.data.message); 
      fetchMembers(); 
    }
    catch (e) { showErrorToast(e.response?.data?.message || "Failed to update status"); }
  };

  const viewHistory = async (m) => {
    setSelected(m); 
    setShowModal(true); 
    setHistory([]);
    try { 
      const r = await axios.get(`${Server_URL}admin/members/${m._id}/history`, { headers }); 
      setHistory(r.data.history || []); 
    }
    catch { showErrorToast("Failed to load history"); }
  };

  useEffect(() => { fetchMembers(); }, []);

  const filtered = members.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.membershipId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
           <Users size={14} style={{ marginRight: '6px' }} /> Student Directory
        </span>
        <h1>Library Members</h1>
        <p>Manage member accounts, track history, and control access.</p>
      </header>

      {/* Modern Search Interface */}
      <div className="chart-container" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div className="fine-input-wrapper" style={{ maxWidth: '600px' }}>
          <input
            type="text"
            className="fine-input-field"
            placeholder="Search by name, email, or membership ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search size={18} className="fine-input-icon" />
        </div>
      </div>

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
                  <th>Membership ID</th>
                  <th>Member Name</th>
                  <th>Contact & Stream</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                       <Info size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} /><br/>
                       No members found matching your search.
                    </td>
                  </tr>
                ) : filtered.map((m) => (
                  <tr key={m._id}>
                    <td>
                      <span style={{ 
                        fontFamily: 'monospace', 
                        background: 'var(--primary-glow)', 
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        color: 'var(--primary)',
                        fontWeight: 700 
                      }}>
                        {m.membershipId || "—"}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{m.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Since {new Date(m.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{m.email}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{m.stream || "General"} · Year {m.year || "1"}</div>
                    </td>
                    <td>
                      <span className="badge" style={{ 
                        background: m.status === "Active" ? '#dcfce7' : '#fee2e2', 
                        color: m.status === "Active" ? '#166534' : '#991b1b' 
                      }}>
                        {m.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="admin-nav-btn" 
                          style={{ width: 'auto', padding: '0.6rem', color: 'var(--primary)' }}
                          onClick={() => viewHistory(m)}
                          title="Borrowing History"
                        >
                          <History size={18} />
                        </button>
                        <button 
                          className="admin-nav-btn" 
                          style={{ 
                            width: 'auto', 
                            padding: '0.6rem', 
                            color: m.status === "Active" ? '#ef4444' : '#10b981' 
                          }}
                          onClick={() => toggleStatus(m._id)}
                          title={m.status === "Active" ? "Deactivate" : "Activate"}
                        >
                          {m.status === "Active" ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* History Modal (Themed) */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(42, 32, 80, 0.4)',
          backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '2rem'
        }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="chart-container" style={{ 
            width: '100%', maxWidth: '800px', maxHeight: '85vh', 
            display: 'flex', flexDirection: 'column', padding: 0,
            overflow: 'hidden', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ 
              padding: '2rem', background: 'linear-gradient(135deg, #2a2050, #3b2d71)', 
              color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Activity Logs</h2>
                <p style={{ margin: '4px 0 0', opacity: 0.7, fontSize: '0.85rem' }}>{selected?.name} ({selected?.membershipId})</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', padding: '1.5rem' }}>
              {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                   <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} /><br/>
                   No transaction records found.
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Timeline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map(h => (
                      <tr key={h._id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{h.bookId?.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ISBN: {h.bookId?.isbn}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem' }}><Calendar size={12} /> Issued: {new Date(h.issueDate).toLocaleDateString()}</div>
                          <div style={{ fontSize: '0.8rem', color: '#ef4444' }}><Calendar size={12} /> Due: {new Date(h.dueDate).toLocaleDateString()}</div>
                          {h.returnDate && <div style={{ fontSize: '0.8rem', color: '#10b981' }}><Calendar size={12} /> Returned: {new Date(h.returnDate).toLocaleDateString()}</div>}
                        </td>
                        <td>
                          <span className="badge" style={{ 
                            background: h.status === "Returned" ? '#dcfce7' : h.status === "Issued" ? '#dbeafe' : '#fef3c7',
                            color: h.status === "Returned" ? '#166534' : h.status === "Issued" ? '#1e40af' : '#92400e'
                          }}>
                            {h.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
               <button onClick={() => setShowModal(false)} className="fine-button-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>Close History</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}