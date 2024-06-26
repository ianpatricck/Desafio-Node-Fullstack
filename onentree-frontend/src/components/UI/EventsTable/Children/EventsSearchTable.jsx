import { 
  Paper, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { 
  EmptyTableCell,
  NoWrapTableCell, 
  StyledMenu, 
  StyledMenuItem, 
  StyledMoreVert, 
  StyledTable, 
  StyledTableCell, 
  StyledTableHeadCell, 
  StyledTableRow, 
  StyledTableRowHead 
} from "../EventsTableStyle";

export default function EventsSearchTable({
  currentItems,
  openEventOptions,
  closeEventOptions,
  isItemOpen,
  anchorEl,
  setAnchorEl,
  itemMenuData,
  toggleDeleteModal,
}) {

  const navigate = useNavigate();

  const showEmptyTableCells = () => {

    const content = [];

    for (let index = 0; index < (5 - currentItems.length); index++) {
      content.push(
        <TableRow key={index}>
          <EmptyTableCell></EmptyTableCell>
          <EmptyTableCell></EmptyTableCell>
          <EmptyTableCell></EmptyTableCell>
          <EmptyTableCell></EmptyTableCell>
          <EmptyTableCell></EmptyTableCell>
          <EmptyTableCell>
            <StyledMoreVert className="transparent"/>
          </EmptyTableCell>
        </TableRow>
      );
    }

    return content;
  }

  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <StyledTable aria-label="events table" sx={{ minWidth: 1200 }}>
        <TableHead>
          {currentItems.length ? (
            <StyledTableRowHead>
              <StyledTableHeadCell align="left">Evento</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Tipo</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Local associado</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Endereço</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Portões cadastrados</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Data</StyledTableHeadCell>
            </StyledTableRowHead>
          ) : null}
        </TableHead>
        <TableBody>
          {currentItems.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{row.name}</StyledTableCell> 
              <StyledTableCell><b className={row.type.name.toLowerCase()}>{row.type.name}</b></StyledTableCell> 
              <StyledTableCell>{row.place.name}</StyledTableCell>
              <NoWrapTableCell>{row.place.address}</NoWrapTableCell>
              <StyledTableCell>{row.place.inputs}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell> 
              <StyledTableCell onClick={(e) => openEventOptions(e, row.id, row.name)}><StyledMoreVert /></StyledTableCell>

              <StyledMenu anchorEl={anchorEl} open={isItemOpen} onClose={closeEventOptions}>
                <StyledMenuItem onClick={() => { 
                  setAnchorEl(null);
                  navigate(`/events/edit/${itemMenuData.id}`);
                }}>Editar</StyledMenuItem>
                <StyledMenuItem onClick={() => toggleDeleteModal(itemMenuData.id, itemMenuData.name)}>Apagar</StyledMenuItem>
              </StyledMenu>
            </StyledTableRow>
          ))}

          {currentItems.length < 5 ? showEmptyTableCells() : null}  
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

