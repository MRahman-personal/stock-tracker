import { useState, useEffect, FC } from 'react';
import Search from '../Search/Search'
import { StockService } from '../StockService/StockService'
import Sort from '../Sort/Sort'
import Loading from 'react-simple-loading'
import './Stocks.css';

interface StockComponent{
  handleFavorites: Function
}

interface StockData {
  id: number,
  name: string,
  price: number
}

const Stocks: FC<StockComponent> = ({ handleFavorites }) => {
  const stockService = new StockService();
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [searchStock, setSearchStock] = useState("")
  const [laoading, setLoading] = useState(false);
  var favoritesList = []
  const validStocks = ["AAL", "AAPL", "AMD", "AMZN", "BA", "COST", "DIS", "F", "GM", "GOOG", "INTC", "META", "MSFT", "NFLX", "NVDA", "PYPL", "QQQ", "SHOP", "SOFI", "SOFI", "SPY", "TSLA", "UBER", "UAL", "VOO"]

  useEffect(() => {
    callService(true)
  }, []);

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
  const search: React.FormEventHandler<HTMLFormElement> = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  async function callService(loading){

    if(loading == true)
      setLoading(true)

    var tempStocks = await stockService.getStocks();
    setLoading(false)
    
    if(tempStocks[0] != "Error"){
      setStocks(tempStocks[1])
    } else {
      alert("An error occured, please try again after a minute")
    } 
  } 
  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (event:React.ChangeEvent<HTMLInputElement>) => {

    setSearchStock(event.target.value);

  }

  const updateStocks = () => {
    callService(true)
  }

  const addFavorite = (name) => {
    localStorage.setItem("favorites", JSON.stringify(favoritesList.push(name)));
    alert("Favorite added")
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
              <button type="button" onClick={() => handleFavorites(stock.name)}>Add Favorite</button>
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

export default Stocks;
