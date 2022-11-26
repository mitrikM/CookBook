import {
  Box,
  Button, Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text
} from '@chakra-ui/react';
import styles from "../styles/global.module.css"

export const RecipeInsertFormPage = () => {
  return (
    <div>
      <form>
        <Flex>
          <Box>
            <Text fontSize='3xl'>New recipe</Text>
          </Box>
          <Spacer/>
          <Box pr={6}>
            <Button mx={2}>Save</Button>
            <Button>Cancel</Button>
          </Box>
        </Flex>

        <Flex>
          <Box px={4}>
            <FormControl>
              <Input type='text' placeholder='Name'/>
            </FormControl>
            <Box>
              <Text>Zakladne Udaje</Text>

              <FormControl>
                <FormLabel>Preparation Time</FormLabel>
                <InputGroup>
                  <NumberInput max={600} min={1}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon children="Minutes"/>
                </InputGroup>

                <FormLabel>number of portions</FormLabel>
                <NumberInput max={30} min={1}>
                  <NumberInputField/>
                  <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Side Dish</FormLabel>
                <Input type='text'/>
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
