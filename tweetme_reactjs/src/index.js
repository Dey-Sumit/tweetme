import React from 'react';
import ReactDOM from 'react-dom';

//import App from './App';
// import * as serviceWorker from './serviceWorker';

import { TweetCreationForm } from './tweets'
const element = document.getElementById("tweetme-2")
if (element) {
  ReactDOM.render(<TweetCreationForm />, element)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
