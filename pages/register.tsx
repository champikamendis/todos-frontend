import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { register, userRecognition } from "../services/user.service";
import styles from "../styles/Home.module.css";

const Register: NextPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
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
      // toast.error("Something went wrong. Please Try again", {
      //   closeOnClick: true,
      // });
    }
  };

  const RegisterFunction = async (e: any) => {
    e.preventDefault();
    try {
      if (username.length > 0 && password.length > 0) {
        const data = await register(username, password);
        if (data) {
          alert("User successfully registered");
          router.push("/");
        }
      }
    } catch (error) {
      alert("Something went wrong. Please Try again");
    }
  };
  return (
    <div>
      <div className="bg-gray-300 py-6 flex flex-row justify-between">
        <h3 className="text font-bold ml-8 mt-2">TODOs APPLICATION</h3>
      </div>
      <main className={styles.main}>
        <div className="w-96 p-8 border-gray-200 border-2 rounded-md">
          <form
            onSubmit={(e) => RegisterFunction(e)}
            className="mb-8 flex flex-col"
          >
            <h2 className="text font-bold mb-3">REGISTER HERE!</h2>
            <label>Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <button type="submit" className="bg-blue-300 rounded-md mb-2 p-2">
              Register
            </button>
            <label>Do you already have an account?</label>
            <button
              onClick={() => {
              router.push("login");
              }}
              className="bg-blue-500 rounded-md mt-2 p-2"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
