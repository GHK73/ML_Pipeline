// frontend/src/pages/Home/Home.jsx
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        {/* Decorative Grid Overlay */}
        <div className="grid-overlay" />

        <section className="hero-section">
          <div className="announcement-badge animate-fade-in">
            <span>Next-Gen Infrastructure</span>
          </div>

          <h1 className="animate-fade-in delay-1">
            DeepShield AI
          </h1>

          <p className="animate-fade-in delay-2">
            Scalable Deepfake Detection Infrastructure built for enterprise reliability and ultra-low latency inference.
          </p>

          <div className="hero-buttons animate-fade-in delay-3">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">
              Explore Models
            </button>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Features</h2>

          <div className="feature-cards">
            <div className="card">
              <div className="card-icon-wrapper">🚀</div>
              <h3>AI Inference</h3>
              <p>
                Upload images and detect complex deepfakes instantly with optimized tensor deployment.
              </p>
            </div>

            <div className="card">
              <div className="card-icon-wrapper">⚡</div>
              <h3>Redis Caching</h3>
              <p>
                High-performance prediction and signature caching layers yielding sub-millisecond lookups.
              </p>
            </div>

            <div className="card">
              <div className="card-icon-wrapper">⚙️</div>
              <h3>Dynamic Models</h3>
              <p>
                Hot-swap CNN, ViT, and SVM models dynamically without service degradation or reboots.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;