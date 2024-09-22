import { supabase } from './supabaseClient';  // Import the Supabase client

const forgotPassForm = document.getElementById('forgotPassFormDetails');
const forgotPassEmailInput = document.getElementById('forgotPassEmail');
const forgotPassMessage = document.getElementById('forgotPassErrorMessage');
const confirmationPopup = document.getElementById('confirmationPopup');
const closePopup = document.getElementById('closePopup');

// Show popup when the email is sent
function showPopup() {
    confirmationPopup.style.display = 'flex';
  }
  
  // Close popup when the user clicks "OK"
  closePopup.addEventListener('click', () => {
    confirmationPopup.style.display = 'none';
  });

// Show error message and shake effect
const showForgotPassError = (message)=>{    
    forgotPassMessage.textContent = message;
    forgotPassMessage.classList.add('alert', 'shake');
    forgotPassMessage.style.display = 'block';

    setTimeout(() => {
        forgotPassMessage.style.display = 'none';
        forgotPassMessage.classList.remove('shake');
      }, 5000);  // 5 seconds
}

// Clear error message when valid input is entered
const clearForgotPassError = ()=>{
    forgotPassMessage.style.display = 'none';
    forgotPassMessage.classList.remove('shake');
}

forgotPassForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

    const email = forgotPassEmailInput.value.trim();
    const captchaToken = hcaptcha.getResponse();  // Get the hCaptcha token

    clearForgotPassError();
    
  // Validate email input
  if(!email){
    showForgotPassError('Please enter your email.')
    return;
  }

  // Validate email format
  const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if(!validateEmail(email)){
    showForgotPassError('Please enter a valid email address.');
    return;
  }

  // Ensure hCaptcha is completed
  if (!captchaToken) {
    showForgotPassError('Please complete the CAPTCHA.');
    return;
  }


  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      captchaToken,  // Send hCaptcha token
    });

    if (error) {
      showForgotPassError('Error: ' + error.message);
      return;
    }

    // Success message
  
    // Show the popup if the email was sent successfully
    showPopup();

  } catch (error) {
    showForgotPassError('Something went wrong. Please try again later.');
  }
});