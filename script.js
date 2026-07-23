// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animated Counter
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    observer.observe(statsSection);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            if (target === 150) {
                // Premium Vehicles (no +)
                element.textContent = target.toLocaleString();
            } else {
                // Happy Clients, Experienced Drivers, Years Experience
                element.textContent = target.toLocaleString() + "+";
            }
            clearInterval(timer);
        } else {
            if (target === 150) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current).toLocaleString() + "+";
            }
        }
    }, 30);
}

// Select Vehicle
function selectVehicle(vehicleName) {
    document.getElementById('vehicle').value = vehicleName;
    scrollToSection('booking');
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Set minimum date
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Booking Form Handler
function handleBooking(e) {
    e.preventDefault();

    const payment = document.querySelector('input[name="payment"]:checked');

    if (!payment) {
        alert("Please select a payment method.");
        return;
    }

    const bookingData = {
        pickup: document.getElementById('pickup').value.trim(),
        dropoff: document.getElementById('dropoff').value.trim(),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        vehicle: document.getElementById('vehicle').value,
        passengers: document.getElementById('passengers').value,
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        requests: document.getElementById('requests').value.trim(),
        payment: payment.value
    };

    if (
        !bookingData.name ||
        !bookingData.phone ||
        !bookingData.pickup ||
        !bookingData.dropoff ||
        !bookingData.date ||
        !bookingData.time ||
        !bookingData.vehicle
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    const message =
`🚗 *New Booking Request - yashuRentACar*

👤 Name: ${bookingData.name}
📞 Phone: ${bookingData.phone}
📧 Email: ${bookingData.email}

📍 Pickup: ${bookingData.pickup}
📍 Drop: ${bookingData.dropoff}

📅 Date: ${bookingData.date}
🕒 Time: ${bookingData.time}

🚘 Vehicle: ${bookingData.vehicle}
👥 Passengers: ${bookingData.passengers}

💳 Payment: ${bookingData.payment}

📝 Special Request:
${bookingData.requests || "None"}

Please confirm availability.`;

    const whatsappLink =
        `https://wa.me/918880299990?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");

    document.getElementById("bookingForm").reset();
}

    

// Add scroll animation
const sections = document.querySelectorAll('.feature-card, .fleet-card, .service-box, .testimonial-card, .info-box');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    scrollObserver.observe(section);
});

// Mobile Menu Close on Outside Click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});