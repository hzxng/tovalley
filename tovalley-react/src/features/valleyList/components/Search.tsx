import styles from '@styles/valleyList/Search.module.scss'
import { BiSearchAlt2 } from 'react-icons/bi'

const Search = ({
  searchText,
  setSearchText,
}: {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className={styles.search}>
      <input
        value={searchText}
        placeholder="계곡을 검색해보세요"
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
      />
      <span>
        <BiSearchAlt2 size="22px" color="#838383" />
      </span>
    </div>
  )
}

export default Search
