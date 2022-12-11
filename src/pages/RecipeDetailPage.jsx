import {Box, Button, Flex, Heading, List, ListItem, Spacer, Text} from "@chakra-ui/react";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {api} from "../api";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../components/AppLayoutStuff/LoadingSpinner";
import axios from "axios";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import GlobalStyles from '../styles/global.module.css'

export const RecipeDetailPage = () => {
  const navigate = useNavigate();

  const {slug} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const [arr, setArr] = useState();

  useEffect(() => {
    const getRecipeDetail = () => {


      setIsLoading(true);
      api.get(`recipes/${slug}`)
        .then((response) => (
            setDetail(response.data),
              setArr(response.data.directions.toString().split('\n'))
          )
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

  // const formatDescription =  ()=>{
  //
  //   setArr();
  //   return(
  //   arr.map((item,id=0)=>(
  //    <ListItem key={id++}></ListItem>
  //    )))}


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

  const handleDeleteClick = () => {

    axios.delete(`https://exercise.cngroup.dk/api/recipes/${detail._id}`).then(r => navigate('/'));
  }

  const handleEditClick = () => {
    navigate(`/recipe/${slug}/edit`);
    // formatDescription()
  }
  return (

    <Box px={5}>
      {detail && (<>
        <Flex>
          <Box pb={'1rem'}>
            <Heading>{detail.title}</Heading>
          </Box>
          <Spacer/>
          <Box>
            <Button mx={5} type={'button'} onClick={handleEditClick}>Edit</Button>
            <Button type={'button'} onClick={handleDeleteClick} backgroundColor={'crimson'}
                    color='white'>Delete</Button>

          </Box>
        </Flex>
        <Box display={"flex"}>
          <Box width={'12%'}>
            <Text py={'10px'}>preparation time: {Math.floor(detail.preparationTime / 60) === 0 ? "" : Math.floor(detail.preparationTime / 60) + ' hod'} {detail.preparationTime % 60 + ' min'} </Text>
            <Text py={'10px'}>number of servings: {detail.servingCount}</Text>

            {detail.ingredients && (<List py={'10px'}>
              <Text>ingredientions:</Text>

              {detail.ingredients.map((ingredient) => (<ListItem
                key={ingredient._id}
              >{`${ingredient.amount !== undefined  ? ingredient.amount : ''} ${ingredient.amountUnit !== undefined ? ingredient.amountUnit : ''}   ${ingredient.name !== undefined ? ingredient.name : ''}`}</ListItem>))}
            </List>)}
            <Text py={'10px'}>side dish: {detail.sideDish === undefined ? 'none' : detail.sideDish}</Text>
            <Text>modified in: {formatDate(detail.lastModifiedDate)}</Text>
          </Box>
          <Box pt={'10px'}>


            {/*{detail.directions && <ReactMarkdown components={ChakraUIRenderer()} children={detail.directions} skipHtml mt={0} mb={0}>*/}
            {/*  {detail.directions}*/}
            {/*</ReactMarkdown>}*/}
            <List>
              {
                arr !== undefined && arr.map((value, index = 0) => (
                  <ListItem key={index++}>{value}</ListItem>
                ))
              }
            </List>
          </Box>
        </Box>
      </>)}
    </Box>)
}
