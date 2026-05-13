import "../../animations.css";
import "./reservations.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${Server_URL}reservations/my`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setReservations(res.data.reservations || []);
    } catch (err) {
      showErrorToast("Failed to fetch reservations");
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    if (!confirm("Cancel this reservation?")) return;
    try {
      const res = await axios.delete(`${Server_URL}reservations/cancel/${id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      showSuccessToast(res.data.message);
      fetchReservations();
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Failed to cancel");
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const getStatusClass = (status) => {
    const map = {
      Pending:   "pending",
      Notified:  "notified",
      Fulfilled: "fulfilled",
      Cancelled: "cancelled",
      Expired:   "expired",
    };
    return map[status] || "cancelled";
  };

  return (
    <div className="reservations-page anim-page">
      <div className="reservations-wrapper">

        {/* Header */}
        <div className="reservations-header anim-fade-up">
          <div className="reservations-header-icon">📋</div>
          <div>
            <h2>My Reservations</h2>
            <p>Track and manage your book reservations</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="reservations-loading">
            <div className="spinner"></div>
            <span>Loading reservations...</span>
          </div>
        ) : reservations.length === 0 ? (
          <div className="reservations-empty anim-fade-up">
            <div className="reservations-empty-icon">📚</div>
            <h4>No reservations found</h4>
            <p>
              When a book is unavailable, you can reserve it from the book
              details page. We'll notify you when it becomes available!
            </p>
            <Link to="/books" className="reservations-empty-btn">
              📖 Browse Books
            </Link>
          </div>
        ) : (
          <div className="reservations-list">
            {reservations.map((r, i) => (
              <div
                key={r._id}
                className="reservation-card anim-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="reservation-num">{i + 1}</div>

                <div className="reservation-info">
                  <p className="reservation-title">{r.bookId?.title}</p>
                  <div className="reservation-meta">
                    <span className="reservation-meta-item">
                      <span className="label">Author:</span>
                      <span className="value">{r.bookId?.author}</span>
                    </span>
                    <span className="reservation-meta-item">
                      <span className="label">Category:</span>
                      <span className="value">{r.bookId?.category}</span>
                    </span>
                    <span className="reservation-meta-item">
                      <span className="label">Reserved:</span>
                      <span className="value">
                        {new Date(r.reservationDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="reservation-status">
                  <span className={`status-badge ${getStatusClass(r.status)}`}>
                    {r.status}
                  </span>
                </div>

                <div className="reservation-action">
                  {["Pending", "Notified"].includes(r.status) && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelReservation(r._id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
