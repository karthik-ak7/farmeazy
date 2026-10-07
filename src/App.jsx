import { useState } from "react";
import "./App.css";
import Chatbot from "./Chatbot";
import CropDoctor from "./CropDoctor";
import Auth from "./Auth";
import AddCrop from "./AddCrop";
import FarmerDashboard from "./FarmerDashboard";
import CustomerDashboard from "./CustomerDashboard";

function App() {
  const [language, setLanguage] = useState("English");
  const [showAuth, setShowAuth] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showFarmerDashboard, setShowFarmerDashboard] = useState(false);
  const [showCustomerDashboard, setShowCustomerDashboard] = useState(false);

  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 45,
      quantity: 100,
      location: "Bengaluru",
      description: "Fresh tomatoes directly from the farm.",
      emoji: "🍅",
      imageClass: "tomato",
    },
    {
      id: 2,
      name: "Farm Potatoes",
      category: "Vegetables",
      price: 35,
      quantity: 150,
      location: "Bengaluru",
      description: "Fresh farm potatoes.",
      emoji: "🥔",
      imageClass: "potato",
    },
    {
      id: 3,
      name: "Red Onions",
      category: "Vegetables",
      price: 40,
      quantity: 120,
      location: "Bengaluru",
      description: "Fresh red onions.",
      emoji: "🧅",
      imageClass: "onion",
    },
    {
      id: 4,
      name: "Fresh Carrots",
      category: "Vegetables",
      price: 50,
      quantity: 80,
      location: "Bengaluru",
      description: "Fresh carrots from a local farmer.",
      emoji: "🥕",
      imageClass: "carrot",
    },
  ]);

  const getCropVisual = (name, category) => {
    const crop = name.toLowerCase();

    if (crop.includes("tomato")) {
      return { emoji: "🍅", imageClass: "tomato" };
    }

    if (crop.includes("potato")) {
      return { emoji: "🥔", imageClass: "potato" };
    }

    if (crop.includes("onion")) {
      return { emoji: "🧅", imageClass: "onion" };
    }

    if (crop.includes("carrot")) {
      return { emoji: "🥕", imageClass: "carrot" };
    }

    if (crop.includes("mango")) {
      return { emoji: "🥭", imageClass: "fruit" };
    }

    if (crop.includes("apple")) {
      return { emoji: "🍎", imageClass: "fruit" };
    }

    if (crop.includes("banana")) {
      return { emoji: "🍌", imageClass: "fruit" };
    }

    if (crop.includes("orange")) {
      return { emoji: "🍊", imageClass: "fruit" };
    }

    if (crop.includes("grape")) {
      return { emoji: "🍇", imageClass: "fruit" };
    }

    if (crop.includes("watermelon")) {
      return { emoji: "🍉", imageClass: "fruit" };
    }

    if (crop.includes("rice")) {
      return { emoji: "🌾", imageClass: "grain" };
    }

    if (crop.includes("wheat")) {
      return { emoji: "🌾", imageClass: "grain" };
    }

    if (crop.includes("corn") || crop.includes("maize")) {
      return { emoji: "🌽", imageClass: "grain" };
    }

    if (category === "Fruits") {
      return { emoji: "🍎", imageClass: "fruit" };
    }

    if (category === "Grains") {
      return { emoji: "🌾", imageClass: "grain" };
    }

    if (category === "Pulses") {
      return { emoji: "🫘", imageClass: "pulse" };
    }

    if (category === "Spices") {
      return { emoji: "🌶️", imageClass: "spice" };
    }

    return { emoji: "🌱", imageClass: "other" };
  };

  const handleAddCrop = (newCrop) => {
    const visual = getCropVisual(
      newCrop.name,
      newCrop.category
    );

    const cropWithVisual = {
      ...newCrop,
      ...visual,
    };

    setCrops((previousCrops) => [
      ...previousCrops,
      cropWithVisual,
    ]);
  };

  return (
    <div className="app">

      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onLoginSuccess={(role, profile) => {
            setShowAuth(false);

            if (role === "farmer") {
              setShowFarmerDashboard(true);
            }

            if (role === "customer") {
              setShowCustomerDashboard(true);
            }
          }}
        />
      )}

      {showFarmerDashboard && (
        <FarmerDashboard
          onBack={() => setShowFarmerDashboard(false)}
          onAddCrop={handleAddCrop}
          crops={crops}
        />
      )}
      {showCustomerDashboard && (
        <CustomerDashboard
          onBack={() => setShowCustomerDashboard(false)}
          crops={crops}
          onBrowseMarketplace={() => {
            setShowCustomerDashboard(false);

            setTimeout(() => {
              document
                .getElementById("marketplace")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }, 100);
          }}
        />
      )}

      {showAddCrop && (
        <AddCrop
          onClose={() => setShowAddCrop(false)}
          onAddCrop={handleAddCrop}
        />
      )}

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-mark">
            F
          </div>

          <div>
            <div className="brand-name">
              Farmeazy
            </div>

            <div className="brand-tagline">
              Farm fresh. Fair prices.
            </div>
          </div>

        </div>

        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#how-it-works">How it works</a>
          <a href="#assistant">AI Assistant</a>
        </nav>

        <div className="nav-right">

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option>English</option>
            <option>हिन्दी</option>
            <option>ಕನ್ನಡ</option>
            <option>తెలుగు</option>
            <option>தமிழ்</option>
            <option>मराठी</option>
          </select>

          <button
            className="login-button"
            onClick={() => setShowAuth(true)}
          >
            Login
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <main>

        <section className="hero" id="home">

          <div className="hero-left">

            <div className="location-pill">
              <span className="status-dot"></span>
              Connecting farmers & customers
            </div>

            <h1>
              Fresh from the
              <span> farm.</span>
              <br />
              Straight to you.
            </h1>

            <p className="hero-description">
              Farmeazy connects farmers directly with customers,
              helping farmers earn better while customers get
              fresh produce at fair prices.
            </p>

            <div className="hero-actions">

              <button
                className="buy-button"
                onClick={() => {
                  document
                    .getElementById("marketplace")
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                <span>🛒</span>
                Buy Fresh Crops
              </button>

              <button
                className="sell-button"
                onClick={() => {
                  setShowAddCrop(true);
                }}
              >
                <span>🌾</span>
                Sell Your Crops
              </button>

            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <strong>Direct</strong>
                <span>No unnecessary middlemen</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Fair</strong>
                <span>Better value for farmers</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Fresh</strong>
                <span>From local farms</span>
              </div>

            </div>

          </div>


          {/* ================= HERO VISUAL ================= */}

          <div className="hero-right">

            <div className="main-farm-image">
              <div className="image-overlay"></div>

              <div className="image-label">

                <div className="farmer-avatar">
                  👨‍🌾
                </div>

                <div>
                  <strong>Direct from farmers</strong>
                  <span>Fresh produce near you</span>
                </div>

                <div className="verified">
                  ✓
                </div>

              </div>

            </div>

            <div className="floating-card crop-card">

              <div className="crop-icon">
                🥕
              </div>

              <div>
                <strong>Fresh vegetables</strong>
                <span>Available today</span>
              </div>

            </div>

            <div className="floating-card price-card">

              <div className="price-icon">
                ₹
              </div>

              <div>
                <span>Farmer's price</span>
                <strong>Fair & transparent</strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="quick-section">

          <div className="section-title">
            <span>WHAT DO YOU WANT TO DO?</span>
            <h2>Farmeazy makes it simple.</h2>
          </div>

          <div className="quick-grid">

            <button
              className="quick-card"
              onClick={() => {
                document
                  .getElementById("marketplace")
                  .scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <div className="quick-icon green">
                🛒
              </div>

              <div>
                <h3>Buy crops</h3>
                <p>
                  Find fresh produce directly from farmers.
                </p>
              </div>

              <span className="arrow">→</span>
            </button>


            <button
              className="quick-card"
              onClick={() => setShowAddCrop(true)}
            >
              <div className="quick-icon yellow">
                🌾
              </div>

              <div>
                <h3>Sell crops</h3>
                <p>
                  List your harvest and reach customers directly.
                </p>
              </div>

              <span className="arrow">→</span>
            </button>


            <button
              className="quick-card"
              onClick={() => {
                document
                  .getElementById("assistant")
                  .scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <div className="quick-icon blue">
                🤖
              </div>

              <div>
                <h3>Ask Farmeazy AI</h3>
                <p>
                  Get farming help in your preferred language.
                </p>
              </div>

              <span className="arrow">→</span>
            </button>

          </div>

        </section>


        {/* ================= MARKETPLACE ================= */}

        <section
          className="marketplace-section"
          id="marketplace"
        >

          <div className="marketplace-heading">

            <div>
              <span>FRESH FROM THE FARM</span>
              <h2>Popular crops</h2>
            </div>

            <div className="marketplace-actions">

              <button
                className="add-crop-button"
                onClick={() => setShowAddCrop(true)}
              >
                + Add Crop
              </button>

              <button
                className="view-all"
                onClick={() => {
                  document
                    .getElementById("marketplace")
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                View marketplace →
              </button>

            </div>

          </div>


          {/* ================= DYNAMIC CROP GRID ================= */}

          <div className="crop-grid">

            {crops.map((crop) => (

              <div
                className="product-card"
                key={crop.id}
              >

                <div
                  className={`product-image ${crop.imageClass}`}
                >
                  {crop.emoji}
                </div>


                <div className="product-info">

                  <div className="product-top">

                    <span className="fresh-label">
                      FRESH
                    </span>

                    <span>
                      Today
                    </span>

                  </div>


                  <h3>
                    {crop.name}
                  </h3>


                  <p>
                    Local farmer · {crop.location}
                  </p>


                  <div className="product-bottom">

                    <strong>
                      ₹{crop.price}
                      <small> / kg</small>
                    </strong>

                    <button>
                      +
                    </button>

                  </div>


                  <div className="crop-availability">
                    {crop.quantity} kg available
                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-title centered">

            <span>HOW IT WORKS</span>

            <h2>
              From farm to customer.
            </h2>

            <p>
              A simple way for farmers and customers to connect.
            </p>

          </div>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                👨‍🌾
              </div>

              <h3>
                Farmer lists crops
              </h3>

              <p>
                Farmers create a profile and list what they
                have available to sell.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                🛒
              </div>

              <h3>
                Customer orders
              </h3>

              <p>
                Customers discover crops, compare prices
                and place an order.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                🤝
              </div>

              <h3>
                Direct connection
              </h3>

              <p>
                Farmers and customers connect directly,
                reducing unnecessary middlemen.
              </p>

            </div>

          </div>

        </section>


        {/* ================= AI ASSISTANT ================= */}

        <section
          className="ai-section"
          id="assistant"
        >

          <div className="ai-box">

            <div className="ai-visual">

              <div className="ai-circle">
                🤖
              </div>

              <div className="ai-message message-one">
                How much water does tomato need?
              </div>

              <div className="ai-message message-two">
                Ask me anything about farming.
              </div>

            </div>


            <div className="ai-content">

              <div className="ai-label">

                <span className="ai-status"></span>

                FARMEAZY AI ASSISTANT

              </div>


              <h2>
                Your farming questions,
                <span> answered.</span>
              </h2>


              <p>
                Ask questions about crops, diseases, irrigation,
                cultivation, equipment or market prices.
                Get help in the language you are comfortable with.
              </p>


              <div className="ai-features">

                <span>✓ Crop identification</span>
                <span>✓ Disease assistance</span>
                <span>✓ Farming guidance</span>
                <span>✓ Market information</span>

              </div>


              <button
                className="ai-button"
                onClick={() => {
                  document
                    .getElementById("assistant")
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                Talk to Farmeazy AI →
              </button>

            </div>

          </div>

        </section>


        <Chatbot />
        <CropDoctor />


        {/* ================= FOOTER ================= */}

        <footer>

          <div className="footer-top">

            <div className="footer-brand">

              <div className="brand">

                <div className="brand-mark">
                  F
                </div>

                <div>

                  <div className="brand-name">
                    Farmeazy
                  </div>

                  <div className="brand-tagline">
                    Farm fresh. Fair prices.
                  </div>

                </div>

              </div>


              <p>
                Connecting farmers directly with
                customers for a fairer agricultural marketplace.
              </p>

            </div>


            <div className="footer-links">

              <div>

                <h4>Marketplace</h4>

                <a href="#marketplace">
                  Browse crops
                </a>

                <a href="#marketplace">
                  Popular crops
                </a>

                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddCrop(true);
                  }}
                >
                  Become a farmer
                </a>

              </div>


              <div>

                <h4>Farmeazy</h4>

                <a href="#how-it-works">
                  How it works
                </a>

                <a href="#assistant">
                  AI Assistant
                </a>

                <a href="#home">
                  About us
                </a>

              </div>


              <div>

                <h4>Support</h4>

                <a href="#home">
                  Help center
                </a>

                <a href="#assistant">
                  Ask AI
                </a>

                <a href="#home">
                  Contact
                </a>

              </div>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © 2026 Farmeazy
            </span>

            <span>
              Built for farmers. 🌱
            </span>

          </div>

        </footer>

      </main>

    </div>
  );
}

export default App;