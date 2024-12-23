import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card"
import { Group } from "@chakra-ui/react"
import _ from "lodash"

export default function RadioCard<T extends FieldValues>({
  name,
  items,
  control,
  orientation = "vertical",
}: {
  name: Path<T>,
  items: {
    label: string | number,
    value: string,
    styles?: object,
  }[],
  control: Control<T>,
  orientation?: "vertical" | "horizontal",
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, value, onChange } }) => (
        <RadioCardRoot
          name={name}
          value={value}
          onChange={onChange}
          align="center"
          orientation={orientation}
        >
          <Group align="stretch">
            {_.map(items, item => (
              <RadioCardItem
                label={item.label}
                key={item.value}
                value={item.value}
                indicator={false}
                style={item.styles}
              />
            ))}
          </Group>
        </RadioCardRoot>
      )}
    />
  )
}
