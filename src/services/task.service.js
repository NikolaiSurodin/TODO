const URL = import.meta.env.VITE_BASE_URL

export const fetchTaskList = ( params = {} ) => {
  return fetch( `${ URL }?${ new URLSearchParams( {
    ...params
  } ) }` )
    .then( response => {
      if( !response.ok ) {
        throw new Error( `ERROR: ${ response.status }` )
      }
      return response.json()
        .catch( ( error ) => {
          console.log( error )
        } )
    } )
}
