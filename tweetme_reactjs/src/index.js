import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

//import App from './App';
// import * as serviceWorker from './serviceWorker';

import { TweetComponent } from './tweets/components'
import { TweetDetailComponent } from './tweets'
import { ProfileBadgeComponent } from './profiles'
const element = document.getElementById("tweetme-2")

const e = React.createElement

// for tweetList
if (element) {
  const myComponent = e(TweetComponent, element.dataset)

  //ReactDOM.render(<TweetCreationForm />, element)
  ReactDOM.render(myComponent, element)
}

//for feed
const elementFeed = document.getElementById("tweetme-feed")
if (elementFeed) {
  const myComponent = e(TweetComponent)
  //ReactDOM.render(<TweetCreationForm />, element)
  ReactDOM.render(myComponent, elementFeed)
}

// //for profile 
// const elementProfile = document.getElementById("tweetme-profile-badge-feed")
// if (elementProfile) {
//   const myComponent = e(ProfileBadgeComponent)
//   ReactDOM.render(myComponent, elementProfile)
// }

//for profile
const elementProfileElements = document.querySelectorAll(".tweetme-profile-badge")
elementProfileElements.forEach(container => {
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset),
    container)
});


//for detail
const tweetDetailElements = document.querySelectorAll(".tweetme-detail")
tweetDetailElements.forEach(container => {
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset),
    container)
});










// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
