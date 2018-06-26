import React from 'react';
import { withRouter } from 'react-router-dom'
import './Search.css';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Loading  from './Loading';

class Search extends React.Component{
  constructor(){
    super();

    this.state = {
      searchResult: [],
      searchQuery: '',
      loading: false,
    };

    
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);

  }


  //Handle Change will get API info for autocomplete
  handleChange(event){
    const searchQuery = event.target.value;

    this.setState( { searchQuery: searchQuery })

    if(!searchQuery){
      return '';
    }

    this.setState({ loading: true})

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {

        this.setState({
        loading: false,
        searchResult: result,
      })
    })
  }

  handleRedirect(currencyId){
    // Clear input value and search query state
    // redirect click link to detail page
    this.setState({
      searchQuery: '',
      searchResult: [],
    });

    this.props.history.push(`/currency/${currencyId}`);
  }


  renderSearchResults(){
    const { searchResult, searchQuery, loading } = this.state;

  if(!searchQuery){
    return '';
  }


  if(searchResult.length > 0){
    return(
      <div className="Search-result-container">
        {searchResult.map( result => (
          <div 
          key={result.id}
          className="Search-result"
          onClick={ () => this.handleRedirect(result.id)}
          >
            {result.name} ({result.symbol})

          </div>
        ))}
      </div>
    );
   }

   if(!loading){
     return(
      <div className="Search-result-container">
        <div className="Search-no-result">
          No Result Found
        </div>
      </div>
     )
    }
  }


  render(){
    const { loading, searchQuery } = this.state;

    return(
      <div className="Search">
        <span className="Search-icon"/>
        <input 
        onChange={this.handleChange} 
        className="Search-input"
        type="text"
        placeholder="Currency Name"
        value={searchQuery}
        />


      {loading && 
        <div className="Search-loading">
          <Loading 
            width="12px"
            height="12px"
          />
        </div>}

        {this.renderSearchResults()}
        
      </div>
    );
  }
}

export default withRouter(Search);
