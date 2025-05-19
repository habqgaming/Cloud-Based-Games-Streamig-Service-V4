<?php 
// This must be at the VERY TOP of your index.php, before any HTML
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="HAB Gaming - Cloud-based game streaming service">
    <title>HAB | Play Anywhere Anytime</title>
    <link rel="stylesheet" href="../2.css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Top Bar -->
    <header class="top-bar">
        <div class="logo">
            <a href="index.php" aria-label="HAB Gaming Home">
                <img src="../0.images/HAB logo.jpg" alt="HAB Logo" class="logo-icon">
                <span>HAB</span>
            </a>
        </div>
        <nav class="menu" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#games">Games</a>
        </nav>
    </header>

    <!-- Main Hero Section -->
    <section id="home" class="main-content hero-section" aria-labelledby="main-heading">
        <div class="hero-overlay"></div>
        <img src="../0.images/neon.jpg" alt="Gaming setup with neon lights" class="content-image">
        <div class="hero-content">
            <h1 id="main-heading">Welcome to HAB Gaming</h1>
            <p class="tagline">Play your favorite games anywhere, anytime!</p>
            <a href="../1.html/guide.html" class="cta-button">Start Playing Now</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="main-content about-section" aria-labelledby="about-heading">
        <div class="about-content">
            <h2 id="about-heading">About HAB Gaming</h2>
            <p>HAB is a final-year-project from DFK students at IKM Besut</p>
            <img src="../0.images/BESUT-01.png" alt="IKM Besut Logo" class="institute-logo">
            <a href="https://www.tvetmara.edu.my/index.php/component/splms/course/f67-diploma-komputasiawan" class="learn-more-button">Learn More</a>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="main-content features-section" aria-labelledby="features-heading">
        <h2 id="features-heading">IGNITE YOUR PASSION</h2>
        <h3>HAB Gaming is the Future of Game Streaming</h3>
        <div class="info-container">
            <div class="info-item" aria-labelledby="feature1">
                <i class="fas fa-gamepad" aria-hidden="true"></i>
                <h3 id="feature1">Gaming Anywhere</h3>
                <p>Access your favorite games from any device, anytime with low latency streaming.</p>
            </div>
            <div class="info-item" aria-labelledby="feature2">
                <i class="fas fa-cloud" aria-hidden="true"></i>
                <h3 id="feature2">Cloud Storage</h3>
                <p>Your games and progress are stored safely in the cloud with automatic backups.</p>
            </div>
            <div class="info-item" aria-labelledby="feature3">
                <i class="fas fa-users" aria-hidden="true"></i>
                <h3 id="feature3">Community</h3>
                <p>Join a community of gamers, share experiences, and compete in tournaments.</p>
            </div>
        </div>
    </section>

    <!-- Games Showcase Section -->
    <section id="games" class="main-content games-section" aria-labelledby="games-heading">
        <h2 id="games-heading">Popular Games in Our Library</h2>
        <div class="games-grid" id="games-grid">
            <!-- Games will be loaded dynamically from JavaScript -->
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="main-content testimonials-section" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">What Our Players Say</h2>
        <div class="testimonials-container">
            <div class="testimonial">
                <img src="../0.images/user1.jpg" alt="User avatar" class="testimonial-avatar">
                <p class="testimonial-text">"HAB Gaming changed how I play. Now I can access my games from my laptop when I'm away from home!"</p>
                <p class="testimonial-author">- Ahmad, Kuala Lumpur</p>
            </div>
            <div class="testimonial">
                <img src="../0.images/user2.jpg" alt="User avatar" class="testimonial-avatar">
                <p class="testimonial-text">"The streaming quality is amazing. It feels like I'm playing locally even on my old PC."</p>
                <p class="testimonial-author">- Siti, Johor Bahru</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-logo">
                <img src="../0.images/HAB logo.jpg" alt="HAB Logo" class="footer-logo-icon">
                <span>HAB Gaming</span>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h3>Company</h3>
                    <a href="#about">About Us</a>
                    <a href="#careers">Careers</a>
                    <a href="#contact">Contact</a>
                </div>
                <div class="footer-column">
                    <h3>Support</h3>
                    <a href="#faq">FAQ</a>
                    <a href="#help">Help Center</a>
                    <a href="#community">Community</a>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#cookies">Cookie Policy</a>
                </div>
            </div>
            <div class="footer-social">
                <h3>Follow Us</h3>
                <div class="social-icons">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Discord"><i class="fab fa-discord"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 HAB Gaming. All rights reserved.</p>
        </div>
    </footer>

    <script src="../3.javascript/scrip.js"></script>
</body>
</html>