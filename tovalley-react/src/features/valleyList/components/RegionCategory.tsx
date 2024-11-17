import styles from '@styles/valleyList/RegionCategory.module.scss'
import { category } from '../utils/category'
import { Region } from '@features/home/utils/regions'
import cn from 'classnames'

type Category = {
  category: string
  detail: boolean
  region: Region
}

const RegionCategory = ({
  click,
  setClick,
}: {
  click: Category
  setClick: React.Dispatch<React.SetStateAction<Category>>
}) => {
  const handleClickCategory = ({
    category,
    region,
  }: {
    category: string
    region?: Region
  }) => {
    setClick({
      category: category,
      detail: category === click.category ? !click.detail : true,
      region: region ?? { ko: '', en: '' },
    })
  }
  return (
    <div className={styles.category}>
      {category.map((area) => {
        return (
          <div key={area.name}>
            <div
              className={cn(styles.categoryList, {
                [styles.clicked]: click.category === area.name,
              })}
            >
              <span
                onClick={() =>
                  handleClickCategory({
                    category: area.name,
                    region: area.region && area.region[0],
                  })
                }
              >
                {area.name}
              </span>
            </div>
            {area.region && click.category === area.name && click.detail && (
              <div className={styles.regionList}>
                {area.region.map((region) => {
                  return (
                    <span
                      key={region.ko}
                      onClick={() => {
                        setClick({ ...click, region })
                      }}
                      className={cn({
                        [styles.clicked]: click.region.ko === region.ko,
                      })}
                    >
                      {region.ko}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default RegionCategory
