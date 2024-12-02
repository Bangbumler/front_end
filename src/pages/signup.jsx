import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", agreement: "" });

  // 유효성 검사 함수
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.includes("@")) {
          error = "올바른 이메일 주소를 입력해주세요.";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "비밀번호는 8자리 이상이어야 합니다.";
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "agreement":
        if (!value) {
          error = "약관에 동의해야 회원가입이 가능합니다.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // 회원가입 버튼 클릭 시 최종 유효성 검사
  const validateForm = () => {
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);
    validateField("agreement", isAgreed);

    return Object.values(errors).every((error) => error === "");
  };

  // 회원가입 처리
  const handleSignup = () => {
    if (validateForm()) {
      // 로컬 스토리지에서 기존 사용자 목록 가져오기
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        alert("이미 존재하는 이메일입니다.");
      } else {
        // 새 사용자 추가
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h1 style={styles.title}>회원가입</h1>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField("confirmPassword", e.target.value);
            }}
          />
          {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
        </div>
        <div style={styles.agreementGroup}>
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={(e) => {
              setIsAgreed(e.target.checked);
              validateField("agreement", e.target.checked);
            }}
          />
          <label htmlFor="agree" style={styles.agreementText}>
            이용약관 및 개인정보 처리방침에 동의합니다.
          </label>
        </div>
        {errors.agreement && <p style={styles.error}>{errors.agreement}</p>}
        <button style={styles.button} onClick={handleSignup}>
          회원가입
        </button>
        <p style={styles.linkText} onClick={() => navigate("/login")}>
          이미 계정이 있으신가요? 로그인하기
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
  signupBox: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#FFFFFF",
    padding: "50px",
    borderRadius: "30px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    fontFamily: "MapleL",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    fontFamily: "'Maple', sans-serif",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "95%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #DDD",
    fontFamily: "MapleL",
    fontSize: "17px",
  },
  agreementGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  agreementText: {
    fontSize: "14px",
    marginLeft: "10px",
    fontFamily: "'MapleL', sans-serif",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f6d4ff",
    color: "#FFFFFF",
    borderRadius: "6px",
    border: "none",
    marginTop: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    fontFamily: "Maple",
  },
  linkText: {
    fontSize: "14px",
    color: "#6A5ACD",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "10px",
    fontFamily: "'MapleL', sans-serif",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "5px",
    textAlign: "left",
    fontFamily: "'MapleL', sans-serif",
  },
};

export default Signup;
