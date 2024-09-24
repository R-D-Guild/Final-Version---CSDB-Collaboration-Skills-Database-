import { supabase } from './supabaseClient';  // Import the Supabase client

// To handle Discord sign Up method
document.getElementById("discordSignUpBtn").addEventListener("click", function () {
    // Trigger Supabase's OAuth sign-in with Discord
    supabase.auth.signInWithOAuth({
      provider: 'discord'
    });
  })

    // To handle GitHub sign Up method
    document.getElementById("gitHubSignUpBtn").addEventListener("click", function () {
    // Trigger Supabase's OAuth sign-in with GitHub
    supabase.auth.signInWithOAuth({
      provider: 'github',
    //   options: {
    //     redirectTo: 'http://localhost:5174/dashboard' 
    //   }
    })
    });

    // Optional: Check the user's authentication status
    supabase.auth.getSession().then(({ data: { session }, error }) => {
    if (session) {
      console.log("User is authenticated:", session.user);
    } else {
      console.log("User is not authenticated");
    }
  });

const signUpNewUser = async ()=>{
    const form = document.getElementById('signUpFormDetails');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const errorMessage = document.getElementById('confirmationMessage');
    const togglePassword = document.getElementById('togglePassword');
    
    
    // Show error message and shake effect
    const showError = (message)=>{
      errorMessage.textContent = message;
      errorMessage.classList.add('alert', 'shake');  // Add alert and shake class
      errorMessage.style.display = 'block';  // Ensure it is visible
    
      // Automatically hide the error message after 5 seconds
      setTimeout(() => {
        errorMessage.style.display = 'none';
        errorMessage.classList.remove('shake');  // Remove shake effect after it's hidden
      }, 9000);  // 5000ms = 5 seconds
    }
    
    // Clear error message when valid input is entered
    const clearError = ()=>{
      errorMessage.style.display = 'none';
      errorMessage.classList.remove('shake');
    }
    
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
      const passwordFieldType = passwordInput.getAttribute('type');
      
      if (passwordFieldType === 'password') {
        passwordInput.setAttribute('type', 'text');  // Show password
        togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;  // Change icon to "eye-slash"
      } else {
        passwordInput.setAttribute('type', 'password');  // Hide password
        togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;  // Change icon to "eye"
      }
    });
    const resetCaptcha = ()=>{
      if (typeof hcaptcha !== 'undefined') {
        hcaptcha.reset();  // Reset the hCaptcha so the user can retry login
      }
    }
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const captchaToken = hcaptcha.getResponse();  // Get the hCaptcha token
    
    
      // Clear error message if inputs are valid
      clearError();
    
      if(!email || !password) {
        showError('Email and password are required.');
        resetCaptcha()
        return; 
      }
    
      // Basic email validation
      const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      // Email validation check
      if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        resetCaptcha()
        return;
      }
    
      if (!captchaToken) {
        showError('Please complete the CAPTCHA.');
        resetCaptcha()
        return; 
      }
    
      try {
        // Sign up the user with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            captchaToken,  // Send hCaptcha token
          },
        });
        
         // Check for Supabase error
        if (error) {
          showError( error.message);
          resetCaptcha()
          return;
        }
    
           // Access the user object from the data returned by Supabase
        const user = data.user;
        
        if(!user) {
          showError('Error: Could not retrieve user information after sign-up.');
          resetCaptcha()
          return;
        }
    
        // Success message
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Sign up successful! Please check your email to verify your account.';
    
        // Store the email temporarily so it can be used in the verification page
        localStorage.setItem('pendingVerificationEmail', email);
        // Redirect to verification pending page
          window.location.href = './verification-pending.html';  // Adjust the path as needed
          
        } catch (error) {
          showError('Something went wrong. Please try again later.');
          resetCaptcha()
        }
      });
};
// Call the function to ensure the form behavior is handled
signUpNewUser();