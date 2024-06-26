import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ButtonSupportBlueStyle = styled(Button)({
  boxShadow: "none",
  backgroundColor: "var(--on-support-blue)", 
  color: "var(--on-secondary)",
  fontWeight: 600,
  fontSize: 16,
  textTransform: "none",

  "&:hover": {
    backgroundColor: "var(--primary)"
  },

});

