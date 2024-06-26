import styled from "@emotion/styled";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

export const EventCardWrapper = styled("div")(({ disabled }) => ({
  backgroundColor: disabled ? "transparent" : "var(--on-primary)",
  display: "flex",
  justifyContent: "space-between",
  padding: "1.2rem",

  "@media screen and (max-width: 550px)": {
    width: "150vw",
  }

}));

export const EventCardItem = styled("p")({
  color: "var(--primary)",
  width: "30%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",

  ".support-blue": {
    backgroundColor: "var(--on-support-blue)",
    padding: ".4rem",
    color: "var(--overlay)",
    borderRadius: ".8rem"
  },

  ".alert-support": {
    backgroundColor: "var(--alert-support-02)",
    padding: ".4rem",
    color: "var(--secondary)",
    borderRadius: ".8rem",
  }
});

export const StyledMoreVert = styled(MoreVert)(({ empty }) => ({
  color: empty ? "transparent" : "var(--support-blue)",
  cursor: "pointer"
}));

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

