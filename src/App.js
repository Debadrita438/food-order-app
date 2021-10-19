import { useState } from 'react';

import Cart from './components/Cart/Cart/Cart';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import CartProvider from './store/CartProvider';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showCartHandler = () => {
    setIsVisible(true);
  }

  const hideCartHandler = () => {
    setIsVisible(false)
  }

  return (
    <CartProvider>
      {isVisible &&
        <Cart onHideCart={hideCartHandler} />
      }
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
