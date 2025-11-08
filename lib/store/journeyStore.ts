
import { create } from 'zustand';

interface JourneyStore {
  selectedWeek: number;
  activeTab: 'baby' | 'mom';
  setSelectedWeek: (week: number) => void;
  setActiveTab: (tab: 'baby' | 'mom') => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
  selectedWeek: 1,
  activeTab: 'baby',
  setSelectedWeek: (week) => set({ selectedWeek: week }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));