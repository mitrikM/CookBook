import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {useState} from "react";
import {array} from "prop-types";

export const SearchBar = ({data, setChosenItem}) => {







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

  const handleOnClear = () => {
    setChosenItem(null);
  }
  return (
    <ReactSearchAutocomplete
      items={data}
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
