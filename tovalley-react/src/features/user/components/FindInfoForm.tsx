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
    <div className={styles.container}>
      <h1>{title}</h1>
      <span>{explanation}</span>
      <div className={styles.findInfoInput}>{children}</div>
    </div>
  )
}

export default FindInfoForm
