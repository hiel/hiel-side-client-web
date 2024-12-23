export default function ErrorMessage({
  message = "",
}: {
  message?: string,
}) {
  return (
    <p
      style={{
        fontSize: "14px",
        color: "#FA6464",
      }}
    >
      {message}
    </p>
  )
}
