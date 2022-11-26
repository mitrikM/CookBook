import {Box, Heading, List, ListItem, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {api} from "../api";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../components/LoadingSpinner";


export const RecipeDetailPage = () => {
  const {slug} = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRecipeDetail = () => {


        setIsLoading(true);
          api.get(`recipes/${slug}`)
            .then((response) => setDetail(response.data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))

    }
    getRecipeDetail()
  }, [slug])
  if(isLoading){
    return <LoadingSpinner/>
  }
  if(error){
    return <Text>{error}</Text>
  }
  return (
    <Box px={5}>
      {detail && (
        <>
          <Heading>{detail.title}</Heading>
          <Box display="flex" justifyContent="space-between" mt={10}>
            <Box>
              <Text mb={2}>{detail.preparationTime} min</Text>
              {detail.ingredients && (
                <List mb={2}>
                  {detail.ingredients.map((ingredient) => (
                    <ListItem
                      key={ingredient._id}
                    >{`${ingredient.amount} ${ingredient.amountUnit}   ${ingredient.name}`}</ListItem>
                  ))}
                </List>
              )}
              <Text>{detail.lastModifiedDate}</Text>
            </Box>
            {detail.directions && <Text ml={20}>{detail.directions}</Text>}
          </Box>
        </>
      )}
    </Box>
  )
}
