import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace with your actual Firebase Project Configuration
// 1. Go to Firebase Console -> Project Settings
// 2. In the specific Web App section, copy your configuration keys below
const firebaseConfig = {
    apiKey: "AIzaSyClYoKjaj-H2UQiMN8m1FNL200hvPZWFZs",
    authDomain: "thepurenote-d3bbc.firebaseapp.com",
    projectId: "thepurenote-d3bbc",
    storageBucket: "thepurenote-d3bbc.firebasestorage.app",
    messagingSenderId: "226258263186",
    appId: "1:226258263186:web:2391b8255938a2dcea9a4b",
    measurementId: "G-BVKG22EXW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Reference UI Elements
const navLoginBtn = document.getElementById('nav-login-btn');
const googleLoginBtn = document.getElementById('google-login-btn');

// Observe Auth State
onAuthStateChanged(auth, (user) => {
    if (navLoginBtn) {
        if (user) {
            // User is signed in.
            const displayName = user.displayName ? user.displayName.split(' ')[0] : 'Account';
            navLoginBtn.innerHTML = `Logout (${displayName})`;
            navLoginBtn.href = "#";
            navLoginBtn.onclick = (e) => {
                e.preventDefault();
                signOut(auth).then(() => {
                    window.location.reload();
                });
            };
        } else {
            // User is signed out.
            navLoginBtn.innerHTML = `Log in`;
            navLoginBtn.href = "login.html";
            navLoginBtn.onclick = null;
        }
    }
});

// Bind Google Login action if on Login page
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Auth Error:", error.message);
                alert("Google Login Failed: " + error.message);
            });
    });
}

// Bind Standard Email/Password Auth
const emailLoginForm = document.getElementById('email-login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const authErrorMsg = document.getElementById('auth-error-msg');
const emailActionBtn = document.getElementById('email-action-btn');
const toggleAuthMode = document.getElementById('toggle-auth-mode');

let isSignUpMode = false;

if (emailLoginForm) {
    toggleAuthMode.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        if (isSignUpMode) {
            emailActionBtn.innerText = "Create Account";
            toggleAuthMode.innerText = "Log in instead";
            document.querySelector('.auth-container h1').innerText = "Join Us";
            document.querySelector('.auth-container p').innerText = "Create an account to track your orders and samples.";
        } else {
            emailActionBtn.innerText = "Sign In";
            toggleAuthMode.innerText = "Sign up instead";
            document.querySelector('.auth-container h1').innerText = "Welcome Back";
            document.querySelector('.auth-container p').innerText = "Sign in to access your exclusive fragrance journey.";
        }
    });

    emailLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        authErrorMsg.style.display = 'none';
        
        emailActionBtn.innerText = "Processing...";
        emailActionBtn.disabled = true;

        let authPromise;
        if (isSignUpMode) {
            authPromise = createUserWithEmailAndPassword(auth, email, password);
        } else {
            authPromise = signInWithEmailAndPassword(auth, email, password);
        }

        authPromise.then((userCredential) => {
            window.location.href = "index.html";
        }).catch((error) => {
            emailActionBtn.innerText = isSignUpMode ? "Create Account" : "Sign In";
            emailActionBtn.disabled = false;
            authErrorMsg.innerText = error.message.replace("Firebase:", "").trim();
            authErrorMsg.style.display = 'block';
        });
    });
}
