import { Region } from '@features/home/utils/regions'
import styles from './Category.module.scss'
import cn from 'classnames'

const Category = ({
  category,
  clicked,
  setClicked,
  getData,
}: {
  category: Region
  clicked: string
  setClicked: React.Dispatch<React.SetStateAction<string>>
  getData?: (cond: string) => void
}) => {
  return (
    <span
      onClick={() => {
        setClicked(category.ko)
        getData && getData(category.en)
      }}
      className={cn(styles.categoryBtn, {
        [styles.clickedCategory]: clicked === category.ko,
        [styles.sortBtn]: !getData,
      })}
    >
      {category.ko}
    </span>
  )
}

export default Category
