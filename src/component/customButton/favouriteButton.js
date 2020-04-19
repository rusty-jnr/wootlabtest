import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import { Button } from 'antd';

function FavouriteButton(props) {

    const [cookie, setCookie] = useState('');
    const [isfavorite, setIsfavorite] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCookie(Cookies.get('id'))
        if(cookie){
            const fetchBookList = async () => {
                setIsLoading(true)
                const { data } = await axios(`https://wootlab-moviedb.herokuapp.com/api/movie/favorites/${cookie}`);
                data.forEach(post => {
                    if(post.id === props.id){
                        setIsfavorite(true)
                    }
                })
                setIsLoading(false)
            }
    
            fetchBookList();
        }
    }, [cookie, props.id, props.count])

    return(

        <>
            {isLoading ? 
                <div style={{ color: '#fff' }}>Loading ...</div>
             : 
             <div>
                {
                    !isfavorite ?
                    <Button type="primary" onClick={e => props.addToFavourite(props.id)}>Add to Favourite</Button>
                    
                        :
                    <Button type="primary" onClick={e => props.removeFromFavourite(props.id)}>Remove from Favourite</Button>
                }
             </div>
                
            }
            
        </>
        
    );
}

export default FavouriteButton;