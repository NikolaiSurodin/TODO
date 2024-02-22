
export const fetchTaskList = () => {
  return new Promise( ( resolve, reject ) => {
    fetch( import.meta.env.VITE_BASE_URL )
      .then( response => {
        if( !response.ok ) {
          throw new Error( `ERROR: ${ response.status }` )
        }
        return response.json()
      } )
      .then( data => {
        resolve( data )
      } )
      .catch( error => {
        reject( error )
      } )
  } )
}