import {useEffect, useState} from "react";
import {api} from "../api";
import {LoadingSpinner} from "../components/AppLayoutStuff/LoadingSpinner";
import {Text} from "@chakra-ui/react";
import {RecipeInsertForm} from "../components/RecipeInsertFormular";
import {useNavigate, useParams} from "react-router-dom";

export const EditPage = () => {
  const {slug} = useParams();
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
  const [sideDish, setSideDishData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const [prepTime, setPrepTime] = useState(0);
  // const [numOfPortions, setNumOfPortions] = useState(0);
  // const [sideDishItem, setSideDishItem] = useState("");
  const [ingredientsObject, setIngredientsObject] = useState([]);
  // const [directions, setDirections] = useState("");
  // const [name, setName] = useState("");
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

  useEffect(() => {
    const getRecipeDetail = () => {
      setIsLoading(true);
      api.get(`recipes/${slug}`)
        .then((response) => {
            setTempRecipeObject(response.data);
            setIngredientsObject(response.data.ingredients);
          }
        )

        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
    }
    getRecipeDetail()
  }, [slug])
  if (isLoading) {
    return <LoadingSpinner/>
  }
  if (error) {
    return <Text>{error}</Text>
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post(`https://exercise.cngroup.dk/api/recipes/${tempRecipeObject._id}`, {
      "title": tempRecipeObject.title,
      "preparationTime": tempRecipeObject.preparationTime,
      "servingCount": tempRecipeObject.servingCount,
      "ingredients": ingredientsObject,
      "sideDish": tempRecipeObject.sideDish,
      "slug": tempRecipeObject.slug,
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

  const handleCancelClick = () => {
  }

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      {error && <Text>{error}</Text>}
   <RecipeInsertForm
        _sideDishData={sideDish}
        _ingredients={ingredients}
        _id={-1}

        ingredientsObject={ingredientsObject}
        setIngredientsObject={setIngredientsObject}
        tempRecipeObject={tempRecipeObject}
        setTempRecipeObject={setTempRecipeObject}
        handleSubmit={handleSubmit}
        handleCancelClick={handleCancelClick}
        setIngredients={setIngredients}

      />}
    </>
  )
}
