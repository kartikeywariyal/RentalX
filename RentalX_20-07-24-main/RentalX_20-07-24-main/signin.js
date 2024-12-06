document.getElementById("toggle-password").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});

document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!email || !password) {
        message.textContent = "Both fields are required!";
        message.style.color = "red";
        return;
    }

    if (email === "test@example.com" && password === "password123") {
        message.textContent = "Sign In Successful!";
        message.style.color = "green";
    } else {
        message.textContent = "Invalid email or password.";
        message.style.color = "red";
    }
});

window.onload = function() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleGoogleSignIn
    });

    google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }
    );
};

function handleGoogleSignIn(response) {
    const message = document.getElementById("message");
    if (response.credential) {
        message.textContent = "Signed in with Google!";
        message.style.color = "green";
    } else {
        message.textContent = "Google Sign-In failed.";
        message.style.color = "red";
    }
}
