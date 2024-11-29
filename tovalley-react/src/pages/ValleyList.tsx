import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/valleyList/ValleyList.module.scss'
import axios from 'axios'
import { ValleyList } from 'types/valley-list'
import Category from '@component/Category'
import RegionCategory from '@features/valleyList/components/RegionCategory'
import useDebounce from '@hooks/useDebounce'
import Search from '@features/valleyList/components/Search'
import ValleyItem from '@features/valleyList/components/ValleyItem'
import PagingBtn from '@component/PagingBtn'

const localhost = process.env.REACT_APP_HOST

type Params = {
  province: string
  sortCond: string
  page: number
  city?: string
  searchWord?: string
}

const ValleyListPage = () => {
  const [list, setList] = useState<ValleyList | null>(null)
  const [click, setClick] = useState({
    category: '전국',
    detail: false,
    region: { ko: '', en: '' },
  })
  const [sort, setSort] = useState<string>('평점')
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 1000)

  const [page, setPage] = useState<number>(1)
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeListener)
  })

  const getValleyList = useCallback(
    (
      province: string,
      city: string,
      sortCond: string,
      searchWord: string,
      page: number
    ) => {
      let params: Params = {
        province,
        sortCond,
        page,
      }

      if (city !== '전체' && province !== '전국') {
        params = {
          ...params,
          city,
        }
      }

      if (searchWord) {
        params = {
          ...params,
          searchWord,
        }
      }

      const config = { params }

      axios
        .get(`${localhost}/api/water-place/list`, config)
        .then((res) => {
          console.log(res)
          setList(res.data.data)
        })
        .catch((err) => console.log(err))
    },
    []
  )

  useEffect(() => {
    setPage(1)
  }, [click.category, click.region, sort, debouncedSearchText])

  useEffect(() => {
    getValleyList(
      click.category,
      click.region.ko,
      sort === '평점' ? 'rating' : 'review',
      debouncedSearchText,
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

  if (!list) {
    return <div>loading</div>
  } else
    return (
      <div className={styles.valleyListPage}>
        <div className={styles.body}>
          <RegionCategory click={click} setClick={setClick} />
          <div className={styles.valleyContainer}>
            <div>
              <div className={styles.top}>
                <div className={styles.sort}>
                  <Category
                    category={{ ko: '평점', en: 'rating' }}
                    clicked={sort}
                    setClicked={setSort}
                  />
                  <Category
                    category={{ ko: '리뷰', en: 'review' }}
                    clicked={sort}
                    setClicked={setSort}
                  />
                </div>
                <Search searchText={searchText} setSearchText={setSearchText} />
              </div>
              <div className={styles.valleyList}>
                {list.content.map((item) => (
                  <ValleyItem key={item.waterPlaceId} item={item} />
                ))}
              </div>
            </div>
            <PagingBtn
              page={page}
              setPage={setPage}
              totalPages={list.totalPages}
              count={innerWidth <= 500 ? 2 : 4}
            />
          </div>
        </div>
      </div>
    )
}

export default ValleyListPage
