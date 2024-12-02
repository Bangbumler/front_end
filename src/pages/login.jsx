import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 로컬 스토리지에서 사용자 데이터 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // 로그인 성공
      sessionStorage.setItem("userID", email);
      alert("로그인 성공!");
      navigate("/");
    } else {
      // 로그인 실패
      setError("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>로그인</h1>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button
          style={styles.button}
          onClick={handleLogin}
        >
          로그인하기
        </button>
        <p
          style={styles.linkText}
          onClick={() => navigate("/signup")}
        >
          아직 계정이 없으신가요? 회원가입하기
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
    fontFamily: "'MapleL', sans-serif",
  },
  loginBox: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#FFFFFF",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "4px solid #efddff",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    fontFamily: "'Maple', sans-serif",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "95%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #DDD",
    fontFamily: "'MapleL', sans-serif",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f6d4ff",
    color: "#FFFFFF",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px",
    fontSize: "16px",
    fontFamily: "'Maple', sans-serif",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  linkText: {
    fontSize: "14px",
    color: "#6A5ACD",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "15px",
    fontFamily: "'MapleL', sans-serif",
  },
  error: {
    fontSize: "14px",
    color: "red",
    marginBottom: "15px",
    fontFamily: "'MapleL', sans-serif",
  },
};

// 전역 폰트 설정
const fontStyle = document.createElement("style");
fontStyle.innerHTML = `
  @font-face {
    font-family: 'Maple';
    src: url('/fonts/Maplestory Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'MapleL';
    src: url('/fonts/Maplestory Light.ttf') format('truetype');
  }
`;
document.head.appendChild(fontStyle);

export default Login;
