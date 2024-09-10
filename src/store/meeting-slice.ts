import { StateCreator } from 'zustand';
import { fetchMeetings, startMeetings } from '../api/meetingApi';

interface MeetingRecord {
    _id: string;
    name: string;
    host: string;
    participants: string;
    date: string;
    status: string;
  }
  
  interface MeetingState {
    meetings: MeetingRecord[];
    loading: boolean;
    error: string | null;
  }
  
  interface MeetingActions {
    fetchMeetings: () => Promise<void>;
    startMeetings: (id: string, meetingData: {participants: [];}) => Promise<void>;
    
  }

export type MeetingSlice = MeetingState & MeetingActions;

export const createMeetingSlice: StateCreator<
  MeetingSlice, // state + actions
  [["zustand/immer", never]], // using immer for immutable state updates
  [], // no additional enhancers
  MeetingSlice // the return type, which includes both state and actions
> = (set, get) => ({
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
          const meetingsStart = await startMeetings(id, meetingData);
          set((state) => ({
            meetings: [...state.meetings],
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
  
});
