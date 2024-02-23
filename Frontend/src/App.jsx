
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Home from './Home';
import POST from './Post';

function App() {




 

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/:id' element={<POST/>} />
     </Routes>
    </BrowserRouter>
      
  );
}

export default App;
