import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import SearchInput from "@/components/Common/Input/SearchInput";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import EventsTable from "@/components/UI/EventsTable/EventsTable";
import EventsLoadingTable from "@/components/UI/EventsTable/Children/EventsLoadingTable";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import debounce from "@/utils/debounce";
import { searchEventService } from "@/services/searchEventService";
import { useState } from "react";
import { 
  EventsMainDescription, 
  EventsMainHeader, 
  EventsMainHeaderWrapper, 
  EventsMainInfo, 
  EventsMainPresentation, 
  EventsMainTitle 
} from "./EventsMainStyle";

export default function EventsMain() {

  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 700px)");

  const [searchedName, setSearchedName] = useState("");
  const [isSearchedEventsLoading, setIsSearchedEventsLoading] = useState(false);
  const [searchActivated, setSearchActivated] = useState(false);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [searchedEventsQuantity, setSearchedEventsQuantity] = useState(0);
  const [searchedEventsMessage, setSearchedEventsMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchEvent = async (e) => {
    const { value } = e.target;
    const name = value.trim();
 
    if (name !== "") {
      setSearchedName(name);
      setSearchActivated(true);
      setIsSearchedEventsLoading(true);

      const { data: events } = await searchEventService(name, 0, 5);
      const { data: eventsQuantity } = await searchEventService(name, 0, "undefined");

      setSearchedEventsMessage(`${eventsQuantity.length} resultados encontrados para "${name}"`);
      setSearchedEvents(events);
      setSearchedEventsQuantity(eventsQuantity.length);
    } else {
      setCurrentPage(1);
      setSearchedName("");
      setSearchActivated(false);
      setSearchedEventsQuantity(0);
      setSearchedEventsMessage("");
    }

    setIsSearchedEventsLoading(false);
  }

  const handleSearchEventDebounce = debounce(handleSearchEvent);

  return (
    <>
      <EventsMainPresentation> 
        <PageBreadcrumb items={[
          {
            page: "Home",
            path: "/",
            isLastItem: false
          },
          {
            page: "Eventos",
            path: "/events",
            isLastItem: true
          }
        ]} />
      </EventsMainPresentation> 

      <EventsMainInfo>
        <EventsMainTitle>Eventos</EventsMainTitle>
        <EventsMainDescription>Confira a lista de todos os eventos cadastrados</EventsMainDescription>
      </EventsMainInfo>

      <EventsMainHeaderWrapper>
        <EventsMainHeader>
          <SearchInput 
            placeholder="Pesquise por nome do evento" 
            onChange={handleSearchEventDebounce}
          /> 
          <ButtonPrimary 
            text="Adicionar evento" 
            onClick={() => navigate("/events/add")}
            style={{ marginTop: matches ? "2rem" : 0}}
          />
        </EventsMainHeader>

        {isSearchedEventsLoading ? (
          <EventsLoadingTable />
        ) : (
            <>
              {searchActivated ? (
                <em style={{ 
                  color: "var(--primary)",
                  marginBottom: 20
                }}>{searchedEventsMessage}</em>
              ) : null}

              <EventsTable 
                searchActivated={searchActivated} 
                searchedName={searchedName}
                searchedEvents={searchedEvents}
                searchedQuantity={searchedEventsQuantity}

                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
      </EventsMainHeaderWrapper>
    </>
  );
}

