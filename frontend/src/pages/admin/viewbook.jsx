import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, 
  Edit3, 
  Trash2, 
  Book, 
  Hash, 
  Tag, 
  IndianRupee, 
  Layers,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
  Type,
  User,
  AlertTriangle,
  LayoutGrid
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    price: "",
    totalCopies: "",
  });

  useEffect(() => { fetchBooks(); }, []);

  useEffect(() => {
    if (!Array.isArray(books)) return;
    const filtered = books.filter(b => 
      (b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.author || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.isbn || "").includes(searchTerm)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    try {
      const url = Server_URL + "books";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setBooks(Array.isArray(response.data.books) ? response.data.books : []);
    } catch (error) {
      showErrorToast("Failed to fetch inventory");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this book from the collection?")) return;
    try {
      await axios.delete(`${Server_URL}books/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      showSuccessToast("Book removed successfully");
      fetchBooks();
    } catch (error) {
      showErrorToast("Deletion failed");
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      price: book.price,
      totalCopies: book.totalCopies,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${Server_URL}books/update/${selectedBook._id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      showSuccessToast("Inventory updated");
      setShowModal(false);
      fetchBooks();
    } catch (error) {
      showErrorToast("Update failed");
    }
  };

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
           <LayoutGrid size={14} style={{ marginRight: '6px' }} /> Catalog Control
        </span>
        <h1>Library Inventory</h1>
        <p>Browse and manage the complete collection of physical and digital assets.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
         <div className="fine-input-wrapper" style={{ width: '100%', maxWidth: '600px' }}>
           <input 
             type="text" 
             className="fine-input-field" 
             placeholder="Search by title, author, or ISBN..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Search size={18} className="fine-input-icon" />
         </div>
      </div>

      <div style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="chart-container" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={book.coverImage || "https://images.unsplash.com/photo-1543005139-014524090bb0?w=800"}
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="badge badge-purple" style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: 'none' }}>
                    {book.category}
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {book.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: 0 }}>by {book.author}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}><Hash size={12} /> {book.isbn}</span>
                    <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}><IndianRupee size={12} /> {book.price}</span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '10px 14px', 
                    background: 'var(--primary-glow)', 
                    borderRadius: '12px',
                    marginTop: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={14} style={{ color: 'var(--primary)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{book.availableCopies} / {book.totalCopies}</span>
                    </div>
                    {book.availableCopies > 0 ? (
                      <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        <CheckCircle2 size={12} /> Available
                      </span>
                    ) : (
                      <span style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        <AlertTriangle size={12} /> Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-color)', marginTop: 'auto' }}>
                  <button 
                    onClick={() => handleEdit(book)}
                    className="admin-nav-btn"
                    style={{ background: 'white', borderRadius: 0, padding: '1rem', color: 'var(--primary)' }}
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="admin-nav-btn"
                    style={{ background: 'white', borderRadius: 0, padding: '1rem', color: 'var(--accent-red)' }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 0' }}>
               <AlertCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
               <h2 style={{ color: 'var(--text-main)' }}>No matches found</h2>
               <p style={{ color: 'var(--text-dim)' }}>Try refining your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal (Fine Form) */}
      {showModal && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 2000, 
          background: 'rgba(42, 32, 80, 0.4)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
        }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="chart-container" style={{ width: '100%', maxWidth: '650px', padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              padding: '2rem', background: 'linear-gradient(135deg, #2a2050, #3b2d71)', 
              color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Edit3 size={24} />
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Update Inventory</h2>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '2.5rem' }} className="fine-form-container">
              <div className="fine-form-group">
                <label className="fine-label"><Type size={14} /> Book Title</label>
                <div className="fine-input-wrapper">
                  <input 
                    type="text" 
                    className="fine-input-field" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                  />
                  <Type size={18} className="fine-input-icon" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="fine-form-group">
                  <label className="fine-label"><User size={14} /> Author</label>
                  <div className="fine-input-wrapper">
                    <input 
                      type="text" 
                      className="fine-input-field" 
                      value={formData.author} 
                      onChange={e => setFormData({...formData, author: e.target.value})} 
                    />
                    <User size={18} className="fine-input-icon" />
                  </div>
                </div>
                <div className="fine-form-group">
                  <label className="fine-label"><Tag size={14} /> Category</label>
                  <div className="fine-input-wrapper">
                    <input 
                      type="text" 
                      className="fine-input-field" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                    />
                    <Tag size={18} className="fine-input-icon" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div className="fine-form-group">
                  <label className="fine-label"><Hash size={14} /> ISBN</label>
                  <input 
                    type="text" 
                    className="fine-input-field" 
                    value={formData.isbn} 
                    onChange={e => setFormData({...formData, isbn: e.target.value})} 
                  />
                </div>
                <div className="fine-form-group">
                  <label className="fine-label"><IndianRupee size={14} /> Price</label>
                  <input 
                    type="number" 
                    className="fine-input-field" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                  />
                </div>
                <div className="fine-form-group">
                  <label className="fine-label"><Layers size={14} /> Copies</label>
                  <input 
                    type="number" 
                    className="fine-input-field" 
                    value={formData.totalCopies} 
                    onChange={e => setFormData({...formData, totalCopies: e.target.value})} 
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowModal(false)} className="fine-button-primary" style={{ background: '#f1f5f9', color: '#475569', boxShadow: 'none' }}>
                  Cancel
                </button>
                <button onClick={handleUpdate} className="fine-button-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;