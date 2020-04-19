import React, { useState, useEffect } from 'react'
import './home.css'
import SiteLayout from '../../component/layout/Layout'
import MiniPreloader from '../../component/preloader/innerPreloader'
import wootmovie from '../../assets/img/wootmovie.png'
import Movies from '../../component/movies/movies'
import Paginate from '../../component/pagination/pagination'

const Home = () => {

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(true)
        fetch('https://wootlab-moviedb.herokuapp.com/api/movie/list/all')
        .then(res => res.json())
        .then(response => {
            setPosts(response)
            setIsLoading(false)
        })
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (e) => {
        setCurrentPage(e)
    }

    return(
        <SiteLayout>
            <div className="home_header">
                <img src={wootmovie} alt=""/>
            </div>
            <div className="movies_holder">
                <MiniPreloader isLoading={isLoading}/>
                <Movies posts={currentPosts}/>
                <Paginate postPerPage={postPerPage} totalPosts={posts.length} currentPage={currentPage} changePage={changePage} />
            </div>
        </SiteLayout>
    );
}

export default Home;