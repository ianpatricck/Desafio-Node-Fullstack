import ButtonSupportBlue from "@/components/Common/Button/ButtonSupportBlue";
import ButtonSupportBlueDark from "@/components/Common/Button/ButtonSupportBlueDark";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { Close, LocalActivity } from "@mui/icons-material";
import EventCard from "@/components/Common/Card/EventCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventsLatestService } from "@/services/getEventsLatestService";
import { deleteEventService } from "@/services/deleteEventService";
import { Modal, Skeleton } from "@mui/material";
import { useState, useContext } from "react";
import { 
  EventNotFoundMessage,
  EventsCard, 
  EventsCardTop, 
  EventsDescription, 
  EventsLatestCard, 
  EventsLatestCardContent, 
  EventsLatestCardHeader, 
  EventsLatestCardLink, 
  EventsLatestCardTitle, 
  EventsLatestNotFoundCard, 
  EventsSectionWrapper, 
  EventsTitle, 
  StyledModalBox,
  StyledModalButtonGroup,
  StyledModalDescription,
  StyledModalHeader,
  StyledModalTitle
} from "./EventsSectionStyle";

export default function EventsSection() {
  const globalAlert = useContext(GlobalAlertContext);

  const navigate = useNavigate();

  const { data: eventsLatest, isLoading } = useQuery({
    queryFn: async () => {
      return await getEventsLatestService();
    },
    queryKey: ["events-latest-data"],
    retry: false
  });

  const showEmptyEventCards = () => {

    const content = [];

    for (let index = 0; index < (3 - eventsLatest.data.length); index++) {
      content.push(<EventCard key={index} disabled={true} empty="true" />);
    }

    return content;
  }

  const [deleteModal, setDeleteModal] = useState(false);  
  const [deleteEventData, setDeleteEventData] = useState(null);

  const toggleDeleteModal = (id, name) => {
    setDeleteEventData({ id, name });
    setDeleteModal(true);
  }

  const handleDeleteEvent = async (id) => {

    try {
      const response = await deleteEventService(id); 
      setDeleteModal(false);

      if (response.status == 200) {
        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage(`O local "${response.data.name}" foi apagado`);

        navigate("/");

        const { data: newEventsLatest } = await getEventsLatestService();
        eventsLatest.data = newEventsLatest;

        setTimeout(() => {
          globalAlert.setIsSuccessActivated(false);
        }, 5000);
      }  

    } catch (error) {
      const { response } = error;

      if (response) {
        setDeleteModal(false);

        globalAlert.setIsErrorActivated(true);
        globalAlert.setErrorMessage(response.data.message); 
      }

    } finally {
      setTimeout(() => {
        globalAlert.setIsErrorActivated(false);
      }, 5000);
    }
  }

  return (
    <EventsSectionWrapper>
      <EventsCard>
        <EventsCardTop>
          <EventsTitle>
            <LocalActivity sx={{ marginRight: ".6rem"}} fontSize="large" />
            Eventos
          </EventsTitle>
          <EventsDescription>Confira todos os eventos cadastrados!</EventsDescription>
        </EventsCardTop> 
        <ButtonSupportBlue text="Conferir eventos" onClick={() => navigate("/events")}/>
      </EventsCard>

      <EventsLatestCard>
        <EventsLatestCardHeader>
          <EventsLatestCardTitle>Últimos eventos adicionados</EventsLatestCardTitle>
          <EventsLatestCardLink to="/events">
            <span>Ver todos</span>
          </EventsLatestCardLink>
        </EventsLatestCardHeader>

        <EventsLatestCardContent>

          {!eventsLatest ||isLoading ? (
            <>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
            </>
          ) : (
              <>
                {eventsLatest && eventsLatest.data.length ? (
                  <>
                    {eventsLatest.data.map((event, index) => (
                      <EventCard 
                        id={event.id}
                        name={event.name}
                        type={event.type.name}
                        typecolor={event.type.name == "Show" ? "alert-support" : "support-blue"}
                        place={event.place.name}
                        disabled={index % 2 == 0 ? false : true}
                        key={event.id}
                        toggleDeleteModal={toggleDeleteModal}
                      /> 
                    ))}

                    {eventsLatest.data.length < 3 ? showEmptyEventCards() : null}

                  </>
                ) : (

                    <EventsLatestNotFoundCard>
                      <EventNotFoundMessage>Nenhum evento encontrado</EventNotFoundMessage>
                    </EventsLatestNotFoundCard>
                  )}
              </>
            )}

        </EventsLatestCardContent>
      </EventsLatestCard>

      {deleteEventData ? (
        <Modal
          disableScrollLock={true}
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
        >
          <StyledModalBox>
            <StyledModalHeader>
              <StyledModalTitle id="delete-modal-title">Apagar evento</StyledModalTitle>
              <Close 
                sx={{ color: "var(--primary)", cursor: "pointer" }} 
                onClick={() => setDeleteModal(false)}
              />
            </StyledModalHeader>
            <StyledModalDescription>
              Você tem certeza que deseja apagar o event "{deleteEventData.name}"? 
            </StyledModalDescription>
            <StyledModalButtonGroup>
              <ButtonTransparent text="Cancelar" onClick={() => setDeleteModal(false)} />
              <ButtonSupportBlueDark style={{ marginLeft: 10 }} text="Apagar" onClick={() => handleDeleteEvent(deleteEventData.id)} />
            </StyledModalButtonGroup>
          </StyledModalBox>
        </Modal>
      ) : null}

    </EventsSectionWrapper>
  );
}
