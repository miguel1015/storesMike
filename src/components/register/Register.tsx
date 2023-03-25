import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

interface Regist {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [registro, setRegistro] = useState<Regist[]>([]);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistro([
      ...registro,
      {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        confirmPassword: e.currentTarget.confirmPassword.value,
      },
    ]);
    alert("usuario registrado")
  };

  console.log(registro);

  useEffect(() => {
    let dataLog = localStorage.getItem("users");
    if (dataLog) {
      setRegistro(JSON.parse(dataLog));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(registro));
  }, [registro]);

  const navigate = useNavigate();
  const botonGoLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="contieneTodoRegister">
        <div className="containerRegister">
          <header>
            <h1>
              <img
                src="http://tfgms.com/sandbox/dailyui/logo-1.png"
                alt="Authentic Collection"
              />
            </h1>
          </header>
          <h1 className="text-center">Register</h1>
          <form className="registration-form" onSubmit={handleForm}>
            <label className="col-one-half">
              <span className="label-text">First Name</span>
              <input
                required
                type="text"
                name="firstName"
                placeholder="write your name"
              />
            </label>
            <label className="col-one-half">
              <span className="label-text">Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="write your last name"
              />
            </label>
            <label>
              <span className="label-text">Email</span>
              <input
                required
                type="text"
                name="email"
                placeholder="write your email"
              />
            </label>
            <label className="password">
              <span className="label-text">Password</span>

              <input
                required
                type="password"
                name="password"
                placeholder="wirite your password"
              />
            </label>
            <label className="password">
              <span className="label-text">Confirm password</span>

              <input
                required
                type="password"
                name="confirmPassword"
                placeholder="wirite again password"
              />
            </label>
            <label className="checkbox">
              <input type="checkbox" name="newsletter" />
              <span>Sign me up for the weekly newsletter.</span>
            </label>
            <div className="text-center">
              <button className="submit" name="register">
                Create account
              </button>
            </div>
            <button className="botonLogin" onClick={botonGoLogin}>Back to login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
