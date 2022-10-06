import React from 'react'
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div>
        <p>Version 1.0.0</p>
        <Link to="/">Go Back</Link>
        {/* <a href="/">Go Back</a> */}
    </div>
  )
}

export default About