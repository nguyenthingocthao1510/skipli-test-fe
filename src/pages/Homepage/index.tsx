import Cookies from 'js-cookie';
import React from 'react'

export const Homepage = () => {
    const token = Cookies.get('token');
    return (
        <div>
            <p>Homepage</p>
        </div>
    )
}
