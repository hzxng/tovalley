import { useCallback, useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'
import styles from '@styles/lostItem/LostItemList.module.scss'
import { useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import cn from 'classnames'
import { LostList, PlaceName } from 'types/lost-found'
import LostItemPostItem from '@features/lostItem/components/LostItemPostItem'
import Search from '@features/lostItem/components/Search'
import ValleyModal from '@features/lostItem/components/ValleyModal'
import { Axios } from '@utils/axios_interceptor'
import Loading from '@component/Loading'

const LostItemList = () => {
  const CATEGORIES = ['전체', '물건 찾아요', '주인 찾아요']
  const navigation = useNavigate()
  const cookies = new Cookies()

  const [currentCategory, setCurrentCategory] = useState('전체')
  const [except, setExcept] = useState(false)
  const [search, setSearch] = useState({ text: '', click: false })
  const [lostList, setLostList] = useState<LostList[] | null>(null)
  const [modalView, setModalView] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<PlaceName[]>([])
  const [loading, setLoading] = useState(false)

  const getLostList = useCallback(async () => {
    setLoading(true)
    const selectedPlaceIds = selectedPlace.map((el) => el.waterPlaceId)
    const params: {
      searchWord?: string
      isResolved: boolean
      category?: string
    } = {
      isResolved: !except,
      ...(search.click && { searchWord: search.text }),
      ...(currentCategory === '물건 찾아요' && { category: 'LOST' }),
      ...(currentCategory === '주인 찾아요' && { category: 'FOUND' }),
    }

    const waterPlaceParams = selectedPlaceIds
      .map((id) => `&waterPlaceId=${id}`)
      .join('')

    try {
      const response = await Axios.get(`/api/lostItem?${waterPlaceParams}`, {
        params,
      })
      setLostList(response.data.data.content)
    } catch (error) {
      console.error('Failed to fetch lost items:', error)
    } finally {
      setLoading(false)
    }
  }, [currentCategory, except, search, selectedPlace])

  useEffect(() => {
    getLostList()
  }, [getLostList])

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category)
  }

  const toggleExcept = () => setExcept((prev) => !prev)

  const openModal = () => setModalView(true)

  const closeModal = () => setModalView(false)

  const moveToWritePage = () => {
    cookies.get('ISLOGIN')
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
    if (loading) return <Loading />
    if (!lostList || lostList.length === 0)
      return <div className={styles.noItems}>등록된 항목이 없습니다.</div>

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
