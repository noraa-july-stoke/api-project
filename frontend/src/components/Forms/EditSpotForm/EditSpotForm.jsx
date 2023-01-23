/* --------------------------------------------------------
Add A Spot
-------------------------------------------------------- */

//Node Library Imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './EditSpotForm.css';

//Local Module Imports
// import * as sessionActions from "../../store/session";
// import { thunkAddSpot } from '../../../store/spots';
import { thunkSingleSpotFetch, thunkEditSpot, thunkDeleteSpot } from '../../../store/spots';

//Style Imports

//React funcitonal Component that displays controlled inputs for user signup
const EditSpotForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();

    const spot = useSelector(store => store.spots.singleSpot);

    const [name, setName] = useState(spot.name);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);


    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(thunkSingleSpotFetch(spotId));

    }, [dispatch, spotId]);

    useEffect(() => {
        const formErrors = [];
        if (!name) formErrors.push('Name is required!');
        if (!address) formErrors.push('Address is required!');
        if (!city) formErrors.push('City is required!');
        if (!state) formErrors.push('State is required!');
        if (!country) formErrors.push('Country is required!');
        if (!description) formErrors.push('Description is required!');
        if (!price) formErrors.push('Price is required!');
        setErrors(formErrors);

    }, [name, address, city, state, country, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!errors.length) {
            const spotData = {
                name,
                address,
                city,
                state,
                country,
                description,
                price: +price,
                id: spotId
            };

            spotData.lng = 45;
            spotData.lat = 45;

            const spotRes = await dispatch(thunkEditSpot(spotData))

            if (spotRes) {
                // const spot = await spotRes.json();
                history.push(`/spots/${spotId}`);
    }}};

    const handleDeleteClick = (e) => {
        e.preventDefault();
        const deleteRes = dispatch(thunkDeleteSpot(spotId));
        history.push('/your-spots');
    };

    return (

        <>
            <form onSubmit={handleSubmit} className='general-form'>
                <h2> Modify A Field & Save To Edit </h2>
                <ul className='errors'>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>) : null}
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

                <button type='submit' className='edit-spot-button manage-button'>Confirm Changes</button>
                <button type='delete' className='manage-button' onClick ={handleDeleteClick}>Delete This Spot</button>

            </form>
        </>
)};

export default EditSpotForm;
