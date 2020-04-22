import React, { useState, useEffect } from 'react'
import './view.css'
import MiniPreloader from '../../component/preloader/innerPreloader'
import { useParams } from 'react-router-dom';
import { Row, Col, Modal } from 'antd';
import SiteLayout from '../../component/layout/Layout'

const View = () => {
    let { id } = useParams();

    const [visible, setVisible] = useState(false)
    const [link, setLink] = useState('')
    const [fetchedMovie, setFetchedmovie] = useState({})
    const [genre, setGenre] = useState([])
    const [videos, setVideos] = useState([])
    const [date, setDate] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://wootlab-moviedb.herokuapp.com/api/movie/detail/${id}`)
        .then(res => res.json())
        .then(response => {
            setFetchedmovie(response)
            const { genres, vidoes, releaseDate } = response
            setGenre(genres) 
            setVideos(vidoes)
            setDate(releaseDate)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [id])

    const showModal = (e) => {
        setLink(e)
        setVisible(true)
    };

    const handleCancel = e => {
        setVisible(false)
    };

    return(
        <SiteLayout>
            <div className="view_movies" style={{ position: 'relative' }}>
                <MiniPreloader isLoading={isLoading}/>
                <section className="container-fluid p-0 position-relative first-sec-post">
          
                    <div className="movie-view-banner">
                        <img src={fetchedMovie.backdropPath} alt="" className="img-fluid" />
                    </div>
                    
                    <div className="movie_det">
                        <div className="title">
                            <h2>{fetchedMovie.title}</h2>
                        </div>
                        <div className="overview">
                            <p>{fetchedMovie.overview}
                            </p>
                        </div>
                        <div className="details">
                            <ul>
                                <li>Vote: {fetchedMovie.voteAverage}</li>
                                <li>Release Date: {date.join('-')}</li>
                            </ul>
                        </div>
                        <div className="genres">
                            <p>Genres</p>
                            <ul>

                                {
                                    genre.map((genre, index) => (
                                        <li key={index}>{genre.name}</li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                        <div className="videos">
                            <Row gutter={[ 16,24 ]}>

                                {
                                    videos.map((video, index) => (

                                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span:8 }} key={index}>
                                        <div className="card_holder">
                                            <div className="card" onClick={e => showModal(video.key)}>
                                                <div className="card_img_top">
                                                    <iframe src={`https://www.youtube.com/embed/${video.key}`}
                                                    width="100%" height="100%" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" title="movies" allowFullScreen></iframe>
                                                </div>
                                                <div className="backdrop"></div>
                                            </div>
                                            <div className="card_footer">
                                                <p>{video.name}</p>
                                            </div>
                                        </div>
                                    </Col>

                                    ))
                                }

                            </Row>
                        </div>
                    </div>

                    <Modal
                    visible={visible}
                    onCancel={handleCancel}
                    >
                        <iframe src={`https://www.youtube.com/embed/${link}`}
                        width="100%" height="100%" frameBorder="0" title="movies" allowFullScreen></iframe>
                    </Modal>

                </section>

            </div>
            
        </SiteLayout>
    );
}

export default View;