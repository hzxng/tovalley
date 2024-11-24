const SignupInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  children,
  onBlur,
  maxLength,
}: {
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
}) => {
  return (
    <div>
      <span>{name}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onkeydown ? onKeyDown : () => {}}
        onBlur={onBlur ? onBlur : () => {}}
        maxLength={maxLength}
      />
      {children}
    </div>
  )
}

export default SignupInput
