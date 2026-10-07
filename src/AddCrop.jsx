import { useState } from "react";

function AddCrop({ onClose, onAddCrop }) {
  const [cropName, setCropName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCrop = {
      id: Date.now(),
      name: cropName,
      category,
      price: Number(price),
      quantity: Number(quantity),
      location,
      description,
    };

    onAddCrop(newCrop);
    onClose();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card add-crop-card">

        <button className="auth-close" onClick={onClose}>
          ×
        </button>

        <div className="auth-logo">
          <div className="brand-mark">F</div>

          <div>
            <div className="brand-name">Farmeazy</div>
            <div className="brand-tagline">
              Farm fresh. Fair prices.
            </div>
          </div>
        </div>

        <h2>List your crop</h2>

        <p className="auth-subtitle">
          Add your harvest and connect directly with customers.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Crop name</label>

          <input
            type="text"
            placeholder="e.g. Tomatoes"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Grains</option>
            <option>Pulses</option>
            <option>Spices</option>
            <option>Other</option>
          </select>

          <div className="crop-form-row">

            <div>
              <label>Price per kg</label>

              <input
                type="number"
                placeholder="₹ 50"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Available quantity (kg)</label>

              <input
                type="number"
                placeholder="100"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

          </div>

          <label>Location</label>

          <input
            type="text"
            placeholder="e.g. Mysore, Karnataka"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Description</label>

          <textarea
            placeholder="Tell customers something about your crop..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />

          <button className="auth-submit" type="submit">
            Publish Crop
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddCrop;