import { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem/MealItem';

import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
      fetch('https://react-http-32f77-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
        .then(res => res.json())
        .then(data => {
          const loadedMeal = [];

          for(const key in data) {
            loadedMeal.push({
              id: key,
              name: data[key].name,
              description: data[key].description,
              price: data[key].price
            })
          }
          setMeals(loadedMeal);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err.message);
          setError(err.message)
        })
    }, [])

    if(isLoading) {
      return(
        <section className={styles.mealIsLoading}>
          <p>Loading...</p>
        </section>
      )
    }

    if(error) {
      return (
        <section className={styles.mealsError}>
          <p>{error}</p>
        </section>
      )
    }

    const mealsList = meals.map(meal => (
        <MealItem 
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description}
            price={meal.price} 
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;