import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounde mb-3">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 outline-none focus:border-blue-400"
      ></input>
      {showPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-blue-500"
          onClick={() => toggleShowPassword()}
        ></FaRegEye>
      ) : (
        <FaRegEyeSlash
          size={22}
          className="cursor-pointer text-blue-500"
          onClick={() => toggleShowPassword()}
        ></FaRegEyeSlash>
      )}
    </div>
  );
}

export default PasswordInput;
