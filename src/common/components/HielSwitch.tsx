import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Switch } from "@/components/ui/switch"

export default function HielSwitch<T extends FieldValues>({name, control, styles = {}}
  : {name: Path<T>, control: Control<T>, styles?: object}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <Switch
          checked={value}
          onCheckedChange={e => onChange(e.checked)}
          style={styles}
        />
      )}
    />
  )
}
