import ProfileImgModal from './ProfileImgModal'
import styles from '@styles/user/ProfileImage.module.scss'
import { useRef, useState } from 'react'

const ProfileImage = ({ profileImg }: { profileImg: string | null }) => {
  const imgRef = useRef<HTMLInputElement>(null)
  const [userImg, setUserImg] = useState<string | null>(profileImg)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setUserImg(reader.result ? reader.result.toString() : '')
    }
  }

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        handleImagePreview(file)
        handleImageUpload(file)
        setIsModalOpen(false)
      }
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <form encType="multipart/form-data">
      <div className={styles.profileImg}>
        <div className={styles.profileUser} onClick={openModal}>
          <img
            src={userImg ?? process.env.PUBLIC_URL + '/img/user-profile.png'}
            alt="사용자 프로필 이미지"
          />
        </div>
        <input
          name="accountProfileImage"
          className={styles.profileInput}
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={handleFileChange}
          ref={imgRef}
        />
        <label onClick={openModal}>프로필 이미지 변경</label>
      </div>
      {isModalOpen && (
        <ProfileImgModal
          imgRef={imgRef}
          setUserImg={setUserImg}
          closeModal={closeModal}
        />
      )}
    </form>
  )
}

export default ProfileImage
