import api from "@/lib/api";
import { create } from "zustand";


export const useUserBlogStore = create((set) => ({
    blogs: [],
    currentBlog: null,
    recentBlogs: [],
    pagination: null,
    loading: false,
    error: null,

    fetchBlogs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/user/blogs", { params });
            set({
                blogs: response.data.blogs,
                pagination: response.data.pagination,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch blogs";
            set({ error: message, loading: false });
        }
    },

    fetchBlogBySlug: async (slug) => {
        set({ loading: true, error: null, currentBlog: null });
        try {
            const response = await api.get(`/user/blogs/${slug}`);
            set({
                currentBlog: response.data.blog,
                recentBlogs: response.data.recentBlogs,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch blog details";
            set({ error: message, loading: false });
        }
    }
}));
