function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const handleLike = (tweet_id, action) => {
  // current_likes++
  // console.log("working")
  // id = "tweet_" + tweet_id
  // updated_likes = "Likes " + current_likes
  // likes = document.getElementById(id)
  // likes.innerHTML = updated_likes
  // console.log(updated_likes)
  console.log(tweet_id, action);

  const url = 'api/action'
  const method = 'POST'
  const responseType = 'json'
  const csrftoken = getCookie('csrftoken');

  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.setRequestHeader("X-CSRFToken", csrftoken)
  const data = JSON.stringify({
    "id": tweet_id,
    "action": action
  })


  xhr.onload = () => {
    console.log("action response")
    const response = xhr.response
    // react state handle
    console.log(response);

    loadTweets(tweetElm)
  }

  xhr.send(data)
  return
}

function likeBtn(tweet) {
  //console.log(tweet)
  return "<button id= tweet_" + tweet.id + " class = 'btn btn-sm btn-primary mt-2 custom_btn' onclick = handleLike(" + tweet.id + "," + "'like'" + ") > Like " + tweet.likes + "</button>"
}

function unlikeBtn(tweet) {
  //console.log(tweet)
  return "<button id= tweet_" + tweet.id + " class = 'btn btn-sm btn-secondary mt-2 custom_btn' onclick = handleLike(" + tweet.id + "," + "'unlike'" + ") > UnLike </button>"
}

function retweetBtn(tweet) {
  //console.log(tweet)
  return "<button id= tweet_" + tweet.id + " class = 'btn btn-outline btn-sm btn-secondary mt-2 custom_btn' onclick = handleLike(" + tweet.id + "," + "'retweet'" + ") > Retweet </button>"
}
const formattedTweet = (tweet) => {
  return `<div class='
     tweet mb-2 px-1'><h3 class='mt-2'>${tweet.id}</h3>
       <p > ${tweet.content}</p>${likeBtn(tweet)}${unlikeBtn(tweet)}${retweetBtn(tweet)}</div>`
}

const loadTweets = (tweetElement) => {
  const xhttp = new XMLHttpRequest()
  const method = 'GET'
  const url = "/api"
  const responseType = "json"

  xhttp.responseType = responseType
  xhttp.open(method, url)
  xhttp.onload = function () {
    console.log("working fine bro...")
    const serverResponse = xhttp.response;
    console.log(serverResponse);
    var listed_tweets = serverResponse
    // console.log(listed_tweets)
    tweetElement.innerHTML = ""
    var final_tweets = ""

    for (var i = 0; i < listed_tweets.length; i++) {
      var currentItem = formattedTweet(listed_tweets[i]);
      final_tweets += currentItem
    }
    tweetElement.innerHTML = final_tweets
  }
  // console.log(xhttp)
  // trigger the request
  xhttp.send()
}
// functions declearation end//
const handleFormSubmit = (event) => {
  event.preventDefault(); // prevent to submit the data instantly
  const myForm = event.target; // event.target returns the html form
  const myFormData = new FormData(myForm); // the data entered in the form
  const url = myForm.getAttribute("action") // endpoint
  const method = myForm.getAttribute("method") //POST or GET
  // now we can send an httpRequest as we have both the endpoint and the method

  const xhr = new XMLHttpRequest();
  xhr.open(method, url)
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  const responseType = "json"
  // onload is the function called when an XMLHttpRequest transaction completes successfully.
  xhr.onload = () => {
    if (xhr.status == 201) {
      const serverResponse = xhr.response
      console.log(serverResponse);
      loadTweets(tweetElm);
      myForm.reset();
    } else if (xhr.status === 400) {
      const errorJson = xhr.response
      console.log(errorJson);
      // console.log(errorJson.content[0]);
      console.log("text length must be under 200 chars");
    } else if (xhr.status === 401 || xhr.status === 403) {
      console.log("unauthorized user:please log in");
    }
    console.log("ok");
    console.log(xhr.response);
  }
  xhr.onerror = () => alert('an error occured ; try again letter')
  xhr.send(myFormData)
}

const tweetCreationFormElement = document.getElementById("tweet_creation_form");
// add 'submit' event listener to the form
tweetCreationFormElement.addEventListener('submit', handleFormSubmit);


// first execution of the js page
const tweetElm = document.getElementById("tweets")
tweetElm.innerHTML = "loading..."
loadTweets(tweetElm);