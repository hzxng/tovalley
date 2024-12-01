import axiosInstance from '@utils/axios_interceptor'
import ProfileImgModal from './ProfileImgModal'
import styles from '@styles/user/ProfileImage.module.scss'
import { useRef, useState } from 'react'

const ProfileImage = ({ profileImg }: { profileImg: string | null }) => {
  const imgRef = useRef<HTMLInputElement>(null)
  const [userImg, setUserImg] = useState<string | null>(profileImg)
  const [modal, setModal] = useState(false)

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setModal(false)
        reader.result ? setUserImg(reader.result.toString()) : setUserImg('')
      }

      const formData = new FormData()
      if (file !== undefined) {
        formData.append('image', file)
      }

      axiosInstance
        .post('/api/auth/members/profile-image', formData)
        .then(() => {})
        .catch((err) => console.log(err))
    }
  }

  const handleModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <form encType="multipart/form-data">
      <div className={styles.profileImg}>
        <div className={styles.profileUser} onClick={handleModal}>
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
          onChange={saveImgFile}
          ref={imgRef}
        />
        <span onClick={handleModal}>프로필 이미지 변경</span>
      </div>
      {modal && (
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
