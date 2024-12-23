import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { CheckboxCard } from "@/components/ui/checkbox-card"

export default function ChckboxCard<T extends FieldValues>({
  name,
  label,
  control,
  styles = {},
}: {
  name: Path<T>,
  label: string,
  control: Control<T>,
  styles?: object,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <CheckboxCard
          label={label}
          key={label}
          onChange={onChange}
          style={styles}
        />
      )}
    />
  )
}
