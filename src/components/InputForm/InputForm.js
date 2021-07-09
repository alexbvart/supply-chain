import React from 'react'
import { input_container, characters_remaining, input } from './inputForm.module.css'

const InputForm = ({ id, cssClass = input_container, type, name, placeholder, maxLength, pattern, title}) => {
  function lengthWarns({element, maxLength, currentLength}){
    const secondWarning = Math.ceil(maxLength * .66)
    const firstWarning = Math.ceil(maxLength * .33)

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

  function validateSpecialInput({element, name, maxLength, alert}){
    if(name === 'ruc' || name === 'phone'){
          
    }

    if(name === 'dni'){

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
          charsRemainingElement.textContent = `${(maxLength - currentLength)}`

          if(name === 'phone' || name === 'dni'){
            return
          }
            lengthWarns({
              element: charsRemainingElement.parentElement,
              maxLength,
              currentLength
            })
          }
        }
      />
      <div className={characters_remaining}>
        <p id="charsRemaining">{maxLength}</p>
      </div>
    </article>
  )
}

export default InputForm