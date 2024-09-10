import { StateCreator } from "zustand";
import { fetchAttendances, markAttendance } from "../api/attendanceApi";

interface AttendanceRecord {
  _id: string;
  date: string;
  status: string;
}

interface AttendanceState {
  attendances: AttendanceRecord[];
  loading: boolean;
  error: string | null;
}

interface AttendanceActions {
  fetchAttendances: () => Promise<void>;
  markAttendance: (attendanceData: { date: string; status: string }) => Promise<void>;
}

export type AttendanceSlice = AttendanceState & AttendanceActions;

export const createAttendanceSlice: StateCreator<
  AttendanceSlice,
  [["zustand/immer", never]],
  [],
  AttendanceSlice
> = (set) => ({
  attendances: [],
  loading: false,
  error: null,

  fetchAttendances: async () => {
    try {
      set({ loading: true, error: null });
      const attendances = await fetchAttendances();
      set({ attendances, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  markAttendance: async (attendanceData) => {
    try {
      set({ loading: true, error: null });
      const newAttendance = await markAttendance(attendanceData);
      set((state) => ({
        attendances: [...state.attendances, newAttendance],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
});
