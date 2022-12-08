import {
  Box,
  Button,

  Flex,
  FormControl,

  FormLabel,

  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
} from '@chakra-ui/react';
import {useState} from "react";
import axios from "axios";
import {SearchBar} from "./SearchBar";
import {useNavigate} from "react-router-dom";
import {IngredientComponent} from "./IngredientComponent";
import {SideDishComponent} from "./SideDishComponent";
import {api} from "../api";


export const RecipeInsertForm = ({_ingredients, _sideDishData}) => {
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [numOfPortions, setNumOfPortions] = useState(0);
  const [sideDishItem, setSideDishItem] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsObject, setIngredientsObject] = useState([]);

  const _date = new Date();
  const navigate = useNavigate();
  const handleSubmit = () => {
    api.post("https://exercise.cngroup.dk/api/recipes", {
      "title": name,
      "preparationTime": prepTime,
      "servingCount": numOfPortions,
      "ingredients": ingredientsObject,
      "sideDish": sideDishItem.name,
      "slug": name.replaceAll(' ', '-'),
      "lastModifiedDate": _date,
    })
      .then(
        ()=>{navigate('/')}
      ).catch(
      (error) => console.log(error)
    )

  }
  const handleCancelClick = () => {
    console.log(ingredientsObject);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex>
          <Box>
            <Text fontSize='3xl'>New recipe</Text>
          </Box>
          <Spacer/>
          <Box pr={6}>
            <Button mx={2} type="submit">Save</Button>
            <Button type={'button'} onClick={handleCancelClick}>Cancel</Button>
          </Box>
        </Flex>
        <ul>

        </ul>
        <Flex>
          <Box px={4}>
            <FormControl>
              <Input type='text' placeholder='Name' onChange={(e => setName(e.target.value))}/>
              <Box>
                <Text>Zakladne Udaje</Text>

                <FormLabel>Preparation Time</FormLabel>
                <InputGroup>
                  <NumberInput max={600} min={1}>
                    <NumberInputField id="prepTimeInput" onChange={(e => setPrepTime(e.target.value))}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={(e) => setPrepTime(document.querySelector("#prepTimeInput").value++)}/>
                      <NumberDecrementStepper
                        onClick={(e) => setPrepTime(document.querySelector("#prepTimeInput").value--)}/>
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon children="Minutes"/>
                </InputGroup>
                <FormLabel>number of portions</FormLabel>
                <NumberInput max={30} min={1}>
                  <NumberInputField id={"numOfServingsInput"} onChange={(e => setNumOfPortions(e.target.value))}/>
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() => setNumOfPortions(document.querySelector("#numOfServingsInput").value++)}/>
                    <NumberDecrementStepper
                      onClick={() => setNumOfPortions(document.querySelector("#numOfServingsInput").value--)}/>
                  </NumberInputStepper>
                </NumberInput>
                {/*<FormLabel>Side Dish</FormLabel>*/}
                {/*<SearchBar setChosenItem={setSideDishItem} chosenItem={sideDishItem} data={_sideDishData}/>*/}
                <SideDishComponent setChosenItem={setSideDishItem} chosenItem={sideDishItem}
                                   sideDishData={_sideDishData}/>
              </Box>
            </FormControl>
          </Box>
          <IngredientComponent ingredients={_ingredients} setIngredients={setIngredients}
                               ingredientsObject={ingredientsObject} setIngredientsObject={setIngredientsObject}/>
          <Box>
            <Text>Step By Step walk through</Text>
          </Box>
        </Flex>

      </form>
      b
    </div>
  )
}


