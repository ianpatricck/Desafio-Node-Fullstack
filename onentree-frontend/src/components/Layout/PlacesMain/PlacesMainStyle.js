import styled from "@emotion/styled";

export const PlacesMainPresentation = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "90%",
  padding: "2rem",
});

export const PlacesMainInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "90%",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
});

export const PlacesMainTitle = styled("h1")({
  color: "var(--primary)",
  fontSize: "2rem",
  marginTop: "2rem",
});

export const PlacesMainDescription = styled("p")({
  color: "var(--primary)",
  fontSize: "1rem",
  marginTop: ".5rem",
});

export const PlacesMainHeaderWrapper = styled("div")({
  backgroundColor: "var(--on-secondary)",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  width: "90%",
  padding: "2rem",
});

export const PlacesMainHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1.8rem",

  "@media screen and (max-width: 700px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
});


