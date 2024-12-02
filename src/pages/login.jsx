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
          placeholder="E-mail"
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
    background: "linear-gradient(to Bottom, #afafff 0%, #c7c7fa 100%)",
    border: "4px solid #efddff",
  },
  loginBox: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#FFFFFF",
    padding: "50px",
    borderRadius: "12px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
    height:"30%",
    maxWidth: "700px",
    backgroundColor: "#FFFFFF",
    padding: "50px",
    borderRadius: "30px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "9px solid #efddff",
    fontFamily: "MapleL," 
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    fontFamily: "Maple", // Bold 폰트 적용
  },
  input: {
    width: "95%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "2px solid #DDD",
    fontFamily: "MapleL",
    fontSize: "17px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f6d4ff",
    color: "#FFFFFF",
    borderRadius: "15px",
    border: "none",
    marginTop: "10px",
    marginBottom:"20px",
    fontSize: "18px",
    fontFamily: "Maple",
    border: "2px solid #efddff",
  },
  linkText: {
    fontSize: "14px",
    color: "#6A5ACD",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "10px",
    fontFamily: "MapleL",
  },
};

// 전역 폰트 설정
const fontStyle = document.createElement("style");
fontStyle.innerHTML = `
  @font-face {
    font-family: 'Maple';
    src: url('../../fonts/Maplestory Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'MapleL';
    src: url('../../fonts/Maplestory Light.ttf') format('truetype');
  }
`;
document.head.appendChild(fontStyle);

export default Login;
