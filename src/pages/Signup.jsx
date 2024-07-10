import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill all the credentials!");
      return;
    }
    dispatch(login({ email, password }));
    navigate("/");
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col gap-2">
        <h2 className="mb-4 text-2xl text-center font-semibold">Signup</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button
          onClick={handleSignup}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <span onClick={handleClick} className="text-blue-600 cursor-pointer">
            Click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
