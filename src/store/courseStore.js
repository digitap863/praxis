import axios from "axios";
import { create } from "zustand";

export const useCourseStore = create((set) => ({
    courses: [],
    currentCourse: null,
    otherCourses: [],
    loading: false,
    error: null,

    fetchCourses: async (limit = 10) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/user/courses?limit=${limit}`);
            set({ courses: response.data, loading: false });
        } catch (error) {
            set({ 
                error: error.response?.data || "Failed to fetch courses", 
                loading: false 
            });
        }
    },

    fetchCourseBySlug: async (slug) => {
        set({ loading: true, error: null, currentCourse: null });
        try {
            const response = await axios.get(`/api/user/courses/${slug}`);
            set({ 
                currentCourse: response.data.course, 
                otherCourses: response.data.otherCourses,
                loading: false 
            });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to fetch course detail", 
                loading: false 
            });
        }
    },
}));
