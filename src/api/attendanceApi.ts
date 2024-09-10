import axiosInstance from "../utils/axiosConfig";

interface AttendanceRecord {
  _id: string;
  date: string;
  status: string;
}

export const fetchAttendances = async (): Promise<AttendanceRecord[]> => {
  const response = await axiosInstance.get('/api/attendance');
  return response.data;
};

export const markAttendance = async (attendanceData: { date: string; status: string }): Promise<AttendanceRecord> => {
  const response = await axiosInstance.post('/api/attendance', attendanceData);
  return response.data;
};
