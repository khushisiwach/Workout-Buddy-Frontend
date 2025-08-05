// --- Intersection Observer for scroll animations ---
const animatedElements = document.querySelectorAll(".animated-element");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);
animatedElements.forEach((element) => {
  observer.observe(element);
});

document.addEventListener("DOMContentLoaded", function () {
  // Get static image paths
  const imagePaths = document.getElementById("team-image-paths");

  const teamData = [
    {
      name: "Pari Dubey",
      role: "Frontend Developer",
      bio: "Transforms UI designs into intuitive, responsive, and engaging user interfaces.",
      img: imagePaths.dataset.pariImg,
      placeholder: "https://placehold.co/200x200/c7d2fe/3730a3?text=Alex",
    },
    {
      name: "Aaarush Chauhan",
      role: "Backend Developer",
      bio: "Builds and maintains the server-side logic, ensuring stability, scalability, and performance.",
      img: imagePaths.dataset.aarushImg,
      placeholder: "https://placehold.co/200x200/ddd6fe/4338ca?text=Maria",
    },
    {
      name: "Khushi",
      role: "Frontend Developer",
      bio: "Crafts elegant, responsive interfaces that turn complex features into delightful user experiences.",
      img: imagePaths.dataset.khushiImg,
      placeholder: "https://placehold.co/200x200/c7d2fe/3730a3?text=Chris",
    },
    {
      name: "Yatharth Chaudhary",
      role: "Backend Developer (Team Lead)",
      bio: "Builds the robust architecture and APIs that power seamless functionality behind every interaction.",
      img: imagePaths.dataset.yatharthImg,
      placeholder: "https://placehold.co/200x200/ddd6fe/4338ca?text=Sam",
    },
  ];

  const marqueeContent = document.getElementById("team-marquee");

  function createTeamCard(member) {
    return `
      <div class="card-container flex-shrink-0 w-72">
        <div class="card relative w-full h-96">
          <!-- Front of Card -->
          <div class="card-front absolute w-full h-full bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <img class="w-32 h-32 rounded-full mx-auto object-cover object-center"
                 src="${member.img}"
                 onerror="this.onerror=null;this.src='${member.placeholder}';"
                 alt="Team member ${member.name}">
            <h3 class="mt-4 text-xl font-bold">${member.name}</h3>
            <p class="text-neon-600">${member.role}</p>
          </div>
          <!-- Back of Card -->
          <div class="card-back absolute w-full h-full bg-neon-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
            <h3 class="text-2xl font-bold">${member.name}</h3>
            <p class="mt-4 text-indigo-100">${member.bio}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Double the cards for continuous marquee effect
  const fullTeamHTML = [...teamData, ...teamData].map(createTeamCard).join("");
  marqueeContent.innerHTML = fullTeamHTML;

  // Animate on scroll (fade-in)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animated-element").forEach((el) => {
    observer.observe(el);
  });
});

//About Page Animations
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.2, // Start animation when 20% of element is visible
    }
  );

  document.querySelectorAll(".animated-element").forEach((el) => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
