import {
  Box, Button,
  FormControl, Input,
  InputGroup, InputRightAddon, List, ListItem, NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";
import {SearchBar} from "./SearchBar";
import {useState} from "react";

export const IngredientComponent = ({ingredients, setIngredients}) => {
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [hasGroup, setHasGroup] = useState(false);
  const [amountUnit, setAmountUnit] = useState('');


  const items = [];
  const arr = Array.from(ingredients);

  const ingredientsObjects = [
    {
      name: 'kys',
    },


  ]

  arr.map(
    (name, id) => {
      items.push({
        id: id,
        name: name
      })
      return items
    }
  )
  const handleOnClick = (item) => {
    ingredientsObjects.push(
      {
        name: ingredient.name
      }
    )
    console.log(ingredientsObjects);


  }


  return (

    <Box>
      <Box>
        <Text>Ingredients</Text>
        <Box>
          <List id={"list"}>

          </List>
        </Box>
        <Text>Add an ingratiation</Text>
        <FormControl>
          <InputGroup>
            <NumberInput max={30} min={1} placeholder={"Amount"}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
            <Input type='text' placeholder={"in"}/>
          </InputGroup>


          <SearchBar data={items} setChosenItem={setIngredient}>

          </SearchBar>
          <Button onClick={handleOnClick}>Add</Button>
          <Text>Add group</Text>
          <InputGroup>
            <Input type={'text'} placehodler={"New Group"}/>
            <InputRightAddon>
              <Button>Add</Button>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  )
}
