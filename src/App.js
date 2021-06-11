import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./view/login"
import Dashboard from "./view/dashboard"


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/dashboard">
            <DashboardView />
          </Route>
          <Route path="/">
            <LoginView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function LoginView() {
  return (
    <div className="App">
      <Login/>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="App">
      <Dashboard/>
    </div>
  )
}