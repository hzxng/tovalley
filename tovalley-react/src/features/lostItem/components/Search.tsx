import styles from '@styles/lostItem/Search.module.scss'
import { IoSearch } from 'react-icons/io5'

const Search = ({
  search,
  setSearch,
}: {
  search: {
    text: string
    click: boolean
  }
  setSearch: React.Dispatch<
    React.SetStateAction<{
      text: string
      click: boolean
    }>
  >
}) => {
  const handleSearch = () => {
    if (search.text) setSearch({ ...search, click: true })
  }

  return (
    <div className={styles.search}>
      <input
        placeholder="검색어를 입력해주세요."
        value={search.text}
        onChange={(e) => setSearch({ ...search, text: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
      />
      <span onClick={handleSearch}>
        <IoSearch />
      </span>
    </div>
  )
}

export default Search
