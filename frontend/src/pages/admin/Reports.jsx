import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  AlertTriangle, 
  IndianRupee, 
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  PieChart,
  Activity
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showErrorToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

const TABS = [
  { key: "summary",      label: "System Summary",    icon: Activity },
  { key: "issued",       label: "Issued Books",      icon: BookOpen },
  { key: "overdue",      label: "Overdue Alerts",    icon: AlertTriangle },
  { key: "fines",        label: "Revenue & Fines",   icon: IndianRupee },
  { key: "mostBorrowed", label: "Popular Titles",    icon: TrendingUp },
];

export default function Reports() {
  const [tab, setTab]                   = useState("summary");
  const [summary, setSummary]           = useState(null);
  const [issuedBooks, setIssuedBooks]   = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [fines, setFines]               = useState({ fines:[], totalAmount:0, totalCollected:0, totalPending:0 });
  const [mostBorrowed, setMostBorrowed] = useState([]);
  const [loading, setLoading]           = useState(false);
  const headers = { Authorization: `Bearer ${getAuthToken()}` };

  const load = async (url, setter) => {
    setLoading(true);
    try { 
      const r = await axios.get(`${Server_URL}${url}`, { headers }); 
      setter(r.data); 
    }
    catch { showErrorToast("Failed to load data"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (tab === "summary")      load("reports/summary",       d => setSummary(d.summary));
    if (tab === "issued")       load("reports/issued",        d => setIssuedBooks(d.records || []));
    if (tab === "overdue")      load("reports/overdue",       d => setOverdueBooks(d.records || []));
    if (tab === "fines")        load("reports/fines",         d => setFines(d));
    if (tab === "mostBorrowed") load("reports/most-borrowed", d => setMostBorrowed(d.books || []));
  }, [tab]);

  const barData = mostBorrowed.length ? {
    labels: mostBorrowed.map(b => b.book?.title?.length > 15 ? b.book.title.slice(0,15)+"…" : b.book?.title),
    datasets: [{ 
      label: "Borrows", 
      data: mostBorrowed.map(b => b.borrowCount),
      backgroundColor: ["#8b5cf6", "#6366f1", "#a855f7", "#ec4899", "#3b82f6"],
      borderRadius: 8, 
    }],
  } : null;

  const pieData = {
    labels: ["Collected", "Pending"],
    datasets: [{ 
      data: [fines.totalCollected, fines.totalPending], 
      backgroundColor: ["#10b981", "#ef4444"], 
      borderWidth: 0 
    }],
  };

  return (
    <div className="section-viewport" style={{ padding: 0, display: 'flex', gap: '2rem' }}>
      {/* Sub-navigation */}
      <aside style={{ width: '260px', flexShrink: 0, borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
        <p className="sidebar-section-label">Report Category</p>
        <ul className="admin-nav">
          {TABS.map(t => (
            <li key={t.key} className="admin-nav-item">
              <button 
                className={`admin-nav-btn ${tab === t.key ? "active" : ""}`} 
                onClick={() => setTab(t.key)}
              >
                <t.icon className="nav-icon" /> {t.label}
              </button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--primary-glow)', borderRadius: '20px' }}>
           <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Export Data</h4>
           <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Generate official records for the current selection.</p>
           <button className="fine-button-primary" style={{ padding: '0.6rem', fontSize: '0.8rem' }}>
              <Download size={14} /> Download PDF
           </button>
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        <header className="centered-header" style={{ marginBottom: '3rem' }}>
          <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
             <Activity size={14} style={{ marginRight: '6px' }} /> Analytical Reports
          </span>
          <h1>{TABS.find(t => t.key === tab)?.label}</h1>
          <p>Generated on {new Date().toLocaleDateString()} · Official Library Audit</p>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
             <div className="spinner" />
          </div>
        ) : (
          <div className="report-content">
            {/* ── SUMMARY ── */}
            {tab === "summary" && summary && (
              <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="stat-icon-wrapper" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}><BookOpen size={24} /></div>
                  <span className="stat-label">Total Books</span>
                  <span className="stat-value">{summary.totalBooks}</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                  <div className="stat-icon-wrapper" style={{ background: '#dbeafe', color: '#3b82f6' }}><Users size={24} /></div>
                  <span className="stat-label">Total Members</span>
                  <span className="stat-value">{summary.totalMembers}</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                  <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#10b981' }}><TrendingUp size={24} /></div>
                  <span className="stat-label">Issued Books</span>
                  <span className="stat-value">{summary.totalIssued}</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
                  <div className="stat-icon-wrapper" style={{ background: '#fee2e2', color: '#ef4444' }}><AlertTriangle size={24} /></div>
                  <span className="stat-label">Overdue</span>
                  <span className="stat-value">{summary.totalOverdue}</span>
                </div>
              </div>
            )}

            {/* ── ISSUED ── */}
            {tab === "issued" && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Book Information</th>
                      <th>Borrower Details</th>
                      <th>Issue Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks.length === 0 ? (
                      <tr><td colSpan={3} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No active issuances.</td></tr>
                    ) : issuedBooks.map((r) => (
                      <tr key={r._id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{r.bookId?.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>by {r.bookId?.author}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{r.userId?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: {r.userId?.membershipId}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>Issued: {new Date(r.issueDate).toLocaleDateString()}</div>
                          <div style={{ fontSize: '0.85rem', color: '#ef4444' }}>Due: {new Date(r.dueDate).toLocaleDateString()}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── OVERDUE ── */}
            {tab === "overdue" && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Overdue Item</th>
                      <th>Borrower</th>
                      <th>Delay</th>
                      <th>Fine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overdueBooks.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No overdue records! 🎉</td></tr>
                    ) : overdueBooks.map((r) => (
                      <tr key={r._id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{r.bookId?.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>Due {new Date(r.dueDate).toLocaleDateString()}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{r.userId?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{r.userId?.email}</div>
                        </td>
                        <td><span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>{r.daysOverdue} Days</span></td>
                        <td><span style={{ fontWeight: 800, color: '#ef4444' }}>₹{r.fine}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── FINES ── */}
            {tab === "fines" && (
              <div className="dashboard-mid-grid" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
                <div className="chart-container">
                  <h3 className="section-title"><PieChart size={18} /> Revenue Mix</h3>
                  <div style={{ height: '240px' }}>
                    <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                  </div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                      <span style={{ color: '#166534', fontWeight: 600 }}>Collected</span>
                      <span style={{ fontWeight: 800 }}>₹{fines.totalCollected}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                      <span style={{ color: '#991b1b', fontWeight: 600 }}>Pending</span>
                      <span style={{ fontWeight: 800 }}>₹{fines.totalPending}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fines.fines.slice(0, 8).map((f) => (
                        <tr key={f._id}>
                          <td>
                             <div style={{ fontWeight: 700 }}>{f.memberId?.name}</div>
                             <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{f.bookId?.title?.slice(0,25)}...</div>
                          </td>
                          <td style={{ fontWeight: 800, color: f.paidStatus ? '#10b981' : '#ef4444' }}>₹{f.amount}</td>
                          <td>
                            <span className="badge" style={{ 
                              background: f.paidStatus ? '#dcfce7' : '#fee2e2', 
                              color: f.paidStatus ? '#166534' : '#991b1b' 
                            }}>
                              {f.paidStatus ? "Paid" : "Unpaid"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── POPULAR ── */}
            {tab === "mostBorrowed" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="chart-container" style={{ height: '350px' }}>
                  <h3 className="section-title"><BarChart3 size={18} /> Borrowing Velocity</h3>
                  {barData && <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />}
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Borrows</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mostBorrowed.map((b, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: i < 3 ? 'var(--primary)' : '#f1f5f9', color: i < 3 ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                              {i + 1}
                            </div>
                          </td>
                          <td style={{ fontWeight: 800 }}>{b.book?.title}</td>
                          <td>{b.book?.author}</td>
                          <td><span className="badge badge-purple">{b.borrowCount} Checkouts</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}