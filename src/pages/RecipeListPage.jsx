import {useEffect, useState} from 'react';
import {Button, Flex, flexbox, Heading, Input, Spacer, Text} from '@chakra-ui/react';
import {RecipeCard} from "../components/RecipeCard";
import {Box} from '@chakra-ui/react';
import {api} from "../api";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {findReturnStatement} from "eslint-plugin-react/lib/util/ast";
import {RecipeList} from "../components/RecipeList";
import {Link} from "react-router-dom";

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getRecipes = () => {
      setIsLoading(true);
      api
        .get('/recipes')
        .then(response =>
          setRecipes(response.data))
        .catch(() => setError(error))
        .finally(() =>
          setIsLoading(false));
    }
    getRecipes();
  }, [])

  const handleInputValueChange = (event)=>{
    setSearchValue(event.currentTarget.value);
  }
  const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <Box px={6}>
      <Heading my={4} color="dodgerblue">
        <Flex>
          <Box>
            Recipes
          </Box>
          <Spacer/>
          <Box>
            <Link to={'/recipe-insert'}>
              <Button >Add a new recipe</Button>
            </Link>
          </Box>
        </Flex>
      </Heading>
      <Input placeholder="Hladaj" value={searchValue} onChange={handleInputValueChange}/>
      {isLoading && <LoadingSpinner/>}
      {
        error && <Text>{error}</Text>
      }
      <RecipeList recipes={filteredRecipes}/>
    </Box>
  );
}
