import {FormControl, FormLabel} from "@chakra-ui/react";
import {SearchBar} from "./SearchBar";

export const SideDishComponent = ({sideDishData, chosenItem, setChosenItem}) => {
  const items=[];
  // sideDishData=Array.from(sideDishData);
  sideDishData.map(
    (name, id) => {
      items.push({
        id: id,
        name: name,
      })
      return items
    }
  )
  return (
    <>
      <FormLabel>Side Dish</FormLabel>
      <SearchBar setChosenItem={setChosenItem} data={items}/>
    </>
  )
}
