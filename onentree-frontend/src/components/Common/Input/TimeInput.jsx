import { TimeInputElement, TimeInputLabel, TimeInputWrapper } from "./TimeInputStyle";

export default function TimeInput(props) {
  return (
    <TimeInputWrapper>
      <TimeInputLabel htmlFor={props.id}>{props.text}</TimeInputLabel>
      <TimeInputElement 
        mask="99:99h" 
        {...props}
        value={props.defaultValue ?? ""} 
      />
    </TimeInputWrapper>
  );
}

