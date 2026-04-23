import "../../animations.css";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { FiBook, FiLayout, FiUsers, FiCheckCircle, FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";

// --- simple helpers ---
const num = (v) => (Number.isFinite(+v) ? +v : 0);
const byCategories = (books = []) => {
  const map = new Map();
  for (const b of books) {
    const key = b?.category || "Uncategorized";
    const entry = map.get(key) || {
      name: key,
      booksCount: 0,
      image: b?.coverImage || "",
    };
    entry.booksCount += 1;
    if (!entry.image && b?.coverImage) entry.image = b.coverImage;
    map.set(key, entry);
  }
  return Array.from(map.values());
};

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.get("/home");
        const d = res?.data?.data ?? res?.data ?? {};
        if (alive) setData(d);
      } catch (e) {
        if (alive) setErr(e?.response?.data?.message || "Failed to load data");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  if (loading) return (
    <div className="section-viewport" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div className="spinner" />
    </div>
  );
  
  if (!data) return (
    <div className="section-viewport" style={{ textAlign: "center", color: "#ef4444" }}>
      <p>{err}</p>
    </div>
  );

  const totalCategories = data.totalCategories ?? data.categoriesCount ?? 0;
  const totalBooks = data.totalBooks ?? data.booksCount ?? 0;
  const totalActiveStudents = data.totalActiveStudents ?? data.borrowersCount ?? 0;
  const issuedCount = data.issuedCount ?? data.totalIssued ?? 0;
  const books = Array.isArray(data.books) ? data.books : [];

  const categories = byCategories(books);
  const latest = books.slice(0, 8);

  return (
    <div style={{ background: "var(--secondary-soft)", minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <section style={{
        padding: "6rem 2rem",
        background: "linear-gradient(135deg, var(--primary-deep), #3b2e7d)",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
          opacity: 0.1,
          filter: "blur(60px)"
        }} />
        
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Modern Learning, <span style={{ color: "var(--accent-purple)" }}>Simplified.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Explore thousands of academic resources, from classic literature to the latest in computer science, all at your fingertips.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <a href="/books" className="premium-btn" style={{ padding: "14px 32px", fontSize: "1rem" }}>
              Browse Collection <FiArrowRight />
            </a>
            <a href="/aboutus" style={{ 
              padding: "14px 32px", 
              borderRadius: "12px", 
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)"
            }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section-viewport" style={{ marginTop: "-4rem", position: "relative", zIndex: 2, paddingTop: 0 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem"
        }}>
          <StatCard title="Total Categories" value={`${num(totalCategories)}+`} icon={<FiLayout />} color="#8b5cf6" />
          <StatCard title="Total Books" value={`${num(totalBooks)}+`} icon={<FiBook />} color="#6366f1" />
          <StatCard title="Active Students" value={num(totalActiveStudents)} icon={<FiUsers />} color="#10b981" />
          <StatCard title="Issued Books" value={num(issuedCount)} icon={<FiCheckCircle />} color="#f59e0b" />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section-viewport">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary-deep)", marginBottom: "1rem" }}>Browse By Categories</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Find specialized resources tailored to your academic field</p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem"
        }}>
          {categories.map((c) => (
            <div key={c.name} className="cotton-card" style={{ overflow: "hidden" }}>
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={c.image || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"}
                  alt={c.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="category-img"
                />
              </div>
              <div style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--primary-deep)", marginBottom: "0.5rem" }}>{c.name}</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>{c.booksCount} resources available</p>
                <a href={`/category?type=${encodeURIComponent(c.name)}`} style={{ 
                  color: "var(--accent-purple)", 
                  textDecoration: "none", 
                  fontWeight: 700, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px",
                  fontSize: "0.95rem"
                }}>
                  Explore Category <FiArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{ background: "#fff", padding: "6rem 0" }}>
        <div className="section-viewport">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary-deep)", marginBottom: "1rem" }}>New Arrivals</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>The latest additions to our academic collection</p>
            </div>
            <a href="/books" className="premium-btn" style={{ padding: "10px 24px", background: "var(--primary-glow)", color: "var(--accent-purple)" }}>
              View All
            </a>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem"
          }}>
            {latest.map((b) => (
              <div key={b._id} className="cotton-card" style={{ padding: "1.5rem", border: "none", background: "var(--secondary-soft)" }}>
                <div style={{ 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  marginBottom: "1.5rem",
                  aspectRatio: "2/3"
                }}>
                  <img
                    src={b.coverImage || "https://via.placeholder.com/300x450?text=No+Cover"}
                    alt={b.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--primary-deep)" }}>{b.title}</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>{b.author}</p>
                <span style={{ 
                  background: "white", 
                  color: "var(--accent-purple)", 
                  padding: "4px 12px", 
                  borderRadius: "20px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700,
                  border: "1px solid var(--border-color)"
                }}>
                  {b.category || "General"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOURS & INFO */}
      <section className="section-viewport">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div className="cotton-card" style={{ padding: "3rem", textAlign: "center" }}>
            <div style={{ 
              width: "60px", 
              height: "60px", 
              background: "var(--primary-glow)", 
              color: "var(--accent-purple)", 
              borderRadius: "20px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <FiClock size={28} />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Regular Hours</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
              Mon - Fri: 8:00 AM - 8:00 PM<br/>
              Saturday: 10:00 AM - 5:00 PM<br/>
              Sunday: Closed
            </p>
          </div>
          
          <div className="cotton-card" style={{ padding: "3rem", textAlign: "center", background: "var(--primary-deep)", color: "white", border: "none" }}>
            <div style={{ 
              width: "60px", 
              height: "60px", 
              background: "rgba(255,255,255,0.1)", 
              color: "white", 
              borderRadius: "20px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <FiCalendar size={28} />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Exam Period</h3>
            <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
              Monday - Sunday<br/>
              7:00 AM - 11:00 PM<br/>
              (Extended Hours)
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .category-img:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="cotton-card" style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
      <div style={{ 
        fontSize: "2rem", 
        color: color, 
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center"
      }}>{icon}</div>
      <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary-deep)", marginBottom: "0.25rem" }}>{value}</div>
      <div style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</div>
    </div>
  );
}