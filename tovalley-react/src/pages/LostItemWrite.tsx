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
  const [currentCategory, setCurrentCategory] = useState<'LOST' | 'FOUND'>(
    'LOST'
  )
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [modalView, setModalView] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<PlaceName[]>([])
  const [modalConfig, setModalConfig] = useState({
    confirm: { view: false, content: '', action: () => {} },
    alert: { view: false, content: '' },
  })
  const navigation = useNavigate()

  const handleCategoryClick = (category: 'LOST' | 'FOUND') =>
    setCurrentCategory(category)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const closeModal = () => setModalView(false)

  const closeAlert = () => {
    setModalConfig((prev) => ({ ...prev, alert: { view: false, content: '' } }))
  }

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPlace.length || !formData.title || !formData.content) {
      return setModalConfig((prev) => ({
        ...prev,
        alert: { view: true, content: '항목을 모두 입력해주세요.' },
      }))
    }

    const formDataObj = new FormData()
    formDataObj.append('category', currentCategory)
    formDataObj.append('waterPlaceId', `${selectedPlace[0].waterPlaceId}`)
    formDataObj.append('title', formData.title)
    formDataObj.append('content', formData.content)
    imgFiles.forEach((file) => formDataObj.append('postImage', file))

    axiosInstance
      .post('/api/auth/lostItem', formDataObj)
      .then(() =>
        setModalConfig((prev) => ({
          ...prev,
          confirm: {
            view: true,
            content: '글이 등록되었습니다.',
            action: () => navigation('/lost-item'),
          },
        }))
      )
      .catch(console.error)
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
                  [styles.clickCategory]:
                    currentCategory === (item === '찾아요' ? 'LOST' : 'FOUND'),
                })}
                onClick={() =>
                  handleCategoryClick(item === '찾아요' ? 'LOST' : 'FOUND')
                }
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
            {selectedPlace.length > 0 && (
              <span className={styles.valleySeleted}>
                {selectedPlace[0].waterPlaceName}
              </span>
            )}
          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.category}>
            <h4>주소</h4>
            {selectedPlace.length > 0 && (
              <span>{selectedPlace[0].address}</span>
            )}
          </div>
        </div>
        <div className={styles.contentWrap}>
          <input
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.contentWrap}>
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleInputChange}
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
        <button onClick={submitPost}>
          <span>
            <LuPencil />
          </span>
          등록하기
        </button>
        <div className={styles.cancleBtn} onClick={() => navigation(-1)}>
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
      {modalConfig.confirm.view && (
        <ConfirmModal
          content={modalConfig.confirm.content}
          CustomFunc={modalConfig.confirm.action}
        />
      )}
      {modalConfig.alert.view && (
        <ConfirmModal
          content={modalConfig.alert.content}
          CustomFunc={closeAlert}
        />
      )}
    </form>
  )
}

export default LostItemWrite
