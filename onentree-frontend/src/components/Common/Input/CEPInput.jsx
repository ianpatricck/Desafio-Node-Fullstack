import { CEPInputElement, CEPInputLabel, CEPInputWrapper } from "./CEPInputStyle";

export default function CEPInput(props) {
  return (
    <CEPInputWrapper>
      <CEPInputLabel htmlFor={props.id}>{props.text}</CEPInputLabel>
      <CEPInputElement 
        mask="99999-999" 
        {...props}
        value={props.defaultValue ?? ""}
      />
    </CEPInputWrapper>
  );
}

