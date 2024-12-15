import React, { useEffect, useState } from 'react'
import styles from '@styles/lostItem/ValleyModal.module.scss'
import { MdClose } from 'react-icons/md'
import { PlaceName } from 'types/lost-found'
import Modal from '@component/Modal'
import WaterPlaceName from './WaterPlaceName'
import { Axios } from '@utils/axios_interceptor'

const ValleyModal = ({
  closeModal,
  setSelectedPlace,
  writePage,
}: {
  closeModal: () => void
  setSelectedPlace: React.Dispatch<React.SetStateAction<PlaceName[]>>
  writePage?: boolean
}) => {
  const [selectedList, setSelectedList] = useState<PlaceName[]>([])
  const [waterPlaceList, setWaterPlaceList] = useState<PlaceName[]>([])
  const [selectPlace, setSelectPlace] = useState<PlaceName>()
  const [searchText, setSearchText] = useState('')
  const CHOSUNG_LIST = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ]

  useEffect(() => {
    const getWaterPlaceList = async () => {
      try {
        const res = await Axios.get('/api/water-place')
        setWaterPlaceList(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getWaterPlaceList()
  }, [])

  // 한글을 초성으로 변환하는 함수
  const getInitialSound = (word: string) => {
    const CHOSUNG_START = 44032
    const CHOSUNG_BASE = 588

    const chosungIndex = Math.floor(
      (word.charCodeAt(0) - CHOSUNG_START) / CHOSUNG_BASE
    )

    return CHOSUNG_LIST[chosungIndex]
  }

  const addSelectedList = (place: PlaceName) => {
    let include = false
    selectedList.map((item) => {
      if (item.waterPlaceId === place.waterPlaceId) {
        include = true
      }
      return null
    })

    if (!include) {
      const newList = selectedList.concat(place)
      setSelectedList(newList)
    }
  }

  const deleteSelectItem = (place: PlaceName) => {
    const newList = selectedList.filter((item) => {
      return item.waterPlaceId !== place.waterPlaceId
    })
    setSelectedList(newList)
  }

  const clickSelect = () => {
    if (writePage && selectPlace) {
      setSelectedPlace([selectPlace])
      closeModal()
    } else {
      setSelectedPlace(selectedList)
      closeModal()
    }
  }

  const handleClickPlaceName = (el: PlaceName) => {
    if (writePage) setSelectPlace(el)
    else addSelectedList(el)
  }

  return (
    <Modal>
      <div className={styles.modalWrap}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            placeholder="계곡을 검색하세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className={styles.searchBtn}>
            <button onClick={closeModal}>취소</button>
            <button onClick={clickSelect}>선택</button>
          </div>
        </div>
        <div className={styles.scroll}>
          <div className={styles.selectedPlace}>
            {!writePage &&
              selectedList.map((item) => (
                <div key={item.waterPlaceId}>
                  <span onClick={() => deleteSelectItem(item)}>
                    <MdClose />
                  </span>
                  <span>{item.waterPlaceName}</span>
                </div>
              ))}
          </div>
          <div className={styles.placeNameContainer}>
            {searchText
              ? waterPlaceList.map((el) => {
                  if (el.waterPlaceName.includes(searchText)) {
                    return (
                      <WaterPlaceName
                        el={el}
                        writePage={writePage}
                        selectPlace={selectPlace}
                        handleClickPlaceName={handleClickPlaceName}
                      />
                    )
                  } else return null
                })
              : CHOSUNG_LIST.map((chosung) => {
                  return (
                    <div key={chosung} className={styles.placeNameBox}>
                      <span className={styles.placeTitle}>{chosung}</span>
                      {waterPlaceList.map((el) => {
                        if (getInitialSound(el.waterPlaceName) === chosung)
                          return (
                            <WaterPlaceName
                              el={el}
                              writePage={writePage}
                              selectPlace={selectPlace}
                              handleClickPlaceName={handleClickPlaceName}
                            />
                          )
                        else return null
                      })}
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ValleyModal
