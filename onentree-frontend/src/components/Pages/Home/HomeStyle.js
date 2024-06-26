import styled from "@emotion/styled";

export const HomeMain = styled("main")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
});

export const HomeItems = styled("div")({
  padding: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "90%",

  "@media screen and (max-width: 1300px)": {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

