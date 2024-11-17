  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBrSM5yzZflvFsj2_e1uXeNvg3pp2Qs1lY",
    authDomain: "login-form-234cb.firebaseapp.com",
    projectId: "login-form-234cb",
    storageBucket: "login-form-234cb.appspot.com",
    messagingSenderId: "535153254748",
    appId: "1:535153254748:web:e1d7e21f14fdba8a316199"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  function showMessage(message, divId){
        var messageDiv = document.getElementById(divId);
        messageDiv.style.display = 'block';
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(function(){
            messageDiv.style.opacity = 0;
        },5000)
      };


    const signUp = document.getElementById('submitSignUp');
    signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=> {
        const user = userCredential.user;

        if(!user.uid) {
            console.log('User ID is undefined');
            return;
        }

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        } 
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef,userData)
        .then(()=> {
            window.location.href = 'index.html';
        })
        .catch((error)=> {
            console.error('error writing document', error)
            showMessage("Error saving user data.", "signUpMessage");
        });
    })
    .catch((error)=> {
        console.error("Error creating user:", error);
        const errorCode=error.code;
        if(errorCode == 'auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('Unable to create User', 'signUpMessage');
        }
    })
  });


  const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=> {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=> {
        showMessage('Login is successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'chatbot.html';
    })
    .catch((error)=> {
        const errorCode = error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage')
        }
        else {
            showMessage('Account does not Exist', 'signInMessage')
        }
    })
})