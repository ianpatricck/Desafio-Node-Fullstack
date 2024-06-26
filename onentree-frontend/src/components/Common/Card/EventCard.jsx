import { useNavigate } from "react-router-dom";
import { EventCardItem, EventCardWrapper, StyledMoreVert } from "./EventCardStyle";
import { useState } from "react";
import { StyledMenu, StyledMenuItem } from "./PlaceCardStyle";

export default function EventCard({
  id,
  name, 
  type, 
  typecolor, 
  place, 
  disabled, 
  empty,
  toggleDeleteModal
}) {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isItemOpen = Boolean(anchorEl);

  const openEventOptions = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closeEventOptions = () => {
    setAnchorEl(null);
  }

  return (
    <EventCardWrapper disabled={disabled}>
      <EventCardItem>{name}</EventCardItem>
      <EventCardItem>
        <b className={typecolor}>{type}</b>
      </EventCardItem>
      <EventCardItem>{place}</EventCardItem>

      <StyledMoreVert 
        empty={empty} 
        onClick={(e) => openEventOptions(e)}
      />

      <StyledMenu disableScrollLock={true} anchorEl={anchorEl} open={isItemOpen} onClose={closeEventOptions}>
        <StyledMenuItem onClick={() => { 
          setAnchorEl(null);
          navigate(`/events/edit/${id}`);
        }}>Editar</StyledMenuItem>
        <StyledMenuItem onClick={() => { 
          setAnchorEl(null);
          toggleDeleteModal(id, name) 
        }}>Apagar</StyledMenuItem>
      </StyledMenu>

    </EventCardWrapper>
  );
}
