import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./styles/App.css";

// Create a browser router
const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    id: "not-found",
    path: "*",
    element: <NotFound />,
  },
]);

/**
 * The main App component that renders the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  //passed the ModeToggle component here so it can be seen in the application
  return (
    <div className="App">
      {/* Render toast notifications */}
      <div className="flex justify-end">
        <Toaster />
        <RouterProvider router={router} />
        <ModeToggle />
      </div>

    </div>
  );
}

export default App;