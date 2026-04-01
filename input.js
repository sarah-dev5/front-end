

// Function for user registration
async function registerUser(data) {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Function for user login
async function loginUser(data) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Attach forms when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Register form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
      };
      const result = await registerUser(data);
      if (result.token) {
        alert("Registration successful!");
        window.location.href = "login.html"; // redirect after success
      } else {
        alert("Error: " + (result.message || "Registration failed"));
      }
    });
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      const result = await loginUser(data);
      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Login successful!");
        window.location.href = "dashboard.html"; // redirect after success
      } else {
        alert("Error: " + (result.message || "Login failed"));
      }
    });
  }
});

