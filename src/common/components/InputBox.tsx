import { Input } from "@chakra-ui/react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

export default function InputBox<T extends FieldValues>({name, control, type, label, styles = {}}:
  {name: Path<T>, control: Control<T>, type: "text" | "number" | "password" | "email", label: string, styles?: object}
) {
  return (<Controller
    name={name} control={control}
    render={({field: {value, onChange}}) => (<Input
      type={type} value={value} onChange={onChange} variant="outline" className="peer" placeholder={label}
      autoComplete="off" style={{backgroundColor: "var(--color-background)", ...styles}}
    />)}
  />)
}
