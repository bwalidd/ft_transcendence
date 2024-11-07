import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Settings extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
        loadCSS('../styles/Settings.css');
    }

    async getHtml() {
        return `
            <div class="bodyy">
                <div class="settings-container">
                    <h1>User Settings</h1>
                    
                    <form class="settings-form">
                        <!-- Avatar Section -->
                        <div class="form-group avatar-group">
                            <div class="avatar-preview" id="avatarPreview" style="background-image: url('../images/default-avatar.png');"></div>
                            <input type="file" id="avatar" name="avatar" accept="image/*" onchange="previewAvatar(event)" disabled>
                            <button class="pic-avatar remove-avatar">Remove</button>
                            <button class="pic-avatar upload-avatar">Upload</button>
                        </div>

                        <!-- Username Section -->
                        <div class="form-group">
                            <label for="username">Username</label>
                            <div class="switch-container">
                                <input type="text" id="username" name="username" placeholder="Enter new username" disabled>
                                <label class="switch">
                                    <input type="checkbox" onclick="toggleInput('username')">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                        <!-- Email Section -->
                        <div class="form-group">
                            <label for="email">Email</label>
                            <div class="switch-container">
                                <input type="email" id="email" name="email" placeholder="Enter new email" disabled>
                                <label class="switch">
                                    <input type="checkbox" onclick="toggleInput('email')">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                        <!-- Password Section -->
                        <div class="form-group">
                            <label for="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter new password">                
                        </div>
                        <div class="form-group">
                            <label for="password"></label>
                                <input type="password" id="password" name="password" placeholder="confirm password">                
                        </div>

                        <!-- Save Button -->
                        <button type="button" id="saveSettingsButton" class="save-button">Save Changes</button>
                    </form>
                    <div class="back-home">
                        <a href="/home">Back to Home</a>
                    </div>
                </div>
            </div>

        `;
    }

    async initialize() {
        window.toggleInput = this.toggleInput.bind(this);
        await this.fetchUserData();
    }

    async getCsrfToken() {
        const name = 'csrftoken=';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }

    async fetchUserData() {
        const csrfToken = await this.getCsrfToken();
    try {
        const response = await fetch(`http://localhost:8001/api/auth/userdetails`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });
        if (!response.ok) throw new Error(`Failed to fetch user data: ${response.statusText}`);
    
        const userData = await response.json();
        console.log('User data:', userData);

        // Populate the fields with user data
        document.getElementById("username").value = userData.username || "";
        document.getElementById("email").value = userData.email || "";

        // Set avatar image if available
        const avatarPreview = document.getElementById("avatarPreview");
        if (userData.avatar) {
            avatarPreview.style.backgroundImage = `url(http://localhost:8001${userData.avatar})`;
            avatarPreview.style.backgroundSize = "cover";
            avatarPreview.style.backgroundPosition = "center";
        }
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
        
    }

    toggleInput(inputId) {
        const inputField = document.getElementById(inputId);
        inputField.disabled = !inputField.disabled;
        if (inputField.disabled === false) {
            inputField.style.color = antiquewhite;
        }else{
            inputField.style.color = grey;
        }
    }
    

    
}
