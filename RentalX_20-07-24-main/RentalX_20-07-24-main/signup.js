document.getElementById("toggle-password").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");

    if (this.checked) {
        passwordField.type = "text";
        confirmPasswordField.type = "text";
    } else {
        passwordField.type = "password";
        confirmPasswordField.type = "password";
    }
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const message = document.getElementById("message");

    if (!name || !email || !phone || !gender || !password || !confirmPassword) {
        message.textContent = "All fields are required!";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    const formData = {
        name,
        email,
        phone,
        gender,
        password
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            message.textContent = "Sign Up Successful!";
            message.style.color = "green";
            document.getElementById("signupForm").reset();
        } else {
            message.textContent = "Sign Up Failed: " + data.message;
            message.style.color = "red";
        }
    })
    .catch(error => {
        message.textContent = "An error occurred. Please try again later.";
        message.style.color = "red";
    });
});
