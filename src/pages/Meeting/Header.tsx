import React from "react";
import { useLocation, Link } from "react-router-dom";

const HeaderMeeting = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="page-meeting">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <Link
            to="/meeting"
            className={`inline-block p-[12px_18px] rounded-[16px] ${
              currentPath === "/meeting"
                ? "bg-active-menu text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
            aria-current={currentPath === "/meeting" ? "page" : undefined}
          >
            Meeting
          </Link>
        </li>
        <li className="me-2">
          <Link
            to="/meeting/room"
            className={`inline-block p-[12px_18px] rounded-[16px] ${
              currentPath === "/meeting/room"
                ? "bg-active-menu text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
            aria-current={currentPath === "/meeting/room" ? "page" : undefined}
          >
            Room
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMeeting;
