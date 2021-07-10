import React, { useState } from 'react'
import {
  input_container,
  right_side, 
  characters_remaining, 
  input,
  toggle_visibility_pass,
  visible,
  hidden,
} from './inputForm.module.css'


const InputForm = ({ id, cssClass = input_container, type, name, placeholder, maxLength, pattern, title}) => {
  const [visibility , setVisibility ] = useState(false);
  
  function toggleVisibility(){
    setVisibility(!visibility)

    const input = document.getElementsByName('password')
    input[0].type = !visibility ? 'text' : 'password'
  }
  
  const openedEye = visibility  ? visible : hidden;
  const closedEye = !visibility  ? visible : hidden;

  function lengthWarns({element, maxLength, currentLength}){
    const secondWarning = Math.ceil(maxLength * .85)
    const firstWarning = Math.ceil(maxLength * .66)

    if(currentLength <= firstWarning || currentLength === 0){
      element.style.background = '#555459'
      element.style.color = '#FAFAFC'
      return
    }
    if(currentLength >= firstWarning && currentLength < secondWarning){
      element.style.background = 'rgba(251, 255, 0, 0.746)'
      element.style.color = 'black' 
      return
    }
    
    if(currentLength >= secondWarning){
      element.style.background = 'rgba(255, 0, 0, 0.657)'
      element.style.color = 'white' 
      return
    }
  }

  function validateSpecialInput({element, name, maxLength, currentLength}){
    const secondWarning = Math.ceil(maxLength * .66)
    const firstWarning = Math.ceil(maxLength * .33);

        if(currentLength === 0 || currentLength <= firstWarning){
          element.style.background = 'rgba(255, 0, 0, 0.657)'
          element.style.color = 'white'
          return
        }
        if(currentLength >= firstWarning && currentLength < secondWarning){
          element.style.background = 'yellow'
          element.style.color = 'black' 
          return
        }
        
        if(currentLength === maxLength){
          element.style.background = '#20CB31'
          element.style.color = 'white' 
          return
        }

  }
  return(
    <article className={cssClass}>
      <input
        className={input} 
        type={type}
        name={name} 
        placeholder={placeholder} 
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        onChange={event => {
          const currentLength = event.target.value.length
          const inputContainerElement = event.target.parentElement
          const charsRemainingElement = inputContainerElement.querySelector('#charsRemaining')
          const charsRemainingContainer = charsRemainingElement.parentElement
          charsRemainingElement.textContent = `${(maxLength - currentLength)}`

          if(name === 'phone' || name === 'dni' || name === 'ruc'){
            validateSpecialInput({
              element: charsRemainingContainer,
              name,
              maxLength,
              currentLength
            })
            return
          }
            lengthWarns({
              element: charsRemainingContainer,
              maxLength,
              currentLength
            })
          }
        }
      />
      <section className={right_side}>
        <div className={characters_remaining}>
          <p id="charsRemaining">{maxLength}</p>
        </div>
        {name === 'password'
          &&
            <div className={toggle_visibility_pass} onClick={() => toggleVisibility()}>
                <img className={openedEye} src="./assets/icons/eye-opened-icon.png" alt="closed eye" /> 
                <img className={closedEye} src="./assets/icons/eye-closed-icon.png" alt="opened eye" /> 
            </div>
        }
      </section>
    </article>
  )
}

export default InputForm