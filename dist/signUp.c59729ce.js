var e=globalThis,t={},s={},n=e.parcelRequire3d38;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in s){var n=s[e];delete s[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},e.parcelRequire3d38=n),n.register;var a=n("iAutD");document.getElementById("discordSignUpBtn").addEventListener("click",function(){(0,a.supabase).auth.signInWithOAuth({provider:"discord"})}),document.getElementById("gitHubSignUpBtn").addEventListener("click",function(){(0,a.supabase).auth.signInWithOAuth({provider:"github"})}),(0,a.supabase).auth.getSession().then(({data:{session:e},error:t})=>{e?console.log("User is authenticated:",e.user):console.log("User is not authenticated")}),(async()=>{let e=document.getElementById("signUpFormDetails"),t=document.getElementById("signUpEmail"),s=document.getElementById("signUpPassword"),n=document.getElementById("confirmationMessage"),i=document.getElementById("togglePassword"),r=e=>{n.textContent=e,n.classList.add("alert","shake"),n.style.display="block",setTimeout(()=>{n.style.display="none",n.classList.remove("shake")},9e3)},o=()=>{n.style.display="none",n.classList.remove("shake")};i.addEventListener("click",()=>{"password"===s.getAttribute("type")?(s.setAttribute("type","text"),i.innerHTML='<i class="fa-solid fa-eye-slash"></i>'):(s.setAttribute("type","password"),i.innerHTML='<i class="fa-solid fa-eye"></i>')});let l=()=>{"undefined"!=typeof hcaptcha&&hcaptcha.reset()};e.addEventListener("submit",async e=>{e.preventDefault();let i=t.value.trim(),d=s.value.trim(),c=hcaptcha.getResponse();if(o(),!i||!d){r("Email and password are required."),l();return}if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i)){r("Please enter a valid email address."),l();return}if(!c){r("Please complete the CAPTCHA."),l();return}try{let{data:e,error:t}=await (0,a.supabase).auth.signUp({email:i,password:d,options:{captchaToken:c}});if(t){r(t.message),l();return}if(!e.user){r("Error: Could not retrieve user information after sign-up."),l();return}n.style.color="green",n.textContent="Sign up successful! Please check your email to verify your account.",localStorage.setItem("pendingVerificationEmail",i),window.location.href="./verification-pending.html"}catch(e){r("Something went wrong. Please try again later."),l()}})})();
//# sourceMappingURL=signUp.c59729ce.js.map