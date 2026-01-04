// =======================
// GLOBAL APP STATE
// =======================
const appState = {
  user: null,
  collections: [
    { type: "Recyclables", date: "Today", time: "7:00 AM", badge: "today" },
    { type: "Organic Waste", date: "Tomorrow", time: "7:00 AM", badge: "tomorrow" },
    { type: "General Waste", date: "Dec 7", time: "7:00 AM", badge: "3 days" }
  ],
  impact: {
    recycled: 156,
    collections: 24,
    reducedKg: 34
  },
  activity: [
    { name: "Recyclables collected", date: "Nov 27, 2025", items: 8 },
    { name: "Organic waste collected", date: "Nov 25, 2025", items: 12 },
    { name: "General waste collected", date: "Nov 24, 2025", items: 15 }
  ]
};

// =======================
// LOGIN FUNCTION
// =======================
function login() {
  const input = document.getElementById("userNumber");

  if (!input.value.trim()) {
    alert("Please enter your user number");
    return;
  }

  appState.user = input.value.trim();
  localStorage.setItem("user", appState.user);

  window.location.href = "dashboard.html";
}

// =======================
// LOAD DASHBOARD
// =======================
function loadDashboard() {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("userId").textContent = `User #${user}`;

  renderCollections();
  renderImpact();
  renderActivity();
  updateCountdown();
}

// =======================
// RENDER COLLECTIONS
// =======================
function renderCollections() {
  const container = document.getElementById("collections");
  container.innerHTML = "";

  appState.collections.forEach(item => {
    container.innerHTML += `
      <div class="collection-item">
        <div>
          <strong>${item.type}</strong>
          <p>${item.date}, ${item.time}</p>
        </div>
        <span class="badge">${item.badge}</span>
      </div>
    `;
  });
}

// =======================
// RENDER IMPACT
// =======================
function renderImpact() {
  document.getElementById("itemsRecycled").textContent =
    appState.impact.recycled;

  document.getElementById("totalCollections").textContent =
    appState.impact.collections;

  document.getElementById("wasteReduced").textContent =
    `${appState.impact.reducedKg}kg`;
}

// =======================
// RENDER RECENT ACTIVITY
// =======================
function renderActivity() {
  const container = document.getElementById("activity");
  container.innerHTML = "";

  appState.activity.forEach(item => {
    container.innerHTML += `
      <div class="activity-item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.date}</p>
        </div>
        <span>${item.items} items</span>
      </div>
    `;
  });
}

// =======================
// NEXT PICKUP COUNTDOWN
// =======================
function updateCountdown() {
  const countdown = document.getElementById("nextPickup");
  let hours = 3;

  setInterval(() => {
    if (hours > 0) {
      hours--;
      countdown.textContent = `Next pickup in ${hours} hours`;
    }
  }, 3600000);
}

// =======================
// AUTO LOAD DASHBOARD
// =======================
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("dashboard")) {
    loadDashboard();
  }
});
