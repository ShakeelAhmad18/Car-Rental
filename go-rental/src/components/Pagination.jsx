import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick,pageCount }) => {
  
  
  return (
    <div className="blog-pagination ">
      <nav>
        <ul className="pagination page-item justify-content-center">
          <li className="previtem">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <a className="page-link">
                  Next <i className="fas fa-regular fa-arrow-right ms-2" />
                </a>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={
                <a className="page-link">
                  <i className="fas fa-regular fa-arrow-left me-2" />
                  Prev
                </a>
              }
              renderOnZeroPageCount={null}
              containerClassName="pagination page-item justify-content-center"
              activeLinkClassName="page-link"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default Pagination
