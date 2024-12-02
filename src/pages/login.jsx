import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      sessionStorage.setItem("userID", email);
      navigate("/");
    } else {
      alert("이메일과 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>로그인</h1>
        <input
          style={styles.input}
          type="email"
          placeholder="0000@abcd.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>
          로그인하기
        </button>
        <p
          style={styles.linkText}
          onClick={() => navigate("/signup")}
        >
          *서비스가 처음이라면, 회원가입을 해주세요.
        </p>
        <button
          style={styles.googleButton}
          onClick={() => alert("구글 로그인 기능은 준비 중입니다.")}
        >
          구글로 로그인하기
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #8874FF 0%, #F7C3FF 100%)",
  },
  loginBox: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#FFFFFF",
    padding: "50px",
    borderRadius: "12px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #DDD",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6A5ACD",
    color: "#FFFFFF",
    borderRadius: "6px",
    border: "none",
    marginTop: "10px",
    fontSize: "16px",
  },
  linkText: {
    fontSize: "14px",
    color: "#6A5ACD",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "10px",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FFFFFF",
    color: "#555",
    border: "1px solid #DDD",
    borderRadius: "6px",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default Login;
