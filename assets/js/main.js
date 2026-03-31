const { cvData } = globalThis;

let currentLanguage = "vi";

function renderHeader() {
  const t = cvData.text[currentLanguage];
  document.getElementById("name").textContent = cvData.name;
  document.getElementById("role").textContent = t.role;
  document.getElementById("phone").textContent = `${t.labels.phone}: ${cvData.profile.phone}`;
  document.getElementById("email").innerHTML = `${t.labels.email}: <a href="mailto:${cvData.profile.email}">${cvData.profile.email}</a>`;
  document.getElementById("github").innerHTML = `${t.labels.github}: <a href="${cvData.profile.githubUrl}" target="_blank" rel="noopener noreferrer">${cvData.profile.github}</a>`;
  document.getElementById("linkedin").innerHTML = `${t.labels.linkedin}: <a href="${cvData.profile.linkedinUrl}" target="_blank" rel="noopener noreferrer">${cvData.profile.linkedin}</a>`;
  document.getElementById("address").textContent = cvData.profile.address[currentLanguage];
}

function renderSkillsTable() {
  const t = cvData.text[currentLanguage];
  const body = document.getElementById("skillsTableBody");

  body.innerHTML = `
    <tr>
      <th>${t.skillsTable.technical}</th>
      <td>${t.skillsContent.technical}</td>
    </tr>
    <tr>
      <th>${t.skillsTable.soft}</th>
      <td>${t.skillsContent.soft}</td>
    </tr>
    <tr>
      <th>${t.skillsTable.language}</th>
      <td>${t.skillsContent.language}</td>
    </tr>
  `;
}

function renderObjectivesTable() {
  const t = cvData.text[currentLanguage];
  const body = document.getElementById("objectivesTableBody");

  body.innerHTML = `
    <tr>
      <th>${t.objectivesTable.short}</th>
      <td>${t.objectivesContent.short}</td>
    </tr>
    <tr>
      <th>${t.objectivesTable.mid}</th>
      <td>${t.objectivesContent.mid}</td>
    </tr>
    <tr>
      <th>${t.objectivesTable.long}</th>
      <td>${t.objectivesContent.long}</td>
    </tr>
  `;
}

function renderProjects() {
  const t = cvData.text[currentLanguage];

  document.getElementById("projects").innerHTML = t.projects
    .map(
      (project) => `
      <article class="project-card">
        <h3>${project.name} <span>| ${project.stack} | <em>${project.role}</em></span></h3>
        <ul class="bullet-list">${project.highlights
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>
      </article>
    `
    )
    .join("");
}

function renderEducation() {
  const t = cvData.text[currentLanguage];
  const e = t.education;

  document.getElementById("educationText").textContent = `${e.university} - ${e.degree}. ${t.labels.major}: ${e.major} | ${e.expected} | ${t.labels.gpa}: ${e.gpa}. ${t.labels.coursework}: ${e.coursework}.`;
}

function renderActivitiesAndCertificates() {
  const t = cvData.text[currentLanguage];

  document.getElementById("activitiesList").innerHTML = t.activities
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.getElementById("certificationsText").textContent =
    t.certifications.join(" | ");
}

function applySectionLabels() {
  const t = cvData.text[currentLanguage];

  document.getElementById("skillsTitle").textContent = t.section.skills;
  document.getElementById("objectivesTitle").textContent = t.section.objectives;
  document.getElementById("projectsTitle").textContent = t.section.projects;
  document.getElementById("educationTitle").textContent = t.section.education;
  document.getElementById("activitiesTitle").textContent = t.section.activities;
  document.getElementById("certificationsTitle").textContent =
    t.section.certifications;

  document.title = t.pageTitle;
  document.documentElement.lang = currentLanguage;
}

function updateLanguageButtons() {
  const isVi = currentLanguage === "vi";
  document.getElementById("btnVi").classList.toggle("active", isVi);
  document.getElementById("btnEn").classList.toggle("active", !isVi);
}

function renderAll() {
  applySectionLabels();
  renderHeader();
  renderSkillsTable();
  renderObjectivesTable();
  renderProjects();
  renderEducation();
  renderActivitiesAndCertificates();
  updateLanguageButtons();
}

function bindLanguageEvents() {
  document.getElementById("btnVi").addEventListener("click", () => {
    if (currentLanguage !== "vi") {
      currentLanguage = "vi";
      renderAll();
    }
  });

  document.getElementById("btnEn").addEventListener("click", () => {
    if (currentLanguage !== "en") {
      currentLanguage = "en";
      renderAll();
    }
  });
}

renderAll();
bindLanguageEvents();
