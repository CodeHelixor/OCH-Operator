import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent from "../components/Homepage/NumberTab/Numberleftpane/ButtonComponent";
import Logininputfield from "../components/Login/Logininputfield";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const { setIsAuthenticated, setUserId, setUsername: setAuthUsername } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const handleLogin = async () => {
    setNameError("");
    setPwdError("");
    if (username === "") {
      setNameError("Please type your username!");
      return;
    }
    if (password == "") {
      setPwdError("Please type your password!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("====================here======================");
      console.log(data);
      if (data === true) {
        setAuthUsername(username);
        if (!localStorage.getItem("userId")) {
          const generatedId = uuidv4();
          setUserId(generatedId);
        }
        setIsAuthenticated(true);
        navigate("/home");
        return;
      } else {
        setNameError("  ");
        setPwdError("Please confirm your credentials!");
        return;
      }
    } catch (error) {
      // console.error("Error: ", error);
    }
  };

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submit if inside a form
      handleLogin(); // call your login function
    }
  };
  return (
    <div className="flex items-center justify-start pl-32 mt-40 animate-fade-in">
      <div className="px-6 py-10 bg-surface-card w-[70%] rounded-2xl shadow-modal border border-slate-200/60 md:w-[60%] lg:w-[50%] xl:w-[35%] animate-modal-content-in">
        <Logininputfield
          label="Username"
          value={username}
          error={nameError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          onKeyDown={handleEnterPressed}
        />
        <Logininputfield
          label="Password"
          type="password"
          value={password}
          error={pwdError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onKeyDown={handleEnterPressed}
        />
        <div className="px-8 pt-4">
          <ButtonComponent label={"Log in"} onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
