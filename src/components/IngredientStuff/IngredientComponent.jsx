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
import {SearchBar} from "../SearchBar";
import {useEffect, useState} from "react";

export const IngredientComponent = ({
                                      ingredientsData,
                                      setTempRecipeObject,
                                      tempRecipeObject,
                                      ingredientsObject,
                                      setIngredientsObject
                                    }) => {

  let id = 0;

  const [ingredientName, setIngredientName] = useState('');
  const [amount, setAmount] = useState(null);
  const [hasGroup, setHasGroup] = useState(false);
  const [amountUnit, setAmountUnit] = useState('');
  const [disabled, setDisabled] = useState(true);
  const items = [];
  const arr = Array.from(ingredientsData);
  arr.map(
    (name, id) => {
      items.push({
        id: id++,
        name: name
      })
      return items
    }
  )


  const handleOnAddClick = () => {
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
    //   document.querySelector("#ingredientButton").disabled=true


  }

  const handleOnSelect = (item) => {
    setIngredientName(item);
    // document.querySelector("#ingredientButton").disabled=false
    setDisabled(false);
  }
  const handleOnClear = () => {
    setIngredientName(null);
    // document.querySelector("#ingredientButton").disabled=true
    setDisabled(true)
  }

  return (

    <Box>
      <Box>
        <Text>Ingredients</Text>
        <Box>
          <List id={"list"}>
            {ingredientsObject.map((object) => (

              object.name !== undefined &&
              <ListItem key={id++}>{object.name + ' ' + object.amount + ' ' + object.amountUnit + " "}
                <button type={"button"} onClick={(e) => {
                  setIngredientsObject(
                    ingredientsObject.filter(i =>
                      !(i.name === object.name && i.amount === object.amount && i.amountUnit === object.amountUnit)
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
              <NumberInputField id={'amountField'} onChange={(e => setAmount(e.target.value))}/>
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={(e) => setAmount(document.querySelector("#amountField").value++)}
                />
                <NumberDecrementStepper
                  onClick={(e) => setAmount(document.querySelector("#amountField").value--)}
                />
              </NumberInputStepper>
            </NumberInput>
            <Input type='text' placeholder={"Enter amount unit"} name={'AmountUnit'}
                   onChange={(e => setAmountUnit(e.target.value))}/>
          </InputGroup>


          <SearchBar data={items} handleOnSelect={handleOnSelect} handleOnClear={handleOnClear}
                     name={'ingredientsName'}>

          </SearchBar>
          <Button id={"ingredientButton"} disabled={disabled} onClick={handleOnAddClick}>Add</Button>
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
