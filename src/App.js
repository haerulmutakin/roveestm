import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthProvider from '_provider/AuthProvider';
import RouteGuard from '_helpers/RouteGuard';
import Core from 'components/core/Core';
import Login from 'components/auth/Login';

function App() {
  return (
    <AuthProvider>
    <Router>
        <RouteGuard path="/" component={Core} />
        <Route exact path="/login" component={Login} />
    </Router>
  </AuthProvider>
  );
}

export default App;
