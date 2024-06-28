import "@/styles/index.css";
import Header from "@/components/Layout/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box, GlobalStyles, Slide } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "@/context/ThemeContext";
import Home from "@/components/Pages/Home/Home";
import Events from "@/components/Pages/Events/Events";
import Places from "@/components/Pages/Places/Places";
import AddPlace from "@/components/Layout/AddPlace/AddPlace";
import AddEvent from "@/components/Layout/AddEvent/AddEvent";
import EditPlace from "@/components/Layout/EditPlace/EditPlace";
import PlacesMain from "@/components/Layout/PlacesMain/PlacesMain";
import EventsMain from "@/components/Layout/EventsMain/EventsMain";
import EditEvent from "@/components/Layout/EditEvent/EditEvent";
import SuccessMessageCard from "@/components/Common/Card/SuccessMessageCard";
import ErrorMessageCard from "@/components/Common/Card/ErrorMessageCard";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import NotFound from "@/components/Pages/NotFound/NotFound";

export default function App() {

  const { defaultBackground, blueBackground, wasChanged } = useContext(ThemeContext);
  const globalAlert = useContext(GlobalAlertContext);

  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransistionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <div 
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <GlobalStyles 
        styles={{ 
          body: wasChanged ? blueBackground : defaultBackground 
        }} 
      />

      <Header />

      <Routes location={displayLocation}>
        <Route index element={<Home />} />

        <Route path="/events" element={<Events />}>
          <Route path="" element={<EventsMain />} />
          <Route path="add" element={<AddEvent />} />
          <Route path="edit/:id" element={<EditEvent />} />
        </Route>

        <Route path="/places" element={<Places />}>
          <Route path="" element={<PlacesMain />} />
          <Route path="add" element={<AddPlace />} />
          <Route path="edit/:id" element={<EditPlace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Slide direction="right" in={globalAlert.isSuccessActivated} mountOnEnter unmountOnExit>
        <Box sx={{
          position: "sticky",
          bottom: 80,
          marginLeft: 5
        }}>
          <SuccessMessageCard text={globalAlert.successMessage} />
        </Box>
      </Slide>

      <Slide direction="right" in={globalAlert.isErrorActivated} mountOnEnter unmountOnExit>
        <Box sx={{
          position: "sticky",
          bottom: 80,
          marginLeft: 5
        }}>
          <ErrorMessageCard text={globalAlert.errorMessage} />
        </Box>
      </Slide>
    </div>
  )
}

