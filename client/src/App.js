import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm, UserProfile } from './components';
import { fetchUser } from './util/fetchUser';


const App = () => {


  const ProtectedRoute = ({ children }) => {
    
    const user = fetchUser() || false;

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };



  return (
    <BrowserRouter>
      <Routes>

        <Route path='/'>
          <Route index element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
          <Route path='login' element={<LoginForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;