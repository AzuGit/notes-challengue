import { Form, Link } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      seterror("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      seterror("Password must be at least 6 characters long.");
      return;
    }
    seterror("");

    // Proceed with login logic (API call)
  };

  return (
    <div>
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin} method="post">
            <h4 className="text-2xl mb-7">Login</h4>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input-box"
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
