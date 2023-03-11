
import React, {useContext, useEffect} from 'react'
import noteContext from './context/noteContext'

export const About = () => {
  const a=useContext(noteContext)
  useEffect(()=>{
    a.update();
  })
  return (
    <div>
      This is about {a.state.name} and its class is {a.state.class}
    </div>
  )
}
