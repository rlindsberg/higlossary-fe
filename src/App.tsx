import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
