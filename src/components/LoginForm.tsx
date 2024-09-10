import { useState } from "react";
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login } = useStore(
    useShallow((state) => ({
      login: state.login,
    }))
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="w-full p-2 mt-4 border rounded"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="mt-4 bg-blue-500 text-white p-2 rounded" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
