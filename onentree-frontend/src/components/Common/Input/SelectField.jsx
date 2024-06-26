import { 
  SelectFieldInput, 
  SelectFieldItem, 
  SelectFieldLabel, 
  SelectFieldWrapper 
} from "./SelectFieldStyle";

export default function SelectField({ id, text, defaultKey, defaultValue, items, onChange, className, loading }) {
  return (
    <SelectFieldWrapper size="small">
      <SelectFieldLabel id={id}>{text}</SelectFieldLabel>
      <SelectFieldInput
        id={id}
        value={defaultKey}
        onChange={onChange}
        className={className}
      >
        {
          loading ? (
            <SelectFieldItem value="default" disabled>{defaultValue}</SelectFieldItem>
          ) : (
              <SelectFieldItem value="default" disabled>{!items.length ? "Não há itens" : defaultValue}</SelectFieldItem>
            )
        }

        {items.map((item) => (
          <SelectFieldItem key={item.value || item.id} value={item.value || item.id}>{item.name}</SelectFieldItem>
        ))}

      </SelectFieldInput>
    </SelectFieldWrapper>
  );
}
