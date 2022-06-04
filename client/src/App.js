import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm, UserProfile, UpdateProfile } from './components';
import { ToastContainer } from 'react-toastify';
import { fetchUser } from './util/fetchUser';
import 'react-toastify/dist/ReactToastify.css';



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
          <Route path='updateProfile' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
          <Route path='login' element={<LoginForm />} />
        </Route>

      </Routes>

      <ToastContainer theme="dark" style={{ fontSize: "18px" }}/>
    </BrowserRouter>
  )
}

export default App;