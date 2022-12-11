import {ReactSearchAutocomplete} from 'react-search-autocomplete'

export const SearchBar = ({data, handleOnSelect, handleOnClear,defaultInput=''}) => {





  const handleOnSearch = (string, results) => {
  }
  const formatResult = (item) => {
    return (
      <>
        <span style={{display: 'block', textAlign: 'left'}}>{item.name}</span>
      </>
    )
  }
  // const handleOnSelect = (item) => {
  //   setChosenItem({...item, name: item.name});
  // }

  // const handleOnClear = () => {
  //   setChosenItem(null);
  // }
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
        {
          borderRadius: '5%',
        }
      }
    />

  )

}
