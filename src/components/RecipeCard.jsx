import React from 'react'
import styles from '../components/Styles/GlobalStyles.modules.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Text,
  Image,
  Stack,
  Heading,
  ButtonGroup, List, Flex, Box, Spacer
} from '@chakra-ui/react'
import PlaceholderImage from "../images/food-placeholder.png";
import {Link} from "react-router-dom";

export const RecipeCard = ({slug, title, preparationTime, sideDish}) => {

  return (
    <Link to={`/recipe/${slug}`}>
      <Card maxW='sm'>
        <CardBody>
          <Image
            src={PlaceholderImage}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
          </Stack>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Flex>

            <Box>
              <Box display={"inline-block"}>
                <Text color='blue.600' fontSize='2xl'>
                  {Math.floor(preparationTime/60)}h {preparationTime%60}m
                </Text>
              </Box>
              <Spacer/>
              <Box display={"inline-block"} float={"right"}>
                {sideDish ? <Text textAlign={'right'}>{sideDish}</Text> : ""}
              </Box>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Link>

  );
}

