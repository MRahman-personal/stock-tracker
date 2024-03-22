import { FC, MouseEventHandler } from "react";
import './Sort.css'

interface SearchComponent {
  sortAlpha: MouseEventHandler<HTMLButtonElement>,
  sortAmount: MouseEventHandler<HTMLButtonElement>
}

export const Search: FC<SearchComponent> = ({ sortAlpha, sortAmount}) => {

  return (
    <div className="sort">
    <button type="button" onClick={sortAlpha}>Sort A-Z</button>
    <button type="button" onClick={sortAmount}>Sort High-Low</button>
    </div>
  )
}

export default Search;
              