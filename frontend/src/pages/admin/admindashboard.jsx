import { useEffect, useState } from "react";
import axios from "axios";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  UserCheck, 
  PlusCircle, 
  Clock, 
  BarChart3,
  Settings,
  Bell,
  LogOut,
  IndianRupee,
  ClipboardList,
  Search,
  BookPlus,
  Table as TableIcon
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

// Import Sub-modules
import ManageMembers from "./ManageMembers";
import FineConfig from "./FineConfig";
import AllReservations from "./AllReservations";
import Reports from "./Reports";
import AddLibrarian from "./AddLibrarian";
import AddBook from "./addbook";
import ViewBooks from "./viewbook";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [latestBooks, setLatestBooks] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalLib, setTotalLib] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [occupancyPercent, setOccupancyPercent] = useState(0);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: ["#818cf8", "#c084fc", "#60a5fa", "#34d399", "#fbbf24"], borderWidth: 0, borderColor: 'transparent' }],
  });

  const role = localStorage.getItem("role");
  const adminName = localStorage.getItem("name") || "Administrator";

  const fetchData = async () => {
    try {
      // Fetch Users
      const userRes = await axios.get(Server_URL + "users");
      if (!userRes.data.error) {
        setTotalUser(userRes.data.user.filter(u => u.role === "user").length);
        setTotalLib(userRes.data.user.filter(u => u.role === "librarian").length);
      }

      // Fetch Books
      let totalCopiesFromBooks = 0;
      const bookRes = await axios.get(Server_URL + "books");
      if (!bookRes.data.error) {
        const allBooks = bookRes.data.books;
        setTotalBooks(bookRes.data.totalBooks);
        totalCopiesFromBooks = allBooks.reduce(
          (acc, b) => acc + (b.totalCopies || 0),
          0,
        );
        
        const categoryCount = allBooks.reduce((acc, b) => {
          acc[b.category] = (acc[b.category] || 0) + 1;
          return acc;
        }, {});
        
        setCategoryData({
          labels: Object.keys(categoryCount),
          datasets: [{ 
            data: Object.values(categoryCount), 
            backgroundColor: ["#818cf8", "#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#22d3ee"], 
            borderWidth: 0,
            borderColor: 'transparent' 
          }],
        });
      }

      const homeRes = await axios.get(Server_URL + "home");
      if (!homeRes.data.error) {
        const borrowed = homeRes.data.borrowedCount ?? homeRes.data.issuedCount ?? 0;
        const totalCopies = homeRes.data.totalCopies ?? totalCopiesFromBooks;
        setBorrowedBooks(borrowed);
        const percent = totalCopies
          ? Math.min(100, Math.round((borrowed / totalCopies) * 100))
          : 0;
        setOccupancyPercent(percent);
      }

      // Latest Books
      const latestRes = await axios.get(Server_URL + 'books/new');
      if (!latestRes.data.error) setLatestBooks(latestRes.data.books);

    } catch (e) { console.error("Dashboard fetch error:", e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard": return <DashboardHome />;
      case "users": return <ManageMembers />;
      case "librarians": return <AddLibrarian />;
      case "books": return <ViewBooks />;
      case "add-book": return <AddBook />;
      case "reservations": return <AllReservations />;
      case "fines": return <FineConfig />;
      case "reports": return <Reports />;
      default: return <DashboardHome />;
    }
  };

  const DashboardHome = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card books">
          <div className="stat-icon-wrapper"><BookOpen size={24} /></div>
          <span className="stat-label">Total Books</span>
          <span className="stat-value">{totalBooks}</span>
        </div>
        <div className="stat-card users">
          <div className="stat-icon-wrapper"><Users size={24} /></div>
          <span className="stat-label">Total Students</span>
          <span className="stat-value">{totalUser}</span>
        </div>
        {role === "admin" && (
          <div className="stat-card librarians">
            <div className="stat-icon-wrapper"><UserCheck size={24} /></div>
            <span className="stat-label">Librarians</span>
            <span className="stat-value">{totalLib}</span>
          </div>
        )}
        <div className="stat-card borrowed">
          <div className="stat-icon-wrapper"><Clock size={24} /></div>
          <span className="stat-label">Borrowed Items</span>
          <span className="stat-value">{borrowedBooks}</span>
        </div>
      </div>

      <div className="occupancy-card">
        <div className="occupancy-info">
          <h3>Collection Utilization</h3>
          <span className="percent">{occupancyPercent}%</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${occupancyPercent}%` }}></div></div>
      </div>

      <div className="dashboard-mid-grid">
        <div className="chart-container">
          <h3 className="section-title"><BarChart3 size={18} /> Category Mix</h3>
          <div style={{ height: "250px" }}>
            <Pie data={categoryData} options={{ 
              plugins: { legend: { position: "bottom", labels: { padding: 16, usePointStyle: true, color: '#a09cb5', font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 } } } },
              maintainAspectRatio: false,
            }} />
          </div>
        </div>

        <div className="recent-activity-card">
          <h3 className="section-title"><PlusCircle size={18} /> New Acquisitions</h3>
          <div className="activity-list">
            {latestBooks.slice(0, 4).map((b, i) => (
              <div key={i} className="activity-item">
                <div className="item-avatar">📚</div>
                <div className="item-info">
                  <span className="item-title">{b.title}</span>
                  <span className="item-meta">By {b.author} · {b.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-box">L</div>
          <span className="logo-text">CrystalLib</span>
        </div>

        <nav>
          <p className="sidebar-section-label">General</p>
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "dashboard" ? "active" : ""}`} onClick={() => setSelectedSection("dashboard")}><LayoutDashboard className="nav-icon" /> Dashboard</button>
            </li>
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "reports" ? "active" : ""}`} onClick={() => setSelectedSection("reports")}><BarChart3 className="nav-icon" /> Analytics</button>
            </li>
          </ul>

          <p className="sidebar-section-label">Management</p>
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "books" ? "active" : ""}`} onClick={() => setSelectedSection("books")}><TableIcon className="nav-icon" /> Inventory</button>
            </li>
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "add-book" ? "active" : ""}`} onClick={() => setSelectedSection("add-book")}><BookPlus className="nav-icon" /> Add Book</button>
            </li>
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "users" ? "active" : ""}`} onClick={() => setSelectedSection("users")}><Users className="nav-icon" /> Members</button>
            </li>
            {role === "admin" && (
              <li className="admin-nav-item">
                <button className={`admin-nav-btn ${selectedSection === "librarians" ? "active" : ""}`} onClick={() => setSelectedSection("librarians")}><UserCheck className="nav-icon" /> Staff Accounts</button>
              </li>
            )}
          </ul>

          <p className="sidebar-section-label">Operations</p>
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "reservations" ? "active" : ""}`} onClick={() => setSelectedSection("reservations")}><ClipboardList className="nav-icon" /> Reservations</button>
            </li>
            <li className="admin-nav-item">
              <button className={`admin-nav-btn ${selectedSection === "fines" ? "active" : ""}`} onClick={() => setSelectedSection("fines")}><IndianRupee className="nav-icon" /> Fine Settings</button>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', padding: '1.5rem 0' }}>
            <button className="admin-nav-btn" style={{ color: '#ef4444' }} onClick={handleLogout}><LogOut className="nav-icon" /> Logout</button>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        {selectedSection === "dashboard" && (
          <header className="centered-header">
            <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
               <Bell size={14} style={{ marginRight: '6px' }} /> Notification Center
            </span>
            <h1>Hello, {adminName}!</h1>
            <p>Operational overview and real-time library insights.</p>
          </header>
        )}
        
        <div className="section-viewport">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
