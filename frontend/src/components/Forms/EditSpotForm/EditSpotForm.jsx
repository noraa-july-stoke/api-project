/* --------------------------------------------------------
Add A Spot
-------------------------------------------------------- */

//Node Library Imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
            <h1>Modify A Field To Edit.</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>) : null}
                </ul>

                <label>
                    {'Name '}
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />

                </label>

                <label>
                    {'Street Address '}
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <label>
                    {'Price '}
                    <input
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <label>
                    {'City '}
                    <input
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <label>
                    {'State '}
                    <input
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <label>
                    {'Country '}
                    <input
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <label>
                    {'Description '}
                    <input
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='add-spot-form-data'
                    />
                </label>

                <button type='submit' className='edit-spot-button'>Confirm Changes</button>
                <button type='delete' onClick ={handleDeleteClick}>Delete This Spot</button>

            </form>
        </>
)};

export default EditSpotForm;
