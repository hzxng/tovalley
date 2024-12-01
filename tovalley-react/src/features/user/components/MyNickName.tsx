import ConfirmModal from '@component/ConfirmModal'
import styles from '@styles/user/MyNickName.module.scss'
import axiosInstance from '@utils/axios_interceptor'
import { useState } from 'react'
import cn from 'classnames'

const MyNickName = ({ userNickName }: { userNickName: string }) => {
  const [nickName, setNickName] = useState(userNickName)
  const [inputNick, setInputNick] = useState('')
  const [nickUpdate, setNickUpdate] = useState({
    click: false,
    duplicateCheck: false,
    available: false,
  })
  const [confirmView, setConfirmView] = useState({
    view: false,
    content: '',
  })

  const checkNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^[가-힣a-zA-Z0-9]{1,10}$/
    if (regExp.test(e.target.value) === true) {
      setNickUpdate({ ...nickUpdate, available: true })
    } else {
      setNickUpdate({ ...nickUpdate, available: false })
    }
  }

  // 닉네임 중복 체크
  const checkDuplication = () => {
    const data = {
      nickname: inputNick,
    }

    nickUpdate.available
      ? axiosInstance
          .post(`/api/members/check-nickname`, data)
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              setConfirmView({
                view: true,
                content: '사용 가능한 닉네임입니다.',
              })
              setNickUpdate({ ...nickUpdate, duplicateCheck: true })
            }
          })
          .catch((err) => console.log(err))
      : setConfirmView({
          view: true,
          content: '한/영, 숫자 포함 20자 이내로 작성해주세요.',
        })
  }

  // 닉네임 수정
  const handleResetNickname = () => {
    setNickName(inputNick)

    const data = {
      nickname: inputNick,
    }

    axiosInstance
      .post('/api/auth/members/set-nickname', data)
      .then((res) => {
        console.log(res)
        setNickUpdate({ ...nickUpdate, click: false })
      })
      .catch((err) => console.log(err))
  }

  const handleClickUpdate = () => {
    if (!inputNick) {
      setInputNick(nickName)
      setNickUpdate({
        ...nickUpdate,
        duplicateCheck: false,
        click: true,
      })
    } else
      setNickUpdate({
        ...nickUpdate,
        duplicateCheck: false,
        click: true,
      })
  }

  return (
    <div className={styles.userNickname}>
      <div className={styles.nicknameInput}>
        <span>닉네임</span>
        {nickUpdate.click ? (
          <input
            placeholder="닉네임"
            value={inputNick}
            onChange={(e) => setInputNick(e.target.value)}
            onBlur={checkNickname}
            maxLength={20}
          />
        ) : (
          <span>{nickName}</span>
        )}
      </div>
      <div className={styles.nicknameBtn}>
        {nickUpdate.click ? (
          <>
            <span
              onClick={() => {
                if (!nickUpdate.duplicateCheck) checkDuplication()
                else handleResetNickname()
              }}
            >
              {nickUpdate.duplicateCheck ? '저장' : '중복검사'}
            </span>
            <span
              onClick={() => {
                setNickUpdate({
                  ...nickUpdate,
                  duplicateCheck: false,
                  click: false,
                })
              }}
            >
              취소
            </span>
          </>
        ) : (
          <span
            onClick={handleClickUpdate}
            className={cn({ [styles.marginZero]: !nickName })}
          >
            수정
          </span>
        )}
      </div>
      {confirmView.view && (
        <ConfirmModal
          content={confirmView.content}
          handleModal={setConfirmView}
        />
      )}
    </div>
  )
}

export default MyNickName
