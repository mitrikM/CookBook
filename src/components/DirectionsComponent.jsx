import ReactMarkdown from 'react-markdown'
import {Textarea} from "@chakra-ui/react";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

export const DirectionsComponent = ({setTempRecipeObject, tempRecipeObject}) => {
  const handleInputChange = (e) => {
    setTempRecipeObject(
      {
        ...tempRecipeObject,
        directions: e.target.value
      }
    );
  }

  return (
    <>
      <Textarea onChange={handleInputChange} value={tempRecipeObject.directions}
                placeholder="here write some directions about your recipe" ml="6%" height='35rem'
                width='60rem'></Textarea>
      <ReactMarkdown components={ChakraUIRenderer()} children={tempRecipeObject.directions} skipHtml>
        {tempRecipeObject.directions}
      </ReactMarkdown>

    </>
  )
}
