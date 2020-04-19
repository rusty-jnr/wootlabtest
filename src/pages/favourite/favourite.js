import React, { useState, useEffect } from 'react'
import './favourite.css'
import { NavLink } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import MiniPreloader from '../../component/preloader/innerPreloader'
import SiteLayout from '../../component/layout/Layout'
import TextTruncate from 'react-text-truncate';
import Cookies from 'js-cookie'
import Paginate from '../../component/pagination/pagination'

const Favourite = () => {
    var cookie = Cookies.get('id');
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(true)
        fetch(`https://wootlab-moviedb.herokuapp.com/api/movie/favorites/${cookie}`)
        .then(res => res.json())
        .then(response => {
            setPosts(response)
            setIsLoading(false)
        })
    }, [count, cookie])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (e) => {
        setCurrentPage(e)
    }

    const removeFromFavourite = (e) => {
        fetch('https://wootlab-moviedb.herokuapp.com/api/movie/favorite/remove', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: e,
                userId: cookie
            }),
        })
        setCount(count + 1)
    }


    return(
        <SiteLayout>
            <div className="favourite_header">
                <h2>Favourite Movies</h2>
            </div>
            <div className="favourite_holder">
                <MiniPreloader isLoading={isLoading}/>
                <div className="favourite_card_holder">
                    <Row gutter={[ 16,24 ]}>

                    {posts.length === 0 ?
                        <div className="fav">
                            <h1>No Favourites availbale</h1>
                        </div>
                        
                        :
                        currentPosts.map(post => (
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span:6 }} key={post.id}>
                            <div className="card_holder">
                                <div className="card">
                                    <div className="card_img_top">
                                        <img src={post.posterPath} alt=""/>
                                    </div>
                                    <div className="card_body">
                                        <div className="title_date">
                                            <ul>
                                                <li>{post.title}</li>
                                                <li>
                                                    <Button type="primary" onClick={e => removeFromFavourite(post.id)}>Remove from Favourite</Button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="runtime">
                                            <p>Runtime: {post.runtime} mins</p>
                                        </div>
                                        <div className="overview">
                                        <TextTruncate
                                            line={3}
                                            element="p"
                                            truncateText="…"
                                            text={post.overview}
                                            
                                        />
                                        </div>
                                        <div className="release_date">
                                            <p>Release Date</p>
                                            <p>{post.releaseDate.join('-')}</p>
                                        </div>
                                        <div className="read_more">
                                            <NavLink exact to={`/view/${post.id}/${post.title}`}>
                                                <Button type="primary">View Movie</Button>
                                            </NavLink>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
            
                    </Row>
                </div>
                {
                    posts.length === 0 ?
                    ''
                    :
                    <Paginate postPerPage={postPerPage} totalPosts={posts.length} currentPage={currentPage} changePage={changePage} />
                }
                
                
            </div>
        </SiteLayout>
    );
}

export default Favourite;