import React from 'react';
import ReactDOM from 'react-dom';

//import App from './App';
// import * as serviceWorker from './serviceWorker';

import { TweetComponent } from './tweets/components'
const element = document.getElementById("tweetme-2")
const e = React.createElement
if (element) {
  console.log(element.dataset);
  const myComponent = e(TweetComponent, element.dataset)

  //ReactDOM.render(<TweetCreationForm />, element)
  ReactDOM.render(myComponent, element)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
