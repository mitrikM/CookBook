import {Box, Button, Flex, Heading, List, ListItem, Spacer, Text} from "@chakra-ui/react";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {api} from "../api";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../components/LoadingSpinner";
import axios from "axios";


export const RecipeDetailPage = () => {
  const navigate = useNavigate();

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
  if (isLoading) {
    return <LoadingSpinner/>
  }
  if (error) {
    return <Text>{error}</Text>
  }


  const formatDate = (s) => {

    let k = ''
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== 'T') {
        k += s[i];
      } else break;
    }
    k = k.replaceAll('-', ' ');
    k = k.split(' ').reverse().join(' ');
    return k
  }

  const handleDeleteClick = ()=>{

    axios.delete(`https://exercise.cngroup.dk/api/recipes/${detail._id}`).then(r => navigate('/'));
  }



  return (

    <Box px={5}>
      {detail && (<>
        <Flex>
          <Box>
            <Heading>{detail.title}</Heading>
          </Box>
          <Spacer/>
          <Box>
            <Button mx={5}>Edit</Button>
            <Button type={'button'} onClick={handleDeleteClick} backgroundColor={'crimson'} color='white'>Delete</Button>

          </Box>
        </Flex>
        <Box display="flex" justifyContent="space-between" mt={10}>
          <Box>
            <Text mb={2}>{Math.floor(detail.preparationTime / 60)} hod {detail.preparationTime % 60} min</Text>
            <Text>{detail.servingCount}</Text>
            {detail.ingredients && (<List mb={2}>
              {detail.ingredients.map((ingredient) => (<ListItem
                key={ingredient._id}
              >{`${ingredient.amount} ${ingredient.amountUnit}   ${ingredient.name}`}</ListItem>))}
            </List>)}
            <Text>{formatDate(detail.lastModifiedDate)}</Text>
            <Text>{detail.sideDish}</Text>
          </Box>
          {detail.directions && <Text ml={20}>{detail.directions}</Text>}
        </Box>
      </>)}
    </Box>)
}
