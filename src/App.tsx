import { useState, useEffect, useCallback } from 'react'
import words from './wordList.json'  // array of words
import './App.css'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord'
import Keyboard from './Keyboard'


import './App.css'


function getWord (){
  return words[Math.floor(Math.random()* words.length )]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord)
  // const [wordToGuess, setWordToGuess] = useState ( () => {
  //   return words[Math.floor(Math.random()* words.length )]
  // })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]) // arrayofstring type of array

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  
  const isLoser = incorrectLetters.length >= 6; // all hangman
  const isWinner = 
    wordToGuess
      .split("")
      .every( letter => guessedLetters.includes(letter))


  // add letters to the array
  const addGuessedLetter = useCallback( 
    (letter: string) =>{
    if (guessedLetters.includes(letter) || isLoser || isWinner) 
      return;

    setGuessedLetters(currentLetters => 
      [...currentLetters, letter])

  }, [guessedLetters, isLoser, isWinner])


 

  // function addGuessedLetter (letter: string) {
  //   if (guessedLetters.includes(letter)) return

  //   setGuessedLetters(currentLetters => [...currentLetters, letter])
  // }


  // manipulatethe actual keyboard, not visual keyboard
  useEffect(() => {

    // a function called handler
    const handler =( e: KeyboardEvent) => {
      // KeyboardEvent objects describe a user interaction with the keyboard
      const key = e.key
      console.log("e.key", key)

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)

    }

    // The keydown event is fired when a key is pressed.
    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }

  }, [guessedLetters])
  // want to update the handler every single time when function changed [guessedLetters]
  

  // Enter to refresh page
  useEffect( () => {

    const handler =( e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
      
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }

  }, [])



  console.log("wordToGuess: ", wordToGuess)
  console.log("incorrectLetters: ", incorrectLetters)
  console.log("guessedLetters: ", guessedLetters)


  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap:"2rem",
      margin: "0 auto",
      alignItems: "center"
    }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Winner, hit enter to try again"}
        {isLoser && "Nice try, hit enter to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}  />
      <HangmanWord 
        reveal={isLoser}
        guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf:"stretch"}} >
        <Keyboard 
          disabled = {isWinner || isLoser}
          activeLetters = {guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter = {addGuessedLetter}
        />
      </div>
      
    </div>
  )
}

export default App
