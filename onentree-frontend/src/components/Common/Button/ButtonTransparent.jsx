import { ButtonTransparentStyle } from "./ButtonTransparentStyle";

export default function ButtonTransparent({ text, style = null, onClick }) {
  return (
    <>
      <ButtonTransparentStyle onClick={onClick} style={style}>
        {text}
      </ButtonTransparentStyle>
    </>
  );
}
