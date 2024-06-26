import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

export const ButtonPrimaryStyle = styled(Button)({
  boxShadow: "none",
  backgroundColor: "var(--primary)", 
  color: "var(--on-secondary)",
  fontWeight: 600,
  fontSize: 16,
  textTransform: "none",

  "&:hover": {
    backgroundColor: "var(--secondary)"
  }, 
});

export const ButtonPrimaryLoadingStyle = styled(LoadingButton)({
  boxShadow: "none",
  backgroundColor: "var(--on-support-blue)", 
  color: "var(--on-secondary)",
  fontWeight: 600,
  fontSize: 16,
  textTransform: "none",
});

