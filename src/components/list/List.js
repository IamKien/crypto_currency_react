import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import './Table.css';

class List extends React.Component {
  constructor(){
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
    };
  }

  componentDidMount(){
    this.setState({ loading: true });
    // USE Batik `` not '' for fetch

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
    .then(
      handleResponse
    )
    .then((data) => {
      this.setState({ 
        currencies: data.currencies, 
        loading: false})
    })
    .catch((error) => {
      this.setState({ 
        error: error.errorMessage, 
        loading: false})
    });
  }

  renderChangePercent(percent){
    if(percent > 0){
      return <span className="percent-raise"> {percent} % &uarr; </span>
    }else if (percent < 0){
      return <span className="percent-fallen"> {percent} % &darr; </span>
    }else{
      return <span> {percent} % </span>
    }
  }


  render(){

    if(this.state.loading){
      return <div> Loading... </div>
    }

    return(
      <div className="Table-container"> 
        <table className="Table"> 
          <thead className="Table-head">
            <tr>
              <th>Cryptocurrencies</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody className="able-body">
            {this.state.currencies.map((currency) => (
              <tr key={currency.id}>
               <td>
                <span className="Table-rank ">  {currency.rank} </span>
                  {currency.name}
               </td>
               <td className="Table-dollar">
                $ {currency.price}
               </td>
               <td className="Table-dollar">
                $ {currency.marketCap}
               </td>
               <td className="Table-dollar">
                $ {this.renderChangePercent(currency.percentChange24h)}
               </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>
    )
  }
}

export default List;