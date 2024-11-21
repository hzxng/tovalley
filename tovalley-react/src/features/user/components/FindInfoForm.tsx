import React from 'react'
import styles from '@styles/user/FindInfoForm.module.scss'

const FindInfoForm = ({
  title,
  explanation,
  children,
}: {
  title: string
  explanation: string
  children: React.ReactNode
}) => {
  return (
    <>
      <h1>{title}</h1>
      <span>{explanation}</span>
      <div className={styles.findInfoInput}>{children}</div>
    </>
  )
}

export default FindInfoForm
