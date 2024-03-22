import { StockData } from './StockDataInterface'

export class StockService {
  cachedStocks: StockData[] = JSON.parse(localStorage.getItem("cachedStocks"));
  queryStocks:string[] = ["AAL", "AAPL", "AMD", "AMZN", "BA", "COST", "DIS", "F", "GM", "GOOG", "INTC", "META", "MSFT", "NFLX", "NVDA", "PYPL", "QQQ", "SHOP", "SOFI", "SOFI", "SPY", "TSLA", "UBER", "UAL", "VOO"]
  apiKey = process.env.REACT_APP_API_KEY

  async getStocks(){
    let responseData:StockData[] = []
    let responseObject = []
    let stockId = 0
    for(let stock of this.queryStocks){
      stockId++

      const response = await fetch("https://finnhub.io/api/v1/quote?symbol=" + stock + "&token=" + this.apiKey);
      const stocks = await response.json();
      console.log(stocks.c)

      if(await stocks.c == undefined){
        if(this.cachedStocks.length > 0){
          responseObject.push("Limit Exceeded")
          responseObject.push(this.cachedStocks)
          return responseObject
        } else {
          responseObject.push("Error")
          return responseObject
        }
      }
      responseData.push({id:stockId, name:stock, price:stocks.c})
    }
    responseObject.push("Success")
    responseObject.push(responseData)
    this.cachedStocks = responseData;
    window.localStorage.setItem("cachedStocks", JSON.stringify(responseData));

    return responseObject;
  }
}