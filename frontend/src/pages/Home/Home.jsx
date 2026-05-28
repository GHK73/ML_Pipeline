// frontend/src/pages/Home/Home.jsx

import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <section className="hero-section">
          <h1>DeepShield AI</h1>

          <p>
            Scalable Deepfake Detection Infrastructure
          </p>

          <div className="hero-buttons">
            <button>Get Started</button>
            <button className="secondary-btn">
              Explore Models
            </button>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Features</h2>

          <div className="feature-cards">
            <div className="card">
              <h3>AI Inference</h3>
              <p>
                Upload images and detect deepfakes instantly.
              </p>
            </div>

            <div className="card">
              <h3>Redis Caching</h3>
              <p>
                High-performance prediction caching.
              </p>
            </div>

            <div className="card">
              <h3>Dynamic Models</h3>
              <p>
                Load CNN and SVM models dynamically.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;