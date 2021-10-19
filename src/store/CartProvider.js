import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingCartItem = state.items[existingCartItemIndex]

            let updatedItems;

            if(existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.payload);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        case 'REMOVE':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
            const existingItem = state.items[existingItemIndex]
            const updateTotalAmount = state.totalAmount - existingItem.price;

            let updateItems;
            
            if(existingItem.amount === 1) {
                updateItems = state.items.filter(item => item.id !== action.payload)
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
                updateItems = [...state.items];
                updateItems[existingItemIndex] = updatedItem;
            }

            return {
                items: updateItems,
                totalAmount: updateTotalAmount
            }

        default:
            return defaultCartState;
    }
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            payload: item
        })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            payload: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;