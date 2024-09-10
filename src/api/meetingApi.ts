import axiosInstance from "../utils/axiosConfig";

// Define a more specific type for participants if needed
interface MeetingRecord {
    _id: string;
    name: string;
    host: string;
    participants: string[]; // Change to an array of strings if participants are IDs
    date: string;
    status: string;
}

// Define a more specific type for the meetingData parameter
interface StartMeetingData {
    participants: string[]; // Change to match your data structure
}

export const fetchMeetings = async (): Promise<MeetingRecord[]> => {
    const response = await axiosInstance.get('/meeting');
    return response.data;
};

export const startMeetings = async (id: string, meetingData: StartMeetingData) => {
    const response = await axiosInstance.post(`/meeting/${id}/start`, meetingData);
    return response.data;
};
