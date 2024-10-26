import HomePage from "./pages/HomePage";
import AuthPage from './pages/AuthPage';
import {Routes, Route} from "react-router-dom"
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className=" bg-gradient-to-r from-gray-800 via-gray-900 to-black  ">
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  );
}

export default App;
