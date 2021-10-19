import { useState } from 'react';

import Cart from './components/Cart/Cart/Cart';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showCartHandler = () => {
    setIsVisible(true);
  }

  const hideCartHandler = () => {
    setIsVisible(false)
  }

  return (
    <>
      {isVisible &&
        <Cart onHideCart={hideCartHandler} />
      }
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
