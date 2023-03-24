import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from "./components";

function App() {
  return (
    <div className="container">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Index />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
