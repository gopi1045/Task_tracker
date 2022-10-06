import React from 'react'
import PropTypes from 'prop-types'
const Button = ({color,text,clickHandler}) => {
  return (
    <button style={{backgroundColor:color}} className='btn' onClick={clickHandler}>{text}</button>
  )
}

Button.defaultProps={
    color:'blue'
}
Button.propTypes={ 
    color: PropTypes.string,
    text: PropTypes.string,
    clickHandler: PropTypes.func
}
export default Button