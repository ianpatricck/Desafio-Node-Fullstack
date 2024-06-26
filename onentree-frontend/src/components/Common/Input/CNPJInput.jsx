import { CNPJInputElement, CNPJInputLabel, CNPJInputWrapper } from "./CNPJInputStyle";

export default function CNPJInput(props) {
  return (
    <CNPJInputWrapper>
      <CNPJInputLabel htmlFor={props.id}>{props.text}</CNPJInputLabel>
        <CNPJInputElement 
          mask="99.999.999/9999-99" 
          {...props}
          value={props.defaultValue ?? ""}
        />
    </CNPJInputWrapper>
  );
}

