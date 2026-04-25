import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SRI RAM
              <br />
              <span>CHANDRA SEKHAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>An Aspiring</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">DevOps Engineer</div>
              <div className="landing-h2-2">AWS Cloud Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AWS Cloud Engineer</div>
              <div className="landing-h2-info-1">DevOps Engineer</div>
            </h2>
          </div>
          <div className="landing-cta">
            <a 
              href="/resume.pdf" 
              className="resume-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
