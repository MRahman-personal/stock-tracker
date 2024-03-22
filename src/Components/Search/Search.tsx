import { FC } from "react";
import './Search.css'

interface SearchComponent {
  handleUpdate: React.ChangeEventHandler<HTMLInputElement>,
  searchValue: string
}

export const Search: FC<SearchComponent> = ({ handleUpdate, searchValue}) => {

  return (
    <div className="search">
    <form>
        <input 
          type="text" 
          value={searchValue}
          onChange={handleUpdate}
          placeholder="Search"
        />
    </form>
    </div>
  )
}

export default Search;
              