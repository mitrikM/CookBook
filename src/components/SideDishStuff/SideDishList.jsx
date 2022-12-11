
export const SideDishList = ({SideDish}) => {
  return (
    <>
      {
        SideDish.length !== 0 && (
          SideDish.map((_value,index=0) =>
            <li key={index++}>
              {
                _value
              }
            </li>)

        )
      }
    </>
  )
}
