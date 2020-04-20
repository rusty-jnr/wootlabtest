import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';

function FavouriteButton({ favourite, updateFavourites, cookie, post }) {

    const [isfavorite, setIsfavorite] = useState(null)
    const toggleIsFavourite = () => setIsfavorite(!isfavorite)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsfavorite(favourite)
    }, [favourite])

    const addToFavourite = async (e) => {
        if (cookie) {
            setIsLoading(true)
            try {
                let { status } = await axios.post("https://wootlab-moviedb.herokuapp.com/api/movie/favorite/add", {
                    movieId: e,
                    userId: cookie
                })
                if (status === 200) {
                    alert('Movie Added Successfully')
                    toggleIsFavourite()
                    setIsLoading(false)
                    updateFavourites()
                } else {
                    alert('Something went wrong, please try again')
                    setIsLoading(false)
                }
            } catch (e) {
                alert('Something went wrong, please try again')
                setIsLoading(false)
            }
            // window.location.reload()
        }

    }

    const removeFromFavourite = async (e) => {
        if (cookie) {
            setIsLoading(true)
            try {
                let { status } = await axios.put("https://wootlab-moviedb.herokuapp.com/api/movie/favorite/remove", {
                    movieId: e,
                    userId: cookie
                })
                if (status === 200) {
                    setIsLoading(false)
                    alert('Movie Removed Successfully')
                    toggleIsFavourite()
                    updateFavourites()
                } else {
                    setIsLoading(false)
                    alert('Something went wrong, please try again')
                }
            } catch (e) {
                setIsLoading(false)
                alert('Something went wrong, please try again')
            }
            // window.location.reload();
        }

    }

    return (
        <>
            {isLoading ?
                <div style={{ color: '#fff' }}>Loading ...</div>
                :
                <div>
                    {
                        !isfavorite ?
                            <Button type="primary" onClick={e => addToFavourite(post)}>Add to Favourite</Button>
                            :
                            <Button type="primary" onClick={e => removeFromFavourite(post)}>Remove from Favourite</Button>
                    }
                </div>

            }

        </>

    );
}

export default FavouriteButton;