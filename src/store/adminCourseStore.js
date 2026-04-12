import api from "@/lib/api";
import { create } from "zustand";

export const useAdminCourseStore = create((set, get) => ({
    courses: [],
    currentCourse: null,
    pagination: null,
    loading: false,
    saving: false,
    error: null,

    fetchCourses: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/courses", { params });
            set({
                courses: response.data.courses,
                pagination: response.data.pagination,
                loading: false,
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch courses";
            set({ error: message, loading: false });
        }
    },

    fetchCourseById: async (id) => {
        set({ loading: true, error: null, currentCourse: null });
        try {
            const response = await api.get(`/admin/courses/${id}`);
            set({ currentCourse: response.data, loading: false });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch course";
            set({ error: message, loading: false });
            return null;
        }
    },

    createCourse: async (formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.post("/admin/courses", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const newCourse = response.data;
            set((state) => ({
                courses: [newCourse, ...state.courses],
                saving: false,
            }));
            return { success: true, course: newCourse };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create course";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    updateCourse: async (id, formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.put(`/admin/courses/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedCourse = response.data;
            set((state) => ({
                courses: state.courses.map((c) =>
                    c._id === id ? updatedCourse : c
                ),
                saving: false,
            }));
            return { success: true, course: updatedCourse };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update course";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    deleteCourse: async (id) => {
        set({ error: null });
        try {
            await api.delete(`/admin/courses/${id}`);
            set((state) => ({
                courses: state.courses.filter((c) => c._id !== id),
            }));
            return { success: true };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete course";
            set({ error: message });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null }),
}));
