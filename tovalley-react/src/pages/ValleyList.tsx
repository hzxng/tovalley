import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/valleyList/ValleyList.module.scss'
import { ValleyList } from 'types/valley-list'
import Category from '@component/Category'
import RegionCategory from '@features/valleyList/components/RegionCategory'
import useDebounce from '@hooks/useDebounce'
import Search from '@features/valleyList/components/Search'
import ValleyItem from '@features/valleyList/components/ValleyItem'
import PagingBtn from '@component/PagingBtn'
import useMobile from '@hooks/useMobile'
import Loading from '@component/Loading'
import {
  seoul,
  seoulReview,
  whole1,
  whole2,
  whole3,
  whole4,
  whole5,
  wholeReview1,
  wholeReview2,
  wholeReview3,
  wholeReview4,
  wholeReview5,
} from 'dummy/valley-list-data'

const ValleyListPage = () => {
  const [list, setList] = useState<ValleyList | null>(whole1)
  const [click, setClick] = useState({
    category: '전국',
    detail: false,
    region: { ko: '', en: '' },
  })
  const [sort, setSort] = useState<string>('평점')
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 1000)

  const [page, setPage] = useState<number>(1)
  const { innerWidth } = useMobile()

  const getValleyList = useCallback(
    (province: string, sortCond: string, page: number) => {
      if (province === '전국') {
        if (sortCond === 'rating') {
          if (page === 0) setList(whole1)
          else if (page === 1) setList(whole2)
          else if (page === 2) setList(whole3)
          else if (page === 3) setList(whole4)
          else if (page === 4) setList(whole5)
        } else {
          if (page === 0) setList(wholeReview1)
          else if (page === 1) setList(wholeReview2)
          else if (page === 2) setList(wholeReview3)
          else if (page === 3) setList(wholeReview4)
          else if (page === 4) setList(wholeReview5)
        }
      } else if (province === '서울특별시') {
        if (sortCond === 'rating') setList(seoul)
        else setList(seoulReview)
      }
    },
    []
  )

  useEffect(() => {
    setPage(1)
  }, [click.category, click.region, sort, debouncedSearchText])

  useEffect(() => {
    getValleyList(
      click.category,
      sort === '평점' ? 'rating' : 'review',
      page - 1
    )
  }, [
    click.category,
    click.region,
    sort,
    debouncedSearchText,
    page,
    getValleyList,
  ])

  return (
    <div className={styles.valleyListPage}>
      <div className={styles.body}>
        <RegionCategory click={click} setClick={setClick} />
        <div className={styles.valleyContainer}>
          <div>
            <div className={styles.top}>
              <div className={styles.sort}>
                {['평점', '리뷰'].map((ko, idx) => (
                  <Category
                    key={idx}
                    category={{ ko, en: ko === '평점' ? 'rating' : 'review' }}
                    clicked={sort}
                    setClicked={setSort}
                  />
                ))}
              </div>
              <Search searchText={searchText} setSearchText={setSearchText} />
            </div>
            <div className={styles.valleyList}>
              {list!.content.map((item, idx) => (
                <ValleyItem key={item.waterPlaceId} item={item} idx={idx} />
              ))}
            </div>
          </div>
          <PagingBtn
            page={page}
            setPage={setPage}
            totalPages={list!.totalPages}
            count={innerWidth <= 500 ? 2 : 4}
          />
        </div>
      </div>
    </div>
  )
}

export default ValleyListPage
