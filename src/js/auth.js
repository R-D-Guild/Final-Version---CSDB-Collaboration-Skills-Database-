import { supabase } from './supabaseClient';  // Import the Supabase client
import '../css/style.css'; // Import the CSS styling

// Get the common error message container
const errorMessage = document.getElementById('confirmationMessage');

// Reusable function to show error messages
const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.add('alert', 'shake');  // Add alert and shake class
  errorMessage.style.display = 'block';  // Ensure it is visible

  // Automatically hide the error message after 5 seconds
  setTimeout(() => {
    errorMessage.style.display = 'none';
    errorMessage.classList.remove('shake');  // Remove shake effect after it's hidden
  }, 3000);  
};

// Handle OAuth provider sign-ups with common error handling
const handleOAuthSignUp = async (provider) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) {
      console.error(`Error with ${provider} sign-up:`, error.message);
      showError(`${provider} sign-up failed. Please try again.`);
    }
  } catch (err) {
    console.error(`Unexpected error with ${provider} sign-up:`, err);
    showError(`An unexpected error occurred with ${provider}. Please try again.`);
  }
};

// Discord sign-up
document.getElementById("discordSignUpBtn").addEventListener("click", () => {
  handleOAuthSignUp('discord');
});

// GitHub sign-up
document.getElementById("gitHubSignUpBtn").addEventListener("click", () => {
  handleOAuthSignUp('github');
});

// Google sign-up
document.getElementById('googleSignUpBtn').addEventListener('click', () => {
  handleOAuthSignUp('google');
});

// Optional: Check the user's authentication status
supabase.auth.getSession().then(({ data: { session }, error }) => {
  if (session) {
    console.log("User is authenticated:", session.user);
  } else if (error) {
    console.error("Session error:", error.message);
    showError("An error occurred while checking your session.");
  } else {
    console.log("User is not authenticated");
  }
});

// Email and password sign-up function
const signUpNewUser = async () => {
  const form = document.getElementById('signUpFormDetails');
  const emailInput = document.getElementById('signUpEmail');
  const passwordInput = document.getElementById('signUpPassword');
  const togglePassword = document.getElementById('togglePassword');

  // Clear error message when valid input is entered
  const clearError = () => {
    errorMessage.style.display = 'none';
    errorMessage.classList.remove('shake');
  };

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const passwordFieldType = passwordInput.getAttribute('type');
    passwordInput.setAttribute('type', passwordFieldType === 'password' ? 'text' : 'password');
    togglePassword.innerHTML = passwordFieldType === 'password'
      ? `<i class="fa-solid fa-eye-slash"></i>`
      : `<i class="fa-solid fa-eye"></i>`;
  });

  const resetCaptcha = () => {
    if (typeof hcaptcha !== 'undefined') {
      hcaptcha.reset();  // Reset hCaptcha for retry
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const captchaToken = hcaptcha.getResponse();  // Get the hCaptcha token

    clearError();

    if (!email || !password) {
      showError('Email and password are required.');
      resetCaptcha();
      return;
    }

    const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!validateEmail(email)) {
      showError('Please enter a valid email address.');
      resetCaptcha();
      return;
    }

    if (!captchaToken) {
      showError('Please complete the CAPTCHA.');
      resetCaptcha();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: { captchaToken },
      });

      console.log("Signup data:", data);  // Log the data response
      console.error("Signup error:", error);  // Log the error response

       // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const passwordFieldType = passwordInput.getAttribute('type');
    passwordInput.setAttribute('type', passwordFieldType === 'password' ? 'text' : 'password');
    togglePassword.innerHTML = passwordFieldType === 'password'
      ? `<i class="fa-solid fa-eye-slash"></i>`
      : `<i class="fa-solid fa-eye"></i>`;
  });

      if (error) {
        console.error("Supabase sign-up error:", error.message);
        
        // Additional handling for specific Supabase error messages
        if (error.message.includes("Invalid login credentials")) {
          showError("The email or password is incorrect. Please try again.");
        } else if (error.message.includes("Rate limit exceeded")) {
          showError("Too many attempts. Please wait and try again.");
        } else {
          showError(error.message);  // Show the specific error message from Supabase
        }
        
        resetCaptcha();
        return;
      }

      if (!data || !data.user) {
        showError('Error: Could not retrieve user information after sign-up.');
        resetCaptcha();
        return;
      }

      errorMessage.style.color = 'green';
      errorMessage.textContent = 'Sign up successful! Please check your email to verify your account.';
      localStorage.setItem('pendingVerificationEmail', email);
      window.location.href = './verification-pending.html';
    } catch (error) {
      console.error("Unexpected error during sign-up:", error);
      showError('Something went wrong. Please try again later.');
      resetCaptcha();
    }
  });
};

// Call the function to ensure the form behavior is handled
signUpNewUser();
