import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Loading from '../common/Loading'
import Table from './Table';
import Pagination from './Pagination';


class List extends React.Component {
  constructor(){
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount(){
    this.fetchCurrencies()
  }

  fetchCurrencies(){
    this.setState({ loading: true });
    // USE Batik `` not '' for fetch

    const {page} = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=10`)
    .then(
      handleResponse
    )
    .then((data) => {
      const { currencies, totalPages} = data;

      this.setState({ 
        currencies, 
        //currencies: currencies same as above , 
        totalPages,
        //totalPages: totalPages, same as above
        loading: false})
    })
    .catch((error) => {
      this.setState({ 
        error: error.errorMessage, 
        loading: false})
    });

  }

  handlePaginationClick(direction){
    //We use Let instead of Const because we resign its value
    let nextPage = this.state.page;

    if(direction === 'next'){
      nextPage++;
    }else{
      nextPage--;
    }

    this.setState({ page: nextPage }, () => {
      //use a callack to call fetchCurrencies
      //inside setState so we use the updated value
      this.fetchCurrencies();
    }


    );
  }


  render(){
    const {currencies, page, totalPages } = this.state;

    // Render Loading Component if loading is true
    if(this.state.loading){
      return <div className="loading-container"> <Loading /> </div>
    }
    // Render Error Component if error is occur when fetching data
    if(this.state.error){
      return <div className="error">{this.state.error} </div>
    }

    return(
      <div>
        <Table currencies={currencies}
        />

        <Pagination 
          page={page}
          totalPages={totalPages}
          //we use this so we can pass it to Pagination Component
          handlePaginationClick={this.handlePaginationClick}
        />

      </div>
    )
  }
}

export default List;