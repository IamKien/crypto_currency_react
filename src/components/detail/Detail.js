import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Detail.css';
import { handleResponse } from '../../helper';
import { renderChangePercent} from '../../helper';


//Will use a class because we need to use
//lifecycle hooks and state inside it

class Detail extends React.Component {
  constructor(){
    super();

    this.state = {
      currency: {},
      loading: false,
      error: null,

    };
  }


  //componentDidMount is only called once,
  //If you try to reload the page, it won't reload
  //because its already mounted.
  componentDidMount(){
    const currencyId = this.props.match.params.id;

    this.fetchCurrency(currencyId);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      //Get new currency ID from URL
      const newCurrencyId = nextProps.match.params.id;

      this.fetchCurrency(newCurrencyId);
    }
  }

  fetchCurrency(currencyId){

    this.setState( { loading: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
    .then(handleResponse)
    .then((currency) => {
      this.setState({
        loading: false,
        error: null,
        currency: currency,
      })
    })
    .catch((error) => {
      this.setState({
        loading: false,
        error: error.errorMessage,
      })
    });
  }

  
  render(){
    const { loading, error, currency } = this.state;

    // Redner loading component if its true
    if (loading){
      return <div className="loading-container"><Loading /></div>
    }

    if(error){
      return <div className="error">{error}</div>
    }

    return(

      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

      <div className="Detail-container">
        <div className="Detail-item">
          Price <span className="Detail-value"> $ {currency.price}</span>
        </div>

        <div className="Detail-item">
          Rank <span className="Detail-value"> {currency.rank}</span>
        </div>

        <div className="Detail-item">
          24H Change 
          <span className="Detail-value"> {renderChangePercent(currency.percentChange24h)}</span>
        </div>

        <div className="Detail-item">
          <span className="Detail-title">Market Cap</span>
          <span className="Detail-dollar">$</span>
          {currency.marketCap}
        </div>

        <div className="Detail-item">
          <span className="Detail-title">24H Volume</span>
          <span className="Detail-dollar">$</span>
          {currency.volume24h}
        </div>

        <div className="Detail-item">
          <span className="Detail-title">Total Supply</span>
          <span className="Detail-dollar">$</span>
          {currency.totalSupply}
        </div>
      </div>



      </div>
    );
  }
}


export default Detail;