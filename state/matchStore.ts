import { create } from 'zustand';
import { MatchSettings, Restaurant } from '@/types/global';

interface MatchStore {
    matchSettings: MatchSettings | null;
    restaurants: Restaurant[];
    setMatchSettings: (settings: MatchSettings) => void;
    setRestaurants: (restaurants: Restaurant[]) => void;
    clearRestaurants: () => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    matchSettings: null,
    restaurants: [],
    setMatchSettings: (settings) => set({ matchSettings: settings }),
    setRestaurants: (restaurants) => set({ restaurants }),
    clearRestaurants: () => set({ restaurants: [] }),
}));