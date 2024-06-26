import styled from "@emotion/styled";

export const WelcomeCardWrapper = styled("div")({
  padding: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "90%"
});

export const WelcomeCardContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const WelcomeImage = styled("img")({});

export const WelcomeTitle = styled("h1")({
  color: "var(--primary)",
});

export const WelcomeMessage = styled("p")({
  color: 'var(--primary)',
  marginTop: '.5rem',
});

