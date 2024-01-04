
import './App.css';
import socketIo from 'socket.io-client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Join from './component/Join/Join';
import Chat from './component/chat/Chat';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/'  element={<Join></Join>} ></Route>
          <Route  path='/chat' element={<Chat></Chat>} ></Route>
          
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
