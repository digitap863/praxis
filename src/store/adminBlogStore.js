import api from "@/lib/api";
import { create } from "zustand";

export const useAdminBlogStore = create((set, get) => ({
    blogs: [],
    currentBlog: null,
    pagination: null,
    loading: false,
    saving: false,
    error: null,

    fetchBlogs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/blogs", { params });
            set({
                blogs: response.data.blogs,
                pagination: response.data.pagination,
                loading: false,
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch blogs";
            set({ error: message, loading: false });
        }
    },

    fetchBlogById: async (id) => {
        set({ loading: true, error: null, currentBlog: null });
        try {
            const response = await api.get(`/admin/blogs/${id}`);
            set({ currentBlog: response.data, loading: false });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch blog";
            set({ error: message, loading: false });
            return null;
        }
    },

    createBlog: async (formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.post("/admin/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const newBlog = response.data;
            set((state) => ({
                blogs: [newBlog, ...state.blogs],
                saving: false,
            }));
            return { success: true, blog: newBlog };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create blog";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    updateBlog: async (id, formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.put(`/admin/blogs/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedBlog = response.data;
            set((state) => ({
                blogs: state.blogs.map((b) =>
                    b._id === id ? updatedBlog : b
                ),
                saving: false,
            }));
            return { success: true, blog: updatedBlog };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update blog";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    deleteBlog: async (id) => {
        set({ error: null });
        try {
            await api.delete(`/admin/blogs/${id}`);
            set((state) => ({
                blogs: state.blogs.filter((b) => b._id !== id),
            }));
            return { success: true };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete blog";
            set({ error: message });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null }),
}));
