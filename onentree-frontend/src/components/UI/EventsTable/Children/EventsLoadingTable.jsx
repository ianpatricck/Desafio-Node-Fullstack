import { 
  Paper, 
  Skeleton, 
  TableBody, 
  TableContainer, 
  TableHead 
} from "@mui/material";

import { 
  StyledTable, 
  StyledTableCell, 
  StyledTableRow, 
  StyledTableRowHead 
} from "../EventsTableStyle";

export default function EventsLoadingTable() {

  const showSkeletonLoadingTableCells = () => {

    const content = [];

    for (let index = 0; index < 5; index++) {
      content.push(
        <StyledTableRow key={index}>
          <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
          <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
          <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
          <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
          <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
        </StyledTableRow>
      );
    }

    return content;
  }

  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <StyledTable aria-label="events table" sx={{ minWidth: 1200 }}>
        <TableHead>
          <StyledTableRowHead>
            <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
            <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
            <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
            <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
            <StyledTableCell><Skeleton variant="text" sx={{ fontSize: 24 }}/></StyledTableCell> 
          </StyledTableRowHead>
        </TableHead>
        <TableBody>
          <>
            {showSkeletonLoadingTableCells()}
          </>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

