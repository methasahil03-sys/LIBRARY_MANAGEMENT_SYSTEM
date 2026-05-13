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


const S = {
  page: {
    display: "flex",
    gap: "2rem",
    padding: "2rem 3rem",
    maxWidth: "1500px",
    margin: "0 auto",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    minHeight: "calc(100vh - 140px)",
  },
  aside: {
    width: "260px",
    flexShrink: 0,
    paddingRight: "1.5rem",
  },
  asideLabel: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "0 1rem",
    marginBottom: "1.25rem",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    margin: 0,
    padding: 0,
  },
  navBtn: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.8rem 1.1rem",
    borderRadius: "12px",
    border: "none",
    background: isActive
      ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
      : "transparent",
    color: isActive ? "#ffffff" : "#6b5e95",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    fontWeight: isActive ? 700 : 500,
    cursor: "pointer",
    transition: "all 0.25s ease",
    width: "100%",
    textAlign: "left",
    boxShadow: isActive ? "0 6px 18px rgba(139, 92, 246, 0.3)" : "none",
  }),
  navIcon: {
    width: 18,
    height: 18,
    flexShrink: 0,
  },
  exportCard: {
    marginTop: "2rem",
    padding: "1.5rem",
    background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(99,102,241,0.06))",
    borderRadius: "20px",
    border: "1px solid #e9e5f5",
  },
  exportTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#8b5cf6",
    marginBottom: "0.5rem",
  },
  exportDesc: {
    fontSize: "0.78rem",
    color: "#8b80a9",
    marginBottom: "1rem",
    lineHeight: 1.5,
  },
  exportBtn: {
    width: "100%",
    padding: "0.7rem 1rem",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    color: "#ffffff",
    border: "none",
    fontFamily: "inherit",
    fontSize: "0.82rem",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 6px 18px rgba(139, 92, 246, 0.25)",
    transition: "all 0.25s ease",
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  headerWrap: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  headerBadge: {
    padding: "0.5rem 1rem",
    background: "#f5f3ff",
    color: "#7c3aed",
    borderRadius: "10px",
    fontSize: "0.78rem",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "1rem",
    border: "1px solid #e9e5f5",
  },
  headerTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#1e1b4b",
    marginBottom: "0.4rem",
    letterSpacing: "-0.03em",
  },
  headerSub: {
    fontSize: "0.92rem",
    color: "#8b80a9",
    fontWeight: 500,
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "100px 20px",
    flexDirection: "column",
    gap: "16px",
  },
  spinner: {
    width: "44px",
    height: "44px",
    border: "3px solid #e4ddf5",
    borderTopColor: "#8b5cf6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

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
    <div style={S.page}>
      {/* ── Sub-navigation ── */}
      <aside style={S.aside}>
        <p style={S.asideLabel}>Report Category</p>
        <ul style={S.navList}>
          {TABS.map(t => (
            <li key={t.key}>
              <button
                style={S.navBtn(tab === t.key)}
                onClick={() => setTab(t.key)}
                onMouseEnter={e => {
                  if (tab !== t.key) {
                    e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                    e.currentTarget.style.color = "#8b5cf6";
                  }
                }}
                onMouseLeave={e => {
                  if (tab !== t.key) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#6b5e95";
                  }
                }}
              >
                <t.icon style={S.navIcon} /> {t.label}
              </button>
            </li>
          ))}
        </ul>
        <div style={S.exportCard}>
          <h4 style={S.exportTitle}>Export Data</h4>
          <p style={S.exportDesc}>Generate official records for the current selection.</p>
          <button
            style={S.exportBtn}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,92,246,0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(139,92,246,0.25)";
            }}
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div style={S.mainContent}>
        <header style={S.headerWrap}>
          <span style={S.headerBadge}>
            <Activity size={14} /> Analytical Reports
          </span>
          <h1 style={S.headerTitle}>{TABS.find(t => t.key === tab)?.label}</h1>
          <p style={S.headerSub}>Generated on {new Date().toLocaleDateString()} · Official Library Audit</p>
        </header>

        {loading ? (
          <div style={S.loadingWrap}>
            <div style={S.spinner}></div>
            <span style={{ color: "#8b80a9", fontSize: "0.9rem" }}>Loading report data...</span>
          </div>
        ) : (
          <div>
            {/* ── SUMMARY ── */}
            {tab === "summary" && summary && (
              <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                  <div className="stat-icon-wrapper" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}><BookOpen size={24} /></div>
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
                      <tr><td colSpan={3} style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>No active issuances.</td></tr>
                    ) : issuedBooks.map((r) => (
                      <tr key={r._id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{r.bookId?.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>by {r.bookId?.author}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{r.userId?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {r.userId?.membershipId}</div>
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
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>No overdue records! 🎉</td></tr>
                    ) : overdueBooks.map((r) => (
                      <tr key={r._id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{r.bookId?.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>Due {new Date(r.dueDate).toLocaleDateString()}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{r.userId?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{r.userId?.email}</div>
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
                             <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{f.bookId?.title?.slice(0,25)}...</div>
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
                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: i < 3 ? '#8b5cf6' : '#f1f5f9', color: i < 3 ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
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