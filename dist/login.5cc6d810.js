const emailInput = document.getElementById("logInEmail");
const passwordInput = document.getElementById("logInPassword");
const errorMessage = document.getElementById("loginMessage");
const loginForm = document.getElementById("logInFormDetails");
const togglePassword = document.getElementById("togglePassword");
// Show error message and shake effec
const showLoginError = (message)=>{
    errorMessage.textContent = message;
    errorMessage.classList.add("alert", "shake"); // Add alert and shake class
    errorMessage.style.display = "block";
    // Automatically hide the error message after 5 seconds
    setTimeout(()=>{
        errorMessage.style.display = "none";
        errorMessage.classList.remove("shake"); // Remove shake effect after it's hidden
    }, 5000); // 5000ms = 5 seconds
};
// Clear error message when valid input is entered
const clearLoginError = ()=>{
    errorMessage.style.display = "none";
    errorMessage.classList.remove("shake");
};
// Toggle password visibility
togglePassword.addEventListener("click", ()=>{
    const passwordFieldType = passwordInput.getAttribute("type");
    if (passwordFieldType === "password") {
        passwordInput.setAttribute("type", "text"); // Show password
        togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`; // Change icon to "eye-slash"
    } else {
        passwordInput.setAttribute("type", "password"); // Hide password
        togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`; // Change icon to "eye"
    }
});
loginForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    // Clear previous error messages
    clearLoginError();
    // Validate email and password
    if (!email || !password) {
        showLoginError("Email and password are required.");
        return;
    }
    const validateEmail = (email)=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!validateEmail(email)) {
        showLoginError("Please enter a valid email address.");
        return;
    }
    // Check for hCaptcha token
    const captchaToken = hcaptcha.getResponse();
    if (!captchaToken) {
        showLoginError("Please complete the CAPTCHA.");
        return;
    }
    // Proceed with login using Supabase (password validation is handled by Supabase)
    try {
        const { data, error } = await supabase.auth.signIn({
            email,
            password,
            options: {
                captchaToken
            }
        });
        // Handle Supabase login errors (wrong password or email not found)
        if (error) {
            console.error("Supabase Error:", error); // Log the error for debugging
            if (error.message.includes("Invalid login credentials")) showLoginError("Incorrect password. Please try again.");
            else if (error.message.includes("Invalid email or password")) showLoginError("This email does not exist in our system.");
            else showLoginError("Login failed: " + error.message);
            return;
        }
        const user = data.user;
        if (!user) {
            showLoginError("Error: Could not retrieve user information.");
            return;
        }
        setTimeout(()=>{
            // Success! Redirect to dashboard
            errorMessage.style.color = "green";
            errorMessage.textContent = "Login successful! Redirecting...";
            window.location.href = "/dashardboard.html";
        }, 3000);
    } catch (error) {
        console.error("Unexpected Error:", error); // Log unexpected errors for debugging
        showLoginError("Something went wrong. Please try again later.");
        // Show error from Supabase (like invalid credentials or weak password)
        hcaptcha.reset(); // Reset hCaptcha after failed login
    }
});

//# sourceMappingURL=login.5cc6d810.js.map
