
import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [wasChanged, setWasChanged] = useState(false);

  const defaultBackground = {
    backgroundColor: "var(--on-surface-02)",
    backgroundImage: "url(background-home.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "80% 10%",
    animation: "animatedBackground 2s"
  }

  const blueBackground = {
    backgroundColor: "var(--on-surface-02)"
  }

  return (
    <ThemeContext.Provider value={{ defaultBackground, blueBackground, wasChanged, setWasChanged }}>
      {children}
    </ThemeContext.Provider>
  )

};

export default ThemeContext;
