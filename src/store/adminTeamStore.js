import api from "@/lib/api";
import { create } from "zustand";

export const useAdminTeamStore = create((set, get) => ({
    teams: [],
    currentTeamMember: null,
    pagination: null,
    loading: false,
    saving: false,
    error: null,

    fetchTeams: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/teams", { params });
            set({
                teams: response.data.teams,
                pagination: response.data.pagination,
                loading: false,
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch team members";
            set({ error: message, loading: false });
        }
    },

    fetchTeamMemberById: async (id) => {
        set({ loading: true, error: null, currentTeamMember: null });
        try {
            const response = await api.get(`/admin/teams/${id}`);
            set({ currentTeamMember: response.data, loading: false });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch team member";
            set({ error: message, loading: false });
            return null;
        }
    },

    createTeamMember: async (formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.post("/admin/teams", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const newMember = response.data;
            set((state) => ({
                teams: [newMember, ...state.teams],
                saving: false,
            }));
            return { success: true, teamMember: newMember };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create team member";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    updateTeamMember: async (id, formData) => {
        set({ saving: true, error: null });
        try {
            const response = await api.put(`/admin/teams/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedMember = response.data;
            set((state) => ({
                teams: state.teams.map((t) =>
                    t._id === id ? updatedMember : t
                ),
                saving: false,
            }));
            return { success: true, teamMember: updatedMember };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update team member";
            set({ error: message, saving: false });
            return { success: false, message };
        }
    },

    deleteTeamMember: async (id) => {
        set({ error: null });
        try {
            await api.delete(`/admin/teams/${id}`);
            set((state) => ({
                teams: state.teams.filter((t) => t._id !== id),
            }));
            return { success: true };
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete team member";
            set({ error: message });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null }),
}));
