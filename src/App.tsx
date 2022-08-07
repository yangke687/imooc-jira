import { AuthApp } from "auth-app";
import { useAuth } from "context/auth-context";
import { UnAuthApp } from "unauth-app";
import "./App.css";
// import { ProjectListScreen as ProjectList } from "./screens/project-list";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthApp /> : <UnAuthApp />}</div>;
}

export default App;
