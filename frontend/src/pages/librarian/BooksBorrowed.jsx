import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";

export default function BooksBorrowed() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const url = Server_URL + "librarian/bookissued"
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      console.log(res);
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      const url = Server_URL + "librarian/approverequest/" + id;
      const response = await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
  
      alert(response.data.message || "Book issued successfully!");
      fetchRequests();
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.error || "Something went wrong";
        alert( message);
      } else {
        alert("Network error: " + err.message);
      }
      console.error("Error approving request:", err);
    }
  };

  return (
    <>
      <style>{`
        .bb-table-container { background: #fff; border: 2px solid #e4ddf5; border-radius: 24px; overflow: hidden; box-shadow: 0 6px 24px rgba(100,60,200,.08); }
        .bb-table { width: 100%; border-collapse: collapse; text-align: left; }
        .bb-table th { background: #f8f6ff; padding: 14px 20px; font-size: 0.75rem; font-weight: 800; color: #b8aad8; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid #e4ddf5; }
        .bb-table td { padding: 14px 20px; font-size: 0.9rem; color: #2a2050; border-bottom: 1px solid #f0ecfa; transition: background 0.2s; }
        .bb-table tr:hover td { background: #faf8ff; }
        .bb-table tr:last-child td { border-bottom: none; }
        .bb-badge { padding: 6px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; background: #fef3c7; color: #92400e; }
        .bb-header-title { font-size: 1.8rem; font-weight: 800; color: #2a2050; letter-spacing: -0.02em; display: flex; align-items: center; gap: 12px; }
        .bb-header-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #c4b5fd, #93c5fd); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 4px 14px rgba(139,92,246,.25); }
      `}</style>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f3f0fb", minHeight: "100vh", padding: "2.5rem" }}>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 className="bb-header-title">
            <span className="bb-header-icon">📚</span>
            Books Issued
          </h2>
          <p style={{ color: "#b8aad8", fontSize: "0.9rem", marginTop: "4px", marginLeft: "56px" }}>Manage currently borrowed books</p>
        </div>

        {requests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", background: "#fff", borderRadius: "24px", border: "2px solid #e4ddf5" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: "0.5" }}>📚</div>
            <h4 style={{ color: "#6b5e95", fontWeight: "600" }}>No pending requests.</h4>
          </div>
        ) : (
          <div className="bb-table-container">
            <table className="bb-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Book Title</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td style={{ fontWeight: "700" }}>{req.userId?.name || "N/A"}</td>
                    <td>
                      <div style={{ fontWeight: "600" }}>{req.bookId?.title || "N/A"}</div>
                    </td>
                    <td style={{ color: "#6b5e95" }}>{new Date(req.issueDate).toLocaleDateString()}</td>
                    <td style={{ color: "#6b5e95" }}>{new Date(req.dueDate).toLocaleDateString()}</td>
                    <td>
                      <span className="bb-badge">{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
