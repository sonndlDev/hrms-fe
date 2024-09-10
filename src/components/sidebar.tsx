import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../constants/router-path";
import classNames from "classnames";

export function SideBarCpn() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (key: string, path: string, hasSubItems: number) => {
    if (hasSubItems > 0) {
      setOpenMenu((prev) => (prev === key ? null : key));
    } else {
      setOpenMenu(null);
      navigate(path);
    }
  };

  // Function to check if the current path is active
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold">Sidebar</h1>
      </div>
      <nav>
        <ul>
          {Object.entries(menuItems).map(([key, item]) => (
            <li key={key} className="relative">
              <button
                className={classNames(
                  "flex items-center p-4 w-full text-left",
                  { "bg-gray-700 active": isActive(item.path) }
                )}
                onClick={() =>
                  handleMenuClick(key, item.path, item.subItems?.length)
                }
              >
                {item.subItems?.length > 0 && (
                  <img
                    src={isActive(item.path) ? item.iconActive : item.icon}
                    alt={item.name}
                    className="w-6 h-6 mr-3"
                  />
                )}

                {item.name}
                {item.subItems?.length > 0 && (
                  <svg
                    className={classNames(
                      "ml-auto w-4 h-4 transition-transform",
                      {
                        "rotate-180": openMenu === key,
                      }
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
              {item.subItems?.length > 0 && openMenu === key && (
                <ul className="pl-4">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className={classNames("flex items-center p-4", {
                          "bg-gray-700 activeChild": isActive(subItem.path),
                        })}
                      >
                        <img
                          src={
                            isActive(subItem.path)
                              ? subItem.iconActive
                              : subItem.icon
                          }
                          alt={subItem.name}
                          className="w-5 h-5 mr-3"
                        />
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
