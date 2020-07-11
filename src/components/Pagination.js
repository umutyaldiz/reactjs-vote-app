import React from 'react'

const Pagination = ({ currentPage, postsPerPage, TotalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(TotalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination" >
            {pageNumbers.map((number, index) => (
                <button key={index} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''} >
                    {number}
                </button>
            ))}
            <span className="info">Total Link : {TotalPosts}</span>
        </div>
    )
}

export default Pagination;