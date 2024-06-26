import styled from "@emotion/styled";

export const TextFieldWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "1.3rem"
});

export const TextFieldLabel = styled("label")({
  color: "var(--primary)",
});

export const TextFieldInput = styled("input")({
  backgroundColor: "var(--on-primary)",
  padding: ".5rem",
  border: 0,
  borderRadius: 4,
  marginTop: ".6rem",
  outline: 0,
  color: "white",
  fontWeight: 400,
  fontSize: 14,

  "&.error": {
    border: "1px solid var(--error-02)",
  }

});

