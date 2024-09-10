import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./user-slice";
import { createAttendanceSlice, AttendanceSlice } from "./attendance-slice"; 
import { createMeetingSlice, MeetingSlice } from "./meeting-slice";

type Store = AuthSlice & AttendanceSlice & MeetingSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createAuthSlice(...a),        // Auth slice
          ...createAttendanceSlice(...a),  // Attendance slice
          ...createMeetingSlice(...a),  // Attendance slice
        }))
      ),
      {
        name: "local-storage", // Configuration for persist middleware
      }
    )
  )
);
