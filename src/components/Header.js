import React from 'react'
import Button from './Button'
const Header = ({title,onAdd,showAddTask}) => 
{
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAddTask?'red':'green'} text={showAddTask?'Close':'Add'} clickHandler={onAdd}/>
    </header>
  )
}

export default Header