import { useState, useEffect } from "react";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Lock scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, []);

  function handleAuth() {
  // Email regex: must have "@gmail.com" or ".in"
  const emailValid = /@gmail\.com$|\.in$/.test(email);

  // Password: at least one letter & one special character
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  if (isSignup && !username) {
    alert("Please enter a username");
    return;
  }
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }
  if (!emailValid) {
    alert("Email must contain @gmail.com or end with .in");
    return;
  }
  if (!hasLetter || !hasSpecialChar) {
    alert("Password must have at least one letter and one special character");
    return;
  }
   if (isSignup) {
    // Sign up successful, switch to login mode
    alert("Sign up successful! You can now log in.");
    setIsSignup(false);
    setUsername("");
    // Optionally, keep email and password for convenience, or clear as per UX preference
  } else {
    // Login successful
    onLoginSuccess({ name: username || "John Doe", email });
    onClose();
  }
}


  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white flex flex-col rounded-lg max-w-md w-full relative overflow-hidden
      border-4 border-cyan-400 shadow-[0_0_24px_6px_rgba(34,211,238,0.7)] ">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl mb-4 text-center font-serif">{isSignup ? "Sign Up" : "Login"}</h2>
          {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-cyan-600 text-white py-2 rounded mb-2 font-serif"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <p className="text-center font-serif">
            {isSignup ? "Already have an account?" : "New user?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-cyan-600 underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-gray-600 hover:text-red-700 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
