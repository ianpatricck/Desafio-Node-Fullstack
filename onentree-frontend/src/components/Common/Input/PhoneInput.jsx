import { PhoneInputElement, PhoneInputLabel, PhoneInputWrapper } from "./PhoneInputStyle";

export default function PhoneInput(props) {
  return (
    <PhoneInputWrapper>
      <PhoneInputLabel htmlFor={props.id}>{props.text}</PhoneInputLabel>
        <PhoneInputElement 
          mask="(99) 99999-9999" 
          {...props} 
          value={props.defaultValue ?? ""}
        />
    </PhoneInputWrapper>
  );
}

