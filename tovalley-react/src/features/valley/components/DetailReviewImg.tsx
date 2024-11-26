import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styles from '@styles/valley/DetailReviewImg.module.scss'

const DetailReviewImg = ({
  detailReview,
  setDetailReview,
}: {
  detailReview: {
    view: boolean
    images: string[]
  }
  setDetailReview: React.Dispatch<
    React.SetStateAction<{
      view: boolean
      images: string[]
    }>
  >
}) => {
  useEffect(() => {
    document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  const [imgUrl, setImgUrl] = useState(detailReview.images[0])
  const hanldeClose = () => {
    setDetailReview({ ...detailReview, view: false })
  }

  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgBox}>
        <span className={styles.close} onClick={hanldeClose}>
          <IoCloseOutline />
        </span>
        <div className={styles.reviewImg}>
          <img src={imgUrl} alt="리뷰 이미지" />
          <div className={styles.imgList}>
            {detailReview.images.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  alt="리뷰 이미지"
                  onClick={() => setImgUrl(item)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DetailReviewImg
