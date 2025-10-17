// --- DATENBANK ---
const internalProjects = [
  {
    id: 1,
    year: "H2 2025",
    title: "Linux Server Engineering",
    text: "Ich habe meine ersten Ansible- und RHEL-Kenntnisse aufgebaut. Dabei musste ich Ansible-Playbooks verstehen und erstellen. Wenn etwas nicht lief, habe ich fehlerhafte Automatisierungen behoben. Alles habe ich Schritt für Schritt in GitLab festgehalten, damit es nachvollziehbar bleibt."
  },

];

const skillsAndTools = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" /></svg>`,
    category: "Alter",
    name: calculateAge(new Date(2008, 7, 5)),
    description: "Geboren am 5. August 2008.",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6c-2-1.5-6-1.5-8 0v12c2-1.5 6-1.5 8 0 2-1.5 6-1.5 8 0V6c-2-1.5-6-1.5-8 0z" /></svg>`,
    category: "Lehre",
    name: "Informatiker EFZ Plattformentwicklung",
    description: aktuellesLehrjahr(),
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 20h8m-4-4v4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    category: "System",
    name: "Linux",
    description: "Windows hat mich oft genervt, deshalb nutze ich jetzt Ubuntu.",
  },
];

const projects = [
  {
    img: "https://cc.bleibundgut.ch/wp-content/uploads/2024/11/Design-ohne-Titel-1.png",
    title: "Convert-Commander",
    text: "Ein selbstgehosteter Dateikonverter, der schnell, sicher und einfach zu bedienen ist. Ideal für alle, die ihre Dateien lokal und ohne fremde Server verarbeiten möchten.",
    link: "https://github.com/Benzauber/convert-commander",
  },
  {
    img: "https://bleibundgut.ch/PXL_20240327_160825643~2.jpg",
    title: "Uhr",
    text: "In unserer neuen Küche hat noch die passende Uhr gefehlt, also habe ich kurzerhand selbst eine gebaut. Mit einem ESP32, einem 7-Segment-Display und viel Liebe zum Detail ist eine Uhr entstanden, die perfekt zu uns passt.",
    link: "",
  },
  {
    img: "screanshot.png",
    title: "Widget Manu",
    text: "Ich habe ein Programm entwickelt, das mir das aktuelle Menü der Oberstufe automatisch auf dem Homescreen meines Handys anzeigt. So sehe ich sofort, was es heute zu essen gibt – ohne extra nachschauen zu müssen.",
    link: "",
  },
];

const strengths = [
  "Ubuntu",
  "RHEL",
  "Ansible",
  "Bash",
  "Git",
  "Vim",
  "VsCode"
];
function renderInternalProjects() {
  const list = document.getElementById("internal-projects-list");
  const display = document.getElementById("internal-project-display");
  list.innerHTML = "";

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentHalfYear = now.getMonth() < 6 ? 1 : 2; // H1 is months 0-5 (Jan-Jun), H2 is months 6-11 (Jul-Dec)

  // 1. Array sortieren (neueste Projekte zuerst)
  internalProjects.sort((a, b) => {
    const [aHalf, aYear] = a.year.substring(1).split(" ").map(Number);
    const [bHalf, bYear] = b.year.substring(1).split(" ").map(Number);
    if (bYear !== aYear) {
      return bYear - aYear; // nach Jahr absteigend sortieren
    }
    return bHalf - aHalf; // dann nach Halbjahr absteigend sortieren
  });

  const projectsToShowInitially = 3; // Lege fest, wie viele Projekte anfänglich angezeigt werden sollen
 
  // 2. Projekte rendern
  internalProjects.forEach((project, index) => {
    // Logik zum Prüfen, ob Projekt in der Zukunft liegt
    const [projectHalfYearStr, projectYearStr] = project.year.substring(1).split(" ");
    const projectHalfYear = parseInt(projectHalfYearStr, 10);
    const projectYear = parseInt(projectYearStr, 10);

    const isFuture =
      projectYear > currentYear ||
      (projectYear === currentYear && projectHalfYear > currentHalfYear);

    // HTML-Elemente erstellen
    const item = document.createElement("div");
    item.className = "timeline-item mb-6";

    // Füge 'hidden-project' und 'animated-item' nur hinzu, wenn es mehr als die anfängliche Anzahl ist
    // und das Element nicht zu den initial sichtbaren gehört
    if (index >= projectsToShowInitially) {
      item.classList.add("hidden-project");
      item.classList.add("animated-item"); // Für die Animation
    }

    const button = document.createElement("button");
    button.className =
      "w-full text-left p-4 rounded-lg border-2 bg-[var(--bg-panel)] border-[var(--border-color)] hover:border-[var(--accent-blue-hover)] transition-all duration-200";
    button.dataset.id = project.id;

    button.innerHTML = `
      <p class="text-sm font-semibold mb-1 text-[var(--accent-blue)]">${project.year}</p>
      <h3 class="font-bold text-[var(--text-primary)]">${project.title}</h3>
    `;

    // Button deaktivieren, WENN er in der Zukunft liegt
    if (isFuture) {
      button.disabled = true;
      item.classList.add("disabled-project"); // Fügt unsere CSS-Klasse hinzu
    } else {
      // Event Listener nur für aktive Projekte hinzufügen
      button.addEventListener("click", () => {
        document
          .querySelectorAll("#internal-projects-list .timeline-item")
          .forEach((i) => i.classList.remove("active"));
        document
          .querySelectorAll("#internal-projects-list button")
          .forEach((b) => b.classList.remove("active-project"));

        item.classList.add("active");
        button.classList.add("active-project");

        const selectedProject = internalProjects.find(
          (p) => p.id == button.dataset.id
        );
        display.innerHTML = `<div class="reveal visible"><h3 class="font-bold text-2xl mb-3 text-[var(--text-primary)]">${selectedProject.title}</h3><p class="text-lg text-[var(--text-secondary)]">${selectedProject.text}</p></div>`;
      });
    }

    item.appendChild(button);
    list.appendChild(item);
  });

  // Nur einen Button anzeigen, wenn es mehr Projekte gibt als anfänglich gezeigt
  if (internalProjects.length > projectsToShowInitially) {
    const toggleButtonContainer = document.createElement("div");
    toggleButtonContainer.className = "text-center mt-6 toggle-button-container"; // Zentriert den Button

    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-projects-button text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] font-semibold py-2 px-4 rounded transition-all duration-300";
    toggleButton.innerHTML = `Mehr Projekte anzeigen <span class="arrow-down">&#9660;</span>`; // Pfeil nach unten

    let isExpanded = false; // Zustand des Buttons verfolgen

    toggleButton.addEventListener("click", () => {
      const hiddenProjects = document.querySelectorAll(".hidden-project, .animated-item.reveal-animation");
      const allProjects = document.querySelectorAll(".timeline-item");

      if (!isExpanded) {
        // Zustand: Eingeklappt -> Ausklappen
        
        // Zuerst den Button-Text ändern
        toggleButton.innerHTML = `Weniger Projekte anzeigen <span class="arrow-up">&#9650;</span>`;
        
        // Dann die versteckten Projekte animiert einblenden
        hiddenProjects.forEach((item, index) => {
          // Zeige das Element an (entferne display: none)
          item.classList.remove("hidden-project");
          // Trigger die Animation nach einer kleinen Verzögerung
          setTimeout(() => {
            item.classList.add("reveal-animation");
            item.classList.remove("hide-animation"); // Sicherstellen, dass die Hide-Animation entfernt ist
          }, index * 100); // Staffele die Animation
        });
        
        // Warte bis alle Animationen fertig sind, dann bewege den Button nach unten
        const totalAnimationTime = (hiddenProjects.length * 100) + 500; // 500ms für die Fade-Animation
        setTimeout(() => {
          // Der Button wird automatisch nach unten geschoben durch die neuen Elemente
          // Zusätzlich fügen wir eine sanfte Transition hinzu
          toggleButtonContainer.style.transition = "transform 0.3s ease-out";
          toggleButtonContainer.style.transform = "translateY(0)";
        }, totalAnimationTime);
        
        isExpanded = true;
      } else {
        // Zustand: Ausgeklappt -> Einklappen
        
        // Zuerst die Projekte ausblenden
        const projectsToHide = Array.from(allProjects).slice(projectsToShowInitially);
        projectsToHide.reverse().forEach((item, index) => {
            // Trigger die Hide-Animation
            item.classList.remove("reveal-animation");
            item.classList.add("hide-animation");

            // Nach der Animation das Element verstecken (display: none)
            item.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'opacity' && item.classList.contains('hide-animation')) {
                    item.classList.add("hidden-project");
                    item.removeEventListener('transitionend', handler); // Event Listener entfernen
                }
            });
        });

        // Warte bis die Hide-Animationen fertig sind, dann bewege den Button nach oben und ändere den Text
        setTimeout(() => {
          // Button-Text ändern
          toggleButton.innerHTML = `Mehr Projekte anzeigen <span class="arrow-down">&#9660;</span>`;
          
          // Sanfte Transition für den Button nach oben
          toggleButtonContainer.style.transition = "transform 0.3s ease-out";
          toggleButtonContainer.style.transform = "translateY(0)";
        }, 500); // Warte 500ms bis die Fade-out Animation fertig ist

        isExpanded = false;
      }
    });

    toggleButtonContainer.appendChild(toggleButton);
    list.appendChild(toggleButtonContainer);
  }
}
function renderProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";
  projects.forEach((project) => {
    const projectCard = `
                    <div class="rounded-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border bg-[var(--bg-panel)] border-[var(--border-color)]">
                        <img src="${project.img}" alt="${
      project.title
    }" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-2 text-[var(--text-primary)]">${
                              project.title
                            }</h3>
                            <p class="mb-4 text-[var(--text-secondary)]">${
                              project.text
                            }</p>
                            ${
                              project.link
                                ? `<a href="${project.link}" class="font-semibold text-[var(--accent-blue)] group-hover:underline">Mehr erfahren &rarr;</a>`
                                : ""
                            }
                        </div>
                    </div>
                `;
    container.innerHTML += projectCard;
  });
}

function renderStrengths() {
  const strengthsContainer = document.getElementById("strengths-container");
  strengthsContainer.innerHTML = "";
  strengths.forEach((strength) => {
    const strengthTag = `
                    <span class="w-text-slate-700 text-base font-medium px-5 py-2 rounded-lg shadow-sm border bg-[var(--bg-panel)] border-[var(--border-color)] hover:text-[var(--accent-blue)] hover:-translate-y-2 transition-transform duration-200">${strength}</span>
                `;
    strengthsContainer.innerHTML += strengthTag;
  });
}

function renderSkillsAndToolsTable() {
  const tableBody = document.querySelector("#skills-table tbody");
  tableBody.innerHTML = "";
  skillsAndTools.forEach((item) => {
    const row = `
                    <tr class="border-b border-[var(--border-color)] group">
                        <td class="p-4 align-top">
                            <div class="flex items-center gap-3 transition-transform duration-300 transform group-hover:scale-110">
                                ${item.icon}
                                <span class="font-semibold hidden md:inline text-[var(--text-primary)]">${item.category}</span>
                            </div>
                        </td>
                        <td class="p-4 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors duration-300">${item.name}</td>
                        <td class="p-4 hidden sm:table-cell text-[var(--text-secondary)]">${item.description}</td>
                    </tr>
                `;
    tableBody.innerHTML += row;
  });
}

// --- INTERAKTIVITÄT ---
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
revealElements.forEach((el) => observer.observe(el));

// --- INITIALES RENDERING ---
document.addEventListener("DOMContentLoaded", () => {
  renderInternalProjects();
  renderProjects();
  renderStrengths();
  renderSkillsAndToolsTable();
});

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }
  return age;
}

function aktuellesLehrjahr() {
  const heute = new Date();
  const startDatum = new Date(2025, 7, 1); // 1. August 2025
  const endDatum = new Date(2029, 7, 1);   // 1. August 2029 (nach 4 Jahren)

  if (heute < startDatum) {
    return "Ich habe die Lehre noch nicht begonnen.";
  }

  if (heute >= endDatum) {
    return "Ich habe die Lehre bereits abgeschlossen.";
  }

  // Lehrjahr berechnen (mit +1 für korrektes Zählen ab 1)
  let jahr = heute.getFullYear() - startDatum.getFullYear();
  if (heute.getMonth() < 7) {
    jahr--;
  }

  const lehrjahr = jahr + 1; // +1 damit 0 → 1. Lehrjahr
  return `Ich bin im ${lehrjahr}. Lehrjahr. `;
}



