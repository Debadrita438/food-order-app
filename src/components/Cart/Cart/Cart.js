import { useContext, useState } from 'react';
import CartContext from '../../../store/cart-context';
import Modal from '../../UI/Modal/Modal';
import CartItem from '../CartItem/CartItem';
import Checkout from '../Checkout/Checkout';

import styles from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const[isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [error, setError] = useState();

    const totalAmount = `INR ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async userData => {
        try {
            setIsSubmitting(true);
            const response = await fetch(
                'https://react-http-32f77-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: userData,
                        orderItems: cartCtx.items
                    })
                }
            )

            if(!response.ok) {
                throw new Error('Something went wrong');
            }
        } catch(err) {
            console.log(err.message);
            setError(err.message);
        }
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem 
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>;

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && !error && <Checkout onSubmit={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckout && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <>
        <p>Successfully sent the order!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>Close</button>
        </div>
    </>

    const onErrorSubmitting = <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !error && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && !error && isSubmittingModalContent}
            {!isSubmitting && didSubmit && !error && didSubmitModalContent}
            {error && onErrorSubmitting}
        </Modal>
    )
}

export default Cart;