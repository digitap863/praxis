import axios from "axios";
import { create } from "zustand";

export const useTeamStore = create((set) => ({
    teams: [],
    loading: false,
    error: null,

    fetchTeams: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/user/teams");
            set({ teams: response.data, loading: false });
        } catch (error) {
            set({ 
                error: error.response?.data || "Failed to fetch team members", 
                loading: false 
            });
        }
    },
}));
