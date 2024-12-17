import { createListCollection, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@chakra-ui/react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { useMemo } from "react"

export default function SelectBox<T extends FieldValues>({
  name,
  items,
  placeholder,
  control,
  styles = {},
}: {
  name: Path<T>,
  items: {
    label: string | number,
    value: string | number,
  }[],
  placeholder: string,
  control: Control<T>,
  styles?: object,
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
      render={({ field: { name, value, onChange, onBlur }}) => (
        <SelectRoot
          name={name}
          value={[value]}
          onValueChange={({ value }) => onChange(value[0])}
          onInteractOutside={() => onBlur()}
          collection={collection}
          style={styles}
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {collection.items.map((item) => (
              <SelectItem
                item={item}
                key={item.value}
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
