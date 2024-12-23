import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { useMemo } from "react"
import _ from "lodash"
import { createListCollection } from "@chakra-ui/react"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select"

export default function SelectBox<T extends FieldValues>({
  name,
  items,
  placeholder,
  control,
  wrapperStyles = {},
  contentStyles = {},
}: {
  name: Path<T>,
  items: {
    label: string | number,
    value: string | number,
  }[],
  placeholder: string,
  control: Control<T>,
  wrapperStyles?: object,
  contentStyles?: object,
}) {
  const collection = useMemo(() => {
    return createListCollection({
      items: items || [],
      itemToString: (item) => String(item.label),
      itemToValue: (item) => String(item.value),
    })
  }, [items])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, value, onChange, onBlur } }) => (
        <SelectRoot
          name={name}
          value={[value]}
          onValueChange={({ value }) => onChange(value[0])}
          onInteractOutside={() => onBlur()}
          collection={collection}
          style={wrapperStyles}
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {_.map(collection.items, item => (
              <SelectItem
                item={item}
                key={item.value}
                style={contentStyles}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )}
    />
  )
}
