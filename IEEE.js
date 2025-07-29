document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const college = document.getElementById("college").value.trim();
      const year = document.getElementById("year").value;

      const participant = { name, email, college, year };

      let registrations = JSON.parse(localStorage.getItem("bootcampRegistrations")) || [];
      registrations.push(participant);
      localStorage.setItem("bootcampRegistrations", JSON.stringify(registrations));

      confirmationMessage.textContent = "✅ Registration successful!";
      confirmationMessage.style.color = "green";

      form.reset();
    });
  }
});

document.getElementById("unlockBtn").addEventListener("click", () => {
  const password = document.getElementById("memberPassword").value;
  const authMessage = document.getElementById("authMessage");

  if (password === "ieeemembers") {
    document.getElementById("authArea").style.display = "none";
    document.getElementById("membersContent").style.display = "block";
    authMessage.textContent = "";
    showRegisteredParticipants();
  } else {
    authMessage.textContent = "❌ Incorrect password. Please try again.";
  }
});

function showRegisteredParticipants() {
  const list = document.getElementById("participantsList");
  const registrations = JSON.parse(localStorage.getItem("bootcampRegistrations")) || [];

  if (registrations.length === 0) {
    list.innerHTML = "<li class='list-group-item'>No participants registered yet.</li>";
  } else {
    list.innerHTML = "";
    registrations.forEach((participant, index) => {
      const item = document.createElement("li");
      item.classList.add("list-group-item");
      item.textContent = `${index + 1}. ${participant.name} - ${participant.email}`;
      list.appendChild(item);
    });
  }
}