import { useCallback, useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'
import styles from '@styles/lostItem/LostItemList.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import cn from 'classnames'
import { LostList, PlaceName } from 'types/lost-found'
import LostItemPostItem from '@features/lostItem/components/LostItemPostItem'
import Search from '@features/lostItem/components/Search'
import ValleyModal from '@features/lostItem/components/ValleyModal'

const localhost = process.env.REACT_APP_HOST

const LostItemList = () => {
  const lostItemCategory = ['전체', '물건 찾아요', '주인 찾아요']
  const [currentCategory, setCurrentCategory] = useState('전체')
  const [except, setExcept] = useState(false)
  const [search, setSearch] = useState({ text: '', click: false })
  const [lostList, setLostList] = useState<LostList[] | null>(null)
  const [modalView, setModalView] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<PlaceName[]>([])

  const navigation = useNavigate()
  const cookies = new Cookies()

  const getLostList = useCallback(() => {
    const selectedPlaceName = selectedPlace.map((el) => el.waterPlaceId)
    let params: {
      searchWord?: string
      isResolved: boolean
      category?: string
    } = {
      isResolved: !except,
    }

    if (search.click) {
      params = { ...params, searchWord: search.text }
    }

    const waterPlaceIdList = selectedPlaceName
      .map((name) => `&waterPlaceId=${name}`)
      .join('')

    if (currentCategory === '물건 찾아요') {
      params = { ...params, category: 'LOST' }
    } else if (currentCategory === '주인 찾아요') {
      params = { ...params, category: 'FOUND' }
    }

    axios
      .get(`${localhost}/api/lostItem?${waterPlaceIdList}`, { params })
      .then((res) => {
        console.log(res)
        setLostList(res.data.data.content)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentCategory, except, search, selectedPlace])

  useEffect(() => {
    getLostList()
  }, [getLostList])

  const closeModal = () => {
    setModalView(false)
  }

  const toWritePage = () => {
    if (cookies.get('ISLOGIN')) navigation('/lost-item/write')
    else navigation('/login')
  }

  const deleteSelectedItem = (place: PlaceName) => {
    const newList = selectedPlace.filter((item) => {
      return item.waterPlaceId !== place.waterPlaceId
    })

    setSelectedPlace(newList)
  }

  const handleCheck = () => {
    setExcept((prev) => !prev)
  }

  if (!lostList) return <div>loading</div>

  return (
    <div className={styles.lostItemListPage}>
      <div className={styles.top}>
        <div className={styles.categoryWrap}>
          <div className={styles.category}>
            {lostItemCategory.map((item) => {
              return (
                <div
                  key={item}
                  className={cn(styles.categoryItem, {
                    [styles.clicked]: item === currentCategory,
                  })}
                  onClick={() => setCurrentCategory(item)}
                >
                  {item}
                </div>
              )
            })}
          </div>
          <div className={styles.writeBtn} onClick={toWritePage}>
            <LuPencil />
            <span>글 작성하기</span>
          </div>
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className={styles.body}>
        <div className={styles.filter}>
          <div
            onClick={handleCheck}
            className={cn(styles.checkBox, { [styles.exceptCheck]: except })}
          >
            <FaCheck />
          </div>
          <span>해결한 글 제외하기</span>
          <div className={styles.filterList}>
            <div className={styles.searchValley}>
              <span onClick={() => setModalView(true)}>물놀이 장소 선택</span>
            </div>
            {selectedPlace.map((place) => (
              <div key={place.waterPlaceId} className={styles.valleyFilter}>
                <span onClick={() => deleteSelectedItem(place)}>
                  <IoCloseOutline size="15px" />
                </span>
                <span># {place.waterPlaceName}</span>
              </div>
            ))}
          </div>
        </div>
        {lostList.map((item) => {
          return <LostItemPostItem key={item.id} item={item} />
        })}
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
