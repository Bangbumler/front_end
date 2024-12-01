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
      console.log("회원가입 성공:", { email, password });
      navigate("/login");
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
    background: "linear-gradient(180deg, #8874FF 0%, #F7C3FF 100%)",
  },
  signupBox: {
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
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #DDD",
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
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "5px",
    textAlign: "left",
  },
};

export default Signup;
