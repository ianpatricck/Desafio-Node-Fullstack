import { useContext, useEffect } from "react";
import ThemeContext from "@/context/ThemeContext";
import { PlacesMainWrapper } from "./PlacesStyle";
import { Outlet } from "react-router-dom";

export default function Places() {

  const { setWasChanged } = useContext(ThemeContext);

  useEffect(() => {
    setWasChanged(true);
  }, [setWasChanged]);

  return (
    <PlacesMainWrapper>
      <Outlet />
    </PlacesMainWrapper>
  )
}
