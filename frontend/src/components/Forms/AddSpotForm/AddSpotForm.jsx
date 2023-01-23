/* --------------------------------------------------------
Add A Spot
-------------------------------------------------------- */

//Node Library Imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './AddSpotForm.css';

//Local Module Imports
// import * as sessionActions from "../../store/session";
import { thunkAddSpot } from '../../../store/spots';

//Style Imports


//React funcitonal Component that displays controlled inputs for user signup
const AddSpotForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');


    const [errors, setErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const formErrors = [];
        if (!name) formErrors.push('Name is required!');
        if (!address) formErrors.push('Address is required!');
        if (!city) formErrors.push('City is required!');
        if (!state) formErrors.push('State is required!');
        if (!country) formErrors.push('Country is required!');
        if (!description) formErrors.push('Description is required!');
        if (!price) formErrors.push('Price is required!');
        if (!imgUrl) formErrors.push('Please enter an image url for your spot!');
        setErrors(formErrors);

    },[name, address, city, state, country, description, price, imgUrl]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!errors.length) {
            const spotData = {
                name,
                address,
                city,
                state,
                country,
                description,
                price: +price
            };

            spotData.lng = 45;
            spotData.lat = 45;


            setName('');
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setDescription('');
            setPrice('');
            setImgUrl('');

            const spotRes = await dispatch(thunkAddSpot(spotData, imgUrl));

            if (spotRes) {
                history.push(`/spots/${spotRes.id}`);
    }}};

    return (

        <>
            <h1>Add Your Spot</h1>
            <form onSubmit={handleSubmit} className='general-form'>
                <ul className='errors'>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>): null}
                </ul>

                <div className="form-field-container">
                <label className='form-label'> Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </div>

                <div className="form-field-container">
                <label className='form-label'> Street Address </label>
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                    </div>

                <div className="form-field-container">
                <label className='form-label'> Price </label>
                    <input
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </div>

                <div className="form-field-container">

                <label className='form-label'> City </label>



                    <input
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                    </div>

                <div className="form-field-container">
                <label className='form-label'> State </label>
                    <input
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                    </div>

                <div className="form-field-container">
                <label className='form-label'> Country  </label>
                    <input
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                    </div>

                <div className="form-field-container">
                <label className='form-label'>Description</label>

                    <textarea
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='add-spot-form-data description-input'
                    />
                    </div>


                <div className="form-field-container">
                <label>Add an initial image</label>
                    <input
                        type='url'
                        value={imgUrl}
                        onChange={e => setImgUrl(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                    </div>

                <button
                    type='submit'
                    className='add-spot-button manage-button'
                    disabled={errors.length > 0}
                >
                    Add Spot
                </button>

            </form>
        </>
    )
};


export default AddSpotForm;
