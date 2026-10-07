import { useState } from "react";
import AddCrop from "./AddCrop";

function FarmerDashboard({ onBack, onAddCrop, crops }) {
  const [showAddCrop, setShowAddCrop] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    farmName: "",
    location: "",
    phone: "",
    about: "",
  });

  const [editingProfile, setEditingProfile] = useState(true);

  const handleProfileSave = (event) => {
    event.preventDefault();
    setEditingProfile(false);
  };

  const totalQuantity = crops.reduce(
    (total, crop) => total + Number(crop.quantity || 0),
    0
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
              🌱 FARMER DASHBOARD
            </span>

            <h1>
              Welcome, {profile.name || "Farmer"}!
            </h1>

            <p>
              Manage your farm profile and sell your produce
              directly to customers.
            </p>
          </div>

          <button
            className="dashboard-primary-button"
            onClick={() => setShowAddCrop(true)}
          >
            + Add New Produce
          </button>
        </section>


        {/* STATS */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">🌾</div>

            <div>
              <strong>{crops.length}</strong>
              <span>Active listings</span>
            </div>
          </div>


          <div className="dashboard-stat-card">
            <div className="stat-icon">📦</div>

            <div>
              <strong>{totalQuantity}</strong>
              <span>Total kg available</span>
            </div>
          </div>


          <div className="dashboard-stat-card">
            <div className="stat-icon">🛒</div>

            <div>
              <strong>0</strong>
              <span>Orders</span>
            </div>
          </div>


          <div className="dashboard-stat-card">
            <div className="stat-icon">₹</div>

            <div>
              <strong>₹0</strong>
              <span>Total earnings</span>
            </div>
          </div>

        </section>


        {/* PROFILE */}
        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="section-label">
                YOUR FARM
              </span>

              <h2>Farmer Profile</h2>

              <p>
                Tell customers a little about yourself and your farm.
              </p>
            </div>

            {!editingProfile && (
              <button
                className="dashboard-outline-button"
                onClick={() => setEditingProfile(true)}
              >
                Edit Profile
              </button>
            )}

          </div>


          {editingProfile ? (

            <form
              className="farmer-profile-form"
              onSubmit={handleProfileSave}
            >

              <div className="profile-form-grid">

                <div>
                  <label>Your name</label>

                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div>
                  <label>Farm name</label>

                  <input
                    type="text"
                    placeholder="e.g. Green Valley Farm"
                    value={profile.farmName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        farmName: e.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div>
                  <label>Location</label>

                  <input
                    type="text"
                    placeholder="e.g. Mysore, Karnataka"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        location: e.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div>
                  <label>Phone number</label>

                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

              </div>


              <div>
                <label>About your farm</label>

                <textarea
                  rows="4"
                  placeholder="Tell customers about your farm, farming methods, or what makes your produce special..."
                  value={profile.about}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      about: e.target.value,
                    })
                  }
                />
              </div>


              <button
                className="dashboard-primary-button"
                type="submit"
              >
                Save Farm Profile
              </button>

            </form>

          ) : (

            <div className="farmer-profile-display">

              <div className="farmer-avatar">
                {profile.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "F"}
              </div>

              <div className="farmer-profile-info">

                <h3>{profile.name}</h3>

                <p>
                  🌾 {profile.farmName}
                </p>

                <p>
                  📍 {profile.location}
                </p>

                {profile.phone && (
                  <p>
                    📞 {profile.phone}
                  </p>
                )}

                {profile.about && (
                  <p className="farmer-about">
                    {profile.about}
                  </p>
                )}

              </div>

            </div>

          )}

        </section>


        {/* PRODUCE */}
        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="section-label">
                YOUR PRODUCTS
              </span>

              <h2>My Produce</h2>

              <p>
                Products you have listed on Farmeazy.
              </p>
            </div>

            <button
              className="dashboard-outline-button"
              onClick={() => setShowAddCrop(true)}
            >
              + Add Produce
            </button>

          </div>


          {crops.length === 0 ? (

            <div className="dashboard-empty-state">

              <div className="empty-icon">
                🌱
              </div>

              <h3>No produce listed yet</h3>

              <p>
                Add your first crop and start selling directly
                to customers.
              </p>

              <button
                className="dashboard-primary-button"
                onClick={() => setShowAddCrop(true)}
              >
                + List Your First Crop
              </button>

            </div>

          ) : (

            <div className="farmer-products-grid">

              {crops.map((crop) => (

                <div
                  className="farmer-product-card"
                  key={crop.id}
                >

                  <div className="farmer-product-visual">
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

                  <div className="farmer-product-content">

                    <span className="product-category">
                      {crop.category}
                    </span>

                    <h3>{crop.name}</h3>

                    <p>
                      📍 {crop.location}
                    </p>

                    <div className="farmer-product-bottom">

                      <strong>
                        ₹{crop.price}
                        <small>/kg</small>
                      </strong>

                      <span>
                        {crop.quantity} kg available
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ADD CROP MODAL */}
      {showAddCrop && (
        <AddCrop
          onClose={() => setShowAddCrop(false)}
          onAddCrop={onAddCrop}
        />
      )}

    </div>
  );
}

export default FarmerDashboard;