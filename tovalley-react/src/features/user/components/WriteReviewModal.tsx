import { useState } from 'react'
import styles from '@styles/user/WriteReviewModal.module.scss'
import { BsCameraFill } from 'react-icons/bs'
import {
  FaRegFaceGrinSquint,
  FaRegFaceSmile,
  FaRegFaceFrown,
} from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
import { MdOutlineStar } from 'react-icons/md'
import { IoIosCloseCircle } from 'react-icons/io'
import axiosInstance from '@utils/axios_interceptor'
import ConfirmModal from '@component/ConfirmModal'
import Modal from '@component/Modal'
import { useSaveImg } from '@hooks/useSaveImg'
import QualityBtn from './QualityBtn'

const WriteReviewModal = ({
  handleModalClose,
  valleyInfo,
}: {
  handleModalClose: () => void
  valleyInfo: {
    id: number
    title: string
    addr: string
    tripDate: string
    people: number
    img: string | null
  }
}) => {
  const [review, setReview] = useState({
    quality: '',
    content: '',
  })
  const [confirm, setConfirm] = useState({ view: false, content: '' })
  const [rating, setRating] = useState<number>(0)
  const { uploadImg, imgFiles, saveImgFile, handleDeleteImage } = useSaveImg()

  const handleClickStar = (index: number) => {
    setRating(index)
  }

  const handleWriteReview = (e: any) => {
    e.preventDefault()
    const formData = new FormData()

    const quality =
      review.quality === '깨끗해요'
        ? 'CLEAN'
        : review.quality === '괜찮아요'
        ? 'FINE'
        : 'DIRTY'

    formData.append('tripScheduleId', `${valleyInfo.id}`)
    formData.append('waterQuality', quality)
    formData.append('rating', `${rating}`)
    formData.append('content', review.content)
    if (imgFiles.length !== 0) {
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('reviewImages', imgFiles[i])
      }
    }

    if (review.quality && review.content && rating) {
      setConfirm({
        view: true,
        content: '리뷰가 정상적으로 등록되었습니다.',
      })
    } else {
      setConfirm({ view: true, content: '항목을 모두 입력해주세요.' })
    }
  }

  return (
    <Modal>
      <form
        className={styles.modalBox}
        onSubmit={handleWriteReview}
        encType="multipart/form-data"
      >
        <div className={styles.writeTitle}>
          <span>리뷰쓰기</span>
          <span onClick={handleModalClose}>
            <MdClose />
          </span>
        </div>
        <div className={styles.writeDetail}>
          <div className={styles.valleyInfo}>
            <img
              src={
                valleyInfo.img ??
                process.env.PUBLIC_URL + '/img/default-image.png'
              }
              alt="계곡 이미지"
              width="120px"
            />
            <div className={styles.valleyInfoDetail}>
              <h4>{valleyInfo.title}</h4>
              <span>{valleyInfo.addr}</span>
              <div>
                <span>날짜</span>
                <span>{valleyInfo.tripDate}</span>
              </div>
              <div>
                <span>인원</span>
                <span>{valleyInfo.people}</span>
              </div>
            </div>
          </div>
          <div className={styles.writeStar}>
            {Array.from({ length: 5 }).map((_, index) => {
              const starIndex = index + 1
              return (
                <span key={index}>
                  <MdOutlineStar
                    color={starIndex <= rating ? '#66A5FC' : '#B5B5B5'}
                    onClick={() => handleClickStar(starIndex)}
                  />
                </span>
              )
            })}
          </div>
          <div className={styles.reviewContent}>
            <div className={styles.reviewTextarea}>
              <textarea
                placeholder="계곡에 대한 후기를 남겨주세요. (최소 10자 이상)"
                value={review.content}
                onChange={(e) =>
                  setReview({ ...review, content: e.target.value })
                }
                maxLength={256}
              />
              <span>{review.content.length}/256</span>
            </div>
            <label htmlFor="input-file">
              <div className={styles.pictureBtn}>
                <span>
                  <BsCameraFill size="26px" />
                </span>
                <input
                  className={styles.imgInput}
                  type="file"
                  accept="image/*"
                  id="input-file"
                  multiple
                  onChange={saveImgFile}
                />
                <span>사진 첨부하기</span>
              </div>
            </label>
            {uploadImg.length !== 0 && (
              <div className={styles.previewImg}>
                {uploadImg.map((image, id) => (
                  <div key={id} className={styles.imageContainer}>
                    <div>
                      <img src={`${image}`} alt={`${image}-${id}`} />
                    </div>
                    <span onClick={() => handleDeleteImage(id)}>
                      <IoIosCloseCircle color="#F6483D" size="30px" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.writeQuality}>
            <span>수질은 괜찮았나요?</span>
            <div>
              <QualityBtn review={review} setReview={setReview} name="깨끗해요">
                <FaRegFaceGrinSquint />
              </QualityBtn>
              <QualityBtn review={review} setReview={setReview} name="괜찮아요">
                <FaRegFaceSmile />
              </QualityBtn>
              <QualityBtn review={review} setReview={setReview} name="더러워요">
                <FaRegFaceFrown />
              </QualityBtn>
            </div>
          </div>
        </div>
        <div className={styles.reviewBtn}>
          <button type="button" onClick={handleModalClose}>
            취소
          </button>
          <button>등록</button>
        </div>
      </form>
      {confirm.view && (
        <ConfirmModal
          content={confirm.content}
          handleModal={
            confirm.content === '항목을 모두 입력해주세요.'
              ? setConfirm
              : undefined
          }
        />
      )}
    </Modal>
  )
}

export default WriteReviewModal
