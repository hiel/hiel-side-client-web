import { defineStyle, Field, Input } from "@chakra-ui/react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

export default function InputBox<T extends FieldValues>({
  name,
  control,
  type,
  label,
  placeholder = "",
  styles = {},
}: {
  name: Path<T>,
  control: Control<T>,
  type: "text" | "number",
  label: string,
  placeholder?: string,
  styles?: object,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Field.Root>
          <Input
            type={type}
            onChange={onChange}
            variant="outline"
            className="peer"
            placeholder={placeholder}
            style={{
              borderWidth: "1px",
            } && styles}
          />
          <Field.Label css={defineStyle({
            pos: "absolute",
            bg: "bg",
            px: "0.5",
            top: "-3",
            insetStart: "2",
            fontWeight: "normal",
            pointerEvents: "none",
            transition: "position",
            _peerPlaceholderShown: {
              color: "fg.muted",
              top: "2.5",
              insetStart: "3",
            },
            _peerFocusVisible: {
              color: "fg",
              top: "-3",
              insetStart: "2",
            },
          })}>{label}</Field.Label>
        </Field.Root>
      )}
    />
  )
}
