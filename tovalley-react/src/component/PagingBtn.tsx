import React, { useEffect, useState } from 'react'
import styles from './PagingBtn.module.scss'

const PagingBtn = ({
  page,
  setPage,
  totalPages,
  count,
}: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  count?: number
}) => {
  const [currPage, setCurrPage] = useState(page)

  useEffect(() => {
    setCurrPage(page - 1)
  }, [page])

  let firstNum = currPage - (currPage % 5) + 1
  let lastNum = currPage - (currPage % 5) + 5

  return (
    <div className={styles.paging}>
      <button
        onClick={() => {
          setPage(page - 1)
          setCurrPage(page - 2)
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      <button
        onClick={() => setPage(firstNum)}
        aria-current={page === firstNum ? 'page' : undefined}
      >
        {firstNum}
      </button>
      {Array(count ?? 4)
        .fill(0)
        .map((_, i) => {
          if (firstNum + 1 + i > totalPages) return null
          else {
            if (i < 3) {
              return (
                <button
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i)
                  }}
                  aria-current={page === firstNum + 1 + i ? 'page' : undefined}
                >
                  {firstNum + 1 + i}
                </button>
              )
            } else {
              return (
                <button
                  key={i + 1}
                  onClick={() => setPage(lastNum)}
                  aria-current={page === lastNum ? 'page' : undefined}
                >
                  {lastNum}
                </button>
              )
            }
          }
        })}
      <button
        onClick={() => {
          setPage(page + 1)
          setCurrPage(page)
        }}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default PagingBtn
