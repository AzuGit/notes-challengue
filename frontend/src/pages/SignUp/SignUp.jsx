import NavBar from "../../components/Navbar/NavBar";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const handleSingUp = async (e) => {
    e.preventDefault();
    // Basic validation
    if (name.trim() === "") {
      seterror("Name is required.");
      return;
    }
    if (!validateEmail(email)) {
      seterror("Invalid email address.");
      return;
    }
    if (!validatePassword(password)) {
      seterror("Password must be at least 6 characters long.");
      return;
    }
    seterror("");

    // Proceed with signup logic (API call)
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSingUp} method="post">
            <h4 className="text-2xl mb-7">SignUp</h4>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input-box"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <input
              className="input-box"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <div>
              <PasswordInput
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
