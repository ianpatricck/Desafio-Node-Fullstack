import styled from "@emotion/styled";
import { MoreVert } from "@mui/icons-material";
import { Table, TableCell, TableRow, Menu, MenuItem, Box } from "@mui/material";

export const StyledTable = styled(Table)({
  backgroundColor: "var(--on-secondary)"
});

export const StyledTableRowHead = styled(TableRow)({
  backgroundColor: "transparent"
});

export const StyledTableRow = styled(TableRow)({
  backgroundColor: "transparent",

  "&:nth-of-type(odd)": {
    backgroundColor: "var(--on-primary)",
  }
});

export const StyledTableHeadCell = styled(TableCell)({
  border: 0,
  fontWeight: 800,
  color: "var(--on-support-blue)" 
});

export const StyledTableCell = styled(TableCell)({
  border: 0,
  color: "var(--primary)",

  ".futebol": {
    backgroundColor: 'var(--on-support-blue)',
    padding: '.4rem',
    color: 'var(--overlay)',
    borderRadius: '.3rem'
  },

  ".show": {
    backgroundColor: "var(--alert-support-02)",
    padding: ".4rem",
    color: "var(--secondary)",
    borderRadius: ".3rem",
  }

});

export const EmptyTableCell = styled(TableCell)({
  border: 0,
});

export const NoWrapTableCell = styled(TableCell)({
  border: 0,
  color: "var(--primary)",
  width: "24rem",
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap"
});

export const StyledMoreVert = styled(MoreVert)({
  cursor: "pointer",
  color: "var(--support-blue)",

  "&.transparent": {
    cursor: "default",
    color: "transparent",
  }

}); 

export const StyledMenu = styled(Menu)({

  "& .MuiMenu-paper": {
    backgroundColor: "transparent",
    borderRadius: 5,
    boxShadow: "none",
  },

  "& .MuiMenu-list": {
    backgroundColor: "var(--on-surface-02)",
    border: 0,
    borderRadius: 0,
    color: "var(--primary)",
    paddingRight: 20
  }
});

export const StyledMenuItem = styled(MenuItem)({});

export const StyledModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--on-primary)",
  padding: "1.2rem", 
  border: "none",
  borderRadius: ".4rem",
  width: "25vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  outline: 0,

  "@media screen and (max-width: 1200px)": {
    width: "50%",
  },

  "@media screen and (max-width: 600px)": {
    width: "90%",
  }

});

export const StyledModalHeader = styled("header")({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledModalTitle = styled("h1")({
  color: "var(--primary)",
  fontSize: "1.2rem",
  fontWeight: "bolder"
});

export const StyledModalDescription = styled("p")({
  color: "var(--primary)",
  fontSize: "1rem",
  fontWeight: "lighter",
  marginTop: "1.2rem",
  marginBottom: "1rem",
});

export const StyledModalButtonGroup = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

export const PaginationWrapper = styled("div")({
  backgroundColor: "var(--overlay)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "1rem"
});

