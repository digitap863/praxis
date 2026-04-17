"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminCourseStore } from "@/store/adminCourseStore";
import TiptapEditor from "@/components/admin/TiptapEditor";

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
function DeleteModal({ course, onConfirm, onCancel, deleting }) {
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
          <h3 className="text-xl font-semibold text-[#262626]">Delete Course</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-[#262626]">&quot;{course?.title}&quot;</span>? This action cannot be undone.
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

// ─── Course Form Modal ──────────────────────────────────
function CourseFormModal({ course, onClose, onSave, saving }) {
  const [title, setTitle] = useState(course?.title || "");
  const [smallDescription, setSmallDescription] = useState(course?.smallDescription || "General");
  const [content, setContent] = useState(course?.content || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(course?.image || null);
  const fileInputRef = useRef(null);
  const isEditing = !!course;

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
    formData.append("smallDescription", smallDescription.trim());
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

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
              {isEditing ? "Edit Course" : "New Course"}
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {isEditing ? "Update the course details below" : "Fill in the details to create a new course"}
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
                      <p className="text-sm font-medium text-[#6B7280]">Click to upload course cover</p>
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
                Course Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title..."
                required
                className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0]"
              />
            </div>

            {/* Small Description */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                Small Description / Category
              </label>
              <input
                type="text"
                value={smallDescription}
                onChange={(e) => setSmallDescription(e.target.value)}
                placeholder="e.g. Web Development, UI/UX..."
                className="w-full bg-[#FAFAFA] border border-transparent rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] text-sm placeholder:text-[#C0C0C0]"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                Full Content / Curriculum <span className="text-red-400">*</span>
              </label>
              <TiptapEditor 
                content={content} 
                onChange={setContent} 
                placeholder="Detail what this course covers..."
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
                <span>{isEditing ? "Updating..." : "Creating..."}</span>
              </>
            ) : (
              <span>{isEditing ? "Update Course" : "Create Course"}</span>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Admin Courses Page ────────────────────────────
export default function AdminCoursesPage() {
  const {
    courses,
    pagination,
    loading,
    saving,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    clearError,
  } = useAdminCourseStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const searchTimeout = useRef(null);

  // Fetch courses on mount and when page changes
  useEffect(() => {
    fetchCourses({ search, page, limit: 10 });
  }, [page]);

  // Debounced search
  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setPage(1);
        fetchCourses({ search: value, page: 1, limit: 10 });
      }, 400);
    },
    [fetchCourses]
  );

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Create
  const handleCreate = async (formData) => {
    const result = await createCourse(formData);
    if (result.success) {
      setShowForm(false);
      showToast("Course created successfully!");
    } else {
      showToast(result.message || "Failed to create course", "error");
    }
  };

  // Update
  const handleUpdate = async (formData) => {
    const result = await updateCourse(editingCourse._id, formData);
    if (result.success) {
      setEditingCourse(null);
      setShowForm(false);
      showToast("Course updated successfully!");
    } else {
      showToast(result.message || "Failed to update course", "error");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deletingCourse) return;
    setIsDeleting(true);
    const result = await deleteCourse(deletingCourse._id);
    setIsDeleting(false);
    if (result.success) {
      setDeletingCourse(null);
      showToast("Course deleted successfully!");
    } else {
      showToast(result.message || "Failed to delete course", "error");
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
          <h1 className="text-3xl font-medium text-[#262626] tracking-tight">Courses</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Manage your educational programs — {pagination?.total || 0} total courses
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#33187F] text-white rounded-xl text-sm font-medium hover:bg-[#2B1B8B] transition-all shadow-lg shadow-[#33187F]/20"
        >
          <PlusIcon />
          New Course
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
            placeholder="Search courses..."
            className="w-full bg-white border border-[#F0F0F0] rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/15 focus:border-transparent transition-all text-sm text-[#262626] placeholder:text-[#C0C0C0]"
          />
        </div>
      </motion.div>

      {/* Course Table / Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_200px_150px_100px] gap-4 px-6 py-4 border-b border-[#F8F8F8] text-[10px] font-bold text-[#C0C0C0] uppercase tracking-[0.15em]">
          <span>Course Title</span>
          <span>Category / Detail</span>
          <span>Created Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
              <span className="text-xs text-[#9CA3AF] font-medium">Loading courses...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#D1D5DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#6B7280]">
                {search ? "No courses found" : "No courses yet"}
              </p>
              <p className="text-xs text-[#C0C0C0] mt-1">
                {search ? "Try a different search term" : "Create your first course to get started"}
              </p>
            </div>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-[#33187F] text-white rounded-xl text-xs font-medium hover:bg-[#2B1B8B] transition-all"
              >
                <PlusIcon />
                New Course
              </button>
            )}
          </div>
        )}

        {/* Course Rows */}
        {!loading &&
          courses.map((course, idx) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_200px_150px_100px] gap-3 md:gap-4 px-6 py-4 border-b border-[#F8F8F8] hover:bg-[#FCFCFC] transition-colors items-center group"
            >
              {/* Course Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 md:w-12 md:h-12 rounded-xl overflow-hidden bg-[#F3F4F6] shrink-0 relative">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#262626] truncate">{course.title}</p>
                </div>
              </div>

              {/* smallDescription */}
              <div className="hidden md:block">
                <span className="text-xs font-medium text-[#4B5563] bg-[#F3F4F6] px-3 py-1.5 rounded-lg">
                  {course.smallDescription || "General"}
                </span>
              </div>

              {/* Created Date */}
              <div className="hidden md:block text-xs text-[#9CA3AF]">
                {new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setShowForm(true);
                  }}
                  className="p-2.5 rounded-xl text-[#9CA3AF] hover:text-[#33187F] hover:bg-[#F0EBFF] transition-all"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => setDeletingCourse(course)}
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
          <CourseFormModal
            course={editingCourse}
            saving={saving}
            onClose={() => {
              setShowForm(false);
              setEditingCourse(null);
            }}
            onSave={editingCourse ? handleUpdate : handleCreate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingCourse && (
          <DeleteModal
            course={deletingCourse}
            deleting={isDeleting}
            onCancel={() => setDeletingCourse(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
