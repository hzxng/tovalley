import styles from '@styles/user/Input.module.scss'

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}: {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onkeydown ? onKeyDown : () => {}}
    />
  )
}

export default Input
