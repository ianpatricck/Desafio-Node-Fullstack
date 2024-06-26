import { ButtonSupportBlueDarkStyle } from "./ButtonSupportBlueDarkStyle";

export default function ButtonSupportBlueDark({ text, style, onClick }) {
  return (
    <>
      <ButtonSupportBlueDarkStyle onClick={onClick} style={style}>
        {text}
      </ButtonSupportBlueDarkStyle>
    </>
  );
}
