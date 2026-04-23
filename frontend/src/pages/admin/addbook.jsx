import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { 
  BookPlus, 
  Type, 
  User, 
  Tag, 
  Hash, 
  Building2, 
  Calendar, 
  Layers, 
  IndianRupee, 
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

const CATEGORIES = [
  "Fiction", "Non-fiction", "Science", "History", "Technology",
  "Biography", "Philosophy", "Arts & Design", "Business", "Education",
];

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") formData.append(key, data[key]);
      });

      if (data.coverImage && data.coverImage[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const authToken = localStorage.getItem("authToken");
      const url = Server_URL + "books/add";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.error) {
        showErrorToast(response.data.message || "Failed to add book!");
      } else {
        showSuccessToast(response.data.message || "Book added successfully!");
        reset();
        setFileName("");
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || err.message || "Failed to add book!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
           <BookPlus size={14} style={{ marginRight: '6px' }} /> Inventory Management
        </span>
        <h1>Add New Acquisition</h1>
        <p>Register a new book into the library's digital inventory.</p>
      </header>

      <div className="cool-form-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="fine-form-container">
          
          {/* Section: Basic Metadata */}
          <div className="form-section">
            <h3 className="section-title" style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <FileText size={20} /> Basic Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }} className="fine-form-group">
                <label className="fine-label"><Type size={14} /> Book Title *</label>
                <div className="fine-input-wrapper">
                  <input
                    type="text"
                    className="fine-input-field"
                    placeholder="Enter full book title"
                    {...register("title", { required: "Title is required" })}
                  />
                  <Type size={18} className="fine-input-icon" />
                </div>
                {errors.title && <span className="fine-error-text"><AlertCircle size={12} /> {errors.title.message}</span>}
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><User size={14} /> Author *</label>
                <div className="fine-input-wrapper">
                  <input
                    type="text"
                    className="fine-input-field"
                    placeholder="Primary author name"
                    {...register("author", { required: "Author is required" })}
                  />
                  <User size={18} className="fine-input-icon" />
                </div>
                {errors.author && <span className="fine-error-text"><AlertCircle size={12} /> {errors.author.message}</span>}
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><Tag size={14} /> Category *</label>
                <div className="fine-input-wrapper">
                  <select
                    className="fine-select-field"
                    style={{ paddingLeft: '3rem' }}
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="">Select Genre</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <Tag size={18} className="fine-input-icon" />
                </div>
                {errors.category && <span className="fine-error-text"><AlertCircle size={12} /> {errors.category.message}</span>}
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>

          {/* Section: Publication & Logistics */}
          <div className="form-section">
            <h3 className="section-title" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
              <Building2 size={20} /> Publication & Logistics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div className="fine-form-group">
                <label className="fine-label"><Hash size={14} /> ISBN Number *</label>
                <div className="fine-input-wrapper">
                  <input
                    type="text"
                    className="fine-input-field"
                    placeholder="ISBN-13"
                    {...register("isbn", { required: "ISBN is required" })}
                  />
                  <Hash size={18} className="fine-input-icon" />
                </div>
                {errors.isbn && <span className="fine-error-text"><AlertCircle size={12} /> {errors.isbn.message}</span>}
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><Building2 size={14} /> Publisher</label>
                <div className="fine-input-wrapper">
                  <input
                    type="text"
                    className="fine-input-field"
                    placeholder="Publishing house"
                    {...register("publisher")}
                  />
                  <Building2 size={18} className="fine-input-icon" />
                </div>
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><Calendar size={14} /> Release Year</label>
                <div className="fine-input-wrapper">
                  <input
                    type="number"
                    className="fine-input-field"
                    placeholder="e.g. 2024"
                    {...register("publicationYear")}
                  />
                  <Calendar size={18} className="fine-input-icon" />
                </div>
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><Layers size={14} /> Total Copies *</label>
                <div className="fine-input-wrapper">
                  <input
                    type="number"
                    className="fine-input-field"
                    placeholder="No. of copies"
                    {...register("totalCopies", { required: "Required", min: 1 })}
                  />
                  <Layers size={18} className="fine-input-icon" />
                </div>
                {errors.totalCopies && <span className="fine-error-text"><AlertCircle size={12} /> {errors.totalCopies.message}</span>}
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><IndianRupee size={14} /> Purchase Price</label>
                <div className="fine-input-wrapper">
                  <input
                    type="number"
                    step="0.01"
                    className="fine-input-field"
                    placeholder="0.00"
                    {...register("price")}
                  />
                  <IndianRupee size={18} className="fine-input-icon" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>

          {/* Section: Visuals & Narrative */}
          <div className="form-section">
            <h3 className="section-title" style={{ color: 'var(--accent-pink)', marginBottom: '1.5rem' }}>
              <ImageIcon size={20} /> Presentation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div className="fine-form-group">
                <label className="fine-label"><ImageIcon size={14} /> Cover Artwork</label>
                <div style={{ 
                  border: '2px dashed var(--glass-border)', 
                  borderRadius: '16px', 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: '#f8fafc',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }}
                    {...register("coverImage")}
                    onChange={e => setFileName(e.target.files?.[0]?.name || "")}
                  />
                  <ImageIcon size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                  <p style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {fileName || "Click to upload or drag book cover"}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Supported formats: JPG, PNG, WEBP</p>
                </div>
              </div>

              <div className="fine-form-group">
                <label className="fine-label"><FileText size={14} /> Book Synopsis *</label>
                <textarea
                  className="fine-textarea-field"
                  style={{ minHeight: '120px' }}
                  placeholder="Provide a brief summary of the book content..."
                  {...register("description", { required: "Description is required" })}
                ></textarea>
                {errors.description && <span className="fine-error-text"><AlertCircle size={12} /> {errors.description.message}</span>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="fine-button-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <><div className="spinner" style={{ width: '20px', height: '20px', borderThickness: '2px' }} /> Cataloging...</>
              ) : (
                <><ShieldCheck size={20} /> Confirm Registration <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;

