import React, { useEffect, useState } from 'react'
import './movies.css'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import TextTruncate from 'react-text-truncate';
import Cookies from 'js-cookie'
import FavouriteButton from '../../component/customButton/favouriteButton'

const Movies = ({ posts }) => {
    const [cookie, setCookie] = useState('');
    const [favourites, setFavourites] = useState([])

    const [counter, setCounter] = useState(0)
    const handleCounter = () => setCounter(counter + 1)

    useEffect(() => {
        setCookie(Cookies.get('id'))
        const getFavourites = async () => {
            if (cookie) {
                const { data } = await axios(`https://wootlab-moviedb.herokuapp.com/api/movie/favorites/${cookie}`);
                console.log(data)
                console.log(`this`)
                setFavourites(data.map(x => x.id));
            }
        }
        getFavourites()
    }, [cookie, counter])

    useEffect(() => {
        const getFavourites = async () => {
            if (cookie) {
                const { data } = await axios(`https://wootlab-moviedb.herokuapp.com/api/movie/favorites/${cookie}`);
                console.log(data)
                setFavourites(data.map(x => x.id));
            }
        }
        getFavourites()
    }, [cookie, counter])

    return (
        <div className="browse_card_holder">
            <Row gutter={[16, 24]}>
                {posts.map(post => (
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} key={post.id}>
                        <div className="card_holder">
                            <div className="card">
                                <div className="card_img_top">
                                    <img src={post.posterPath} alt="" />
                                </div>
                                <div className="card_body">
                                    <div className="title_date">
                                        <ul>
                                            <li>{post.title}</li>
                                            <li>
                                                <FavouriteButton favourite={favourites.indexOf(post.id) !== -1} updateFavourites={handleCounter} cookie={cookie} post={post.id} />
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
    );
}

export default Movies;