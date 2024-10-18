// src/App.jsx

import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/NavFooter.jsx';

import Home from "./pages/Home";

import "./styles/App.css";

// Create a browser router
const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    element: <Home />,
  },
  {
    id:"footer",
    path:"/",
    element:<Footer />
  },
]);

/**
 * The main App component that renders the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className="App">
      {/* Render toast notifications */}
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
