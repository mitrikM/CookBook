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


export const RecipeInsertForm = ({_ingredients, _sideDishData,}) => {
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [numOfPortions, setNumOfPortions] = useState(0);
  const [ingredient, setIngredient] = useState([]);
  const [sideDishItem, setSideDishItem] = useState('');
  const _date = new Date();
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(sideDishItem);
    axios.post("https://exercise.cngroup.dk/api/recipes", {
      title: name,
      preparationTime: prepTime,
      servingCount: numOfPortions,
      sideDish: sideDishItem.name,
      slug: name.replaceAll(' ', '-'),
      lastModifiedDate: _date,
    })
      .then(
        (response) => {
          console.log(response.data);
        }
      ).catch(
      (error) => console.log(error)
    )

  }
  const handleCancelClick = () => {
    navigate('/');
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
            </FormControl>
            <Box>
              <Text>Zakladne Udaje</Text>

              <FormControl>
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
              </FormControl>
              <FormControl>
                <FormLabel>Side Dish</FormLabel>

                {/*<Select placeholder="Choose a side dish" onChange={(e => setSideDish(e.target.value))}>*/}
                {/*  {*/}
                {/*    _sideDishData.map((_id,_value) => {*/}
                {/*      return (*/}
                {/*        <option key={_id++} value={_value}>{_value}</option>*/}
                {/*      )*/}
                {/*    })*/}
                {/*  }*/}
                {/*</Select>*/}
                {/*<SearchBar data={_sideDishData}>*/}
                {/*  {*/}
                {/*    data.map()*/}
                {/*  }*/}
                {/*</SearchBar>*/}
                <SearchBar setChosenItem={setSideDishItem} chosenItem={sideDishItem} data={_sideDishData}>
                  b
                </SearchBar>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text>Ingredients</Text>
              <Box>

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
                <InputGroup>
                  <Input type='text' placeholder={"Name"}/>
                  <InputRightAddon>
                    <Button>Add</Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <Text>Add group</Text>
              <FormControl>
                <InputGroup>
                  <Input type={'text'} placehodler={"New Group"}/>
                  <InputRightAddon>
                    <Button>Add</Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Text>Step By Step walk through</Text>
          </Box>
        </Flex>

      </form>
    </div>
  )
}


