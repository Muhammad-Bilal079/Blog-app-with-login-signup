let click = document.getElementById('Clickprofile')
let dropdown = document.querySelector('.dropdown')
let cancel = document.querySelector('#cancel')
let signup = document.querySelector('#signup')
let logout = document.querySelector('#logout')
let edit = document.querySelector('#edit')
let person = document.querySelector('.person')
// let profileName = document.querySelector('.profile-name')
let createPost  = document.querySelector('#post-btn')
let post = document.querySelector('.post')
let Delete = document.querySelector('#deletePostArea')


let users =JSON.parse(localStorage.getItem("users"))
let loggedInUser = localStorage.getItem('loggedInUser', JSON.stringify())


let loged = JSON.parse(localStorage.getItem("loggedInUser"))
person.innerHTML = `Welcome Mr.${loged.username}!`

// let logged = JSON.parse(localStorage.getItem("loggedInUser"))
// profileName.innerHTML = `${loged.username}`

click.addEventListener('click', function () {
    dropdown.style.margin = '0px 0px 0px 75vw'
    
})

cancel.addEventListener('click', function () {
    // console.log('chal raha hun');
    dropdown.style.margin = '-85vh 0px 0px 75vw'
});

signup.addEventListener('click', function () {
    window.location.href = '../signup/index.html'
});

logout.addEventListener('click', function () {
    console.log(loggedInUser);
    localStorage.removeItem('loggedInUser');
    window.location.href = '../signup/index.html'
});
edit.addEventListener('click', function(){
    // alert("hello");
    window.location.href = '../editpage/index.html'
})

// -------------------POST SEction here------------------------

let inputmodal = document.querySelector("#inputText");
let fileSelector = document.querySelector("#media");
let fileup = document.querySelector("#fil");
let submit = document.querySelector("#submit");
let postContainer = document.querySelector(".postsection");

fileSelector.addEventListener("click",function(){
    fileup.click();
})

// yeh function tb work krega jb hum koi img file select krenge jo hume post me dalni h
// yeh local storage me geturl naam se aek key banaiga aur usme jo humne img select
// ki h uski sirf url rkhega ta ke post krte hue waha se lele aur post jb hojaiga
// tw tw local storage se remove krdenge taake bd me use nhi krpaye dosra user

fileup.addEventListener("change", () => {
  // reader object file ko different files ko read krne k liye h
  let reader = new FileReader();

  // isme reader select img address ko url me convert krega
  reader.readAsDataURL(fileup.files[0]);

  // aur yeh load hoga tw reader url banakr dega jokee reader.result k ander hota h 
  reader.addEventListener("load", () => {
    let Url = reader.result;
    // phir is url ko hum local  storage me save krdenge
    localStorage.setItem("geturl", Url);
  });
});

submit.addEventListener("click",function(){
let getpost = JSON.parse(localStorage.getItem("post")) || [];
// console.log(getpost);

let userName = JSON.parse(localStorage.getItem("loggedInUser")).username
// console.log(userName);

let getUrl = localStorage.getItem("geturl");
let postSend = {
    ID : Date.now(),
    userName : userName,
    ...(inputmodal.value && { text: inputmodal.value }),
        ...(getUrl && { url: getUrl })
}
getpost.push(postSend)
localStorage.setItem("post", JSON.stringify(getpost))
inputmodal.value = "";
localStorage.removeItem("geturl");
  displayPost();
})

function displayPost() {
  postContainer.innerHTML = "";
  let getpost = JSON.parse(localStorage.getItem("post")) || [];

  getpost.reverse().map((posten) => {
    postContainer.innerHTML += `<div class="card" style="width: 100%;height : 40vh;  background-color: #9FE2BF;" >
    <h1 style="font-size : 20px; text-align: center">${posten.userName}</h1>
    <img src="${posten.url}" class="card-img-top" alt="..." height= 50%; width="100%" >
    <div class="card-body">
      <p class="card-text">${posten.text}</p>
    </div>
  </div>`;
  });
}

  displayPost();






