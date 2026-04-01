document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value
    };

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert("Account created successfully!");
          window.location.href = "login.html"; 
        } else {
          alert("Error: " + result.message);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  });
});