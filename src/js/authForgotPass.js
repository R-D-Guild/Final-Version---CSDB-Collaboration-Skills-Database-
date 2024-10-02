import { supabase } from './supabaseClient';  // Import the Supabase client
import '../css/styleForgotPass.css'; //Import the css styling 


// DOM elements
const forgotPassForm = document.getElementById('forgotPassFormDetails');
const forgotPassEmailInput = document.getElementById('forgotPassEmail');
const forgotPassMessage = document.getElementById('forgotPassErrorMessage');
const confirmationPopup = document.getElementById('confirmationPopup');
const closePopup = document.getElementById('closePopup');

// Show the confirmation popup
function showPopup() {
  confirmationPopup.style.display = 'flex';  // Show the popup
}

// Hide the confirmation popup
const hidePopup = () => {
  confirmationPopup.style.display = 'none';  // Hide the popup
};


// Show error message with shake effect
const showForgotPassError = (message) => {    
  forgotPassMessage.textContent = message;
  forgotPassMessage.classList.add('alert', 'shake');
  forgotPassMessage.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    forgotPassMessage.style.display = 'none';
    forgotPassMessage.classList.remove('shake');
  }, 5000);
};

// Clear error message when valid input is entered
const clearForgotPassError = () => {
  forgotPassMessage.style.display = 'none';
  forgotPassMessage.classList.remove('shake');
};

// Reset hCaptcha after failed submission
const resetCaptcha = () => {
  if (typeof hcaptcha !== 'undefined') {
    hcaptcha.reset();  // Reset the hCaptcha so the user can retry
  }
};

// Check if the email exists in Supabase before sending the reset link
const checkEmailExists = async (email) => {
  const { data, error } = await supabase
    .from('auth.users')  // Querying the internal auth.users table
    .select('email')
    .eq('email', email)
    .single();  // Return a single match

  return data;  // If data exists, the email is valid
};

// Handle Forgot Password form submission
forgotPassForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = forgotPassEmailInput.value.trim();
  const captchaToken = hcaptcha.getResponse();  // Get the hCaptcha token

  clearForgotPassError();  // Clear any previous error messages

  // Validate email input
  if (!email) {
    showForgotPassError('Please enter your email.');
    return;
  }

  // Check for hCaptcha token
  if (!captchaToken) {
    showForgotPassError('Please complete the CAPTCHA.');
    return;
  }

  try {
          // Check if the email exists
    const emailExists = await checkEmailExists(email);

    if (!emailExists) {
      showForgotPassError('This email does not exist in our system.');
      resetCaptcha();  // Reset hCaptcha
      return;
    }


    // Proceed to send the password reset link
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      captchaToken,  // Send hCaptcha token to Supabase
      options: {
        redirectTo: 'https://r-d-guild.github.io/Final-Version---CSDB-Collaboration-Skills-Database-/reset-password.html',
      }
    });

    if (error) {
      showForgotPassError('Error sending reset link: ' + error.message);
      resetCaptcha();  // Reset hCaptcha
      return;
    }

    // Show the success popup after the reset link is sent successfully
    showPopup();

  } catch (error) {
    showForgotPassError('Something went wrong. Please try again later.');
    resetCaptcha();  // Reset hCaptcha after unexpected error
  }
});

// Handle OK button click in the popup
closePopup.addEventListener('click', () => {
  hidePopup();  // Hide the popup

  // Redirect to the reset password page after 5 seconds
});
