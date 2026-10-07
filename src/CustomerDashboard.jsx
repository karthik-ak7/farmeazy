function CustomerDashboard({ onBack, crops, onBrowseMarketplace }) {

  const availableCrops = crops.filter(
    (crop) => Number(crop.quantity) > 0
  );

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <header className="dashboard-header">

        <div className="dashboard-brand">

          <div className="brand-mark">F</div>

          <div>
            <div className="brand-name">Farmeazy</div>

            <div className="brand-tagline">
              Farm fresh. Fair prices.
            </div>
          </div>

        </div>


        <button
          className="dashboard-back-button"
          onClick={onBack}
        >
          ← Back to Farmeazy
        </button>

      </header>


      {/* MAIN */}
      <main className="dashboard-container">

        {/* WELCOME */}
        <section className="dashboard-welcome">

          <div>

            <span className="dashboard-badge">
              🛒 CUSTOMER DASHBOARD
            </span>

            <h1>
              Welcome to Farmeazy!
            </h1>

            <p>
              Buy fresh produce directly from farmers
              at fair prices.
            </p>

          </div>


          <button
            className="dashboard-primary-button"
            onClick={onBrowseMarketplace}
          >
            Browse Marketplace →
          </button>

        </section>


        {/* STATS */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              🥬
            </div>

            <div>
              <strong>{availableCrops.length}</strong>
              <span>Available products</span>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              🌱
            </div>

            <div>
              <strong>0</strong>
              <span>Orders placed</span>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ❤️
            </div>

            <div>
              <strong>0</strong>
              <span>Saved farms</span>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              🛒
            </div>

            <div>
              <strong>0</strong>
              <span>Cart items</span>
            </div>

          </div>

        </section>


        {/* AVAILABLE PRODUCE */}
        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>

              <span className="section-label">
                FRESH FROM FARMERS
              </span>

              <h2>Available Produce</h2>

              <p>
                Fresh products currently listed by farmers.
              </p>

            </div>


            <button
              className="dashboard-outline-button"
              onClick={onBrowseMarketplace}
            >
              View All
            </button>

          </div>


          {availableCrops.length === 0 ? (

            <div className="dashboard-empty-state">

              <div className="empty-icon">
                🥕
              </div>

              <h3>No produce available yet</h3>

              <p>
                Farmers will start adding fresh produce soon.
              </p>

            </div>

          ) : (

            <div className="customer-products-grid">

              {availableCrops.slice(0, 6).map((crop) => (

                <div
                  className="customer-product-card"
                  key={crop.id}
                >

                  <div className="customer-product-visual">

                    {crop.category === "Fruits"
                      ? "🍎"
                      : crop.category === "Grains"
                      ? "🌾"
                      : crop.category === "Pulses"
                      ? "🫘"
                      : crop.category === "Spices"
                      ? "🌶️"
                      : "🥬"}

                  </div>


                  <div className="customer-product-content">

                    <span className="product-category">
                      {crop.category}
                    </span>

                    <h3>
                      {crop.name}
                    </h3>

                    <p>
                      📍 {crop.location}
                    </p>


                    <div className="customer-product-footer">

                      <div>

                        <strong>
                          ₹{crop.price}
                        </strong>

                        <span>
                          /kg
                        </span>

                      </div>


                      <button
                        className="small-buy-button"
                        onClick={onBrowseMarketplace}
                      >
                        View
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* HOW IT WORKS */}
        <section className="dashboard-section customer-how-section">

          <div className="dashboard-section-header">

            <div>

              <span className="section-label">
                SIMPLE & DIRECT
              </span>

              <h2>
                Buy directly from farmers
              </h2>

              <p>
                Farmeazy removes unnecessary middlemen so
                farmers earn more and customers get fair prices.
              </p>

            </div>

          </div>


          <div className="customer-steps">

            <div className="customer-step">

              <div>🌾</div>

              <h3>
                Farmers list produce
              </h3>

              <p>
                Farmers add their fresh harvest directly
                to Farmeazy.
              </p>

            </div>


            <div className="customer-step">

              <div>🔎</div>

              <h3>
                You find what you need
              </h3>

              <p>
                Browse products, prices and farm locations.
              </p>

            </div>


            <div className="customer-step">

              <div>🤝</div>

              <h3>
                Buy directly
              </h3>

              <p>
                Connect directly with farmers for fresh produce.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CustomerDashboard;