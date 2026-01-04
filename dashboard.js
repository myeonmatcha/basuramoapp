// Load user from login
const user = localStorage.getItem("userNumber");
if (!user) {
  window.location.href = "index.html";
}
document.getElementById("userId").textContent = "User #" + user;

// Page switching
function switchPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");

  document.querySelectorAll(".bottom-nav button")
    .forEach(btn => btn.classList.remove("active"));

  document.getElementById(page + "Btn").classList.add("active");
}

// Upload image preview
function uploadImage() {
  document.getElementById("fileInput").click();
}

document.getElementById("fileInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const img = document.getElementById("preview");
    img.src = reader.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// Camera placeholder
function openCamera() {
  alert("Camera feature will be added next!");
}