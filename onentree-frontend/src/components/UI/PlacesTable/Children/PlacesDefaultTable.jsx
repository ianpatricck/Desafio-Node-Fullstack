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
} from "../PlacesTableStyle";

export default function PlacesDefaultTable({
  currentItems,
  openPlaceOptions,
  closePlaceOptions,
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
      <StyledTable aria-label="places table" sx={{ minWidth: 1200 }}>
        <TableHead>
          {currentItems.length ? (
            <StyledTableRowHead>
              <StyledTableHeadCell align="left">Nome do Local</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Endereço</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Cidade e Estado</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Portões cadastrados</StyledTableHeadCell>
              <StyledTableHeadCell align="left">Atualização</StyledTableHeadCell>
            </StyledTableRowHead>
          ) : (
              <StyledTableRowHead>
                <StyledTableHeadCell align="left">Não há locais cadastrados</StyledTableHeadCell>
              </StyledTableRowHead>
            )}
        </TableHead>
        <TableBody>
          {currentItems.map((row, key) => (
            <StyledTableRow key={key}>

              <StyledTableCell>{row.name}</StyledTableCell> 
              <NoWrapTableCell>{row.address}</NoWrapTableCell>
              <StyledTableCell>{row.city}; {row.state}</StyledTableCell>
              <StyledTableCell>{row.inputs}</StyledTableCell>
              <StyledTableCell>{row.updated_at}</StyledTableCell> 
              <StyledTableCell onClick={(e) => openPlaceOptions(e, row.id, row.name)}>
                <StyledMoreVert />
              </StyledTableCell>

              <StyledMenu anchorEl={anchorEl} open={isItemOpen} onClose={closePlaceOptions}>
                <StyledMenuItem onClick={() => { 
                  setAnchorEl(null);
                  navigate(`/places/edit/${itemMenuData.id}`);
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

