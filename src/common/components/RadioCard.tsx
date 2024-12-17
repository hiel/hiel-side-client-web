import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card"
import { HStack } from "@chakra-ui/react"

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
          <HStack align="stretch">
            {items.map((item) => (
              <RadioCardItem
                label={item.label}
                key={item.value}
                value={item.value}
                indicator={false}
              />
            ))}
          </HStack>
        </RadioCardRoot>
      )}
    />
  )
}
