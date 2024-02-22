export const toggleMainScroll = ( init = true ) => {
  init ? document.body.classList.add( 'no-scroll' ) : document.body.classList.remove( 'no-scroll' )
}
export const getLocalStorage = ( key ) => JSON.parse( localStorage.getItem( key ) )
export const setLocalStorage = ( { key, data } ) =>
  localStorage.setItem( key, JSON.stringify( data ) )