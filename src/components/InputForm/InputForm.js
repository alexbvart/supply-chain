import React from 'react'
import { input_container, characters_remaining, input } from './inputForm.module.css'

const InputForm = ({ type, name, placeholder, maxLength, pattern, title}) => {
  function lengthLevels({element, maxLength, currentLength}){
    const secondWarning = Math.ceil(maxLength * .66)
    const firstWarning = Math.ceil(maxLength * .33)

    if(currentLength <= firstWarning || currentLength === 0){
      element.style.background = '#555459'
      element.style.color = '#FAFAFC'
      return
    }
    if(currentLength >= firstWarning && currentLength < secondWarning){
      element.style.background = 'gold'
      element.style.color = 'black' 
      return
    }

    if(currentLength >= secondWarning){
      element.style.background = 'red'
      element.style.color = 'white' 
      return
    }
  }
  return(
    <article className={input_container}>
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
            lengthLevels({
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