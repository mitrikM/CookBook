import {
  Box,
  Button,

  Flex,
  FormControl,

  FormLabel, Heading,

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
import {IngredientComponent} from "./IngredientStuff/IngredientComponent";
import {SideDishComponent} from "./SideDishStuff/SideDishComponent";
import {api} from "../api";
import {DirectionsComponent} from "./DirectionsComponent";


export const RecipeInsertForm = ({
                                   _ingredients,
                                   _sideDishData,
                                   handleSubmit,
                                   handleCancelClick,
                                   tempRecipeObject,
                                   setTempRecipeObject,
                                   ingredientsObject,
                                   setIngredientsObject,
                                   disable,
                                   setDisable,
                                 }) => {



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex>
          <Box>
            <Heading>{tempRecipeObject.title}</Heading>
            <Text fontSize='2xl'>New recipe</Text>
          </Box>
          <Spacer/>
          <Box pr={6}>
            <Button mx={2} type="submit" disabled={tempRecipeObject.title.length<1}>Save</Button>
            <Button type={'button'} onClick={handleCancelClick}>Cancel</Button>
          </Box>
        </Flex>
        <Flex>
          <Box px={4}>
            <FormControl>
              <Input
                type='text'
                placeholder='Name'
                value={tempRecipeObject.title}
                onChange=
                  {(e => setTempRecipeObject({
                      ...tempRecipeObject,
                      title: e.target.value,
                      slug: e.target.value.replaceAll(' ', '-')
                    })
                  )
                  }
              />
              <Box>
                <Text>Zakladne Udaje</Text>

                <FormLabel>Preparation Time</FormLabel>
                <InputGroup>
                  <NumberInput max={600} min={1} value={tempRecipeObject.preparationTime}>
                    <NumberInputField
                      id="prepTimeInput"
                      onChange=
                        {(e => setTempRecipeObject({
                          ...tempRecipeObject,
                          preparationTime: e.target.value
                        }))}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={(e) =>
                          setTempRecipeObject({
                            ...tempRecipeObject,
                            preparationTime: document.querySelector("#prepTimeInput").value++
                          })}
                      />
                      <NumberDecrementStepper
                        onClick={(e) =>
                          setTempRecipeObject({
                            ...tempRecipeObject,
                            preparationTime: document.querySelector("#prepTimeInput").value--
                          })}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon children="Minutes"/>
                </InputGroup>
                <FormLabel>number of portions</FormLabel>
                <NumberInput max={30} min={1} value={tempRecipeObject.servingCount}>
                  <NumberInputField
                    id={"numOfServingsInput"}
                    onChange={(e =>
                        setTempRecipeObject(
                          {
                            ...tempRecipeObject,
                            servingCount: e.target.value
                          })
                    )}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setTempRecipeObject(
                          {
                            ...tempRecipeObject,
                            servingCount: document.querySelector("#numOfServingsInput").value++,
                          })
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setTempRecipeObject(
                          {
                            ...tempRecipeObject,
                            servingCount: document.querySelector("#numOfServingsInput").value--,
                          })
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                <SideDishComponent id={'sidedish'}
                                   setTempRecipeObject={setTempRecipeObject}
                                   tempRecipeObject={tempRecipeObject}
                                   sideDishData={_sideDishData}

                />
              </Box>
            </FormControl>
          </Box>
          <IngredientComponent
            ingredientsData={_ingredients}
            setTempRecipeObject={setTempRecipeObject}
            tempRecipeObject={tempRecipeObject}
            setIngredientsObject={setIngredientsObject}
            ingredientsObject={ingredientsObject}
          />
          <Box>
            <Text>Step By Step walk through</Text>
            <DirectionsComponent tempRecipeObject={tempRecipeObject} setTempRecipeObject={setTempRecipeObject}/>
          </Box>
        </Flex>

      </form>
    </div>
  )
}


