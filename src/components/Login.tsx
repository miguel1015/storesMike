import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import "./register/Register";

interface User {
  email: string;
  password: string;
}

export default function Login({ onRegisterSubmit }: any) {
  const [user, setUser] = useState<User[]>([]);
  const [wrongEmail, setWrongEmail] = useState<boolean>(false);

  // console.log(dataLog);

  const navigate = useNavigate();
  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser([
      ...user,
      {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      },
    ]);

    let dataLog = localStorage.getItem("users");
    if (dataLog) {
      const buscarUser = JSON.parse(dataLog);
      for (let i = 0; i < buscarUser.length; i++) {
        const user = buscarUser[i];
        if (
          user.email === e.currentTarget.email.value &&
          user.password === e.currentTarget.password.value
        ) {
          const name = user.firstName;
          console.log("Logged in successfully");
          navigate(`/store/${name}`);
        }
      }
      setWrongEmail(true);
      setTimeout(() => {
        setWrongEmail(false);
      }, 5000);
    } else {
      alert("No users registered yet");
    }
  };

  console.log("username", user);

  return (
    <div>
      <div className="container">
        <div className="left">
          <div className="header">
            <h2 className="animation a1">Welcome Store's Mike</h2>
            <h4 className="animation a2">
              Log in to your account using email and password
            </h4>
          </div>
          <form className="form" onSubmit={hanldeSubmit}>
            <input
              name="email"
              type="email"
              className="form-field animation a3"
              placeholder="Email Address"
            />
            <input
              name="password"
              type="password"
              className="form-field animation a4"
              placeholder="Password"
            />
            <p className="animation a5">
              <a href="/register">Create your acount</a>
            </p>
            <button className="animation a6">LOGIN</button>
          </form>
        </div>
        <div className="right"></div>
      </div>

      <div>
        {wrongEmail ? (
          <div className="overlay" >
              <h1>Wrong email or password</h1>
         
          </div>
        ) : null}
      </div>
    </div>
  );
}
