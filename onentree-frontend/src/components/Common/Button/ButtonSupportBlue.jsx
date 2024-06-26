import { ButtonSupportBlueStyle } from "./ButtonSupportBlueStyle";

export default function ButtonSupportBlue({ text, onClick }) {
  return (
    <>
      <ButtonSupportBlueStyle onClick={onClick}>
        {text}
      </ButtonSupportBlueStyle>
    </>
  );
}
