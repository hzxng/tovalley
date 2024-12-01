const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}: {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

export default Input
