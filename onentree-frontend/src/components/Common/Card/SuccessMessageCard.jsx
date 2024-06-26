import { CheckCircle } from "@mui/icons-material";
import { SuccessMessageContent, SuccessMessageTitle, SuccessMessageWrapper } from "./SuccessMessageCardStyle";
import { Box } from "@mui/material";

export default function SuccessMessageCard({ text }) {
  return (
    <SuccessMessageWrapper>
      <CheckCircle sx={{ color: "var(--success)" }}/>
      <Box sx={{ marginLeft: 2 }}>
        <SuccessMessageTitle>
          Sucesso
        </SuccessMessageTitle>
        <SuccessMessageContent>{text}</SuccessMessageContent>
      </Box>
    </SuccessMessageWrapper>
  );
}
