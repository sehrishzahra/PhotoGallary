import React from 'react';
import './index.css';
import './App.css'
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home /> ,
  },
  {
    path: "/Collections",
    element: <Collection/> ,
  },
  
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
