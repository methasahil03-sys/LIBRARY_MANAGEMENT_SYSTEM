import "../../animations.css";
import "../admin/AdminDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


export default function ReturnRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url = Server_URL + "librarian/returnrequest"
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        });
        console.log(res);
        setRequests(res.data.requests);
      } catch (err) {
        console.error("Error fetching requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    setApprovingId(id);
    try {
      const url = Server_URL + "librarian/approvereturnrequest/" + id;
      const response = await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      showSuccessToast(response.data.message || "Book Return successfully!");
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      console.error("Error approving request", err);
      showErrorToast("Failed to approve request");
    } finally {
      setApprovingId(null);
    }
  };

  const S = {
    page: {
      padding: "2rem 3rem",
      maxWidth: "1400px",
      margin: "0 auto",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "2rem",
    },
    headerIcon: {
      width: "52px",
      height: "52px",
      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.4rem",
      boxShadow: "0 6px 18px rgba(245, 158, 11, 0.25)",
    },
    headerTitle: {
      fontSize: "1.6rem",
      fontWeight: 800,
      color: "#1e1b4b",
      margin: 0,
      letterSpacing: "-0.02em",
    },
    headerSub: {
      fontSize: "0.88rem",
      color: "#8b80a9",
      margin: "2px 0 0",
    },
    countBadge: {
      marginLeft: "auto",
      padding: "8px 18px",
      background: "#fef3c7",
      color: "#92400e",
      borderRadius: "12px",
      fontSize: "0.85rem",
      fontWeight: 700,
      border: "1px solid #fcd34d",
    },
    /* Loading */
    loadingWrap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px",
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
    loadingText: {
      color: "#8b80a9",
      fontSize: "0.9rem",
    },
    /* Empty state */
    emptyCard: {
      textAlign: "center",
      padding: "60px 30px",
      background: "#ffffff",
      borderRadius: "24px",
      border: "1px solid #e9e5f5",
      boxShadow: "0 8px 32px rgba(100, 60, 200, 0.06)",
    },
    emptyIcon: {
      width: "72px",
      height: "72px",
      background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      margin: "0 auto 20px",
    },
    emptyTitle: {
      color: "#1e1b4b",
      fontWeight: 700,
      fontSize: "1.1rem",
      marginBottom: "8px",
    },
    emptyText: {
      color: "#8b80a9",
      fontSize: "0.9rem",
    },
    /* Table */
    tableWrap: {
      background: "#ffffff",
      borderRadius: "24px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#f8fafc",
      padding: "1rem 1.5rem",
      textAlign: "left",
      fontSize: "0.75rem",
      fontWeight: 800,
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "1.1rem 1.5rem",
      borderBottom: "1px solid #f1f5f9",
      color: "#475569",
      fontSize: "0.92rem",
      fontWeight: 500,
    },
    tdBold: {
      padding: "1.1rem 1.5rem",
      borderBottom: "1px solid #f1f5f9",
      color: "#1e1b4b",
      fontSize: "0.92rem",
      fontWeight: 700,
    },
    /* Status badge */
    statusBadge: {
      padding: "5px 14px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: 600,
      background: "#fef3c7",
      color: "#92400e",
      border: "1px solid #fcd34d",
      display: "inline-block",
    },
    /* Fine badge */
    fineBadge: (amount) => ({
      padding: "5px 14px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 700,
      background: amount > 0 ? "#fee2e2" : "#d1fae5",
      color: amount > 0 ? "#991b1b" : "#065f46",
      border: `1px solid ${amount > 0 ? "#fca5a5" : "#6ee7b7"}`,
      display: "inline-block",
    }),
    /* Approve button */
    approveBtn: {
      padding: "8px 20px",
      borderRadius: "12px",
      fontSize: "0.82rem",
      fontWeight: 700,
      fontFamily: "inherit",
      cursor: "pointer",
      background: "linear-gradient(135deg, #10b981, #059669)",
      color: "white",
      border: "none",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
      transition: "all 0.25s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    },
    approveBtnDisabled: {
      padding: "8px 20px",
      borderRadius: "12px",
      fontSize: "0.82rem",
      fontWeight: 700,
      fontFamily: "inherit",
      cursor: "not-allowed",
      background: "#d1d5db",
      color: "#6b7280",
      border: "none",
      boxShadow: "none",
    },
    /* User avatar */
    userAvatar: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    avatarCircle: {
      width: "36px",
      height: "36px",
      background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.85rem",
      fontWeight: 700,
      color: "#2a2050",
      flexShrink: 0,
    },
  };

  return (
    <div style={S.page} className="anim-page">

      {/* Header */}
      <div style={S.header} className="anim-fade-up">
        <div style={S.headerIcon}>📦</div>
        <div>
          <h2 style={S.headerTitle}>Return Book Requests</h2>
          <p style={S.headerSub}>Review and approve student book return requests</p>
        </div>
        {!loading && requests.length > 0 && (
          <div style={S.countBadge}>
            {requests.length} pending
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div style={S.loadingWrap}>
          <div style={S.spinner}></div>
          <span style={S.loadingText}>Loading return requests...</span>
        </div>
      ) : requests.length === 0 ? (
        <div style={S.emptyCard} className="anim-fade-up">
          <div style={S.emptyIcon}>✅</div>
          <h4 style={S.emptyTitle}>No pending return requests</h4>
          <p style={S.emptyText}>All return requests have been processed. Check back later!</p>
        </div>
      ) : (
        <div style={S.tableWrap} className="anim-fade-up">
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>#</th>
                <th style={S.th}>Student</th>
                <th style={S.th}>Book Title</th>
                <th style={S.th}>Issue Date</th>
                <th style={S.th}>Due Date</th>
                <th style={S.th}>Fine</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr
                  key={req._id}
                  style={{ transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={S.td}>{i + 1}</td>
                  <td style={S.td}>
                    <div style={S.userAvatar}>
                      <div style={S.avatarCircle}>
                        {(req.userId?.name || "?").charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: "#1e1b4b" }}>
                        {req.userId?.name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td style={S.tdBold}>{req.bookId?.title || "N/A"}</td>
                  <td style={S.td}>
                    {new Date(req.issueDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </td>
                  <td style={S.td}>
                    {new Date(req.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </td>
                  <td style={S.td}>
                    <span style={S.fineBadge(req.fine)}>₹{req.fine}</span>
                  </td>
                  <td style={S.td}>
                    <span style={S.statusBadge}>{req.status}</span>
                  </td>
                  <td style={S.td}>
                    <button
                      style={approvingId === req._id ? S.approveBtnDisabled : S.approveBtn}
                      disabled={approvingId === req._id}
                      onClick={() => approveRequest(req._id)}
                      onMouseEnter={e => {
                        if (approvingId !== req._id) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 6px 18px rgba(16,185,129,0.35)";
                        }
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = "none";
                        e.target.style.boxShadow = "0 4px 12px rgba(16,185,129,0.25)";
                      }}
                    >
                      {approvingId === req._id ? "Processing..." : "✅ Approve Return"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
