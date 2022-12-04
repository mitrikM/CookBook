import {useEffect, useState} from "react";
import {api} from "../api";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {Box, Text} from "@chakra-ui/react";
import {SideDishList} from "../components/SideDishList";

export const SideDishPage = () => {
  const [sideDish, setSideDish] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSideDishes = () => {
      setIsLoading(true);
      api
        .get('/recipes/side-dishes')
        .then(response =>
          setSideDish(response.data))
        .catch(() => setError(error))
        .finally(() =>
          setIsLoading(false));
    }
    getSideDishes();
  }, [])


  return (
  <Box px={6}>
    <Text fontSize={"xx-large"} >Side Dishes</Text>
    {isLoading && <LoadingSpinner/>}

    {error && <Text>{error}</Text>}
    <SideDishList SideDish={sideDish}/>
  </Box>
  )
}
