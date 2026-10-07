import { useState } from "react";

function CropDoctor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10 MB.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setAnalysis("");
    setError("");
  };

  const analyzeCrop = async () => {
    if (!selectedImage || loading) return;

    setLoading(true);
    setAnalysis("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("image", selectedImage);

      const response = await fetch(
        "http://localhost:3001/api/analyze-crop",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Crop analysis failed."
        );
      }

      setAnalysis(data.analysis);

    } catch (err) {
      console.error("Crop Doctor error:", err);

      setError(
        err.message ||
          "Unable to analyze the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview("");
    setAnalysis("");
    setError("");
  };

  return (
    <section className="crop-doctor-section" id="crop-doctor">

      <div className="crop-doctor-header">

        <div>

          <span className="ai-badge">
            ✦ AI CROP DOCTOR
          </span>

          <h2>
            Is something wrong with your crop?
          </h2>

          <p>
            Upload a photo and let Farmeazy AI help
            identify possible crop diseases, pests,
            or plant health problems.
          </p>

        </div>

      </div>

      <div className="crop-doctor-card">

        {!selectedImage ? (

          <label className="crop-upload-area">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="crop-upload-icon">
              📷
            </div>

            <h3>
              Upload a crop photo
            </h3>

            <p>
              Click here to select an image from your device
            </p>

            <span>
              JPG, PNG or WEBP • Max 10 MB
            </span>

          </label>

        ) : (

          <div className="crop-analysis-layout">

            <div className="crop-image-panel">

              <img
                src={preview}
                alt="Selected crop"
                className="crop-preview"
              />

              <button
                className="crop-remove-button"
                onClick={removeImage}
                disabled={loading}
              >
                Remove image
              </button>

            </div>

            <div className="crop-result-panel">

              {!analysis && !loading && (

                <div className="crop-ready">

                  <div className="crop-ready-icon">
                    🌿
                  </div>

                  <h3>
                    Image ready
                  </h3>

                  <p>
                    Farmeazy AI can now analyze your crop.
                  </p>

                  <button
                    className="dashboard-primary-button"
                    onClick={analyzeCrop}
                  >
                    ✦ Analyze Crop
                  </button>

                </div>

              )}

              {loading && (

                <div className="crop-loading">

                  <div className="crop-loading-icon">
                    🔬
                  </div>

                  <h3>
                    Farmeazy AI is analyzing...
                  </h3>

                  <p>
                    Checking the crop for visible
                    diseases, pests and health problems.
                  </p>

                  <div className="crop-loading-bar">
                    <div />
                  </div>

                </div>

              )}

              {analysis && !loading && (

                <div className="crop-analysis-result">

                  <div className="analysis-result-header">
                    <span>
                      ✦ FARMEAZY AI REPORT
                    </span>
                    <h3>
                      Crop Analysis
                    </h3>
                  </div>

                  <div className="analysis-result-content">
                    {analysis}
                  </div>

                  <div className="analysis-disclaimer">
                    ⚠️ AI analysis is an initial assessment
                    based on the uploaded image. For serious
                    crop problems or chemical treatment,
                    verify the diagnosis with a qualified
                    agricultural expert.
                  </div>

                  <button
                    className="dashboard-outline-button"
                    onClick={removeImage}
                  >
                    Analyze Another Image
                  </button>

                </div>

              )}

            </div>

          </div>

        )}

        {error && (

          <div className="crop-doctor-error">
            ⚠️ {error}
          </div>

        )}

      </div>

    </section>
  );
}

export default CropDoctor;