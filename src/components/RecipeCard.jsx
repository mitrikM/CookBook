import React from 'react'
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
  ButtonGroup, List
} from '@chakra-ui/react'
import PlaceholderImage from "../images/food-placeholder.png";
import {Link} from "react-router-dom";

export const RecipeCard = ({slug, title, preparationTime}) => {

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
        <Divider />
        <CardFooter>
          <Text color='blue.600' fontSize='2xl'>
            {preparationTime}
          </Text>
        </CardFooter>
      </Card>
    </Link>

  );
}

