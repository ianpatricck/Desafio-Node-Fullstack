import ThemeContext from "@/context/ThemeContext";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { EventsMainWrapper } from "./EventsStyle";

export default function Events() {

  const { setWasChanged } = useContext(ThemeContext);

  useEffect(() => {
    setWasChanged(true);
  }, [setWasChanged]);

  return (
    <EventsMainWrapper>
      <Outlet />
    </EventsMainWrapper>
  )
}
