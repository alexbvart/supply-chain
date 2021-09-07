const capitalizeFirstLetterOfAString = (string) => {
  return string.toLowerCase()
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()
  )
}

export default capitalizeFirstLetterOfAString