import styled from "@emotion/styled";
/* import ReactInputMask from "react-input-mask"; */
import ReactInputMask from "@mona-health/react-input-mask";

export const CEPInputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "1.3rem"
});

export const CEPInputLabel = styled("label")({
  color: "var(--primary)",
});

export const CEPInputElement = styled(ReactInputMask)({
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

