import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import css from './NewPost.module.css';
import FileLoader from './FileLoader';
import { StoreContext } from './StoreContext';

function NewPost() {
    const {addPost} = useContext(StoreContext);
    const [dragging, setDragging] = useState(false);
    const [desc, setDesc] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const history = useHistory();

    function handleFileDragEnter(e) {
        setDragging(true);
    }

    function handleFileDragLeave(e) {
        setDragging(false);
    }
  
    function handleFileDrop(e){
        if (!e.dataTransfer.types.includes('Files')) {
            return;
        }
        if (e.dataTransfer.files.length >= 1) {
            const file = e.dataTransfer.files[0];
            if (file.size > 1000000) {
                return;
            }
            if (file.type.match(/image.*/)) {
                const reader = new FileReader();			
                reader.onloadend = (e) => {
                    setPhoto(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
        setDragging(false);    
    }

    function handleDescChange(e) {
        setDesc(e.target.value);
    }

    function handleSubmit(e) {
        try {
            addPost(photo, desc);
            setError('');
            history.push('/');
        } catch(err) {
            setError(err.message);
        }
        e.preventDefault();
    }

    return (
        <div>
            <div className={css.photo}>
                {!photo ?
                    <div className={css.message}>Drop your image</div> :
                    <img src={photo} alt="New Post"/>
                }
                <FileLoader
                onDragEnter={handleFileDragEnter}
                onDragLeave={handleFileDragLeave}
                onDrop={handleFileDrop}
                >
                    <div className={[css.dropArea, dragging ? css.dragging : null].join(' ')}></div>
                </FileLoader>
            </div>

            <div className={css.desc} >
                <textarea value={desc} onChange={e => handleDescChange(e)}/>
            </div>
            <div className={css.error}>
                {error}
            </div>
            <div className={css.actions}>
                <button onClick={e => history.push('/')}>Cancel</button>
                <button onClick={handleSubmit}>Share</button>      
            </div>
        </div>
    );
}

export default NewPost;