import styled from "@emotion/styled";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

export const PlaceCardWrapper = styled("div")(({ disabled }) => ({
  backgroundColor: disabled ? 'transparent' : 'var(--on-primary)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1.2rem',

  "@media screen and (max-width: 550px)": {
    width: "150vw",
  }

}));

export const PlaceCardItem = styled("p")({
  color: 'var(--primary)',
  width: "30%",
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const StyledMoreVert = styled(MoreVert)(({ empty }) => ({
  color: empty ? "transparent" : "var(--support-blue)",
  cursor: "pointer",
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

