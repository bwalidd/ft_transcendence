import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Signup extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Signup");
        loadCSS('../styles/Signup.css');
    }

    async getHtml() {
        return `
        <div class="container-f d-flex justify-content-center align-items-center position-relative" style="height:100vh">
            <div class="container signbg d-flex rounded flex-column justify-content-center align-items-center" style="width:500px; height:100vh">
                <h1 class="big-text text-center display-4 mb-5" style="margin-top: -150px;">Sign Up</h1>
                <div class="form-container d-flex flex-column justify-content-center">
                    <form id="signup-form" class="container">
                        <div class="form-group mb-4">
                            <input type="text" class="form-control" id="username" placeholder="Username" required>
                        </div>
                        <div class="form-group mb-4">
                            <input type="email" class="form-control" id="email" placeholder="Email" required>
                        </div>
                        <div class="form-group mb-4">
                            <input type="password" class="form-control" id="password" placeholder="Password" required>
                        </div>
                        <div class="form-group mb-4">
                            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" required>
                        </div>
                        <div class="form-group mb-4">
                            <input type="file" class="form-control" id="avatar" accept="image/*">
                        </div>
                        <button id="btn-submit" type="submit" class="btn btn-secondary text-center">Submit</button>
                    </form>
                    <a href="/profile" class="btn btn-outline-light text-center" style="margin-top: 100px">Sign in with Intra 42</a>
                    <div class="parag">
                        <p id="login"> Already have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    initialize() {
        document.getElementById("signup-form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            const avatar = document.getElementById("avatar").files[0];

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            try {
                const response = await fetch('http://localhost:8000/api/register/', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Registration successful!");
                    window.location.href = '/login'; // Redirect to login page
                } else {
                    const errorData = await response.json();
                    alert("Registration failed: " + (errorData.detail || "Unknown error"));
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("An error occurred during registration. Please try again.");
            }
        });
    }
}
