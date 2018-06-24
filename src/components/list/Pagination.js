import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { page, totalPages, handlePaginationClick} = props;

  return(
   <div className="Pagination"> 
    <button className="Pagination-button"
      onClick={() => handlePaginationClick('prev')}
//In React, onClick will load automatically with parnthesis, 
// You need to use () => or bind(this, "any name") to add argument
//onClick={() => handlePaginationClick('name')
// same as
// onClick={handlePaginationClick.bind(this, 'name')
      disabled={page <= 1}
    >
      &larr;
    </button>

    <span className="Pagination-info">
      Page <b>{page}</b> of <b>{totalPages}</b>
    </span>

    <button className="Pagination-button"
      onClick={handlePaginationClick.bind(this, 'next')}
      disabled={page >= totalPages}
    >
      &rarr;
    </button>

   </div>
 )
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
}

export default Pagination;