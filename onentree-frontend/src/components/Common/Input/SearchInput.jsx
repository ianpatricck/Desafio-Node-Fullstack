import { SearchRounded } from "@mui/icons-material";
import { SearchInputContent, SearchInputWrapper } from "./SearchInputStyle";

export default function SearchInput(props) {
  return (
    <SearchInputWrapper>
      <SearchRounded sx={{ color: "var(--support-blue)", }} />
      <SearchInputContent type="text" {...props} />
    </SearchInputWrapper>
  );
}
