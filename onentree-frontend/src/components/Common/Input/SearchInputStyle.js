import styled from "@emotion/styled";

export const SearchInputWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  background: "var(--on-primary)",
  padding: ".5rem",
  width: "24rem",
  borderRadius: ".3rem",

  "@media screen and (max-width: 800px)": {
    width: "16rem"
  },

  "@media screen and (max-width: 380px)": {
    width: "15rem"
  }
});

export const SearchInputContent = styled("input")({
  background: "transparent",
  fontSize: 14,
  color: "white",
  border: "none",
  outline: "none",
  padding: "6px",
  width: "100%",

  "&::placeholder": {
    color: "var(--on-gray-blue)"
  }
});

