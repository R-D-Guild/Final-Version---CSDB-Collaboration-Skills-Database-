// Inline script for sign out functionality
import { supabase } from './supabaseClient';  // Import the Supabase 
import '../css/style-db.css' //Import the css styling 


const signOutBtn = document.getElementById('signOutBtn');
    const signOutPopup = document.getElementById('signOutPopup');
    const proceedSignOutBtn = document.getElementById('proceedSignOut');
    const cancelSignOutBtn = document.getElementById('cancelSignOut');

    const showPopUp = ()=>{
        signOutPopup.style.display = 'flex';
    };

    const hidePopUp = ()=>{
        signOutPopup.style.display = 'none';
    };

    signOutBtn.addEventListener('click', showPopUp);
    cancelSignOutBtn.addEventListener('click', hidePopUp);

    proceedSignOutBtn.addEventListener('click', async ()=>{
        try {
            const {error} = await supabase.auth.signOut();

            if (error) {
                console.error('Error signing out:', error.message)
            }

        // Sign out successful, redirect to login or signup page
        window.location.href = '/index.html';  // Or use '/login.html' based on preference
        }catch(error) {
            console.error('Unexpected error during sign out:', error);
        }
    })