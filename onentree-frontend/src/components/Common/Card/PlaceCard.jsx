import { useState } from "react";
import { PlaceCardItem, PlaceCardWrapper, StyledMenu, StyledMenuItem } from "./PlaceCardStyle";
import { StyledMoreVert } from "./PlaceCardStyle";
import { useNavigate } from "react-router-dom";

export default function PlaceCard({
  id,
  name, 
  address, 
  inputs, 
  disabled, 
  empty, 
  toggleDeleteModal
}) {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isItemOpen = Boolean(anchorEl);

  const openPlaceOptions = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closePlaceOptions = () => {
    setAnchorEl(null);
  }

  return (
    <PlaceCardWrapper disabled={disabled}>
      <PlaceCardItem>{name}</PlaceCardItem>
      <PlaceCardItem>{address}</PlaceCardItem>
      <PlaceCardItem>{inputs}</PlaceCardItem>

      <StyledMoreVert 
        empty={empty} 
        onClick={(e) => openPlaceOptions(e)}
      />

      <StyledMenu disableScrollLock={true} anchorEl={anchorEl} open={isItemOpen} onClose={closePlaceOptions}>
        <StyledMenuItem onClick={() => { 
          setAnchorEl(null);
          navigate(`/places/edit/${id}`);
        }}>Editar</StyledMenuItem>
        <StyledMenuItem onClick={() => { 
          setAnchorEl(null);
          toggleDeleteModal(id, name) 
        }}>Apagar</StyledMenuItem>
      </StyledMenu>

    </PlaceCardWrapper>
  );
}
