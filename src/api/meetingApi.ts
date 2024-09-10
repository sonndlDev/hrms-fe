import axiosInstance from "../utils/axiosConfig";

interface MeetingRecord {
    _id: string;
    name: string;
    host: string;
    participants: string;
    date: string;
    status: string;
  }

export const fetchMeetings = async (): Promise<MeetingRecord[]> => {
  const response = await axiosInstance.get('/meeting');
  return response.data;
};
export const startMeetings = async (id:any,meetingData: { participants: {} }) => {
  const response = await axiosInstance.post(`/meeting/${id}/start`, meetingData);
  return response.data;
};

