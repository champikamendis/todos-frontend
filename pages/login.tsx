import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login, userRecognition } from "../services/user.service";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const data: any = await userRecognition();
      if (data) {
        alert("User successfully logged from token");
        router.push("/");
      }
    } catch (error) {
      //   router.push('/login');
    }
  };

  const loginFunction = async (e: any) => {
    e.preventDefault();
    try {
      if (username.length > 0 && password.length > 0) {
        const data = await login(username, password);
        if (data) {
          alert("User successfully logged into system");
          router.push("/");
        }
      }
    } catch (error) {
      alert("User login failed, Please try again");
    }
  };
  return (
    <div>
      <div className="bg-gray-300 py-6 flex flex-row center">
        <h3 className="text font-bold ml-8 mt-1">TODOs APPLICATION</h3>
      </div>
      <main className={styles.main}>
        <div className="w-96 p-8 border-gray-200 border-2 rounded-md">
          <form
            onSubmit={(e) => loginFunction(e)}
            className="mb-8 flex flex-col"
          >
            <h1 className="text font-bold mb-3">LOGIN HERE!</h1>
            <label>Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <button type="submit" className="bg-blue-500 mb-2 rounded-md p-2">
              Login
            </button>
            <label>Don't you have an account yet?</label>
            <button
              type="submit"
              onClick={() => {
              router.push("register");
              }}
              className="bg-blue-300 mt-2 rounded-md p-2"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
