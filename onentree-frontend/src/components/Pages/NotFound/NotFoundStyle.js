import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const NotFoundWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5rem",
});

export const NotFoundCode = styled("h1")({
  color: "var(--primary)",
  letterSpacing: 4
});

export const NotFoundMessage = styled("h2")({
  color: "var(--light-grey)",
  letterSpacing: 2,
  marginTop: "1.5rem",

  "@media screen and (max-width: 800px)": {
    fontSize: "1rem"
  }
});

