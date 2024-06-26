import styled from "@emotion/styled";
import { FormControl, MenuItem, Select } from "@mui/material";

export const SelectFieldWrapper = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  marginTop: "1.3rem"
});

export const SelectFieldLabel = styled("label")({
  color: "var(--primary)",
});

export const SelectFieldInput = styled(Select)({
  backgroundColor: "var(--on-primary)",
  border: 0,
  borderRadius: 4,
  marginTop: ".6rem",
  outline: 0,
  color: "white",
  fontWeight: 400,
  fontSize: 14,

  "&.error": {
    border: "1px solid var(--error-02)",
  },

  "&.loading": {
    color: "var(--grey)",
  },

  "& .MuiSvgIcon-root": {
    color: "white",
  },
});

export const SelectFieldItem = styled(MenuItem)({
  color: "var(--on-primary)",  
});

