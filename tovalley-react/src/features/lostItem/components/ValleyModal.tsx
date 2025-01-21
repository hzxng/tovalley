import React, { useEffect, useState } from 'react'
import styles from '@styles/lostItem/ValleyModal.module.scss'
import { MdClose } from 'react-icons/md'
import { PlaceName } from 'types/lost-found'
import Modal from '@component/Modal'
import WaterPlaceName from './WaterPlaceName'
import { data } from 'dummy/water-place-data'

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
    setWaterPlaceList(data)
  }, [])

  // 한글을 초성으로 변환하는 함수
  const getInitialSound = (word: string) => {
    const CHOSUNG_START = 44032
    const CHOSUNG_BASE = 588

    const index = Math.floor(
      (word.charCodeAt(0) - CHOSUNG_START) / CHOSUNG_BASE
    )

    return CHOSUNG_LIST[index]
  }

  const addSelectedList = (place: PlaceName) => {
    if (
      !selectedList.some((item) => item.waterPlaceId === place.waterPlaceId)
    ) {
      setSelectedList((prev) => [...prev, place])
    }
  }

  const deleteSelectItem = (place: PlaceName) => {
    setSelectedList((prev) =>
      prev.filter((item) => item.waterPlaceId !== place.waterPlaceId)
    )
  }

  const handleSelectPlace = () => {
    if (writePage && selectPlace) {
      setSelectedPlace([selectPlace])
    } else {
      setSelectedPlace(selectedList)
    }
    closeModal()
  }

  const handleClickPlaceName = (place: PlaceName) => {
    writePage ? setSelectPlace(place) : addSelectedList(place)
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
            <button onClick={handleSelectPlace}>선택</button>
          </div>
        </div>
        <div className={styles.scroll}>
          {!writePage && (
            <div className={styles.selectedPlace}>
              {selectedList.map((place) => (
                <div key={place.waterPlaceId}>
                  <span onClick={() => deleteSelectItem(place)}>
                    <MdClose />
                  </span>
                  <span>{place.waterPlaceName}</span>
                </div>
              ))}
            </div>
          )}
          <div className={styles.placeNameContainer}>
            {searchText
              ? waterPlaceList
                  .filter((place) => place.waterPlaceName.includes(searchText))
                  .map((place) => (
                    <WaterPlaceName
                      key={place.waterPlaceId}
                      el={place}
                      writePage={writePage}
                      selectPlace={selectPlace}
                      handleClickPlaceName={handleClickPlaceName}
                    />
                  ))
              : CHOSUNG_LIST.map((chosung) => {
                  return (
                    <div key={chosung} className={styles.placeNameBox}>
                      <span className={styles.placeTitle}>{chosung}</span>
                      {waterPlaceList
                        .filter(
                          (place) =>
                            getInitialSound(place.waterPlaceName) === chosung
                        )
                        .map((place) => (
                          <WaterPlaceName
                            key={place.waterPlaceId}
                            el={place}
                            writePage={writePage}
                            selectPlace={selectPlace}
                            handleClickPlaceName={handleClickPlaceName}
                          />
                        ))}
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
