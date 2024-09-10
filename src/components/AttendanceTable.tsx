import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store";

const AttendanceTable: React.FC = () => {
  const { attendances, fetchAttendances } = useStore(
    useShallow((state) => ({
      attendances: state.attendances,
      fetchAttendances: state.fetchAttendances,
    }))
  );

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {attendances.map((attendance: any) => (
          <tr key={attendance._id}>
            <td className="border px-4 py-2">{attendance.date}</td>
            <td className="border px-4 py-2">{attendance.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
