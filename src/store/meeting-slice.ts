import { StateCreator } from 'zustand';
import { fetchMeetings, startMeetings } from '../api/meetingApi';


  
  interface MeetingState {
    meetings: MeetingRecord[];
    loading: boolean;
    error: string | null;
  }

  
  interface MeetingRecord {
    _id: string;
    name: string;
    host: string;
    participants: string[]; // Change to an array of strings if participants are IDs
    date: string;
    status: string;
}
  
  interface MeetingActions {
    fetchMeetings: () => Promise<void>;
    startMeetings: (id: string, meetingData: {participants: string[];}) => Promise<void>;
    
  }

export type MeetingSlice = MeetingState & MeetingActions;

export const createMeetingSlice: StateCreator<
  MeetingSlice,
  [["zustand/immer", never]],
  [],
  MeetingSlice
> = (set) => ({
  meetings: [],
  loading: false,
  error: null,
  fetchMeetings: async () => {
    try {
      set({ loading: true, error: null });
      const meetings = await fetchMeetings();
      set({ meetings, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  startMeetings: async (id, meetingData) => {
    try {
      set({ loading: true, error: null });
      await startMeetings(id, meetingData);
      set((state) => ({
        meetings: [...state.meetings],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
});

