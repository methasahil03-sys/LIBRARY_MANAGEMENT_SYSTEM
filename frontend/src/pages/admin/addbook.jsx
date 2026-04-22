import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./addbook.css";

const CATEGORIES = [
  "Fiction",
  "Non-fiction",
  "Science",
  "History",
  "Technology",
  "Biography",
  "Philosophy",
  "Arts & Design",
  "Business",
  "Education",
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

      // Append all text fields except the file field
      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") {
          formData.append(key, data[key]);
        }
      });

      // Append the image file if provided
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

      const { error, message } = response.data;

      if (error) {
        showErrorToast(message || "Failed to add book!");
      } else {
        showSuccessToast(message || "Book added successfully!");
        reset();
        setFileName("");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to add book!";
      console.error("Add book error:", msg);
      showErrorToast(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addbook-page">
      {/* ── Header ── */}
      <div className="addbook-header">
        <h1 className="addbook-title">
          <span className="title-icon">📚</span>
          Add a New Book
        </h1>
        <p className="addbook-subtitle">
          Fill in the details below to add a new book to the library collection.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="addbook-card">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="addbook-grid">

            {/* ── Section: Basic Info ── */}
            <span className="addbook-section-label">📖 Book Information</span>

            {/* Title */}
            <div className="addbook-group addbook-full">
              <label className="addbook-label" htmlFor="ab-title">Book Title *</label>
              <input
                id="ab-title"
                type="text"
                className="addbook-input"
                placeholder="e.g. The Great Gatsby"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="addbook-error">⚠ {errors.title.message}</span>
              )}
            </div>

            {/* Author */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-author">Author *</label>
              <input
                id="ab-author"
                type="text"
                className="addbook-input"
                placeholder="e.g. F. Scott Fitzgerald"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <span className="addbook-error">⚠ {errors.author.message}</span>
              )}
            </div>

            {/* Category */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-category">Category *</label>
              <select
                id="ab-category"
                className="addbook-select"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <span className="addbook-error">⚠ {errors.category.message}</span>
              )}
            </div>

            {/* ISBN */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-isbn">ISBN *</label>
              <input
                id="ab-isbn"
                type="text"
                className="addbook-input"
                placeholder="e.g. 978-3-16-148410-0"
                {...register("isbn", { required: "ISBN is required" })}
              />
              {errors.isbn && (
                <span className="addbook-error">⚠ {errors.isbn.message}</span>
              )}
            </div>

            {/* Publisher */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-publisher">Publisher</label>
              <input
                id="ab-publisher"
                type="text"
                className="addbook-input"
                placeholder="e.g. Penguin Books"
                {...register("publisher")}
              />
            </div>

            {/* Publication Year */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-year">Publication Year</label>
              <input
                id="ab-year"
                type="number"
                className="addbook-input"
                placeholder="e.g. 2023"
                min="1000"
                max={new Date().getFullYear()}
                {...register("publicationYear", {
                  min: { value: 1000, message: "Enter a valid year" },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Year cannot be in the future",
                  },
                })}
              />
              {errors.publicationYear && (
                <span className="addbook-error">⚠ {errors.publicationYear.message}</span>
              )}
            </div>

            {/* Divider */}
            <div className="addbook-divider" />
            <span className="addbook-section-label">📦 Inventory & Pricing</span>

            {/* Total Copies */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-copies">Total Copies *</label>
              <input
                id="ab-copies"
                type="number"
                className="addbook-input"
                placeholder="e.g. 5"
                {...register("totalCopies", {
                  required: "Total copies is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.totalCopies && (
                <span className="addbook-error">⚠ {errors.totalCopies.message}</span>
              )}
            </div>

            {/* Price */}
            <div className="addbook-group">
              <label className="addbook-label" htmlFor="ab-price">Price (₹)</label>
              <input
                id="ab-price"
                type="number"
                step="0.01"
                className="addbook-input"
                placeholder="e.g. 299.00"
                {...register("price", {
                  min: { value: 0, message: "Price cannot be negative" },
                })}
              />
              {errors.price && (
                <span className="addbook-error">⚠ {errors.price.message}</span>
              )}
            </div>

            {/* Divider */}
            <div className="addbook-divider" />
            <span className="addbook-section-label">🖼 Cover & Description</span>

            {/* Cover Image */}
            <div className="addbook-group addbook-full">
              <label className="addbook-label">Book Cover Image</label>
              <div className="addbook-file-wrap">
                <input
                  id="ab-cover"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="addbook-file-input"
                  {...register("coverImage")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : "");
                  }}
                />
                <label htmlFor="ab-cover" className="addbook-file-btn">
                  📎 Choose Image
                </label>
                <span className="addbook-file-name">
                  {fileName || "No file chosen — JPG, PNG accepted"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="addbook-group addbook-full">
              <label className="addbook-label" htmlFor="ab-desc">Description *</label>
              <textarea
                id="ab-desc"
                className="addbook-textarea"
                placeholder="Brief description of the book..."
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="addbook-error">⚠ {errors.description.message}</span>
              )}
            </div>

          </div>

          {/* ── Submit ── */}
          <div className="addbook-submit-wrap">
            <button
              id="ab-submit"
              type="submit"
              className="addbook-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner" />
                  Adding Book…
                </>
              ) : (
                <>✚ Add Book</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
