import styled from "@emotion/styled";


export const ErrorMessageWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "var(--error-support)",
  width: "30rem",
  padding: "12px",
  borderLeft: "4px solid var(--error-02)",
});

export const ErrorMessageTitle = styled("h1")({
  fontSize: "1.2rem",
  color: "var(--primary)",
});

export const ErrorMessageContent = styled("span")({
  color: "var(--primary)",
});

