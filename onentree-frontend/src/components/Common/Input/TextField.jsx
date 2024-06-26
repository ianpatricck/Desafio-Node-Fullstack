import { TextFieldInput, TextFieldLabel, TextFieldWrapper } from "./TextFieldStyle";

export default function TextField(props) {
  return (
    <TextFieldWrapper>
      <TextFieldLabel htmlFor={props.id}>{props.text}</TextFieldLabel>
      <TextFieldInput { ...props} />
    </TextFieldWrapper>
  );
}
