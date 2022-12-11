import {FormControl, FormLabel} from "@chakra-ui/react";
import {SearchBar} from "../SearchBar";
import {useState} from "react";

export const SideDishComponent = ({sideDishData, tempRecipeObject, setTempRecipeObject}) => {
  const items = [];
  sideDishData.map(
    (name, id) => {
      items.push({
        id: id,
        name: name,
      })
      return items
    }
  )
  const handleOnSelect = (item) => {
    setTempRecipeObject(
      {
        ...tempRecipeObject,
        sideDish: item.name,
      }
    )
  }
  const handleOnClear = () => {
    setTempRecipeObject(
      {
        ...tempRecipeObject,
        sideDish: ""
      }
    )
  }
  return (
    <>
      <FormLabel>Side Dish</FormLabel>
      <SearchBar handleOnSelect={handleOnSelect} handleOnClear={handleOnClear} data={items} defaultInput={tempRecipeObject.sideDish}/>
    </>
  )
}
