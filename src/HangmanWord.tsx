
type HangmanWordProps ={
    reveal?: boolean
    guessedLetters: string[]
    wordToGuess: string
}

function HangmanWord( 
    {reveal=false, guessedLetters, wordToGuess }:HangmanWordProps 
    ){
    //const word= "testtt"
    //const guessedLetters = ["t", "e"]

    return (
    <div
        style={{
            display: "flex",
            gap:".25em",
            fontSize:"6rem",
            fontWeight:"bold",
            textTransform:"uppercase",
            fontFamily:"monospace",
        }}
    
    >
        {wordToGuess.split("").map((letter, index) => (
            <span style={{ borderBottom: ".1em solid black"}} key={index}>
                <span 
                    style={{
                        visibility: guessedLetters.includes(letter) || reveal
                            ? "visible"
                            : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ?
                            "red" : "black"
                    }}
                    key = {index}
                    >{letter}
                </span>
            </span>
        ))}
    </div>)
}

export default HangmanWord;