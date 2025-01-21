import styles from '@styles/user/ProfileImgModal.module.scss'
import Modal from '@component/Modal'

const ProfileImgModal = ({
  imgRef,
  setUserImg,
  closeModal,
}: {
  imgRef: React.RefObject<HTMLInputElement>
  setUserImg: React.Dispatch<React.SetStateAction<string | null>>
  closeModal: () => void
}) => {
  const deleteProfileImg = (e: React.MouseEvent) => {
    e.preventDefault()
    if (imgRef.current) {
      imgRef.current.value = ''
      setUserImg('/img/user-profile.png')
      closeModal()
    }
  }

  return (
    <Modal>
      <div className={styles.profileUpdate}>
        <div>
          <h1>프로필 사진 바꾸기</h1>
        </div>
        <div>
          <label htmlFor="profileImg">
            <h2>사진 업로드</h2>
          </label>
        </div>
        <div>
          <h2 onClick={(e) => deleteProfileImg(e)}>기본 이미지로 변경</h2>
        </div>
        <div>
          <p onClick={closeModal}>취소</p>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileImgModal
