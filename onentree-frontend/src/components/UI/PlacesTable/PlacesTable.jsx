import { 
  Modal,
  Pagination, 
  Skeleton, 
} from "@mui/material";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlacesPaginationService } from "@/services/getPlacesPaginationService";
import { getPlacesSelectService } from "@/services/getPlacesSelectService";
import { deletePlaceService } from "@/services/deletePlaceService";
import { searchPlaceService } from "@/services/searchPlaceService";

import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import ButtonSupportBlueDark from "@/components/Common/Button/ButtonSupportBlueDark";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { Close } from "@mui/icons-material";

import { 
  PaginationWrapper, 
  StyledModalBox, 
  StyledModalHeader,
  StyledModalButtonGroup, 
  StyledModalDescription, 
  StyledModalTitle, 
} from "./PlacesTableStyle";

import PlacesLoadingTable from "./Children/PlacesLoadingTable";
import PlacesDefaultTable from "./Children/PlacesDefaultTable";
import PlacesSearchTable from "./Children/PlacesSearchTable";

const paginationStyle = {
  "& ul > li > button": {
    color: "var(--primary)",
  },

  "& .Mui-selected": {
    color: "var(--primary)",
    backgroundColor: "var(--atention-blue-02)"
  }
};

export default function PlacesTable(props) {
  const globalAlert = useContext(GlobalAlertContext);

  const [currentItemsLoading, setCurrentItemsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentSearchItems, setCurrentSearchItems] = useState([]);

  const { data: initialPlacesPageQuantity, isLoading: isInitialPagesQuantityLoading } = useQuery({
    queryFn: async () => {
      const { data } = await getPlacesSelectService({ id: true });
      return data.length;
    },
    queryKey: ["places-quantity-data"],
    retry: false
  });

  const { data: initialPlacesItems, isLoading: isInitialPlacesLoading } = useQuery({
    queryFn: async () => {
      return await getPlacesPaginationService({ queryKey: [0, 5]});
    },
    queryKey: ["places-inital-data"],
    retry: false
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const isItemOpen = Boolean(anchorEl);
  const [itemMenuData, setItemMenuData] = useState(null);

  const openPlaceOptions = (event, id, name) => {
    setAnchorEl(event.currentTarget);
    setItemMenuData({ id, name });
  }

  const closePlaceOptions = () => {
    setAnchorEl(null);
    setItemMenuData(null);
  }

  const handlePage = async (event, value) => {
    let currentOffsetValue = (value - 1);

    setCurrentItems([]);
    setCurrentSearchItems([]);
    setCurrentItemsLoading(true);
    props.setCurrentPage(value);

    let skip = currentOffsetValue == 0 ? 0 : 5;

    if (props.searchActivated) {
      const { data: placesPaginationItems } = await searchPlaceService(props.searchedName, currentOffsetValue * skip, 5);

      setCurrentSearchItems(placesPaginationItems);
      setCurrentItemsLoading(false);
    } else {

      const { data: placesPaginationItems } = await getPlacesPaginationService({
        queryKey: [currentOffsetValue * skip, 5] 
      });

      setCurrentItems(placesPaginationItems);
      setCurrentItemsLoading(false);
    } 

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

        handlePage(null, 1);

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
      setAnchorEl(null);
      setTimeout(() => {
        globalAlert.setIsErrorActivated(false);
      }, 5000);
    }
  }

  return (
    <>
      {props.searchActivated ? (
        <PlacesSearchTable 
          currentItems={currentSearchItems.length ? currentSearchItems : props.searchedEvents}
          openPlaceOptions={openPlaceOptions}
          closePlaceOptions={closePlaceOptions}
          isItemOpen={isItemOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          itemMenuData={itemMenuData}
          toggleDeleteModal={toggleDeleteModal}
        /> 
      ) : (
          <>
            {(!isInitialPlacesLoading && !currentItemsLoading) && initialPlacesItems ? (
              <PlacesDefaultTable 
                currentItems={currentItems.length ? currentItems : initialPlacesItems.data}
                openPlaceOptions={openPlaceOptions}
                closePlaceOptions={closePlaceOptions}
                isItemOpen={isItemOpen}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                itemMenuData={itemMenuData}
                toggleDeleteModal={toggleDeleteModal}
              />
            ) : (
                <PlacesLoadingTable />
              )} 
          </>
        )}

      {deletePlaceData ? (
        <Modal
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

      <PaginationWrapper>

        {isInitialPagesQuantityLoading ? (
          <Skeleton variant="rounded" sx={{ backgroundColor: "var(--on-primary)", width: "20%", height: "3vh" }}/>
        ) : (
            <>
              {props.searchedQuantity ? (
                <Pagination 
                  count={props.searchedQuantity > 0 ? Math.ceil(props.searchedQuantity / 5) : 0}
                  shape="rounded" 
                  page={props.currentPage}
                  onChange={handlePage}
                  sx={paginationStyle}
                />           
              ) : (
                  <>
                    <Pagination 
                      count={initialPlacesPageQuantity > 0 ? Math.ceil(initialPlacesPageQuantity / 5) : 0}
                      shape="rounded" 
                      page={props.currentPage}
                      onChange={handlePage}
                      sx={paginationStyle}
                    />
                  </>
                )}
            </>
          )}
      </PaginationWrapper>
    </>
  );
}
