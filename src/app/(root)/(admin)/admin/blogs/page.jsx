"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminBlogStore } from "@/store/adminBlogStore";

// ─── Icons ──────────────────────────────────────────────
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ImageIcon = () => (
  <svg className="w-8 h-8 text-[#C0C0C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const ChevronLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

// ─── Delete Confirmation Modal ──────────────────────────
function DeleteModal({ blog, onConfirm, onCancel, deleting }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#262626]">Delete Blog Post</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-[#262626]">&quot;{blog?.title}&quot;</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onCancel}
              disabled={deleting}
              className="flex-1 px-5 py-3 rounded-xl border border-[#E5E7EB] text-[#4B5563] text-sm font-medium hover:bg-[#F9FAFB] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className="flex-1 px-5 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {deleting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Blog Form Modal ────────────────────────────────────
function BlogFormModal({ blog, onClose, onSave, saving }) {
  const [title, setTitle] = useState(blog?.title || "");
  const [author, setAuthor] = useState(blog?.author || "Praxis Team");
  const [category, setCategory] = useState(blog?.category || "General");
  const [date, setDate] = useState(blog?.date || new Date().toISOString().split("T")[0]);
  const [tags, setTags] = useState(blog?.tags?.join(", ") || "");
  const [content, setContent] = useState(blog?.content || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(blog?.image || null);
  const fileInputRef = useRef(null);
  const isEditing = !!blog;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!isEditing && !imageFile) return;

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("author", author.trim());
    formData.append("category", category.trim());
    formData.append("date", date);
    formData.append("tags", tags);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  const categories = ["General", "Technology", "Research", "Environment", "Health", "Education"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#F0F0F0]">
          <div>
            <h2 className="text-xl font-semibold text-[#262626] tracking-tight">
              {isEditing ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {isEditing ? "Update the blog post details below" : "Fill in the details to create a new blog post"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors text-[#9CA3AF] hover:text-[#262626]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-6">
            {/* Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                Cover Image {!isEditing && <span className="text-red-400">*</span>}
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer hover:border-[#33187F]/30 transition-colors group"
              >
                {imagePreview ? (
                  <div className="relative aspect-[21/9]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <ImageIcon />
                    <div className="text-center">
                      <p className="text-sm font-medium text-[#6B7280]">Click to upload cover image</p>
                      <p className="text-xs text-[#C0C0C0] mt-1">PNG, JPG, WebP up to 5MB</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
                required
                className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0]"
              />
            </div>

            {/* Author + Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name..."
                  className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date + Tags Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. health, technology, research"
                  className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0]"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                Content <span className="text-red-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                required
                rows={8}
                className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0] resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#F0F0F0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#4B5563] text-sm font-medium hover:bg-[#F9FAFB] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !title.trim() || (!isEditing && !imageFile)}
            className="px-8 py-3 rounded-xl bg-[#33187F] text-white text-sm font-medium hover:bg-[#2B1B8B] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#33187F]/20"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{isEditing ? "Updating..." : "Publishing..."}</span>
              </>
            ) : (
              <span>{isEditing ? "Update Post" : "Publish Post"}</span>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Admin Blogs Page ──────────────────────────────
export default function AdminBlogsPage() {
  const {
    blogs,
    pagination,
    loading,
    saving,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    clearError,
  } = useAdminBlogStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const searchTimeout = useRef(null);

  // Fetch blogs on mount and when search/page changes
  useEffect(() => {
    fetchBlogs({ search, page, limit: 10 });
  }, [page]);

  // Debounced search
  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setPage(1);
        fetchBlogs({ search: value, page: 1, limit: 10 });
      }, 400);
    },
    [fetchBlogs]
  );

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Create
  const handleCreate = async (formData) => {
    const result = await createBlog(formData);
    if (result.success) {
      setShowForm(false);
      showToast("Blog post published successfully!");
    } else {
      showToast(result.message || "Failed to create blog", "error");
    }
  };

  // Update
  const handleUpdate = async (formData) => {
    const result = await updateBlog(editingBlog._id, formData);
    if (result.success) {
      setEditingBlog(null);
      showToast("Blog post updated successfully!");
    } else {
      showToast(result.message || "Failed to update blog", "error");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deletingBlog) return;
    setIsDeleting(true);
    const result = await deleteBlog(deletingBlog._id);
    setIsDeleting(false);
    if (result.success) {
      setDeletingBlog(null);
      showToast("Blog post deleted successfully!");
    } else {
      showToast(result.message || "Failed to delete blog", "error");
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-[60] px-6 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
              toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-[#10B981] text-white"
            }`}
          >
            {toast.type === "error" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-medium text-[#262626] tracking-tight">Blog Posts</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Manage your blog content — {pagination?.total || 0} total posts
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setEditingBlog(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#33187F] text-white rounded-xl text-sm font-medium hover:bg-[#2B1B8B] transition-all shadow-lg shadow-[#33187F]/20"
        >
          <PlusIcon />
          New Post
        </motion.button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full bg-white border border-[#F0F0F0] rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/15 focus:border-transparent transition-all text-sm text-[#262626] placeholder:text-[#C0C0C0]"
          />
        </div>
      </motion.div>

      {/* Blog Table / Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_140px_120px_120px_100px] gap-4 px-6 py-4 border-b border-[#F8F8F8] text-[10px] font-bold text-[#C0C0C0] uppercase tracking-[0.15em]">
          <span>Blog Post</span>
          <span>Category</span>
          <span>Author</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
              <span className="text-xs text-[#9CA3AF] font-medium">Loading blogs...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#D1D5DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V8m2 12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#6B7280]">
                {search ? "No blogs found" : "No blog posts yet"}
              </p>
              <p className="text-xs text-[#C0C0C0] mt-1">
                {search ? "Try a different search term" : "Create your first blog post to get started"}
              </p>
            </div>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-[#33187F] text-white rounded-xl text-xs font-medium hover:bg-[#2B1B8B] transition-all"
              >
                <PlusIcon />
                Create Post
              </button>
            )}
          </div>
        )}

        {/* Blog Rows */}
        {!loading &&
          blogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px_120px_100px] gap-3 md:gap-4 px-6 py-4 border-b border-[#F8F8F8] hover:bg-[#FCFCFC] transition-colors items-center group"
            >
              {/* Blog Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 md:w-12 md:h-12 rounded-xl overflow-hidden bg-[#F3F4F6] shrink-0 relative">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#262626] truncate">{blog.title}</p>
                  {blog.tags?.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F0EBFF] text-[#33187F] px-2 py-0.5 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="text-[10px] text-[#9CA3AF]">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="hidden md:block">
                <span className="text-xs font-medium text-[#4B5563] bg-[#F3F4F6] px-3 py-1.5 rounded-lg">
                  {blog.category || "General"}
                </span>
              </div>

              {/* Author */}
              <span className="hidden md:block text-xs text-[#6B7280] truncate">
                {blog.author}
              </span>

              {/* Date */}
              <span className="hidden md:block text-xs text-[#9CA3AF]">
                {formatDate(blog.date || blog.createdAt)}
              </span>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => {
                    setEditingBlog(blog);
                    setShowForm(true);
                  }}
                  className="p-2.5 rounded-xl text-[#9CA3AF] hover:text-[#33187F] hover:bg-[#F0EBFF] transition-all"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => setDeletingBlog(blog)}
                  className="p-2.5 rounded-xl text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Delete"
                >
                  <TrashIcon />
                </button>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-6"
        >
          <p className="text-xs text-[#9CA3AF]">
            Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2.5 rounded-xl border border-[#F0F0F0] text-[#6B7280] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <React.Fragment key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="text-xs text-[#C0C0C0] px-1">...</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-xs font-medium transition-all ${
                      p === page
                        ? "bg-[#33187F] text-white shadow-md"
                        : "text-[#6B7280] hover:bg-[#F9FAFB] border border-[#F0F0F0]"
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="p-2.5 rounded-xl border border-[#F0F0F0] text-[#6B7280] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showForm && (
          <BlogFormModal
            blog={editingBlog}
            saving={saving}
            onClose={() => {
              setShowForm(false);
              setEditingBlog(null);
            }}
            onSave={editingBlog ? handleUpdate : handleCreate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingBlog && (
          <DeleteModal
            blog={deletingBlog}
            deleting={isDeleting}
            onCancel={() => setDeletingBlog(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
