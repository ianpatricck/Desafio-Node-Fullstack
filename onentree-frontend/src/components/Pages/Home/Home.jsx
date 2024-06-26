import WelcomeCard from "@/components/Common/Card/WelcomeCard";
import PlacesSection from "@/components/UI/PlacesSection/PlacesSection";
import EventsSection from "@/components/UI/EventsSection/EventsSection";
import { useContext, useEffect } from "react";
import ThemeContext from "@/context/ThemeContext";
import { HomeItems, HomeMain } from "./HomeStyle";

export default function Home() {

  const { setWasChanged } = useContext(ThemeContext);

  useEffect(() => {
    setWasChanged(false);
  }, [setWasChanged]);

  return (
    <HomeMain>
      <WelcomeCard />

      <HomeItems>
        <PlacesSection />
        <EventsSection />
      </HomeItems>
    </HomeMain>
  )
}

