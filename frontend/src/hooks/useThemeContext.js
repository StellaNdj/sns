import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if(!context) {
    throw Error('useThemeContext must be used within a provider')
  }

  return context
}
