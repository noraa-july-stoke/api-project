import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal";
import './ReviewFormModal.css';

const ReviewFormModal = () => {

    const dispatch = useDispatch();
    const [stars, setStars] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
    //     setErrors([]);
    //     return dispatch(sessionActions.thunkLogin({ credential, password }))
    //         .then(closeModal)
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    // })
};

    // const handleDemoClick = e => {
    //     e.preventDefault();
    //     setCredential('user1');
    //     setPassword('password')
    // }

    return (

        <>
            <h1>Add A Review</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>) : null}
                </ul>

                <label>
                    {'Stars '}
                    <input
                        type='number'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required
                        className='add-review-form-data'
                        max='5'
                        min='1'
                    />
                </label>

                <label>
                    {'Leave A Comment '}
                    <input
                        type='text'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                        className='add-review-form-data'
                    />
                </label>

                <button type='submit' className='add-review-button'>Add Review</button>

            </form>
        </>
    )
};

export default ReviewFormModal;
