import { useState } from "react";
import { supabase } from "./supabaseClient";

function Auth({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // =========================================================
      // LOGIN
      // =========================================================

      if (isLogin) {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }

        // -------------------------------------------------------
        // Get role directly from Supabase authentication metadata
        // -------------------------------------------------------

        const user = data.user;

        const userRole =
          user.user_metadata?.role || "customer";

        const userProfile = {
          id: user.id,
          full_name:
            user.user_metadata?.full_name || "Farmeazy User",
          role: userRole,
          language:
            user.user_metadata?.language || "English",
        };

        console.log("Login successful");
        console.log("User role:", userRole);

        // -------------------------------------------------------
        // Tell App.jsx which dashboard to open
        // -------------------------------------------------------

        if (onLoginSuccess) {
          onLoginSuccess(userRole, userProfile);
        }

        setLoading(false);
        return;
      }


      // =========================================================
      // SIGN UP
      // =========================================================

      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,

          options: {
            data: {
              full_name: fullName,
              role: role,
              language: "English",
            },
          },
        });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      // -------------------------------------------------------
      // Account created
      // -------------------------------------------------------

      console.log("Account created");
      console.log("Selected role:", role);

      setMessage(
        "Account created successfully! Please check your email to confirm your account."
      );

    } catch (error) {
      console.error("Authentication error:", error);

      setMessage(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };


  return (
    <div className="auth-overlay">

      <div className="auth-card">

        {/* CLOSE BUTTON */}

        <button
          className="auth-close"
          onClick={onClose}
        >
          ×
        </button>


        {/* LOGO */}

        <div className="auth-logo">

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


        {/* TITLE */}

        <h2>
          {isLogin
            ? "Welcome back"
            : "Create your account"}
        </h2>


        <p className="auth-subtitle">

          {isLogin
            ? "Login to continue to Farmeazy."
            : "Join farmers and customers on Farmeazy."}

        </p>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* SIGNUP ONLY */}

          {!isLogin && (
            <>

              <label>
                Full name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                required
              />


              <label>
                I want to
              </label>


              <div className="role-selection">

                {/* CUSTOMER */}

                <button
                  type="button"
                  className={
                    role === "customer"
                      ? "role-option active"
                      : "role-option"
                  }
                  onClick={() =>
                    setRole("customer")
                  }
                >
                  🛒
                  <span>
                    Buy crops
                  </span>
                </button>


                {/* FARMER */}

                <button
                  type="button"
                  className={
                    role === "farmer"
                      ? "role-option active"
                      : "role-option"
                  }
                  onClick={() =>
                    setRole("farmer")
                  }
                >
                  🌾
                  <span>
                    Sell crops
                  </span>
                </button>

              </div>

            </>
          )}


          {/* EMAIL */}

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          {/* PASSWORD */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength="6"
            required
          />


          {/* SUBMIT */}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create account"}
          </button>

        </form>


        {/* MESSAGE */}

        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}


        {/* SWITCH LOGIN / SIGNUP */}

        <div className="auth-switch">

          {isLogin ? (
            <>
              Don't have an account?{" "}

              <button
                onClick={() =>
                  setIsLogin(false)
                }
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}

              <button
                onClick={() =>
                  setIsLogin(true)
                }
              >
                Login
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Auth;