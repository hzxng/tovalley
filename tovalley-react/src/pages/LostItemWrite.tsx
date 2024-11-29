import { useState } from 'react'
import { LuPencil } from 'react-icons/lu'
import { FaPlus } from 'react-icons/fa6'
import { AiFillPicture } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import styles from '@styles/lostItem/LostItemWrite.module.scss'
import { useNavigate } from 'react-router-dom'
import { PlaceName } from 'types/lost-found'
import ValleyModal from '@features/lostItem/components/ValleyModal'
import cn from 'classnames'
import axiosInstance from '@utils/axios_interceptor'
import ConfirmModal from '@component/ConfirmModal'
import { useSaveImg } from '@hooks/useSaveImg'

const LostItemWrite = () => {
  const { uploadImg, imgFiles, saveImgFile, handleDeleteImage } = useSaveImg()
  const [currentCategory, setCurrentCategory] = useState('찾아요')
  const clickCategory = (category: string) => {
    setCurrentCategory(category)
  }
  const [write, setWrite] = useState({
    title: '',
    content: '',
  })
  const [modalView, setModalView] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<PlaceName[]>([])
  const [confirm, setConfirm] = useState({ view: false, content: '' })
  const [alert, setAlert] = useState({ view: false, content: '' })
  const navigation = useNavigate()

  const toBack = () => {
    navigation(-1)
  }

  const closeModal = () => {
    setModalView(false)
  }

  const moveToListPage = () => {
    window.location.replace('/lost-item')
  }

  const writeLostPost = (e: any) => {
    e.preventDefault()
    const formData = new FormData()

    let category
    if (currentCategory === '찾아요') category = 'LOST'
    else category = 'FOUND'

    if (!selectedPlace.length || !write.title || !write.content) {
      setAlert({ view: true, content: '항목을 모두 입력해주세요.' })
    } else {
      formData.append('category', category)
      formData.append('waterPlaceId', `${selectedPlace[0].waterPlaceId}`)
      formData.append('title', write.title)
      formData.append('content', write.content)
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('postImage', imgFiles[i])
      }

      axiosInstance
        .post('/api/auth/lostItem', formData)
        .then((res) => {
          console.log(res)
          res.status === 201 &&
            setConfirm({
              view: true,
              content: '글이 등록되었습니다.',
            })
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <form className={styles.body} encType="multipart/form-data">
      <div className={styles.writeContainer}>
        <div className={styles.contentWrap}>
          <div className={styles.category}>
            <h4>카테고리</h4>
            {['찾아요', '찾았어요'].map((item) => (
              <span
                key={item}
                className={cn(styles.categoryBtn, {
                  [styles.clickCategory]: currentCategory === item,
                })}
                onClick={() => clickCategory(item)}
              >
                {item}
              </span>
            ))}
          </div>
          <div className={styles.category}>
            <h4>계곡</h4>
            <span
              className={styles.categoryBtn}
              onClick={() => setModalView(true)}
            >
              계곡 선택
            </span>
            {selectedPlace.length !== 0 && (
              <span className={styles.valleySeleted}>
                {selectedPlace[0].waterPlaceName}
              </span>
            )}
          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.category}>
            <h4>주소</h4>
            {selectedPlace.length !== 0 && (
              <span>{selectedPlace[0].address}</span>
            )}
          </div>
        </div>
        <div className={styles.contentWrap}>
          <input
            placeholder="제목을 입력하세요"
            onChange={(e) => setWrite({ ...write, title: e.target.value })}
          />
        </div>
        <div className={styles.contentWrap}>
          <textarea
            placeholder="내용을 입력하세요"
            onChange={(e) => setWrite({ ...write, content: e.target.value })}
          />
        </div>
        {!uploadImg.length ? (
          <label htmlFor="input-file">
            <input
              className={styles.imgInput}
              type="file"
              accept="image/*"
              id="input-file"
              multiple
              onChange={saveImgFile}
            />
            <div className={styles.addImgIcon}>
              <AiFillPicture />
            </div>
          </label>
        ) : (
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
            <label htmlFor="input-file">
              <input
                className={styles.imgInput}
                type="file"
                accept="image/*"
                id="input-file"
                multiple
                onChange={saveImgFile}
              />
              <div className={styles.addImg}>
                <FaPlus />
              </div>
            </label>
          </div>
        )}
      </div>
      <div className={styles.uploadBtn}>
        <button onClick={writeLostPost}>
          <span>
            <LuPencil />
          </span>
          등록하기
        </button>
        <div className={styles.cancleBtn} onClick={toBack}>
          취소
        </div>
      </div>
      {modalView && (
        <ValleyModal
          setSelectedPlace={setSelectedPlace}
          closeModal={closeModal}
          writePage={true}
        />
      )}
      {confirm.view && (
        <ConfirmModal content={confirm.content} CustomFunc={moveToListPage} />
      )}
      {alert.view && (
        <ConfirmModal content={alert.content} handleModal={setAlert} />
      )}
    </form>
  )
}

export default LostItemWrite
