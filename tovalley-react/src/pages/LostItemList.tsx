import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'
import styles from '@styles/lostItem/LostItemList.module.scss'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { LostList, PlaceName } from 'types/lost-found'
import LostItemPostItem from '@features/lostItem/components/LostItemPostItem'
import Search from '@features/lostItem/components/Search'
import ValleyModal from '@features/lostItem/components/ValleyModal'
import { data, data1, data1867, dataFOUND, dataLost } from 'dummy/lostItem-data'

const LostItemList = () => {
  const CATEGORIES = ['전체', '물건 찾아요', '주인 찾아요']
  const navigation = useNavigate()

  const [currentCategory, setCurrentCategory] = useState('전체')
  const [except, setExcept] = useState(false)
  const [search, setSearch] = useState({ text: '', click: false })
  const [lostList, setLostList] = useState<LostList[] | null>(null)
  const [modalView, setModalView] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<PlaceName[]>([])

  useEffect(() => {
    const selectedPlaceIds = selectedPlace.map((el) => el.waterPlaceId)

    if (search.click) {
      setLostList(data1.filter((e) => e.title.includes(search.text)))
    }

    if (selectedPlaceIds.length) {
      if (selectedPlaceIds.includes(1)) {
        if (currentCategory === '전체') setLostList(data1)
        else if (currentCategory === '물건 찾아요')
          setLostList(data1.filter((e) => e.category === 'LOST'))
        else setLostList(data1.filter((e) => e.category === 'FOUND'))
      } else if (selectedPlaceIds.includes(1867)) {
        if (currentCategory === '전체') setLostList(data1867)
        else if (currentCategory === '물건 찾아요')
          setLostList(data1867.filter((e) => e.category === 'LOST'))
        else setLostList(data1867.filter((e) => e.category === 'FOUND'))
      } else setLostList([])
    }

    if (currentCategory === '전체') setLostList(data)
    else if (currentCategory === '물건 찾아요') setLostList(dataLost)
    else setLostList(dataFOUND)
  }, [currentCategory, search, selectedPlace])

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category)
  }

  const toggleExcept = () => setExcept((prev) => !prev)

  const openModal = () => setModalView(true)

  const closeModal = () => setModalView(false)

  const moveToWritePage = () => {
    localStorage.getItem('user')
      ? navigation('/lost-item/write')
      : navigation('/login')
  }

  const handleDeletePlace = (place: PlaceName) => {
    setSelectedPlace((prev) =>
      prev.filter((item) => item.waterPlaceId !== place.waterPlaceId)
    )
  }

  const renderCategories = () =>
    CATEGORIES.map((category) => (
      <div
        key={category}
        className={cn(styles.categoryItem, {
          [styles.clicked]: category === currentCategory,
        })}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </div>
    ))

  const renderFilters = () => (
    <div className={styles.filter}>
      <div
        onClick={toggleExcept}
        className={cn(styles.checkBox, { [styles.exceptCheck]: except })}
      >
        <FaCheck />
      </div>
      <span>해결한 글 제외하기</span>
      <div className={styles.filterList}>
        <div className={styles.searchValley}>
          <span onClick={openModal}>물놀이 장소 선택</span>
        </div>
        {selectedPlace.map((place) => (
          <div key={place.waterPlaceId} className={styles.valleyFilter}>
            <span onClick={() => handleDeletePlace(place)}>
              <IoCloseOutline size="15px" />
            </span>
            <span># {place.waterPlaceName}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderLostItems = () => {
    if (!lostList || lostList.length === 0)
      return <div className={styles.noItems} />

    return lostList.map((item) => (
      <LostItemPostItem key={item.id} item={item} />
    ))
  }

  return (
    <div className={styles.lostItemListPage}>
      <div className={styles.top}>
        <div className={styles.categoryWrap}>
          <div className={styles.category}>{renderCategories()}</div>
          <div className={styles.writeBtn} onClick={moveToWritePage}>
            <LuPencil />
            <span>글 작성하기</span>
          </div>
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className={styles.body}>
        {renderFilters()}
        {renderLostItems()}
      </div>
      {modalView && (
        <ValleyModal
          closeModal={closeModal}
          setSelectedPlace={setSelectedPlace}
        />
      )}
    </div>
  )
}

export default LostItemList
