import { useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotSixChars = value => value.trim().length !== 6;

const Checkout = props => {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [postal, setPostal] = useState('');
    const [city, setCity] = useState('');

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })

    const submitHandler = event => {
        event.preventDefault();

        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const postalIsValid = !isNotSixChars(postal);
        const cityIsValid = !isEmpty(city);

        setFormInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if(!formIsValid) {
            return;
        }

        props.onSubmit({ name, street, postal, city });

        setName('');
        setPostal('');
        setStreet('');
        setCity('');
    }

    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={`${styles.control} ${formInputValidity.name ? '' : styles.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    type='text' 
                    id='name'
                    value={name}
                    onChange={event => setName(event.target.value)} 
                />
                {!formInputValidity.name && <p className={styles.errorText}>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.street ? '' : styles.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input 
                    type='text' 
                    id='street'
                    value={street}
                    onChange={event => setStreet(event.target.value)} 
                />
                {!formInputValidity.street && <p className={styles.errorText}>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.postal ? '' : styles.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    type='text' 
                    id='postal'
                    value={postal}
                    onChange={event => setPostal(event.target.value)} 
                />
                {!formInputValidity.postal && <p className={styles.errorText}>Please enter a valid postal code! (5 characters long)</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.city ? '' : styles.invalid}`}>
                <label htmlFor='city'>City</label>
                <input 
                    type='text' 
                    id='city'
                    value={city}
                    onChange={event => setCity(event.target.value)} 
                />
                {!formInputValidity.city && <p className={styles.errorText}>Please enter a city!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;