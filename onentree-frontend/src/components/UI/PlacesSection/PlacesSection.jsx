import ButtonSupportBlue from "@/components/Common/Button/ButtonSupportBlue";
import ButtonSupportBlueDark from "@/components/Common/Button/ButtonSupportBlueDark";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { Close, Festival } from "@mui/icons-material";
import PlaceCard from "@/components/Common/Card/PlaceCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlacesLatestService } from "@/services/getPlacesLatestService";
import { deletePlaceService } from "@/services/deletePlaceService";
import { Modal, Skeleton } from "@mui/material";
import { useState, useContext } from "react";

import { 
  PlaceNotFoundMessage,
  PlacesCard, 
  PlacesCardTop, 
  PlacesDescription, 
  PlacesLatestCard, 
  PlacesLatestCardContent, 
  PlacesLatestCardHeader, 
  PlacesLatestCardLink, 
  PlacesLatestCardTitle, 
  PlacesLatestNotFoundCard, 
  PlacesSectionWrapper, 
  PlacesTitle, 
  StyledModalBox,
  StyledModalButtonGroup,
  StyledModalDescription,
  StyledModalHeader,
  StyledModalTitle
} from "./PlacesSectionStyle";

export default function PlacesSection() {
  const globalAlert = useContext(GlobalAlertContext);

  const navigate = useNavigate();

  const { data: placesLatest, isLoading } = useQuery({
    queryFn: async () => {
      return await getPlacesLatestService();
    },
    queryKey: ["places-latest-data"],
    retry: true
  });

  const showEmptyPlaceCards = () => {

    const content = [];

    for (let index = 0; index < (3 - placesLatest.data.length); index++) {
      content.push(<PlaceCard key={index} disabled={true} empty="true" />);
    }

    return content;
  }

  const [deleteModal, setDeleteModal] = useState(false);  
  const [deletePlaceData, setDeletePlaceData] = useState(null);

  const toggleDeleteModal = (id, name) => {
    setDeletePlaceData({ id, name });
    setDeleteModal(true);
  }

  const handleDeletePlace = async (id) => {

    try {
      const response = await deletePlaceService(id); 
      setDeleteModal(false);

      if (response.status == 200) {
        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage(`O local "${response.data.name}" foi apagado`);

        navigate("/");

        const { data: newPlacesLatest } = await getPlacesLatestService();
        placesLatest.data = newPlacesLatest;


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
    <PlacesSectionWrapper>
      <PlacesCard>
        <PlacesCardTop>
          <PlacesTitle>
            <Festival sx={{ marginRight: ".6rem"}} fontSize="large" />
            Locais
          </PlacesTitle>
          <PlacesDescription>Confira todos os locais cadastrados!</PlacesDescription>
        </PlacesCardTop>  
        <ButtonSupportBlue text="Conferir locais" onClick={() => navigate("/places")} />
      </PlacesCard>

      <PlacesLatestCard>
        <PlacesLatestCardHeader>
          <PlacesLatestCardTitle>Últimos locais adicionados</PlacesLatestCardTitle>
          <PlacesLatestCardLink to="/places">
            <span>Ver todos</span>
          </PlacesLatestCardLink>
        </PlacesLatestCardHeader>

        <PlacesLatestCardContent>

          {!placesLatest || isLoading ? (
            <>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
              <Skeleton variant="text" sx={{ fontSize: "2.8rem" }}/>
            </>
          ) : (
              <>
                {placesLatest && placesLatest.data.length ? (
                  <>
                    {placesLatest.data.map((place, index) => (
                      <PlaceCard 
                        id={place.id}
                        name={place.name}
                        address={place.address}
                        inputs={place.inputs}
                        disabled={index % 2 == 0 ? false : true}
                        key={place.id}
                        toggleDeleteModal={toggleDeleteModal}
                      /> 
                    ))}

                    {placesLatest.data.length < 3 ? showEmptyPlaceCards() : null}

                  </> 
                ) : (
                    <PlacesLatestNotFoundCard>
                      <PlaceNotFoundMessage>Nenhum local encontrado</PlaceNotFoundMessage>
                    </PlacesLatestNotFoundCard>
                  )}
              </>
            )}

        </PlacesLatestCardContent>
      </PlacesLatestCard>


      {deletePlaceData ? (
        <Modal
          disableScrollLock={true}
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
        >
          <StyledModalBox>
            <StyledModalHeader>
              <StyledModalTitle id="delete-modal-title">Apagar local</StyledModalTitle>
              <Close 
                sx={{ color: "var(--primary)", cursor: "pointer" }} 
                onClick={() => setDeleteModal(false)}
              />
            </StyledModalHeader>
            <StyledModalDescription>
              Você tem certeza que deseja apagar o local "{deletePlaceData.name}"? 
            </StyledModalDescription>
            <StyledModalButtonGroup>
              <ButtonTransparent text="Cancelar" onClick={() => setDeleteModal(false)} />
              <ButtonSupportBlueDark style={{ marginLeft: 10 }} text="Apagar" onClick={() => handleDeletePlace(deletePlaceData.id)} />
            </StyledModalButtonGroup>
          </StyledModalBox>
        </Modal>
      ) : null}

    </PlacesSectionWrapper>
  );
}
