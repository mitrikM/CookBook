import {RecipeInsertForm} from "../components/RecipeInsertFormular";
import {api} from "../api";
import {LoadingSpinner} from "../components/AppLayoutStuff/LoadingSpinner";
import {Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {SearchBar} from "../components/SearchBar";
import {useNavigate} from "react-router-dom";

export const RecipeInsertFormPage = () => {
  const [sideDish, setSideDishData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredientsObject, setIngredientsObject] = useState ([])
  const [disable,setDisable]=useState(true);
  const [tempRecipeObject, setTempRecipeObject] = useState({
    title: "",
    preparationTime: 0,
    servingCount: 0,
    ingredients: [],
    sideDish: "",
    slug: "",
    lastModifiedDate: "",
    directions: ""
  });

  const _date = new Date();
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post("https://exercise.cngroup.dk/api/recipes", {
      "title": tempRecipeObject.title,
      "preparationTime": tempRecipeObject.preparationTime,
      "servingCount": tempRecipeObject.servingCount,
      "ingredients": ingredientsObject,
      "sideDish": tempRecipeObject.sideDish,
      "slug": tempRecipeObject.title.replaceAll(' ', '-'),
      "lastModifiedDate": _date,
      "directions": tempRecipeObject.directions,

    })
      .then(
        () => {
          navigate('/')
        }
      ).catch(
      (error) => console.log(error)
    )
  }


  const handleCancelClick =  () => {
    navigate('/');
  }


  return (
    <>
      {isLoading && <LoadingSpinner/>}
      {error && <Text>{error}</Text>}
      <RecipeInsertForm
        _sideDishData={sideDish}
        _ingredients={ingredients}
        _id={-1}
        disable={disable}
        setDisable={setDisable}
        ingredientsObject={ingredientsObject}
        setIngredientsObject={setIngredientsObject}
        tempRecipeObject={tempRecipeObject}
        setTempRecipeObject={setTempRecipeObject}
        handleSubmit={handleSubmit}
        handleCancelClick={handleCancelClick}
        setIngredients={setIngredients}
      />
    </>
  )
}
