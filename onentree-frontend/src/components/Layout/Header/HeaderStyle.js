import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const HeaderWrapper = styled("header")({
  display: "flex",
  justifyContent: "center",
});

export const HeaderContainer = styled("div")({
  padding: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
});

export const HeaderContent = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "30rem",
});

export const HeaderLinks = styled("nav")({
  "@media screen and (max-width: 700px)": {
    display: "none",
  }
});

export const HeaderNavLink = styled(NavLink)({
  marginRight: "1.2rem",
  fontSize: "1rem",
  color: "var(--secondary)",
  fontWeight: 400,
  textDecoration: "none",

  "&.checked": {
    fontWeight: 800,
  }

});

export const HeaderLogo = styled("img")({
  height: "2rem",
});

export const HeaderAvatar = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",

  "@media screen and (max-width: 700px)": {
    display: "none",
  }

});

export const HeaderAvatarMessage = styled("span")({
  marginRight: ".5rem",
  marginLeft: ".5rem",
  fontWeight: "400",
  fontSize: "1rem",
  color: "var(--secondary)",
});

export const HeaderMenu = styled("div")({
  cursor: "pointer",
  display: "none",

  "@media screen and (max-width: 700px)": {
    display: "block",
  }
});

export const HeaderMobile = styled("div")({
  width: "12rem",
  backgroundColor: "var(--overlay)",
  display: "flex",
  flexDirection: "column",
  padding: ".9rem",
  borderRadius: ".7rem",
  position: "absolute",
  right: "5%",
  top: "5rem",
  zIndex: 1
});

export const HeaderMobileAvatar = styled("div")({
  display: "flex",
  alignItems: "center",

  "&:hover": {
    cursor: "pointer",
  }
});

export const HeaderMobileAvatarMessage = styled("span")({
  marginRight: ".5rem",
  marginLeft: ".5rem",
  fontWeight: "400",
  fontSize: "1rem",
  color: "var(--secondary)",
});

export const MenuAvatarMobile = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: ".2rem",
  padding: ".2rem",
}); 

export const MenuAvatarMobileItem = styled("span")({
  display: "flex",
  alignItems: "center",
  marginTop: 10,
  color: "var(--primary)",
  
  "&:hover": {
    cursor: "pointer",
    color: "var(--grey)"
  }
}); 

export const HeaderMobileLinks = styled("nav")({
  marginTop: "1.2rem",
  display: "flex",
  flexDirection: "column",
});

export const HeaderMobileNavLink = styled(NavLink)({
  marginRight: "1.2rem",
  fontSize: "1rem",
  color: "var(--secondary)",
  fontWeight: "400",
  textDecoration: "none",
  marginBottom: ".4rem"
});

