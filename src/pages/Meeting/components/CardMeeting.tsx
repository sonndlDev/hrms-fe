import React from "react";
import { useNavigate } from "react-router-dom";

interface MeetingRecord {
  _id: string;
  name: string;
  host: string;
  participants: string[];
  date: string;
  status: string;
}

interface CardMeetingProps {
  item: MeetingRecord;
  startMeetings: (
    id: string,
    meetingData: { participants: string[] }
  ) => Promise<void>;
}
const CardMeeting: React.FC<CardMeetingProps> = ({ item, startMeetings }) => {
  const navigate = useNavigate();

  const handleJoinRoom = async (id: string) => {
    try {
      const participants = ["participant1", "participant2"];

      await startMeetings(item._id, { participants });
      // await startMeetings(id, {
      //   participants: ["john.doe@example.com", "alice@example.com"],
      // });
      navigate(`/video-call-room/${id}`);
    } catch (error) {}
  };
  return (
    <div>
      <p>{item.name}</p>
      <p onClick={() => handleJoinRoom(item._id)}>joinRoom</p>
    </div>
  );
};

export default CardMeeting;
