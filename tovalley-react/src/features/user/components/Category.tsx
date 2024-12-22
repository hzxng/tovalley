import cn from 'classnames'
import styles from '@styles/user/Category.module.scss'

const Category = ({
  name,
  category,
  handleClick,
}: {
  name: string
  category: string
  handleClick: () => void
}) => {
  return (
    <span
      className={cn(styles.category, {
        [styles.active]: category === name,
      })}
      onClick={handleClick}
    >
      {name}
    </span>
  )
}

export default Category
