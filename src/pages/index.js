import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/app.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "swiper/css";
import { Swiper } from "swiper/react";
import Typed from "typed.js";
import PureCounter from "@srexi/purecounterjs";
import "waypoints/lib/noframework.waypoints";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import GLightbox from "glightbox";
import { Waypoint } from "react-waypoint";

/* ---------- Constants ---------- */
const EMAIL = "krishnarathaur0001@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Job%20Opportunity&body=Hi%20Krishna,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.`;
const LINKEDIN = "https://www.linkedin.com/in/krishna-rathaur";
const GITHUB = "https://github.com/dev-kanhaiya";

/* ---------- Data ---------- */
// NOTE: percentages are self-ratings, adjust them to what you are comfortable defending.
const skillsData = {
  frontend: [
    { name: "HTML/CSS", percent: 90, tooltip: "Semantic HTML5 and modern, responsive CSS3" },
    { name: "JavaScript", percent: 85, tooltip: "ES6+, DOM manipulation and modern frameworks" },
    { name: "React", percent: 80, tooltip: "Hooks, state management and component architecture" },
    { name: "Bootstrap", percent: 75, tooltip: "Responsive, mobile-first UI development" },
  ],
  backend: [
    { name: "Laravel", percent: 85, tooltip: "REST APIs, RBAC, admin panels, payment-integrated apps" },
    { name: "PHP", percent: 80, tooltip: "Backend development and database-driven applications" },
    { name: "Node.js / Express.js", percent: 70, tooltip: "Server-side JavaScript and REST APIs" },
    { name: "MySQL/PostgreSQL", percent: 72, tooltip: "Database design, query optimization and complex queries" },
    { name: "Redis", percent: 65, tooltip: "Caching to bring API response time down to ~50 ms" },
  ],
  devops: [
    { name: "VPS Setup & Hosting", percent: 75, tooltip: "Provisioned a VPS from scratch and took a Laravel app live" },
    { name: "Nginx", percent: 75, tooltip: "Web server setup and reverse proxy for Laravel APIs" },
    { name: "CI/CD Pipelines", percent: 75, tooltip: "Automated build and deploy pipelines across multiple projects" },
    { name: "Git & GitHub", percent: 80, tooltip: "Version control and team collaboration workflows" },
  ],
};

const categoryTitles = {
  frontend: "Front-end Development",
  backend: "Back-end Development",
  devops: "DevOps & Deployment",
};

const sidebarSkills = [
  ["Laravel / PHP", 85],
  ["JavaScript", 85],
  ["React.js", 80],
  ["MySQL/PostgreSQL", 72],
];

const experience = [
  {
    role: "Visiting Faculty, Web Development",
    org: "HRIT University, Ghaziabad",
    period: "July 2026 – Present",
    points: [
      "Teach HTML/CSS, JavaScript and PHP/Laravel to 50+ first-year BCA students.",
      "Design course content and hands-on projects; mentor students on debugging and project workflow.",
    ],
  },
  {
    role: "Laravel Developer",
    org: "The Night Marketer",
    period: "June 2026 – July 2026",
    points: [
      "Built and maintained Laravel backend modules with reusable CRUD components, reducing repetitive development effort.",
      "Diagnosed and fixed bugs in live modules, reducing recurring support issues; worked in a team using Git.",
    ],
  },
  {
    role: "Laravel Developer (Project-Based)",
    org: "IQFin",
    period: "March 2026 – May 2026",
    points: [
      "Built secure REST APIs and role-based access control across enquiry, inventory and policy management systems.",
      "Designed reusable Laravel components for loan policy workflows, removing duplicate logic across modules.",
      "Delivered enquiry and inventory features from requirements to production deployment.",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "Master-Tec Universe",
    period: "July 2025 – February 2026",
    points: [
      "Developed full-stack applications with Laravel, JavaScript and MySQL, from database design to UI delivery.",
      "Implemented Redis caching and optimized queries, bringing API response time to ~50 ms.",
      "Integrated REST APIs and resolved production issues, improving reliability for end users.",
    ],
  },
  {
    role: "Software Development Intern (6 months)",
    org: "Master-Tec Universe",
    period: "January 2025 – June 2025",
    points: [
      "Built web pages and wrote application code using React.js, Node.js and Express.js on live client work, while learning production workflows.",
    ],
  },
];

const resumeProjects = [
  {
    name: "EduLife",
    stack: "Laravel | MySQL | VPS | Nginx",
    points: [
      "E-learning platform with student dashboard, admin panel, course management, MCQ tests, session booking, payments and invoices, and email OTP login.",
      "RBAC for 3 roles: student, teacher and super admin.",
      "Set up the VPS from scratch and took the Laravel app live.",
    ],
  },
  {
    name: "Raftaar",
    stack: "React | Laravel API | Nginx",
    points: [
      "Mobile app with a React admin dashboard consuming a Laravel REST API.",
      "Served the API through an Nginx reverse proxy.",
    ],
  },
  {
    name: "DigiBuggy",
    stack: "Laravel | MySQL",
    points: [
      "E-commerce platform with a custom PC builder.",
      "Product, quotation and order modules with a full admin panel.",
    ],
  },
  {
    name: "IQFin Policy Management System",
    stack: "Laravel | MySQL",
    points: ["Loan policy platform with an eligibility engine, reports, filters, search and role-based dashboards."],
  },
  {
    name: "Inventory Management System",
    stack: "Laravel | MySQL",
    points: ["Admin and Dealer modules with inventory CRUD, authentication and communication features."],
  },
  {
    name: "Attendance Management System",
    stack: "PHP | MySQL | JS",
    points: [
      "Role-based login for Admin & Users",
      "CRUD operations via REST APIs",
      "Secure authentication and attendance management",
    ],
  },
  {
    name: "Personal Portfolio Website",
    stack: "React | Express.js | PostgreSQL",
    points: [
      "Responsive portfolio showcasing projects and skills",
      "Dynamic contact form integrated with backend and database",
    ],
  },
];

// Add matching screenshots in public/img/portfolio/ (file names below).
const portfolioItems = [
  { title: "EduLife", category: "Full-Stack", filter: "filter-fullstack", img: "img/portfolio/portfolio-edulife.jpeg", link: "https://edulife.sg" },
  { title: "DigiBuggy", category: "Full-Stack", filter: "filter-fullstack", img: "img/portfolio/portfolio-digibuggy.jpeg", link: "https://digibuggy.com" },
  { title: "IQFin Policy Management", category: "Full-Stack", filter: "filter-fullstack", img: "img/portfolio/portfolio-iqfin.jpeg", link: "https://iqfin.in" },
  { title: "Inventory Management System", category: "Backend", filter: "filter-backend", img: "img/portfolio/portfolio-inventory.jpeg", link: "https://iqfin.in/inventory" },
  { title: "Raftaar", category: "Full-Stack", filter: "filter-fullstack", img: "img/portfolio/portfolio-raftaar.jpeg", link: "#" },
  { title: "Attendance Management System", category: "Backend", filter: "filter-backend", img: "img/portfolio/portfolio-attendance.jpeg", link: "https://kanhaiya-dev.gt.tc/" },
  { title: "Personal Portfolio Website", category: "Frontend", filter: "filter-frontend", img: "img/portfolio/portfolio.jpeg", link: "#" },
];

const navItems = [
  ["#hero", "bi-house", "Home"],
  ["#about", "bi-person", "About"],
  ["#skills", "bi-gear", "Skills"],
  ["#resume", "bi-file-earmark-text", "Resume"],
  ["#portfolio", "bi-images", "Portfolio"],
  ["#contact", "bi-envelope", "Contact"],
];

/* ---------- Small components ---------- */
const SocialLinks = ({ className }) => (
  <div className={className}>
    <a href={GITHUB} className="google-plus" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-github" />
    </a>
    <a href={LINKEDIN} className="linkedin" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin" />
    </a>
    <a
      href="https://www.instagram.com/kanhaiya.14581?igsh=d3UwOXU4cDN6N3Aw"
      className="instagram"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="bi bi-instagram" />
    </a>
    <a href="https://wa.me/918368003925" target="_blank" rel="noopener noreferrer" className="whatsapp">
      <i className="bi bi-whatsapp" />
    </a>
    <a className="envelope" href={MAILTO}>
      <i className="bi bi-envelope" />
    </a>
  </div>
);

const ResumeItem = ({ title, subtitle, period, points }) => (
  <div className="resume-item">
    <h4>{title}</h4>
    <h5>{subtitle}</h5>
    {period && <p><em>{period}</em></p>}
    <ul>
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

/* ---------- Page ---------- */
const Index = () => {
  useEffect(() => {
    const headerToggleBtn = document.querySelector(".header-toggle");
    function headerToggle() {
      document.querySelector("#header").classList.toggle("header-show");
      headerToggleBtn.classList.toggle("bi-list");
      headerToggleBtn.classList.toggle("bi-x");
    }
    if (headerToggleBtn) {
      headerToggleBtn.addEventListener("click", headerToggle);
    }

    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        if (document.querySelector(".header-show")) {
          headerToggle();
        }
      });
    });

    let scrollTop = document.querySelector(".scroll-top");
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      }
    }
    if (scrollTop) {
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);

    AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });

    new PureCounter();

    document.querySelectorAll(".skills-animation").forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function () {
          item.querySelectorAll(".progress .progress-bar").forEach((el) => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        },
      });
    });

    GLightbox({ selector: ".glightbox" });

    document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
      let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
      let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
      let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
        initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });

      isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
        filters.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({ filter: this.getAttribute("data-filter") });
          AOS.refresh();
        });
      });
    });

    window.addEventListener("load", function () {
      if (window.location.hash && document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    });

    let navmenulinks = document.querySelectorAll(".navmenu a");
    function navmenuScrollspy() {
      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          document.querySelectorAll(".navmenu a.active").forEach((link) => link.classList.remove("active"));
          navmenulink.classList.add("active");
        } else {
          navmenulink.classList.remove("active");
        }
      });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy);
  }, []);

  const typedEl = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (typedEl.current) {
      typedInstance.current = new Typed(typedEl.current, {
        strings: [
          "Full Stack Developer",
          "Laravel Developer",
          "React & Node.js Developer",
          "REST API Developer",
          "Visiting Faculty",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
      });
    }
    return () => {
      if (typedInstance.current) typedInstance.current.destroy();
    };
  }, []);

  // Put the new PDF at public/resume/Krishna_Rathaur_Resume.pdf (or change the path here)
  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/resume/Krishna_Rathaur_Resume.pdf";
    link.download = "Krishna_Rathaur_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <header id="header" className="header dark-background d-flex flex-column justify-content-center">
          <i className="header-toggle d-xl-none bi bi-list" />
          <div className="header-container d-flex flex-column align-items-start">
            <nav id="navmenu" className="navmenu">
              <ul>
                {navItems.map(([href, icon, label], i) => (
                  <li key={href}>
                    <a href={href} className={i === 0 ? "active" : undefined}>
                      <i className={`bi ${icon} navicon`} /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks className="social-links text-center" />
          </div>
        </header>

        <main className="main">
          {/* Hero Section */}
          <section id="hero" className="hero section">
            <div className="background-elements">
              <div className="bg-circle circle-1" />
              <div className="bg-circle circle-2" />
            </div>
            <div className="hero-content">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6" data-aos="fade-right" data-aos-delay={100}>
                    <div className="hero-text">
                      <h1>
                        I'm <span className="accent-text">Krishna</span>
                      </h1>
                      <h2>Rathaur</h2>
                      <p className="lead">
                        I'm a <span ref={typedEl}></span>
                      </p>
                      <p className="description">
                        Full Stack Developer with 1+ year of experience building and deploying
                        production web applications with Laravel, React.js, Node.js and MySQL.
                        I build secure REST APIs, role-based admin panels and payment-integrated
                        platforms, and I host them on VPS with Nginx and CI/CD.
                      </p>
                      <div className="hero-actions">
                        <a href="#portfolio" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-outline">Get In Touch</a>
                      </div>
                      <SocialLinks className="social-links" />
                    </div>
                  </div>
                  <div className="col-lg-6" data-aos="fade-left" data-aos-delay={200}>
                    <div className="hero-visual">
                      <div className="profile-container">
                        <div className="profile-background" />
                        <img src="img/profile/profile-3.png" alt="Krishna Rathaur" className="profile-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row">
                <div className="col-lg-5" data-aos="zoom-in" data-aos-delay={200}>
                  <div className="profile-card">
                    <div className="profile-header">
                      <div className="profile-image">
                        <img src="img/profile/profile-2.png" alt="Krishna Rathaur" className="img-fluid" />
                      </div>
                      <div className="profile-badge">
                        <i className="bi bi-check-circle-fill" />
                      </div>
                    </div>
                    <div className="profile-content">
                      <h3>Krishna Rathaur</h3>
                      <p className="profession">Full Stack Developer</p>
                      <div className="contact-links">
                        <a href={MAILTO} className="contact-item">
                          <i className="bi bi-envelope" />
                          {EMAIL}
                        </a>
                        <a href="tel:+918368003925" className="contact-item">
                          <i className="bi bi-telephone" />
                          +91 (8368) 00-3925
                        </a>
                        <a href="#about" className="contact-item">
                          <i className="bi bi-geo-alt" />
                          Ghaziabad
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7" data-aos="fade-left" data-aos-delay={300}>
                  <div className="about-content">
                    <div className="section-header">
                      <span className="badge-text">About</span>
                      <h2>Building Secure, Scalable Web Applications, From Database to Deployment</h2>
                    </div>
                    <div className="description">
                      <p>
                        I am a Full Stack Developer with 1+ year of experience in Laravel, PHP,
                        React.js, Node.js and MySQL. I have delivered secure REST APIs, role-based
                        access control, admin panels and payment-integrated platforms across
                        e-learning, fintech and e-commerce, and contributed fixes and enhancements
                        to about 20 live websites.
                      </p>
                      <p>
                        I also set up and manage hosting: VPS setup, Nginx reverse proxy and CI/CD
                        pipelines. Alongside development, I serve as Visiting Faculty at HRIT
                        University, Ghaziabad, teaching web development to 50+ BCA students.
                      </p>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number">6+</div>
                        <div className="stat-label">Projects Completed</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">1+</div>
                        <div className="stat-label">Years Experience</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Students Taught</div>
                      </div>
                    </div>
                    <div className="details-grid">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-label">Specialization</span>
                          <span className="detail-value">Full Stack Development (Laravel, React, Node.js)</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Current Role</span>
                          <span className="detail-value">Visiting Faculty, HRIT University</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-label">Education</span>
                          <span className="detail-value">BCA, Aadhunik Group of Institutions, Ghaziabad</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Languages</span>
                          <span className="detail-value">English, Hindi</span>
                        </div>
                      </div>
                    </div>
                    <div className="cta-section">
                      <a href="#" onClick={handleDownload} className="btn btn-primary">
                        <i className="bi bi-download" />
                        Download Resume
                      </a>
                      <a href="#contact" className="btn btn-outline">
                        <i className="bi bi-chat-dots" />
                        Let's Talk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="skills section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Skills</h2>
              <p>The technologies I use to build, deploy and maintain production web applications.</p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row">
                {Object.entries(skillsData).map(([category, skills], idx) => (
                  <div className="col-lg-4" key={category}>
                    <div className="skills-category" data-aos="fade-up" data-aos-delay={200 + idx * 100}>
                      <h3>{categoryTitles[category]}</h3>
                      <div className="skills-animation">
                        {skills.map((skill, i) => (
                          <div className="skill-item mb-3" key={i}>
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>{skill.name}</h4>
                              <span className="skill-percentage">{skill.percent}%</span>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${skill.percent}%` }}
                                aria-valuenow={skill.percent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="skill-tooltip">{skill.tooltip}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" className="resume section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Resume</h2>
              <p>
                Full Stack Developer with 1+ year of experience building and deploying web
                applications with Laravel, React.js, Node.js and MySQL. Visiting Faculty teaching
                web development.
              </p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row gy-4">
                <div className="col-lg-4">
                  <div className="resume-side" data-aos="fade-right" data-aos-delay={100}>
                    <div className="profile-img mb-4">
                      <img src="img/profile/profile-2.png" alt="Profile" className="img-fluid rounded" />
                    </div>

                    <h3>Professional Summary</h3>
                    <p>
                      Full Stack Developer delivering secure REST APIs, role-based access control,
                      admin panels and payment-integrated platforms. Sets up VPS hosting with Nginx
                      and CI/CD pipelines.
                    </p>

                    <h3 className="mt-4">Contact Information</h3>
                    <ul className="contact-info list-unstyled">
                      <li>
                        <i className="bi bi-geo-alt" /> Ghaziabad, Uttar Pradesh, India
                      </li>
                      <li>
                        <i className="bi bi-envelope" /> {EMAIL}
                      </li>
                      <li>
                        <i className="bi bi-phone" /> +91 8368003925
                      </li>
                      <li>
                        <i className="bi bi-linkedin" /> linkedin.com/in/krishna-rathaur
                      </li>
                      <li>
                        <i className="bi bi-github" /> github.com/dev-kanhaiya
                      </li>
                    </ul>

                    <div className="skills-animation mt-4">
                      <h3>Technical Skills</h3>
                      {sidebarSkills.map(([name, percent]) => (
                        <div className="skill-item" key={name}>
                          <div className="d-flex justify-content-between">
                            <span>{name}</span>
                            <span>{percent}%</span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${percent}%` }}
                              role="progressbar"
                              aria-valuenow={percent}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 ps-4 ps-lg-5">
                  <div className="resume-section" data-aos="fade-up">
                    <h3>
                      <i className="bi bi-briefcase me-2" />
                      Experience
                    </h3>
                    {experience.map((job) => (
                      <ResumeItem
                        key={job.role + job.period}
                        title={job.role}
                        subtitle={job.org}
                        period={job.period}
                        points={job.points}
                      />
                    ))}
                  </div>

                  <div className="resume-section" data-aos="fade-up">
                    <h3>
                      <i className="bi bi-code-slash me-2" />
                      Key Projects
                    </h3>
                    {resumeProjects.map((p) => (
                      <ResumeItem key={p.name} title={p.name} subtitle={p.stack} points={p.points} />
                    ))}
                  </div>

                  <div className="resume-section" data-aos="fade-up" data-aos-delay={100}>
                    <h3>
                      <i className="bi bi-mortarboard me-2" />
                      Education
                    </h3>
                    <div className="resume-item">
                      <h4>Bachelor of Computer Applications (BCA)</h4>
                      <h5>2024 – Present (2nd Year)</h5>
                      <p>
                        Aadhunik Group of Institutions, Duhai, Ghaziabad (Affiliated to CCS University, Meerut)
                      </p>
                    </div>
                    <div className="resume-item">
                      <h4>Intermediate (12th)</h4>
                      <h5>2022</h5>
                      <p>UP Board</p>
                    </div>
                    <div className="resume-item">
                      <h4>High School (10th)</h4>
                      <h5>2020</h5>
                      <p>UP Board</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="portfolio section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Portfolio</h2>
              <p>
                A selection of my full-stack and backend projects built with Laravel, React,
                Node.js and MySQL.
              </p>
            </div>

            <div
              className="container isotope-layout"
              data-default-filter="*"
              data-layout="masonry"
              data-sort="original-order"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row">
                <div className="col-lg-3 filter-sidebar">
                  <div className="filters-wrapper" data-aos="fade-right" data-aos-delay={150}>
                    <ul className="portfolio-filters isotope-filters">
                      <li data-filter="*" className="filter-active">All Projects</li>
                      <li data-filter=".filter-frontend">Frontend</li>
                      <li data-filter=".filter-backend">Backend</li>
                      <li data-filter=".filter-fullstack">Full-Stack</li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div
                    className="row gy-4 portfolio-container isotope-container"
                    data-aos="fade-up"
                    data-aos-delay={200}
                  >
                    {portfolioItems.map((item) => (
                      <div
                        key={item.title}
                        className={`col-lg-6 col-md-6 portfolio-item isotope-item ${item.filter}`}
                      >
                        <div className="portfolio-wrap">
                          <img src={item.img} className="img-fluid" alt={item.title} />
                          <div className="portfolio-info">
                            <div className="content">
                              <span className="category">{item.category}</span>
                              <h4 className="text-white">{item.title}</h4>
                              <div className="portfolio-links">
                                <a href={item.img} className="glightbox" title={item.title}>
                                  <i className="bi bi-plus-lg" />
                                </a>
                                <a
                                  href={item.link}
                                  title="View project"
                                  target={item.link === "#" ? undefined : "_blank"}
                                  rel="noopener noreferrer"
                                >
                                  <i className="bi bi-arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Contact</h2>
              <p>
                Open to Full Stack and Backend Development opportunities. Let's connect and build
                something great together!
              </p>
            </div>
            <div className="container">
              <div className="row g-4 g-lg-5">
                <div className="col-lg-5">
                  <div className="info-box">
                    <h3>Contact Info</h3>
                    <p>
                      I'd love to connect! Whether it's a project, a question, or a potential role,
                      don't hesitate to get in touch.
                    </p>
                    <div className="info-item">
                      <div className="icon-box">
                        <i className="bi bi-geo-alt" />
                      </div>
                      <div className="content">
                        <h4>Location</h4>
                        <p>Indrapuram</p>
                        <p>Ghaziabad, 201014</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="icon-box">
                        <i className="bi bi-telephone" />
                      </div>
                      <div className="content">
                        <h4>Phone Number</h4>
                        <p>+91 836-800-3925</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="icon-box">
                        <i className="bi bi-envelope" />
                      </div>
                      <div className="content">
                        <h4>Email Address</h4>
                        <p>{EMAIL}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-form">
                    <h3>Get In Touch</h3>
                    <p>Let's connect! I'm open to new challenges and opportunities in web development.</p>
                    <form action="forms/contact.php" method="post" className="php-email-form">
                      <div className="row gy-4">
                        <div className="col-md-6">
                          <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                        </div>
                        <div className="col-md-6">
                          <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="col-12">
                          <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                        </div>
                        <div className="col-12">
                          <textarea
                            className="form-control"
                            name="message"
                            rows={6}
                            placeholder="Message"
                            required
                            defaultValue={""}
                          />
                        </div>
                        <div className="col-12 text-center">
                          <div className="loading">Loading</div>
                          <div className="error-message" />
                          <div className="sent-message">Your message has been sent. Thank you!</div>
                          <button type="submit" className="btn">Send Message</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="footer" className="footer position-relative">
          <div className="container">
            <div className="copyright text-center">
              <p>
                © <span>Copyright</span> <strong className="px-1 sitename">Krishna Rathaur</strong>{" "}
                <span>All Rights Reserved</span>
              </p>
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>

        <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short" />
        </a>
      </div>
    </>
  );
};

export default Index;
