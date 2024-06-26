import { DateInputElement, DateInputLabel, DateInputWrapper } from "./DateInputStyle";

export default function DateInput(props) {
  return (
    <DateInputWrapper>
      <DateInputLabel htmlFor={props.id}>{props.text}</DateInputLabel>
      <DateInputElement 
        mask="99/99/9999" 
        {...props}
        value={props.defaultValue ?? ""} 
      />
    </DateInputWrapper>
  );
}

