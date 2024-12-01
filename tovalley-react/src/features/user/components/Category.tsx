import cn from 'classnames'
import styles from '@styles/user/Category.module.scss'

const Category = ({
  name,
  category,
  setCategory,
}: {
  name: string
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <span
      className={cn(styles.category, {
        [styles.active]: category === name,
      })}
      onClick={() => {
        setCategory(name)
      }}
    >
      {name}
    </span>
  )
}

export default Category
