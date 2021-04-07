import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
            }} />
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);
//for conventiontional passign off prop we have to pass history object from homepage to directory 
//and directory to menu item which is called "prop tunneling"
//"withRouter" is a HOC of "react-router-dom" which returns as the powered component in form of MenuItem
//which allow us to access routing variables like match and history which in our case accessible to Homepage
//only if not passed through "prop tunneling"