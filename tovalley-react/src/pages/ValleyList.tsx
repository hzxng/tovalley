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
import { Axios } from '@utils/axios_interceptor'

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
  const { innerWidth } = useMobile()

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
        ...(city !== '전체' && province !== '전국' && { city }),
        ...(searchWord && { searchWord }),
      }

      Axios.get('/api/water-place/list', { params })
        .then((res) => setList(res.data.data))
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

  if (!list) return <Loading />

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
