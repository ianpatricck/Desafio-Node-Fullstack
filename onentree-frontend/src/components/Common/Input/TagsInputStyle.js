import { Add } from "@mui/icons-material";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";

export const TagsInputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "1.3rem"
});

export const TagsInputLabel = styled("label")({
  color: "var(--primary)",
});

export const TagsInputContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "var(--on-primary)",
  border: 0,
  borderRadius: 4,
  marginTop: ".6rem",
});

export const TagsField = styled("input")({
  backgroundColor: "transparent",
  border: 0,
  outline: 0,
  color: "white",
  fontWeight: 400,
  fontSize: 14,
  width: "80%",
  padding: ".5rem",
});

export const AddTag = styled(Add)({
  color: "var(--on-support-blue)",
  backgroundColor: "var(--dark-blue)",
  borderRadius: 4,
  height: "100%",
  width: "2.5rem",
  padding: ".4rem",
  cursor: "pointer"
});

export const TagsWrapper = styled(Grid)({});

export const Tag = styled("span")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "var(--sky-blue)",
  borderRadius: "6px",
  padding: "0px 8px 0px 8px",
  margin: ".8rem",
  marginLeft: 0,
  color: "var(--on-secondary)",
  fontSize: "1.2rem"
});

