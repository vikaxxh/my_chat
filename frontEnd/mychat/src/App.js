import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Join from './component/Join/join.js';
import Chat from "./component/chat/chat"


function App() {



  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/" element={<Join/>} />
      <Route path='/chat' element={<Chat/>} />
      </Routes>
    </Router> 
    </div>
  );
}

export default App;
