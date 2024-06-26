import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const EventsSectionWrapper = styled("section")({
  width: '50%',
  marginRight: '1rem',

  "@media screen and (max-width: 1300px)": {
    width: '70%',
    margin: 0,
    marginTop: "2rem"
  },

  "@media screen and (max-width: 900px)": {
    width: '100%',
  }

});

export const EventsCard = styled("div")({
  backgroundColor: 'var(--error-support)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem',
  marginRight: '.9rem',
  borderRadius: '1rem',
  width: '100%',

  "@media screen and (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "start"
  }

});

export const EventsCardTop = styled(Box)({
  "@media screen and (max-width: 600px)": {
    marginBottom: "1rem"
  }
});


export const EventsTitle = styled("h1")({
  color: 'var(--primary)',
  fontSize: '2rem',
  display: 'flex',
  alignItems: 'center',
});

export const EventsDescription = styled("p")({
  color: 'var(--primary)',
  fontSize: '1rem',
});

export const EventsLatestCard = styled("div")({
  backgroundColor: 'var(--overlay)',
  padding: '2rem',
  marginTop: '2rem',
  borderRadius: '2rem',
});

export const EventsLatestCardHeader = styled("header")({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const EventsLatestCardTitle = styled("h1")({
  color: 'var(--primary)',
  fontWeight: 400,

  "@media screen and (max-width: 600px)": {
    fontSize: "1.2rem",
    width: "80%",
  }

});

export const EventsLatestCardLink = styled(Link)({
  color: 'var(--support-blue)',
  fontSize: '1rem',

  "@media screen and (max-width: 900px)": {
    width: '50%',
    textAlign: "right"
  }
});

export const EventsLatestCardContent = styled("div")({
  marginTop: '1.3rem',

  "@media screen and (max-width: 550px)": {
    overflowX: "scroll",
  }
});

export const EventsLatestNotFoundCard = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "12rem",
});

export const EventNotFoundMessage = styled("span")({
  color: "var(--grey)",
  fontSize: "1.2rem"
});

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

