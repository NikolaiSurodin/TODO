class Task {
  id
  title
  completed
  date

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.date = Date.now()
    this.id = this.id !== null ? this.id : Math.floor( Math.random() * 1000000 )
  }
}

export default Task