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
        this.avatarRemoved = false; // Flag to track if the avatar was removed
        this.setTitle("Settings");
        loadCSS('../styles/Settings.css');
    }

    async getHtml() {
        return `
            <div class="bodyy">
                <div class="settings-container">
                    <h1>User Settings</h1>
                    
                    <form class="settings-form" id="settingsForm">
                        <!-- Avatar Section -->
                        <div class="form-group avatar-group">
                            <div class="avatar-preview" id="avatarPreview" style="background-image: url('../images/default-avatar.png');"></div>
                            <input type="file" id="avatar" name="avatar" accept="image/*" onchange="previewAvatar(event)" disabled>
                            <button type="button" id="remove-avatar" class="pic-avatar remove-avatar" onclick="removeAvatar()">Remove</button>
                            <button type="button" id="upload-avatar" class="pic-avatar upload-avatar" onclick="uploadAvatar()">Upload</button>
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
                            <label for="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password">                
                        </div>

                        <!-- Save Button -->
                        <button type="button" id="saveSettingsButton" class="save-button" onclick="saveSettings()">Save Changes</button>
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
        window.saveSettings = this.saveSettings.bind(this);
        window.removeAvatar = this.removeAvatar.bind(this);  // Bind removeAvatar method
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
        console.log('csrfff--->', csrfToken);
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
            inputField.style.color = 'antiquewhite';
        } else {
            inputField.style.color = 'grey';
        }
    }

    async saveSettings() {
        const csrfToken = await this.getCsrfToken();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const avatar = document.getElementById('avatar').files[0];

        // Validate passwords
        if (password && password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const formData = new FormData();

        // Append avatar based on the `avatarRemoved` flag
        if (this.avatarRemoved) {
            // Fetch default avatar as a Blob and append to formData
            const defaultAvatarBlob = await fetch('../images/default.jpeg').then(res => res.blob());
            formData.append('avatar', defaultAvatarBlob, 'default-avatar.jpeg');
        } else if (avatar) {
            formData.append('avatar', avatar);
        }

        formData.append('username', username);
        formData.append('email', email);
        if (password) {
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword);
        }

        try {
            const response = await fetch(`http://localhost:8001/api/auth/user/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                body: formData
            });
            if (!response.ok) throw new Error(`Failed to update user settings: ${response.statusText}`);
        
            const updatedData = await response.json();
            console.log('Updated user data:', updatedData);

            // Handle success
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating user settings:', error);
            alert('Failed to update settings. Please try again later.');
        }
    }
    
    async removeAvatar() {
        const avatarPreview = document.getElementById("avatarPreview");
        if (avatarPreview) {
            avatarPreview.style.backgroundImage = 'url("../images/default.jpeg")';
            avatarPreview.style.backgroundSize = "cover";
            avatarPreview.style.backgroundPosition = "center";
            document.getElementById('remove-avatar').style.display = 'none';
            document.getElementById('upload-avatar').style.display = 'block';
            this.avatarRemoved = true; // Set flag to true
        }
        const avatarInput = document.getElementById('avatar');
        if (avatarInput) {
            avatarInput.value = '';  // Clear the file input field
        }
    }
    

    async uploadAvatar() {
        
    }
}
