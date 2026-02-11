function showMessage() {
  alert("Gardens helps you grow sustainably!");
}

function selectBox(boxName) {
  document.getElementById("selectedBox").innerText =
    "You selected the " + boxName + " box.";
}

function filterBoxes(type) {
  let boxes = document.querySelectorAll(".box");

  boxes.forEach(box => {
    if (type === "all" || box.classList.contains(type)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
}

function validateForm() {
  // Backwards-compatible validator used by small inline forms
  let emailEl = document.getElementById("email") || document.getElementById("email-home");
  let msgEl = document.getElementById("message") || document.getElementById("message-home");
  let email = emailEl ? emailEl.value.trim() : "";

  if (email === "") {
    alert("Please enter your email.");
    return false;
  }
  alert("Message sent successfully!");
  if (emailEl) emailEl.value = "";
  if (msgEl) msgEl.value = "";
  return false; // prevent default navigation
}

// Modern handler for the contact page form — shows inline status and clears the form
function handleContactSubmit(event) {
  event.preventDefault();
  const statusEl = document.getElementById('contact-status');
  statusEl.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = 'Please enter your name.';
    return false;
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = 'Please enter a valid email address.';
    return false;
  }
  if (!subject) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = 'Please enter a subject.';
    return false;
  }
  if (!message) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = 'Please enter a message.';
    return false;
  }

  // Simulate successful submission (replace with real AJAX/API call as needed)
  statusEl.style.color = 'var(--success)';
  statusEl.textContent = 'Message sent — thank you!';

  // Clear the form
  document.getElementById('contact-form').reset();
  return false;
}

// Attach handler when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
});

// Theme toggle: apply persisted or preferred theme and wire up toggle button
function setTheme(theme) {
  if (theme === 'dark') document.documentElement.classList.add('dark-theme');
  else document.documentElement.classList.remove('dark-theme');

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

function initThemeToggle() {
  const saved = (function () {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  setTheme(initial);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const isDark = document.documentElement.classList.contains('dark-theme');
      setTheme(isDark ? 'light' : 'dark');
    });
  }
}

// initialize theme toggle on DOM ready as well
document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
});
