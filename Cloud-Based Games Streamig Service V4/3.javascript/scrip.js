// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Load games for the games section
    loadGames();
});

// Initialize page elements and event listeners
function initPage() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle (if you add a mobile menu later)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // For login form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirect to VM page or dashboard
            window.location.href = 'dashboard.html';
        } else {
            showModal('Error', data.message);
        }
    })
    .catch(error => {
        showModal('Error', 'An error occurred during login');
    });
});

// Similar for signup form
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showSuccessModal();
        } else {
            showModal('Error', data.message);
        }
    })
    .catch(error => {
        showModal('Error', 'An error occurred during registration');
    });
});
    
    // Initialize VM page if we're on it
    if (document.getElementById('vm-iframe')) {
        initVMPage();
    }
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('hab_token');
    if (token) {
        // User is logged in, update UI accordingly
        const userAccountLinks = document.querySelectorAll('.user-account-link');
        userAccountLinks.forEach(link => {
            link.innerHTML = '<i class="fas fa-user"></i> My Account';
            link.href = 'account.html';
        });
    }
}

// Load games for the games section
async function loadGames() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    try {
        // In a real app, you would fetch this from your API
        // const response = await fetch('/api/games');
        // const games = await response.json();
        
        // Mock data for demonstration
        const games = [
            {
                id: 1,
                name: 'Cyberpunk 2077',
                genre: 'RPG',
                imageUrl: 'images/game1.jpg'
            },
            {
                id: 2,
                name: 'Elden Ring',
                genre: 'Action RPG',
                imageUrl: 'images/game2.jpg'
            },
            {
                id: 3,
                name: 'Call of Duty: Warzone',
                genre: 'FPS',
                imageUrl: 'images/game3.jpg'
            },
            {
                id: 4,
                name: 'FIFA 23',
                genre: 'Sports',
                imageUrl: 'images/game4.jpg'
            },
            {
                id: 5,
                name: 'The Witcher 3',
                genre: 'RPG',
                imageUrl: 'images/game5.jpg'
            },
            {
                id: 6,
                name: 'Grand Theft Auto V',
                genre: 'Action-Adventure',
                imageUrl: 'images/game6.jpg'
            }
        ];
        
        gamesGrid.innerHTML = '';
        
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img src="${game.imageUrl}" alt="${game.name}" class="game-image">
                <div class="game-overlay">
                    <h3 class="game-title">${game.name}</h3>
                    <p class="game-genre">${game.genre}</p>
                </div>
            `;
            
            // Add click event to launch game (would require authentication)
            gameCard.addEventListener('click', () => {
                if (localStorage.getItem('hab_token')) {
                    launchGame(game.id);
                } else {
                    window.location.href = 'login.html';
                }
            });
            
            gamesGrid.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Failed to load games:', error);
        gamesGrid.innerHTML = '<p class="error-message">Failed to load games. Please try again later.</p>';
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!email || !password) {
        showAlert('Please fill in all fields.', 'error');
        return;
    }
    
    // Update button state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Store token and redirect
        localStorage.setItem('hab_token', data.token);
        window.location.href = `vm.html?vm_ip=${data.vm.ip}`;
        
    } catch (error) {
        console.error('Login error:', error);
        showAlert(error.message || 'Login failed. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!email || !password || !confirmPassword) {
        showAlert('Please fill in all fields.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'error');
        return;
    }
    
    if (password.length < 8) {
        showAlert('Password must be at least 8 characters.', 'error');
        return;
    }
    
    // Update button state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }
        
        // Store token and redirect
        localStorage.setItem('hab_token', data.token);
        window.location.href = `vm.html?vm_ip=${data.vm.ip}`;
        
    } catch (error) {
        console.error('Signup error:', error);
        showAlert(error.message || 'Signup failed. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Sign Up';
    }
}

// Initialize VM page
function initVMPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const vmIp = urlParams.get('vm_ip');
    const vmIframe = document.getElementById('vm-iframe');
    
    if (vmIp) {
        vmIframe.src = `http://${vmIp}`;
    } else {
        // No VM IP provided, redirect to login
        window.location.href = 'login.html';
    }
    
    // Set up control buttons
    const powerButton = document.getElementById('power-button');
    const restartButton = document.getElementById('restart-button');
    const disconnectButton = document.getElementById('disconnect-button');
    
    if (powerButton) {
        powerButton.addEventListener('click', () => controlVM('power'));
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', () => controlVM('restart'));
    }
    
    if (disconnectButton) {
        disconnectButton.addEventListener('click', () => {
            localStorage.removeItem('hab_token');
            window.location.href = 'index.html';
        });
    }
}

// Control VM actions
async function controlVM(action) {
    const token = localStorage.getItem('hab_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch('/api/vm/control', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ action })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to control VM');
        }
        
        showAlert(`VM ${action} command sent successfully.`, 'success');
        
    } catch (error) {
        console.error('VM control error:', error);
        showAlert(error.message || 'Failed to control VM', 'error');
    }
}

// Launch a game
async function launchGame(gameId) {
    const token = localStorage.getItem('hab_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch('/api/games/launch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ gameId })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to launch game');
        }
        
        // Redirect to VM page with game parameter
        window.location.href = `vm.html?vm_ip=${data.vmIp}&game=${gameId}`;
        
    } catch (error) {
        console.error('Game launch error:', error);
        showAlert(error.message || 'Failed to launch game', 'error');
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    // Position the alert
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.padding = '15px 25px';
    alert.style.borderRadius = '5px';
    alert.style.zIndex = '10000';
    alert.style.animation = 'fadeInUp 0.3s ease';
    
    // Style based on type
    switch (type) {
        case 'error':
            alert.style.backgroundColor = 'var(--error-color)';
            alert.style.color = 'white';
            break;
        case 'success':
            alert.style.backgroundColor = 'var(--success-color)';
            alert.style.color = 'white';
            break;
        case 'warning':
            alert.style.backgroundColor = 'var(--warning-color)';
            alert.style.color = 'black';
            break;
        default:
            alert.style.backgroundColor = 'var(--secondary-color)';
            alert.style.color = 'white';
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Handle social login
function handleSocialLogin(platform) {
    // Store the current URL to redirect back after login
    localStorage.setItem('hab_redirect', window.location.href);
    
    let authUrl;
    const clientId = {
        google: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        facebook: process.env.FACEBOOK_CLIENT_ID || 'your-facebook-client-id',
        x: process.env.TWITTER_CLIENT_ID || 'your-twitter-client-id'
    };
    
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/${platform}/callback`);
    
    switch (platform) {
        case 'google':
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.google}&redirect_uri=${redirectUri}&response_type=code&scope=email profile&access_type=offline`;
            break;
        case 'facebook':
            authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId.facebook}&redirect_uri=${redirectUri}&state={st=state123abc,ds=123456789}&scope=email`;
            break;
        case 'x':
            authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId.x}&redirect_uri=${redirectUri}&scope=users.read tweet.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
            break;
        default:
            showAlert('Unsupported platform', 'error');
            return;
    }
    
    window.location.href = authUrl;
}

// Toggle mobile menu (if implemented)
function toggleMobileMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileMenu = document.querySelector('.profile-menu');
    
    if (profileMenu) {
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileMenu.contains(event.target)) {
                const dropdown = profileMenu.querySelector('.dropdown-content');
                if (dropdown) dropdown.style.display = 'none';
            }
        });

        // Toggle dropdown on button click
        const profileButton = profileMenu.querySelector('.profile-button');
        if (profileButton) {
            profileButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = this.nextElementSibling;
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            });
        }
    }
});