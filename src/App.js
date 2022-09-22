import React, {useState, useEffect } from 'react'
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


let getQuotesDataBase = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() { 
  const [quote, setQuote] = useState("It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.")
  const [author, setAuthor] = useState("Ann Landers")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [color, setColor] = useState('#00FFFF') 

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  
  useEffect(() => {
    fetchQuotes(getQuotesDataBase)
  }, [getQuotesDataBase])

  const colorsArray = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
  
  const getRandomQuote = () => {
    let randomQuotesInteger = Math.floor(quotesArray.length * Math.random())
    let randomColorInteger = Math.floor(colorsArray.length * Math.random())
    setRandomNumber(randomQuotesInteger)
    setQuote(quotesArray[randomQuotesInteger].quote)
    setAuthor(quotesArray[randomQuotesInteger].author)
    setColor(colorsArray[randomColorInteger])
  }
  

  return (
    <div className="App" style={{backgroundColor: color, color: color}}>
      <header className="App-header">
        <div id="quote-box">
          <p id="text">
          <FontAwesomeIcon icon={faQuoteLeft} style={{fontSize: 40}} /> {quote} <FontAwesomeIcon icon={faQuoteRight} style={{fontSize: 30}}/>
          </p>
          <p id="author">
            - {author}
          </p>
          <div class="buttons">
            <a id="tweet-quote" class="button" style={{backgroundColor: color}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" class="button" style={{backgroundColor: color}} onClick={() => getRandomQuote()}>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
