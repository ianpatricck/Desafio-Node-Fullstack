import { 
  Modal,
  Pagination, 
  Skeleton, 
} from "@mui/material";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEventsPaginationService } from "@/services/getEventsPaginationService";
import { getEventsSelectService } from "@/services/getEventsSelectService";
import { deleteEventService } from "@/services/deleteEventService";
import { searchEventService } from "@/services/searchEventService";

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
} from "./EventsTableStyle";

import EventsLoadingTable from "./Children/EventsLoadingTable";
import EventsDefaultTable from "./Children/EventsDefaultTable";
import EventsSearchTable from "./Children/EventsSearchTable";

const paginationStyle = {
  "& ul > li > button": {
    color: "var(--primary)",
  },

  "& .Mui-selected": {
    color: "var(--primary)",
    backgroundColor: "var(--atention-blue-02)"
  }
};

export default function EventsTable(props) {
  const globalAlert = useContext(GlobalAlertContext);

  const [currentItemsLoading, setCurrentItemsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentSearchItems, setCurrentSearchItems] = useState([]);

  const { data: initialEventsPageQuantity, isLoading: isInitialPagesQuantityLoading } = useQuery({
    queryFn: async () => { 
      const { data } = await getEventsSelectService({ id: true });
      return data.length;
    },
    queryKey: ["events-quantity-data"],
    retry: false
  });

  const { data: initialEventsItems, isLoading: isInitialEventsLoading } = useQuery({
    queryFn: async () => {
      return await getEventsPaginationService({ queryKey: [0, 5]});
    },
    queryKey: ["events-inital-data"],
    retry: false
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const isItemOpen = Boolean(anchorEl);
  const [itemMenuData, setItemMenuData] = useState(null);

  const openEventOptions = (event, id, name) => {
    setAnchorEl(event.currentTarget);
    setItemMenuData({ id, name });
  }

  const closeEventOptions = () => {
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
      const { data: eventsPaginationItems } = await searchEventService(props.searchedName, currentOffsetValue * skip, 5);

      setCurrentSearchItems(eventsPaginationItems);
      setCurrentItemsLoading(false);

    } else {

      const { data: eventsPaginationItems } = await getEventsPaginationService({
        queryKey: [currentOffsetValue * skip, 5] 
      });

      setCurrentItems(eventsPaginationItems);
      setCurrentItemsLoading(false);
    }

  }

  const [deleteModal, setDeleteModal] = useState(false);  
  const [deleteEventData, setDeleteEventData] = useState(null);

  const toggleDeleteModal = (id, name) => {
    setDeleteEventData({ id, name });
    setDeleteModal(true);
  }

  const handleDeleteEvent = async (id) => {
    const response = await deleteEventService(id); 
    setDeleteModal(false);

    if (response.status == 200) {
      globalAlert.setIsSuccessActivated(true);
      globalAlert.setSuccessMessage(`O evento "${response.data.name}" foi apagado`);

      handlePage(null, 1);

      setAnchorEl(null);

      setTimeout(() => {
        globalAlert.setIsSuccessActivated(false);
      }, 5000);
    }
  }

  return (
    <>
      {props.searchActivated ? (
        <EventsSearchTable 
          currentItems={currentSearchItems.length ? currentSearchItems : props.searchedEvents}
          openEventOptions={openEventOptions}
          closeEventOptions={closeEventOptions}
          isItemOpen={isItemOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          itemMenuData={itemMenuData}
          toggleDeleteModal={toggleDeleteModal}
        /> 
      ) : (
          <>
            {!isInitialEventsLoading && !currentItemsLoading ? (
              <EventsDefaultTable 
                currentItems={currentItems.length ? currentItems : initialEventsItems.data}
                openEventOptions={openEventOptions}
                closeEventOptions={closeEventOptions}
                isItemOpen={isItemOpen}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                itemMenuData={itemMenuData}
                toggleDeleteModal={toggleDeleteModal}
              />
            ) : (
                <EventsLoadingTable />
              )} 
          </>
        )}

      {deleteEventData ? (
        <Modal
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
              Você tem certeza que deseja apagar o evento "{deleteEventData.name}"? 
            </StyledModalDescription>
            <StyledModalButtonGroup>
              <ButtonTransparent text="Cancelar" onClick={() => setDeleteModal(false)} />
              <ButtonSupportBlueDark style={{ marginLeft: 10 }} text="Apagar" onClick={() => handleDeleteEvent(deleteEventData.id)} />
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
                    count={initialEventsPageQuantity > 0 ? Math.ceil(initialEventsPageQuantity / 5) : 0}
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
