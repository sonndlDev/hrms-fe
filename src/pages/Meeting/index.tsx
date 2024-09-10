import React, { useEffect } from "react";
import HeaderMeeting from "./Header";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../store";
import CardMeeting from "./components/CardMeeting";
import Loading from "../../components/loading";

const MeetingsCpn = () => {
  const { fetchMeetings, startMeetings, meetings, loading, error } = useStore(
    useShallow((state) => ({
      fetchMeetings: state.fetchMeetings,
      meetings: state.meetings,
      startMeetings: state.startMeetings,
      loading: state.loading,
      error: state.error,
    }))
  );
  console.log("🚀 ~ useShallow ~ meetings:", meetings);

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="page-meeting">
      <HeaderMeeting />
      {!loading ? (
        meetings.map((item, index) => (
          <CardMeeting key={index} item={item} startMeetings={startMeetings} />
        ))
      ) : (
        // <p>dđ</p>
        <Loading />
      )}
    </div>
  );
};

export default MeetingsCpn;
