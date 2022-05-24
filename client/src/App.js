import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { 
    loginWithPopup, 
    loginWithRedirect,
    logout, 
    user, 
    isAuthenticated 
  } =useAuth0();

  return <div className="App">
    <h1>Auth0 authentication</h1>
    <ul>
      <li><button onClick={loginWithPopup}>Login with Popup</button></li>
      <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
      <li><button onClick={logout}>Logout</button></li>

    </ul>
    <h5>User id {isAuthenticated ? "Logged in" : "Not logged in"}</h5>
    {isAuthenticated && (
  <pre style={{textAlign: 'start'}}>{JSON.stringify(user,null,2)}</pre>
 )} </div>;
}

export default App;
