/* Put my name, motto, and bio on the page */
function showProfile() {
  document.getElementById("navName").textContent = profile.brand;
  document.getElementById("heroName").textContent = profile.name;
  document.getElementById("footerName").textContent = profile.name;
  document.getElementById("tagline").textContent = profile.tagline;
  document.getElementById("motto").textContent = profile.motto;
  document.getElementById("bio").textContent = profile.bio;
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* Show the skills */
function showSkills() {
  var html = "";
  for (var i = 0; i < profile.skills.length; i++) {
    html += '<span class="skill">' + profile.skills[i] + '</span>';
  }
  document.getElementById("skills").innerHTML = html;
}

/* Show the design principles */
function showPrinciples() {
  var html = "";
  for (var i = 0; i < principles.length; i++) {
    html += '<div class="col-md-4 principle">';
    html += '<h3>' + principles[i].title + '</h3>';
    html += '<p>' + principles[i].text + '</p>';
    html += '</div>';
  }
  document.getElementById("principles").innerHTML = html;
}

/* Show the contact links */
function showContacts() {
  var html = "";
  for (var i = 0; i < profile.contacts.length; i++) {
    var c = profile.contacts[i];
    if (c.link != "") {
      html += '<li><a href="' + c.link + '" target="_blank">' + c.text + '</a></li>';
    } else {
      html += '<li>' + c.text + '</li>';
    }
  }
  document.getElementById("contactList").innerHTML = html;
}

/* Show the project cards (filter is "All", "Midterm" or "Final") */
function showProjects(filter) {
  var html = "";
  for (var i = 0; i < projects.length; i++) {
    var p = projects[i];

    // Only show the projects that match the filter
    if (filter == "All" || p.stage == filter) {
      var badge = "bg-dark";
      if (p.stage == "Final") {
        badge = "bg-purple";
      }

      html += '<div class="col-md-6 col-lg-4">';
      html += '<div class="card project-card h-100">';
      html += '<img src="' + p.image + '" class="card-img-top" alt="Screenshot of ' + p.title + '" onclick="openDetails(' + p.id + ')">';
      html += '<div class="card-body">';
      html += '<span class="badge ' + badge + '">' + p.stage + '</span>';
      html += '<h3 class="h5 mt-2">' + p.title + '</h3>';
      html += '<p>' + p.summary + '</p>';
      html += '<button class="btn btn-sm btn-purple me-2" onclick="openDetails(' + p.id + ')">Details</button>';
      html += '<a href="' + p.github + '" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a>';
      html += '</div></div></div>';
    }
  }
  document.getElementById("projectList").innerHTML = html;
}

/* Filter buttons: mark the clicked one and show the matching projects */
function chooseFilter(filter, buttonId) {
  document.getElementById("btnAll").classList.remove("active");
  document.getElementById("btnMidterm").classList.remove("active");
  document.getElementById("btnFinal").classList.remove("active");
  document.getElementById(buttonId).classList.add("active");
  showProjects(filter);
}

document.getElementById("btnAll").addEventListener("click", function () {
  chooseFilter("All", "btnAll");
});
document.getElementById("btnMidterm").addEventListener("click", function () {
  chooseFilter("Midterm", "btnMidterm");
});
document.getElementById("btnFinal").addEventListener("click", function () {
  chooseFilter("Final", "btnFinal");
});

/* Popup with the project details */
var projectModal = new bootstrap.Modal(document.getElementById("projectModal"));

function openDetails(id) {
  // Find the project with this id
  var p = null;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      p = projects[i];
    }
  }

  // Make the feature list
  var features = "";
  for (var j = 0; j < p.features.length; j++) {
    features += '<li>' + p.features[j] + '</li>';
  }

  // Put everything in the popup
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalImage").src = p.image;
  document.getElementById("modalImage").alt = "Screenshot of " + p.title;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalFeatures").innerHTML = features;
  document.getElementById("modalTools").textContent = "Built with: " + p.tools;
  document.getElementById("modalGithub").href = p.github;
  projectModal.show();
}

/* Contact form: check the fields, then open the email app */
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var note = document.getElementById("formMessage");

  if (name == "") {
    note.className = "mt-3 text-danger";
    note.textContent = "Please type your name.";
  } else if (email.indexOf("@") == -1) {
    note.className = "mt-3 text-danger";
    note.textContent = "Please type a real email.";
  } else if (message.length < 10) {
    note.className = "mt-3 text-danger";
    note.textContent = "Your message is too short.";
  } else {
    note.className = "mt-3 text-success";
    note.textContent = "Thank you, " + name + "! Your email app will open.";
    window.location.href = "mailto:" + profile.email + "?subject=Hello&body=" + encodeURIComponent(message + " - " + name + " (" + email + ")");
    document.getElementById("contactForm").reset();
  }
});

/* Start show everything when the page loads */
showProfile();
showSkills();
showPrinciples();
showContacts();
showProjects("All");
