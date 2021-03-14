import React from 'react';

import css from './Response.module.css';

class Response extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={css.response}>
                <span className={css.username}>{this.props.username}</span>
                <span className={css.text}>{this.props.text}</span>
            </div>
        );
    }
}

export default Response;