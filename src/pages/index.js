import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/app.css";
import AOS from "aos";
import "glightbox/dist/css/glightbox.min.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Typed from "typed.js";
import PureCounter from "@srexi/purecounterjs";
import "waypoints/lib/noframework.waypoints";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import "aos/dist/aos.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { Waypoint } from "react-waypoint";

const skillsData = {
  frontend: [
    {
      name: "HTML/CSS",
      percent: 90,
      tooltip:
        "Expert level knowledge of semantic HTML5 and modern CSS3 techniques",
    },
    {
      name: "JavaScript",
      percent: 85,
      tooltip:
        "Strong proficiency in ES6+, DOM manipulation, and modern frameworks",
    },
    {
      name: "React",
      percent: 80,
      tooltip:
        "Experience with React hooks, state management, and component architecture",
    },{
  name: "Bootstrap",
  percent: 75,
  tooltip: "Responsive design framework for fast, mobile-first web development",
},
  ],
  backend: [
    {
      name: "PHP",
      percent: 80,
      tooltip: "Backend development using PHP and database-driven applications",
    },
    {
      name: "Node.js",
      percent: 70,
      tooltip: "Server-side JavaScript development with Express and REST APIs",
    },

    // { name: "Python", percent: 70, tooltip: "Python development with Django and data analysis tools" },
    {
      name: "MySQL/PostgreSQL",
      percent: 72,
      tooltip: "Database design, optimization, and complex queries",
    },
    {
      name: "Next.js",
      percent: 80,
      tooltip:
        "Full-stack React framework for SSR, routing, and API integration",
    },
    {
      name: "Express.js",
      percent: 70,
      tooltip: "Backend framework for building REST APIs and server-side logic",
    },
  ],
};

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

    document
      .querySelectorAll(".navmenu .toggle-dropdown")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          this.parentNode.nextElementSibling.classList.toggle(
            "dropdown-active"
          );
          e.stopImmediatePropagation();
        });
      });

    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          preloader.remove();
        }, 200);
      });
    }

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

    function aosInit() {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
    window.addEventListener("load", aosInit);

    const selectTyped = document.querySelector(".typed");
    if (selectTyped) {
      let typed_strings = selectTyped.getAttribute("data-typed-items");
      typed_strings = typed_strings.split(",");
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
      });
    }

    new PureCounter();

    let skillsAnimation = document.querySelectorAll(".skills-animation");
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function () {
          let progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        },
      });
    });

    GLightbox({ selector: ".glightbox" });
    document
      .querySelectorAll(".isotope-layout")
      .forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
        let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
        let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

        let initIsotope;
        imagesLoaded(
          isotopeItem.querySelector(".isotope-container"),
          function () {
            initIsotope = new Isotope(
              isotopeItem.querySelector(".isotope-container"),
              {
                itemSelector: ".isotope-item",
                layoutMode: layout,
                filter: filter,
                sortBy: sort,
              }
            );
          }
        );

        isotopeItem
          .querySelectorAll(".isotope-filters li")
          .forEach(function (filters) {
            filters.addEventListener("click", function () {
              isotopeItem
                .querySelector(".isotope-filters .filter-active")
                .classList.remove("filter-active");
              this.classList.add("filter-active");
              initIsotope.arrange({ filter: this.getAttribute("data-filter") });
              if (typeof aosInit === "function") aosInit();
            });
          });
      });

    function initSwiper() {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );
          new Swiper(swiperElement, config);
        });
    }
    window.addEventListener("load", initSwiper);

    window.addEventListener("load", function () {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: "smooth",
            });
          }, 100);
        }
      }
    });

    let navmenulinks = document.querySelectorAll(".navmenu a");
    function navmenuScrollspy() {
      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          document
            .querySelectorAll(".navmenu a.active")
            .forEach((link) => link.classList.remove("active"));
          navmenulink.classList.add("active");
        } else {
          navmenulink.classList.remove("active");
        }
      });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy);

    AOS.init();
    const lightbox = GLightbox({});
  }, []);

  const typedEl = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (typedEl.current) {
      typedInstance.current = new Typed(typedEl.current, {
        strings: [
          "Backend Developer",
          "REST API Developer",
          "Software Developer",
          "Full Stack Developer",
          "Database Designer",
          "PostgreSQL & MySQL Expert",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
      });
    }

    // cleanup on unmount
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume/Krishna_Rathaur_Resume.pdf";
    link.download = "Krishna_Rathaur_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Preloader */}
      {/* <div id="preloader"></div> */}
      <div>
        <header
          id="header"
          className="header dark-background d-flex flex-column justify-content-center"
        >
          <i className="header-toggle d-xl-none bi bi-list" />
          <div className="header-container d-flex flex-column align-items-start">
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <a href="#hero" className="active">
                    <i className="bi bi-house navicon" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about">
                    <i className="bi bi-person navicon" /> About
                  </a>
                </li>
                <li>
                  <a href="#resume">
                    <i className="bi bi-file-earmark-text navicon" /> Resume
                  </a>
                </li>
                <li>
                  <a href="#portfolio">
                    <i className="bi bi-images navicon" /> Portfolio
                  </a>
                </li>
                {/* <li>
                  <a href="#services">
                    <i className="bi bi-hdd-stack navicon" /> Services
                  </a>
                </li> */}
                {/* <li className="dropdown">
                  <a href="#">
                    <i className="bi bi-menu-button navicon" />{" "}
                    <span>Dropdown</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown" />
                  </a>
                  <ul>
                    <li>
                      <a href="#">Dropdown 1</a>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        <span>Deep Dropdown</span>{" "}
                        <i className="bi bi-chevron-down toggle-dropdown" />
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Dropdown 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 5</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Dropdown 4</a>
                    </li>
                  </ul>
                </li> */}
                <li>
                  <a href="#contact">
                    <i className="bi bi-envelope navicon" /> Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className="social-links text-center">
              <a href="https://github.com/dev-kanhaiya" className="google-plus">
                <i className="bi bi-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-rathaur"
                className="linkedin"
              >
                <i className="bi bi-linkedin" />
              </a>
              <a
                href="https://www.instagram.com/kanhaiya.14581?igsh=d3UwOXU4cDN6N3Aw"
                className="instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="https://wa.me/918368003925"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp"
              >
                <i className="bi bi-whatsapp" />
              </a>
              <a
                className="envelope"
                href="mailto:kanhaiyarathore375@gmail.com?subject=Job%20Opportunity&body=Hi%20Kanhaiya,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
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
                  <div
                    className="col-lg-6"
                    data-aos="fade-right"
                    data-aos-delay={100}
                  >
                    <div className="hero-text">
                      <h1>
                        I'm <span className="accent-text">Krishna</span>
                      </h1>
                      <h2>Kanhaiya</h2>
                      {/* <p className="lead">I'm a <span className="typed" data-typed-items="UI/UX Designer, Web Developer, Brand Strategist, Creative Director" /></p> */}
                      <p className="lead">
                        I'm a <span ref={typedEl}></span>
                      </p>
                      <p className="description">
                        Passionate backend developer skilled in PHP, JavaScript,
                        Express.js, Next.js, and database management. I enjoy
                        building reliable server-side solutions that connect
                        modern frontends with robust backends.
                      </p>

                      <div className="hero-actions">
                        <a href="#portfolio" className="btn btn-primary">
                          View My Work
                        </a>
                        <a href="#contact" className="btn btn-outline">
                          Get In Touch
                        </a>
                      </div>
                      <div className="social-links">
                        <a
                          href="https://github.com/dev-kanhaiya"
                          className="google-plus"
                        >
                          <i className="bi bi-github" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/krishna-rathaur"
                          className="linkedin"
                        >
                          <i className="bi bi-linkedin" />
                        </a>
                        <a
                          href="https://www.instagram.com/kanhaiya.14581?igsh=d3UwOXU4cDN6N3Aw"
                          className="instagram"
                        >
                          <i className="bi bi-instagram" />
                        </a>
                        <a
                          href="https://wa.me/918368003925"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp"
                        >
                          <i className="bi bi-whatsapp" />
                        </a>
                        <a
                          className="envelope"
                          href="mailto:kanhaiyarathore375@gmail.com?subject=Job%20Opportunity&body=Hi%20Kanhaiya,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
                        >
                          <i className="bi bi-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-6"
                    data-aos="fade-left"
                    data-aos-delay={200}
                  >
                    <div className="hero-visual">
                      <div className="profile-container">
                        <div className="profile-background" />
                        <img
                          src="img/profile/profile-3.png"
                          alt="Kanhaiya"
                          className="profile-image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /Hero Section */}
          {/* About Section */}
          <section id="about" className="about section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row">
                <div
                  className="col-lg-5"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <div className="profile-card">
                    <div className="profile-header">
                      <div className="profile-image">
                        <img
                          src="img/profile/profile-2.png"
                          alt="Profile Image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="profile-badge">
                        <i className="bi bi-check-circle-fill" />
                      </div>
                    </div>
                    <div className="profile-content">
                      <h3>Kanhaiya</h3>
                      <p className="profession">Backend Developer</p>
                      <div className="contact-links">
                        <a
                          href="mailto:kanhaiyarathore375@gmail.com?subject=Job%20Opportunity&body=Hi%20Kanhaiya,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
                          className="contact-item"
                        >
                          <i className="bi bi-envelope" />
                          kanhaiyarathore375@gmail.com
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
                <div
                  className="col-lg-7"
                  data-aos="fade-left"
                  data-aos-delay={300}
                >
                  <div className="about-content">
                    <div className="section-header">
                      <span className="badge-text">About</span>
                      <h2>
                        Passionate About Building Reliable and Efficient Backend
                        Solutions
                      </h2>
                    </div>
                    <div className="description">
                      <p>
                        I am a software developer with hands-on experience in
                        backend development using PHP, JavaScript, Express.js,
                        Next.js, and databases like MySQL and PostgreSQL. I
                        enjoy building reliable, secure, and scalable solutions
                        that connect modern frontends with robust backends.
                      </p>
                      <p>
                        Through my projects, I have gained practical experience
                        in REST API development, database management, and
                        server-side logic, and I am eager to contribute my
                        skills to real-world applications.
                      </p>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number">5+</div>
                        <div className="stat-label">Projects Completed</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">1+</div>
                        <div className="stat-label">Years Experience</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Client Satisfaction</div>
                      </div>
                    </div>
                    <div className="details-grid">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-label">Specialization</span>
                          <span className="detail-value">
                            Backend Development & Web Applications
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Experience Level</span>
                          <span className="detail-value">
                            Aspiring Backend Developer
                          </span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-label">Education</span>
                          <span className="detail-value">
                            BCA, Aadhunik Group of Institutions, Ghaziabad
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Languages</span>
                          <span className="detail-value">English, Hindi</span>
                        </div>
                      </div>
                    </div>
                    <div className="cta-section">
                      <a
                        href="#"
                        onClick={handleDownload}
                        className="btn btn-primary"
                      >
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
          {/* /About Section */}
          {/* Skills Section */}
          <section id="skills" className="skills section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>Skills</h2>
              <p>
                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                consectetur velit
              </p>
            </div>
            {/* End Section Title */}
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row">
                {Object.entries(skillsData).map(([category, skills], idx) => (
                  <div className="col-lg-6" key={category}>
                    <div
                      className="skills-category"
                      data-aos="fade-up"
                      data-aos-delay={200 + idx * 100}
                    >
                      <h3>
                        {category === "frontend"
                          ? "Front-end Development"
                          : "Back-end Development"}
                      </h3>
                      <div className="skills-animation">
                        {skills.map((skill, i) => (
                          <div className="skill-item mb-3" key={i}>
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>{skill.name}</h4>
                              <span className="skill-percentage">
                                {skill.percent}%
                              </span>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${skill.percent}%` }} // <-- This line is required
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
          {/* /Skills Section */}
          {/* Resume Section */}
          <section id="resume" className="resume section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>Resume</h2>
              <p>
                BCA student and passionate backend developer with hands-on
                experience in PHP, JavaScript, Node.js, Express.js, React,
                Next.js, MySQL, and PostgreSQL. Skilled in building robust,
                secure, and scalable web applications.
              </p>
            </div>

            {/* End Section Title */}
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row gy-4">
                {/* Left column with summary and contact */}
                <div className="col-lg-4">
                  <div
                    className="resume-side"
                    data-aos="fade-right"
                    data-aos-delay={100}
                  >
                    <div className="profile-img mb-4">
                      <img
                        src="img/profile/profile-2.png"
                        alt="Profile"
                        className="img-fluid rounded"
                      />
                    </div>

                    <h3>Professional Summary</h3>
                    <p>
                      Dedicated backend developer with practical experience in
                      building REST APIs, server-side logic, and database
                      management. Passionate about solving real-world problems
                      through clean, reliable code.
                    </p>

                    <h3 className="mt-4">Contact Information</h3>
                    <ul className="contact-info list-unstyled">
                      <li>
                        <i className="bi bi-geo-alt" /> Ghaziabad, Uttar
                        Pradesh, India
                      </li>
                      <li>
                        <i className="bi bi-envelope" />{" "}
                        kanhaiyarathore375@gmail.com
                      </li>
                      <li>
                        <i className="bi bi-phone" /> +91 8368003925
                      </li>
                      <li>
                        <i className="bi bi-linkedin" />{" "}
                        www.linkedin.com/in/krishna-rathaur
                      </li>
                      <li>
                        <i className="bi bi-github" /> github.com/dev-kanhaiya
                      </li>
                    </ul>

                    <div className="skills-animation mt-4">
                      <h3>Technical Skills</h3>
                      <div className="skill-item">
                        <div className="d-flex justify-content-between">
                          <span>PHP</span>
                          <span>80%</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "80%" }}
                            role="progressbar"
                            aria-valuenow={75}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                      <div className="skill-item">
                        <div className="d-flex justify-content-between">
                          <span>JavaScript</span>
                          <span>85%</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "85%" }}
                            role="progressbar"
                            aria-valuenow={85}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                      <div className="skill-item">
                        <div className="d-flex justify-content-between">
                          <span>React.js</span>
                          <span>80%</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "80%" }}
                            role="progressbar"
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                      <div className="skill-item">
                        <div className="d-flex justify-content-between">
                          <span>MySQL/PostgreSQL</span>
                          <span>72%</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "75%" }}
                            role="progressbar"
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column with experience and education */}
                <div className="col-lg-8 ps-4 ps-lg-5">
                  {/* Experience / Projects Section */}
                  <div className="resume-section" data-aos="fade-up">
                    <h3>
                      <i className="bi bi-briefcase me-2" />
                      Projects
                    </h3>

                    <div className="resume-item">
                      <h4>Attendance Management System</h4>
                      <h5>PHP | MySQL | JS</h5>
                      <ul>
                        <li>Role-based login for Admin & Users</li>
                        <li>CRUD operations via REST APIs</li>
                        <li>Secure authentication and attendance management</li>
                      </ul>
                    </div>

                    <div className="resume-item">
                      <h4>Personal Portfolio Website</h4>
                      <h5>React | Express.js | PostgreSQL</h5>
                      <ul>
                        <li>
                          Responsive portfolio showcasing projects and skills
                        </li>
                        <li>
                          Dynamic contact form integrated with backend and
                          database
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div
                    className="resume-section"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <h3>
                      <i className="bi bi-mortarboard me-2" />
                      Education
                    </h3>
                    <div className="resume-item">
                      <h4>Bachelor of Computer Applications (BCA)</h4>
                      <h5>2024 – Present (2nd Year)</h5>
                      <p>
                        Aadhunik Group of Institutions, Duhai, Ghaziabad
                        (Affiliated to CCS University, Meerut)
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
          {/* /Resume Section */}
          {/* Portfolio Section */}
          <section id="portfolio" className="portfolio section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>Portfolio</h2>
              <p>
                A selection of my backend and full-stack projects, showcasing
                practical experience with PHP, JavaScript, React, Next.js,
                Express, MySQL, and PostgreSQL.
              </p>
            </div>

            {/* Isotope Layout Wrapper */}
            <div
              className="container isotope-layout"
              data-default-filter="*"
              data-layout="masonry"
              data-sort="original-order"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row">
                {/* Sidebar Filters */}
                <div className="col-lg-3 filter-sidebar">
                  <div
                    className="filters-wrapper"
                    data-aos="fade-right"
                    data-aos-delay={150}
                  >
                    <ul className="portfolio-filters isotope-filters">
                      <li data-filter="*" className="filter-active">
                        All Projects
                      </li>
                      <li data-filter=".filter-frontend">Frontend</li>
                      <li data-filter=".filter-backend">Backend</li>
                      <li data-filter=".filter-fullstack">Full-Stack</li>
                    </ul>
                  </div>
                </div>

                {/* Portfolio Items */}
                <div className="col-lg-9">
                  <div
                    className="row gy-4 portfolio-container isotope-container"
                    data-aos="fade-up"
                    data-aos-delay={200}
                  >
                    {/* Personal Portfolio Website */}
                    <div className="col-lg-6 col-md-6 portfolio-item isotope-item filter-frontend">
                      <div className="portfolio-wrap">
                        <img
                          src="img/portfolio/portfolio.jpeg"
                          className="img-fluid"
                          alt="Personal Portfolio Website"
                        />
                        <div className="portfolio-info">
                          <div className="content">
                            <span className="category">Frontend</span>
                            <h4 className="text-white">
                              Personal Portfolio Website
                            </h4>
                            <div className="portfolio-links">
                              <a
                                href="img/portfolio/portfolio.jpeg"
                                className="glightbox"
                                title="Personal Portfolio Website"
                              >
                                <i className="bi bi-plus-lg" />
                              </a>
                              <a href="#" title="More Details">
                                <i className="bi bi-arrow-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Attendance Management System */}
                    <div className="col-lg-6 col-md-6 portfolio-item isotope-item filter-backend">
                      <div className="portfolio-wrap">
                        <img
                          src="img/portfolio/portfolio-attendance.jpeg"
                          className="img-fluid"
                          alt="Attendance Management System"
                        />
                        <div className="portfolio-info">
                          <div className="content">
                            <span className="category">Backend</span>
                            <h4 className="text-white">
                              Attendance Management System
                            </h4>
                            <div className="portfolio-links">
                              <a
                                href="img/portfolio/portfolio-attendance.jpeg"
                                className="glightbox"
                                title="Attendance Management System"
                              >
                                <i className="bi bi-plus-lg" />
                              </a>
                              <a
                                href="https://kanhaiya-dev.gt.tc/"
                                title="More Details"
                              >
                                <i className="bi bi-arrow-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Portfolio Container */}
                </div>
              </div>
            </div>
          </section>

          {/* /Portfolio Section */}

          {/* Contact Section */}
          <section id="contact" className="contact section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>Contact</h2>
              <p>
                Looking for exciting Backend Development opportunities. Let’s
                connect and build something great together!
              </p>
            </div>
            {/* End Section Title */}
            <div className="container">
              <div className="row g-4 g-lg-5">
                <div className="col-lg-5">
                  <div className="info-box">
                    <h3>Contact Info</h3>
                    <p>
                      I’d love to connect! Whether it’s a project, a question,
                      or a potential role, don’t hesitate to get in touch.
                    </p>
                    <div className="info-item">
                      <div className="icon-box">
                        <i className="bi bi-geo-alt" />
                      </div>
                      <div className="content">
                        <h4>Our Location</h4>
                        <p>Indrapuram </p>
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
                        <p>kanhaiyarathore375@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-form">
                    <h3>Get In Touch</h3>
                    <p>
                      Let’s connect! I’m open to new challenges and
                      opportunities in Backend Development.
                    </p>
                    <form
                      action="forms/contact.php"
                      method="post"
                      className="php-email-form"
                    >
                      <div className="row gy-4">
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                        <div className="col-md-6 ">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            placeholder="Subject"
                            required
                          />
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
                          <div className="sent-message">
                            Your message has been sent. Thank you!
                          </div>
                          <button type="submit" className="btn">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /Contact Section */}
        </main>
        <footer id="footer" className="footer position-relative">
          <div className="container">
            <div className="copyright text-center ">
              <p>
                © <span>Copyright</span>{" "}
                <strong className="px-1 sitename">dev-kanhaiya</strong>{" "}
                <span>All Rights Reserved</span>
              </p>
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you've purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        {/* Scroll Top */}
        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short" />
        </a>

        {/* Vendor JS Files */}
        {/* Main JS File */}
      </div>
    </>
  );
};
export default Index;
