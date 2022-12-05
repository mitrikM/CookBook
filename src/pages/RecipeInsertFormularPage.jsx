import {RecipeInsertForm} from "../components/RecipeInsertFormular";
import {api} from "../api";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {SideDishData} from "../components/SideDishData";
import {SearchBar} from "../components/SearchBar";

export const RecipeInsertFormPage = (SideDishData,IngredientsData) => {
  const [sideDish, setSideDishData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
      const getSideDishes = () => {
        setIsLoading(true);
        api
          .get('/recipes/side-dishes')
          .then(response =>
            setSideDishData(response.data))
          .catch(() => setError(error))
          .finally(() =>
            setIsLoading(false));
      }

      getSideDishes();
    }, []);


  useEffect(() => {
    const getIngredients = () => {
      setIsLoading(true);
      api
        .get('/recipes/ingredients')
        .then(response =>
          setIngredients(response.data))
        .catch(() => setError(error))
        .finally(() =>
          setIsLoading(false));
    }
    getIngredients();
  }, [])


  return (
    <>
    {isLoading && <LoadingSpinner/>}
    {error && <Text>{error}</Text>}
    <RecipeInsertForm _sideDishData={sideDish} _ingredients={ingredients}  _id={-1}/>
    </>
  )
}
