// HTML5 Navigation, LocalStorage, and Dynamic Content Logic
const eventDB = {
    'night-beats': {
        title: 'Night Beats Concert',
        location: 'Open Air Arena, Pune',
        date: '15 February 2026',
        time: '7:00 PM onwards',
        price: '₹499',
        img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=60',
        desc: 'Enjoy an energetic night with live music and an amazing crowd. Perfect for college students and friends.'
    },
    'comedy-night': {
        title: 'Comedy Night Live',
        location: 'City Club, Mumbai',
        date: '18 February 2026',
        time: '8:30 PM onwards',
        price: '₹299',
        img: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=900&q=60',
        desc: 'Laugh out loud with top stand-up comedians from across the country. A perfect weekend getaway!'
    },
    'photo-workshop': {
        title: 'Photography Workshop',
        location: 'Creative Studio, Nashik',
        date: '22 February 2026',
        time: '10:00 AM - 4:00 PM',
        price: '₹699',
        img: 'https://i.ontraport.com/224876.95b4848a200233c4130d3271e852c2a1.JPEG',
        desc: 'Learn the basics of photography, lighting, and editing from industry professionals. Bring your DSLR!'
    },
    'cricket-screening': {
        title: 'Cricket Screening',
        location: 'Sky Lounge, Pune',
        date: '25 February 2026',
        time: '6:00 PM onwards',
        price: '₹199',
        img: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=900&q=60',
        desc: 'Experience the thrill of the match on a massive 4K screen with unlimited food and drinks combos.'
    },
    'edm-fest': {
        title: 'Electronic Dance Fest',
        location: 'Jio Gardens, Mumbai',
        date: '02 March 2026',
        time: '5:00 PM - 2:00 AM',
        price: '₹999',
        img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=60',
        desc: 'The biggest electronic dance music festival featuring internationally acclaimed DJs.'
    },
    'marathon': {
        title: 'Local Marathon 5K',
        location: 'City Park, Delhi',
        date: '10 March 2026',
        time: '6:00 AM',
        price: '₹150',
        img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=60',
        desc: 'Run for a cause! Join the 5K marathon promoting health and wellness in your community.'
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    // Check if we are on the logout page
    if (window.location.pathname.endsWith("logout.html")) {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
    }

    // Dynamic Navigation Bar depending on LocalStorage HTML5 session
    const navLinks = document.querySelector("nav ul");
    if (navLinks) {
        const listItems = navLinks.querySelectorAll("li");
        
        if (isLoggedIn === "true") {
            // Hide Login and Signup
            listItems.forEach(li => {
                const text = li.innerText.trim();
                if (text === "Login" || text === "Signup") {
                    li.style.display = "none";
                }
            });
            
            // Add Dashboard and Logout
            let hasDashboard = false;
            let hasLogout = false;
            listItems.forEach(li => {
                if(li.innerText.trim() === "Dashboard") hasDashboard = true;
                if(li.innerText.trim() === "Logout") hasLogout = true;
            });
            
            if (!hasDashboard) {
                const dashLi = document.createElement("li");
                dashLi.innerHTML = '<a href="dashboard.html">Dashboard</a>';
                navLinks.insertBefore(dashLi, navLinks.childNodes[0]);
            }
            
            if (!hasLogout) {
                const logoutLi = document.createElement("li");
                logoutLi.innerHTML = '<a class="btn" href="logout.html">Logout</a>';
                navLinks.appendChild(logoutLi);
            }
        } else {
            // Hide Logout and Dashboard if not logged in
            listItems.forEach(li => {
                if (li.innerText.trim() === "Logout" || li.innerText.trim() === "Dashboard") {
                    li.style.display = "none";
                }
            });
        }
    }
    
    // Dynamic Loading for Event Details
    if (window.location.pathname.endsWith("event-details.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event');
        
        if (eventId && eventDB[eventId]) {
            const ev = eventDB[eventId];
            document.getElementById('detail-img').src = ev.img;
            document.getElementById('detail-title').innerText = ev.title;
            document.getElementById('detail-location').innerText = 'Location: ' + ev.location;
            document.getElementById('detail-date').innerText = 'Date: ' + ev.date;
            document.getElementById('detail-time').innerText = 'Time: ' + ev.time;
            document.getElementById('detail-price').innerText = 'Ticket Price: ' + ev.price;
            document.getElementById('detail-desc').innerText = ev.desc;
            
            document.getElementById('detail-book-btn').href = 'booking.html?event=' + eventId;
        }
    }
    
    // Dynamic pre-fill for Booking form Dropdown
    if (window.location.pathname.endsWith("booking.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event');
        
        if (eventId && eventDB[eventId]) {
            const ev = eventDB[eventId];
            
            const h2 = document.querySelector('h2');
            if (h2) h2.innerText = `Book Tickets for ${ev.title}`;
            
            const select = document.getElementById('ticketCount');
            if (select) {
                const options = select.querySelectorAll('option');
                const rawPrice = parseInt(ev.price.replace('₹', ''));
                if (options.length > 4) {
                    options[1].innerText = `1 Ticket - ${ev.price}`;
                    options[1].value = rawPrice;
                    options[2].innerText = `2 Tickets - ₹${rawPrice * 2}`;
                    options[2].value = rawPrice * 2;
                    options[3].innerText = `3 Tickets - ₹${rawPrice * 3}`;
                    options[3].value = rawPrice * 3;
                    options[4].innerText = `4 Tickets - ₹${rawPrice * 4}`;
                    options[4].value = rawPrice * 4;
                }
            }
        }
    }
});


// Home Page Search Function with Prompt and Domain Filtering
function searchEvents() {
    const searchInput = document.getElementById('searchInput');
    let query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    
    if (query === "") {
        // Trigger Prompt Box
        let promptResult = prompt("Please enter what you're looking for (e.g. Music, Comedy, Pune):", "");
        if (promptResult) {
            query = promptResult.trim().toLowerCase();
        }
    }
    
    if (query !== "") {
        let foundAny = false;
        
        // Filter Categories
        const categories = document.querySelectorAll('.category');
        categories.forEach(cat => {
            if (cat.innerText.toLowerCase().includes(query)) {
                cat.style.display = '';
                foundAny = true;
            } else {
                cat.style.display = 'none';
            }
        });
        
        // Filter Event Cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            if (card.innerText.toLowerCase().includes(query)) {
                card.style.display = '';
                foundAny = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!foundAny) {
            alert("No events or categories found matching your search: " + query);
        } else {
            alert("Showing results for: " + query);
        }
        
    } else {
        const categories = document.querySelectorAll('.category');
        categories.forEach(cat => cat.style.display = '');
        
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => card.style.display = '');
    }
}

// Login Form Validation 
function validateLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert("Invalid Email Format! Please enter a valid email address.");
        return false;
    }
    
    if (pass.length < 8) {
        alert("Invalid Password: Password must be at least 8 characters long.");
        return false;
    }
    
    alert("Login Successful! Welcome back.");
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    
    window.location.href = "index.html"; 
    return false;
}

// Signup Form Validation
function validateSignup() {
    const inputs = document.querySelector('form[onsubmit="return validateSignup()"]').querySelectorAll('input');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const pass = document.getElementById('signupPass').value;
    const confirmPass = document.getElementById('signupConfirm').value;
    
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(name)) {
        alert("Error: Full Name must contain only alphabets and be at least 3 characters long.");
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Error: Please enter a valid email address.");
        return false;
    }
    
    if (pass.length < 8) {
        alert("Error: Password must be at least 8 characters long.");
        return false;
    }
    
    if (pass !== confirmPass) {
        alert("Error: Passwords do not match!");
        return false;
    }
    
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    
    alert("Account created successfully! Please login to continue.");
    window.location.href = "login.html";
    return false;
}

// Contact Form Validation
function contactMessage() {
    const inputs = document.querySelector('form[onsubmit="return contactMessage()"]').querySelectorAll('input, textarea');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const message = inputs[2].value.trim();
    
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Error: Name must contain only alphabets.");
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Error: Please enter a valid email address.");
        return false;
    }
    
    if (message.length < 10) {
        alert("Error: Make sure your message is at least 10 characters long.");
        return false;
    }
    
    alert("Thank you! Your message has been sent successfully.");
    return false; 
}

// Booking Price Calculation based on Tickets
function calculateTotal() {
    const ticketSelect = document.getElementById('ticketCount');
    const totalDisplay = document.getElementById('totalPrice');
    
    if (ticketSelect.value === "") {
        totalDisplay.innerText = "Total: ₹0";
    } else {
        totalDisplay.innerText = "Total: ₹" + ticketSelect.value;
    }
}

// Booking Confirmation using Popup / Confirm Box
function confirmBooking() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("Notice: You MUST be logged in to book an event!");
        window.location.href = "login.html";
        return false;
    }

    const inputs = document.querySelector('form[onsubmit="return confirmBooking()"]').querySelectorAll('input, select');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();
    const ticketValue = document.getElementById('ticketCount').value; // from select
    const paymentMode = inputs[4].value; // Dropdown for payment mode
    
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Error: Name should only contain alphabets.");
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Error: Invalid email format.");
        return false;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Error: Phone number must be exactly 10 digits.");
        return false;
    }
    
    if (ticketValue === "") {
        alert("Error: Please select the number of tickets.");
        return false;
    }
    
    if (paymentMode === "") {
        alert("Error: Please select a proper payment mode.");
        return false;
    }
    
    // User confirmation via confirm Popup BOX
    const isConfirmed = confirm(`Booking Details:
- Name: ${name}
- Email: ${email}
- Total Cost: ₹${ticketValue}
- Payment Mode: ${paymentMode}

Are you sure you want to proceed and confirm this booking?
(Click OK to submit or Cancel to abort)`);
    
    if (isConfirmed) {
        alert("Booking Confirmed Successfully! Your ticket details have been sent to your email.");
        window.location.href = "dashboard.html"; 
        return false; 
    } else {
        return false;
    }
}
