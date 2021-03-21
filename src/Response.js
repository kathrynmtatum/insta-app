import React from 'react';

import css from './Response.module.css';

function Response(props) {
    return (
        <div className={css.response}>
            <span className={css.username}>{props.username}</span>
            <span className={css.text}>{props.text}</span>
        </div>
    );
}

export default Response;