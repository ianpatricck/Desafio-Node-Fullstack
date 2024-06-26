import { ErrorSharp } from "@mui/icons-material";
import { ErrorMessageContent, ErrorMessageTitle, ErrorMessageWrapper } from "./ErrorMessageCardStyle";
import { Box } from "@mui/material";

export default function ErrorMessageCard({ text }) {
  return (
    <ErrorMessageWrapper>
      <ErrorSharp sx={{ color: "var(--error-02)" }}/>
      <Box sx={{ marginLeft: 2 }}>
        <ErrorMessageTitle>
          Erro
        </ErrorMessageTitle>
        <ErrorMessageContent>{text}</ErrorMessageContent>
      </Box>
    </ErrorMessageWrapper>
  );
}
