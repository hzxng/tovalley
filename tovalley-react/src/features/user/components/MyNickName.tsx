import ConfirmModal from '@component/ConfirmModal'
import styles from '@styles/user/MyNickName.module.scss'
import axiosInstance from '@utils/axios_interceptor'
import { useState } from 'react'
import cn from 'classnames'

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{1,20}$/

const MyNickName = ({ userNickName }: { userNickName: string }) => {
  const [nickName, setNickName] = useState(userNickName)
  const [inputNick, setInputNick] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false)
  const [isNickValid, setIsNickValid] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputNick(value)
    setIsNickValid(NICKNAME_REGEX.test(value))
  }

  // 닉네임 중복 체크
  const handleDuplicateCheck = async () => {
    if (!isNickValid) {
      setModalContent('한/영, 숫자 포함 20자 이내로 작성해주세요.')
      return
    }

    try {
      const res = await axiosInstance.post('/api/members/check-nickname', {
        nickname: inputNick,
      })

      if (res.status === 200) {
        setModalContent('사용 가능한 닉네임입니다.')
        setIsDuplicateChecked(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 닉네임 수정
  const handleSaveNickname = async () => {
    try {
      await axiosInstance.post('/api/auth/members/set-nickname', {
        nickname: inputNick,
      })
      setNickName(inputNick)
      resetEditState()
    } catch (err) {
      console.error(err)
    }
  }

  const resetEditState = () => {
    setIsEditing(false)
    setInputNick('')
    setIsDuplicateChecked(false)
  }

  const handleEditClick = () => {
    setInputNick(nickName)
    setIsEditing(true)
    setIsDuplicateChecked(false)
  }

  const handleModalClose = () => setModalContent('')

  return (
    <div className={styles.userNickname}>
      <div className={styles.nicknameInput}>
        <span>닉네임</span>
        {isEditing ? (
          <input
            placeholder="닉네임"
            value={inputNick}
            onChange={handleInputChange}
            maxLength={20}
          />
        ) : (
          <span>{nickName}</span>
        )}
      </div>
      <div className={styles.nicknameBtn}>
        {isEditing ? (
          <>
            <span
              onClick={() => {
                isDuplicateChecked
                  ? handleSaveNickname()
                  : handleDuplicateCheck()
              }}
            >
              {isDuplicateChecked ? '저장' : '중복검사'}
            </span>
            <span onClick={resetEditState}>취소</span>
          </>
        ) : (
          <span
            onClick={handleEditClick}
            className={cn({ [styles.marginZero]: !nickName })}
          >
            수정
          </span>
        )}
      </div>
      {modalContent && (
        <ConfirmModal content={modalContent} handleModal={handleModalClose} />
      )}
    </div>
  )
}

export default MyNickName
