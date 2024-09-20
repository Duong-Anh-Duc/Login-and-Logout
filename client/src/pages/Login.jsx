import axios from "axios";
import { useState } from "react";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = (e) => {
    e.preventDefault();
    axios.get("/");
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
