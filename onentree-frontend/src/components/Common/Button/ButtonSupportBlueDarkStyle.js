import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ButtonSupportBlueDarkStyle = styled(Button)({
  boxShadow: "none",
  backgroundColor: "var(--support-blue)", 
  color: "var(--on-primary)",
  fontWeight: 600,
  fontSize: 16,
  textTransform: "none",

  "&:hover": {
    backgroundColor: "var(--support-blue)"
  },

});

