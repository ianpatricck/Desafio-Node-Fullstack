import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ButtonTransparentStyle = styled(Button)({
  boxShadow: "none",
  backgroundColor: "transparent", 
  color: "var(--primary)",
  fontWeight: 600,
  fontSize: 16,
  textTransform: "none",
  border: "2px solid var(--primary)",
  borderRadius: 6,

  "&:hover": {
    borderColor: "var(--secondary)",
    color: "var(--secondary)"
  },

  // "@media screen and (max-width: 800px)": {
  //   marginTop: "2rem"
  // }
});

