import { supabase } from './supabaseClient';  // Import the Supabase client
import '../css/styleResetPass.css'; //Import the css styling 


const resetPassForm = document.getElementById('resetPassFormDetails');
const newPassInput = document.getElementById('newPassword');
const confirmPassInput = document.getElementById('confirmPassword');
const resetPassMessage = document.getElementById('resetPassErrorMessage');
const confirmationPopup = document.getElementById('confirmationPopup');
const togglePassword = document.getElementById('togglePassword');
const okBtn = document.getElementById('okBtn');


// Show error message with shake effect
const showResetPassError = (message) => {
    resetPassMessage.textContent = message;
    resetPassMessage.classList.add('alert', 'shake');
    resetPassMessage.style.display = 'block';
  
    // Auto-hide after 5 seconds
    setTimeout(() => {
      resetPassMessage.style.display = 'none';
      resetPassMessage.classList.remove('shake');
    }, 5000);  // 5 seconds
  };
  

// Clear previous error messages
const clearResetPassError = () => {
    resetPassMessage.style.display = 'none';
    resetPassMessage.classList.remove('shake');
  };

  // Show the popup for successful password reset
const showPopup = () => {
    confirmationPopup.style.display = 'flex';  // Show the popup
  };

  // Hide the popup
const hidePopUp = () => {
    confirmationPopup.style.display = 'none';  // Hide the popup
  };


// Toggle password visibility for both password fields
togglePassword.addEventListener('click', () => {
  const passwordFieldType = newPassInput.getAttribute('type');
  
  if (passwordFieldType === 'password') {
    newPassInput.setAttribute('type', 'text');  // Show password
    confirmPassInput.setAttribute('type', 'text');  // Show confirm password
    togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;  // Change icon to "eye-slash"
  } else {
    newPassInput.setAttribute('type', 'password');  // Hide password
    confirmPassInput.setAttribute('type', 'password');  // Hide confirm password
    togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;  // Change icon to "eye"
  }
});

  // Handle Reset Password form submission
  resetPassForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

  const newPass = newPassInput.value.trim();
  const confirmPass = confirmPassInput.value.trim();

  clearResetPassError();  // Clear previous messages

    // Validate passwords
    if (newPass === '' || confirmPass === '') {
      showResetPassError('Please fill in both password fields.');
      return;
    }

  if (newPass !== confirmPass) {
    showResetPassError('Passwords do not match.');
    return;
  }
  
  try {
    // Reset the user's password using Supabase's auth method
    const { error } = await supabase.auth.updateUser({
      password: newPass,
    });

    if (error) {
      showResetPassError('Error resetting password: ' + error.message);
      return;
    }

    // Show the success popup after the password reset is successful
    showPopup();

  } catch (error) {
    showResetPassError('Something went wrong. Please try again later.');
  }

  });
  // Handle OK button click in the popup
okBtn.addEventListener('click', () => {
    hidePopUp();  // Hide the popup
  
    // Redirect to the login page after 5 seconds
    setTimeout(() => {
      window.location.href = '/login.html';  // Change the URL to your login page
    }, 5000);  // 5 seconds delay before redirect
  });
