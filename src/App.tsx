import { AuthApp } from "auth-app";
import { useAuth } from "context/auth-context";
import { UnAuthApp } from "unauth-app";
import "./App.css";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageFallback } from "./components/lib";

// import { ProjectListScreen as ProjectList } from "./screens/project-list";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageFallback}>
        {user ? <AuthApp /> : <UnAuthApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
