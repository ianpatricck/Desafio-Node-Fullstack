import styled from "@emotion/styled";


export const SuccessMessageWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "var(--success-support)",
  width: "30rem",
  padding: "12px",
  borderLeft: "4px solid var(--success)",
});

export const SuccessMessageTitle = styled("h1")({
  fontSize: "1.2rem",
  color: "var(--primary)",
});

export const SuccessMessageContent = styled("span")({
  color: "var(--primary)",
});

