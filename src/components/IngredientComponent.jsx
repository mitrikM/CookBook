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

export const IngredientComponent = ({ingredients, setIngredients, setIngredientsObject, ingredientsObject}) => {

  let id = 0;
  const [ingredientName, setIngredientName] = useState('');
  const [amount, setAmount] = useState(null);
  const [hasGroup, setHasGroup] = useState(false);
  const [amountUnit, setAmountUnit] = useState('');
  // const [ingredientObject, setIngredientObject] = useState([])


  const items = [];
  const arr = Array.from(ingredients);
  arr.map(
    (name, id) => {
      items.push({
        id: id,
        name: name
      })
      return items
    }
  )

  const handleOnClick = () => {
    setIngredientsObject(
      [...ingredientsObject,
        {
          name: ingredientName.name,
          amount: amount,
          amountUnit: amountUnit,
          isGroup: false
        }
      ]
    )
  }

  return (

    <Box>
      <Box>
        <Text>Ingredients</Text>
        <Box>
          <List id={"list"}>
            {ingredientsObject.map(object => (

              object.name !== undefined &&
              <ListItem key={id++}>{object.name + ' ' + object.amount + ' ' + object.amountUnit + " "}
                <button type={"button"} onClick={(e) => {
                  setIngredientsObject(
                    ingredientsObject.filter(i =>
                      i._id !== object._id
                    )
                  );
                }}
                >
                  delete
                </button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Text>Add an ingratiation</Text>
        <FormControl>
          <InputGroup>
            <NumberInput max={255} min={0} placeholder={"Amount"} name={'Amount'}>
              <NumberInputField onChange={(e => setAmount(e.target.value))}/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
            <Input type='text' placeholder={"Enter amount unit"} name={'AmountUnit'}
                   onChange={(e => setAmountUnit(e.target.value))}/>
          </InputGroup>


          <SearchBar data={items} setChosenItem={setIngredientName} name={'ingredientsName'}>

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
