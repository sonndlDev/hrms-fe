import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { lightTheme, darkTheme } from "../utils/theme";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("theme", false);

  useEffect(() => {
    const body = document.body;

    // Add the default classes to the body
    body.className =
      "m-0 font-sans text-base antialiased font-normal leading-default";

    // Apply the dark mode or light mode classes
    if (isDarkMode) {
      body.classList.add("bg-gray-900", "text-slate-100", "dark-mode"); // Dark mode classes
      body.classList.remove("bg-gray-50", "text-slate-500", "light-mode");
    } else {
      body.classList.add("bg-gray-50", "text-slate-500"); // Light mode classes
      body.classList.remove("bg-gray-900", "text-slate-100");
    }
  }, [isDarkMode]);

  const setDarkMode = () => setIsDarkMode(true);
  const setLightMode = () => setIsDarkMode(false);

  return {
    isDarkMode,
    setDarkMode,
    setLightMode,
    theme: isDarkMode ? darkTheme : lightTheme,
  };
};

export default useDarkMode;
