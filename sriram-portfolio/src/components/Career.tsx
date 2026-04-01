import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>React Web Development Intern</h4>
                <h5>Study Comrade</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed 12+ reusable React components used across 5 application
              pages improving UI consistency. Integrated 6 REST APIs enabling
              dynamic data rendering across frontend modules. Managed version
              control using Git for collaborative development within a 3-member team.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech – Computer Science & Engineering</h4>
                <h5>Raghu Engineering College, Visakhapatnam</h5>
              </div>
              <h3>2023 – 2027</h3>
            </div>
            <p>
              Pursuing B.Tech in Computer Science with focus on DevOps practices,
              cloud computing, and infrastructure automation. Building hands-on
              experience with AWS, Docker, Jenkins, Kubernetes, and Terraform.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate (MPC)</h4>
                <h5>Siddhardha Junior College</h5>
              </div>
              <h3>2021 – 2023</h3>
            </div>
            <p>
              Completed Intermediate education with Mathematics, Physics, and
              Chemistry with 96.5% score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
