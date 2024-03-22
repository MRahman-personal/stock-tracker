import { FC, useState, useEffect } from 'react';
import {StockService} from '../StockService/StockService'
import Sort from '../Sort/Sort'
import Search from '../Search/Search'
import Loading from 'react-simple-loading'
import './Favorites.css';

interface FavoritesComponent {
  favorites: string[],
  removeFavorite: Function
}

interface StockData {
  id: number,
  name: string,
  price: number
}

const Favorites:FC<FavoritesComponent> = ({favorites, removeFavorite}) => {

const stockService = new StockService();
const [stocks, setStocks] = useState<StockData[]>([]);
const [searchStock, setSearchStock] = useState("")
const [laoading, setLoading] = useState(false);
const validStocks = ["AAL", "AAPL", "AMD", "AMZN", "BA", "COST", "DIS", "F", "GM", "GOOG", "INTC", "META", "MSFT", "NFLX", "NVDA", "PYPL", "QQQ", "SHOP", "SOFI", "SOFI", "SPY", "TSLA", "UBER", "UAL", "VOO"]

  useEffect(() => {
    callService(true)
  }, [favorites]);

  useEffect(() => {

    if(searchStock.trim().length == 0){
      callService(false)
    } else {
      if(validStocks.includes(searchStock.toUpperCase())){
        setStocks(stocks.filter(x => x.name.toLowerCase() == searchStock?.toLowerCase()))
      } else {
        callService(false)
      }
    } 
  }, [searchStock]);

const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (event:React.ChangeEvent<HTMLInputElement>) => {
  setSearchStock(event.target.value); 
}

const updateStocks = () => {
  callService(true)
}

async function callService(loading){
  
  if(loading == true)
    setLoading(true)

  var tempStocks = await stockService.getStocks();
  setLoading(false)

  if(tempStocks[0] != "Error"){
    setStocks(tempStocks[1].filter(x => favorites.includes(x.name)))
  } else {
    alert("An error occured, please try again after a minute")
  } 
} 

const sortAlpha = () => {
  var stocksCopy = JSON.parse(JSON.stringify(stocks))
  setStocks(stocksCopy.sort(((a, b) => a.name.localeCompare(b.name))))
}

const sortAmount = () => {
  var stocksCopy = JSON.parse(JSON.stringify(stocks))
  setStocks(stocksCopy.sort(((a, b) => parseFloat(b.price) - parseFloat(a.price))))
}

if(laoading == false){
  return (
    <>
    <button className="refresh" type="button" onClick={updateStocks}>Refresh Prices</button>
    <Search handleUpdate={updateSearch} searchValue={searchStock}/>
    <Sort sortAlpha={sortAlpha} sortAmount={sortAmount}/>
    <div className="stock-list-container">
      {stocks.map((stock) => (
        <div key={stock.id} className="stock-card">
          <div className="stock-details">
            <h2 className="stock-name">{stock.name}</h2>
            <p className="stock-price">${stock.price}</p>
            <button type="button" onClick={() => removeFavorite(stock.name)}>Remove Favorite</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
} else {
  return (
    <div id="loading">
    <Loading 
    color={'grey'}
    stroke={'10px'}
    size={'100px'} />
    </div>
    );
  }  
};

export default Favorites;
