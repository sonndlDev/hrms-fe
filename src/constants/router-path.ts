
import OverviewIcon from "../images/menu/overview.svg";
import OverviewActiveIcon from "../images/menu/overview-active.svg";
import MeetingIcon from "../images/menu/meeting.svg";
import MeetingActiveIcon from "../images/menu/meeting-active.svg";
import MessageIcon from "../images/menu/message.svg";
import MessageActiveIcon from "../images/menu/message-active.svg";
import ProjectIcon from "../images/menu/project.svg";
import ProjectActiveIcon from "../images/menu/project-active.svg";
import TicketIcon from "../images/menu/ticket.svg";
import TicketActiveIcon from "../images/menu/ticket-active.svg";
import EmployeeIcon from "../images/menu/employee.svg";
import EmployeeActiveIcon from "../images/menu/employee-active.svg";
import AttendanceIcon from "../images/menu/attendance.svg";
import AttendanceActiveIcon from "../images/menu/attendance-active.svg";
import NoticeIcon from "../images/menu/notice.svg";
import NoticeActiveIcon from "../images/menu/notice-active.svg";
import HrIcon from "../images/menu/hr.svg";
import HrActiveIcon from "../images/menu/hr-active.svg";
import OrganizationIcon from "../images/menu/org.svg";
import OrganizationActiveIcon from "../images/menu/org-active.svg";
import AccountIcon from "../images/menu/account.svg";
import AccountActiveIcon from "../images/menu/account-active.svg";
import SettingIcon from "../images/menu/setting.svg";
import SettingActiveIcon from "../images/menu/setting-active.svg";




// Define the type for a menu item
interface MenuItem {
  path: string;
  name: string;
  icon: string;
  iconActive: string;
  subItems: SubItem[];
}

// Define the type for a sub-item
interface SubItem {
  path: string;
  name: string;
  icon: string;
  iconActive: string;
}

// Define the type for the menu items object
type MenuItems = {
  [key: string]: MenuItem;
};


export const menuItems:MenuItems = {
  dashboard: {
    path: "/overview",
    name: "Overview",
    icon: OverviewIcon,
    iconActive: OverviewActiveIcon,
    subItems: [],
  },
  meeting: {
    path: "/meeting",
    name: "Meeting",
    icon: MeetingIcon,
    iconActive: MeetingActiveIcon,
    subItems: [],
  },
  message: {
    path: "/message",
    name: "Message",
    icon: MessageIcon,
    iconActive: MessageActiveIcon,
    subItems: [],
  },
  project: {
    path: "/project",
    name: "Project",
    icon: ProjectIcon,
    iconActive: ProjectActiveIcon,
    subItems: [],
  },
  ticket: {
    path: "/ticket",
    name: "Ticket",
    icon: TicketIcon,
    iconActive: TicketActiveIcon,
    subItems: [],
  },
  employee: {
    path: "/employee",
    name: "Employee",
    icon: EmployeeIcon,
    iconActive: EmployeeActiveIcon,
    subItems: [],
  },
  attendance: {
    path: "/attendance",
    name: "Attendance",
    icon: AttendanceIcon,
    iconActive: AttendanceActiveIcon,
    subItems: [],
  },
  notice: {
    path: "/notice",
    name: "Notice",
    icon: NoticeIcon,
    iconActive: NoticeActiveIcon,
    subItems: [],
  },
  hrTab: {
    path: "/hr",
    name: "HR Tab",
    icon: HrIcon,
    iconActive: HrActiveIcon,
    subItems: [],
  },
  organization: {
    path: "/organization",
    name: "Organization",
    icon: OrganizationIcon,
    iconActive: OrganizationActiveIcon,
    subItems: [],
  },
  account: {
    path: "/account",
    name: "Account",
    icon: AccountIcon,
    iconActive: AccountActiveIcon,
    subItems: [],
  },
  setting: {
    path: "/setting",
    name: "Setting",
    icon: SettingIcon,
    iconActive: SettingActiveIcon,
    subItems: [],
  },
  // calendar: {
  //   path: "/calendar",
  //   name: "出退勤管理",
  //   icon: "/resources/images/menu/mn-working.svg",
  //   iconActive: "/resources/images/menu/mn-working-active.svg",
  //   subItems: [
  //     {
  //       path: "/calendar/list",
  //       name: "出退勤アプリ",
  //       icon: "/resources/images/menu/mn-health.svg",
  //       iconActive: "/resources/images/menu/mn-health-active.svg",
  //     },
  //     {
  //       path: "/timekeeping/param",
  //       name: "管理・設定",
  //       icon: "/resources/images/menu/mn-health.svg",
  //       iconActive: "/resources/images/menu/mn-health-active.svg",
  //     },
  //   ],
  // },
};
