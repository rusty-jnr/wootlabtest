import React from 'react'
import './pagination.css'
import { Pagination } from 'antd';

const Paginate = ({  postPerPage, totalPosts, currentPage, changePage }) => {

    return(
        <Pagination  showSizeChanger current={currentPage} total={totalPosts} pageSize={postPerPage} onChange={changePage} />
    );
}

export default Paginate;