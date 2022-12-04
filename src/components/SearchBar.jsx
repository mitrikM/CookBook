import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {useState} from "react";

export const SearchBar = ({data, chosenItem = '',setChosenItem}) => {

  const items = []
  data.map(
    (name, id) => {
      items.push({
        id: id,
        name: name,
      })
      return items
    }
  )


   const handleOnSearch = (string, results) => {
   }
  const formatResult = (item) => {
    return (
      <>
        <span style={{display: 'block', textAlign: 'left'}}>{item.name}</span>
      </>
    )
  }
  const handleOnSelect = (item) => {
    setChosenItem({...item, name: item.name});
  }

  const handleOnClear = ()=>{
   // setChosenItem(null);
  }
  return (
    <ReactSearchAutocomplete
      items={items}
      onClear={handleOnClear}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      autoFocus
      formatResult={formatResult}
      showIcon={false}
      styling={
        {}
      }
    />

  )

}
