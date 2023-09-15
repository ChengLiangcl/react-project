import classes from "../Meals/AvailableMeals.module.css";
import Card from "../UI/Card";
import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  const [Meals, setMeals] = useState([]);

  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const fetchMeals = async (res) => {
      try {
        const firebaseResponse = await fetch(
          "https://meals-c7a80-default-rtdb.firebaseio.com/meals.json"
        );
        const data = await firebaseResponse.json();

        let menuArray = [];
        for (const [key, value] of Object.entries(data)) {
          menuArray = [
            ...menuArray,
            {
              id: key,
              name: value?.name,
              description: value?.description,
              price: value?.price,
            },
          ];
        }
        setMeals(menuArray);
      } catch (error) {
        setLoadingError(true);
      }
    };
    fetchMeals();
  }, []);
  return (
    <>
      {loadingError === false && (
        <section className={classes.meals}>
          <Card>
            <ul>
              {Meals?.map((item) => {
                return (
                  <MealItem
                    key={item?.id}
                    description={item?.description}
                    name={item?.name}
                    price={item?.price}
                    id={item?.id}
                  />
                );
              })}
            </ul>
          </Card>
        </section>
      )}

      {loadingError === true && (
        <div className={`${classes["no-data-found"]} ${classes.meals}`}>
          <p>
            No data found. Please check your data source or try again later.
          </p>
        </div>
      )}
    </>
  );
};
export default AvailableMeals;
