import { supabase } from './supabaseClient';  // Import the Supabase client

const resendButton = document.getElementById('resendVerificationEmail');
const resendMessage = document.getElementById('resendMessage');

resendButton.addEventListener('click', async () => {
  resendMessage.textContent = ''; // Clear previous message

  const email = localStorage.getItem('pendingVerificationEmail'); // Retrieve the email used for signup
  
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);  // Use Supabase's API to resend email

    if (error) {
      resendMessage.textContent = 'Error resending verification email: ' + error.message;
    } else {
      resendMessage.style.color = 'green';
      resendMessage.textContent = 'Verification email sent again! Please check your inbox.';
    }
  } catch (err) {
    resendMessage.textContent = 'Something went wrong. Please try again later.';
  }
});

// Redirect to login after some time (optional)
setTimeout(() => {
  window.location.href = '/login.html';  // Redirect to login page after a delay
}, 10000);  // Wait 10 seconds before redirecting