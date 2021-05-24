import './App.css';
import React, { useState } from 'react';


let userLink = React.createRef()


const App = () => {

  const [shortLink, setShortLink] = useState('');

  const makeShortLink = (data) =>{
    console.log(data)
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
        let niceResult = JSON.parse(this.responseText)['result_url']
        
        setShortLink(niceResult)
      }
    });
  
    xhr.open("POST", "https://url-shortener-service.p.rapidapi.com/shorten");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-rapidapi-key", "f1d56c1329msh22b5b0eb0c89c1cp1d6911jsnc6b2ba389e91");
    xhr.setRequestHeader("x-rapidapi-host", "url-shortener-service.p.rapidapi.com");
  
    xhr.send(data);
  
   
  
  }
  
  return (


    <div class="wrapper">

      <h1 class='userLinkHeader'>YOUR LINK</h1>
      <input ref={userLink} class="inputUserLink" type="text" name=""></input>
      <button onClickCapture= { () =>{
        makeShortLink(`url=`+ userLink.current.value )
      }} class="shourtBtn">SHRINK</button>
      <h2 class="shourtLinkHeader">SHRT LINK</h2>
      <input onClickCapture={() =>{
        navigator.clipboard.writeText(shortLink)
        alert('Link was copy in clipboard')
      }} value={shortLink} type="text" name=""></input>
    </div>

  )


}

export default App;
