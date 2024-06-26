import styled from "@emotion/styled";

export const AddPlacePresentation = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  padding: "2rem", 

  "@media screen and (max-width: 700px)": {
    width: "90%"
  },

});

export const AddPlaceInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  paddingBottom: "2rem",
  paddingLeft: "2rem",

  "@media screen and (max-width: 700px)": {
    width: "90%"
  },
});

export const AddPlaceTitle = styled("h1")({
  color: "var(--primary)",
  fontSize: "2rem",
  marginTop: "2rem",
});

export const AddPlaceDescription = styled("p")({
  color: "var(--primary)",
  fontSize: "1rem",
  marginTop: ".5rem",
});

export const AddPlaceForm = styled("form")({
  backgroundColor: "var(--on-secondary)",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  width: "50%",
  padding: "2rem",
  marginBottom: "3rem",

  "@media screen and (max-width: 950px)": {
    width: "90%",
  },
});

export const AddPlaceFormTop = styled("div")({
  display: "flex",
});

export const AddPlaceFormTopMessage = styled("span")({
  color: "var(--primary)",
  fontSize: "1rem"
});

export const AddPlaceFormSection = styled("section")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: ".5rem",
  paddingBottom: "2.5rem",
  marginBottom: "2.2rem",
  borderBottom: "1px solid var(--on-primary)", 

  "@media screen and (max-width: 700px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export const AddPlaceFormCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "45%",

  "@media screen and (max-width: 700px)": {
    width: "70%"
  },

});

export const AddPlaceFormBtnGroup = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

export const AddPlaceError = styled("span")({
  display: "flex",
  justifyContent: "flex-end",
  color: "var(--error-02)",
  fontSize: ".9rem",
  marginTop: ".1rem",
});

