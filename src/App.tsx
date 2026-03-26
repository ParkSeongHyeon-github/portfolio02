import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './main/Main';
import Footer from './components/Footer';
import Login from './member/Login';
import Register from './member/Register';
import LandSearch from './page/LandSearch';
import LandWrite from './page/LandWrite';
import ConsultWrite from './page/ConsultWrite';
import ConsultList from './page/ConsultList';
import ConsultView from './page/ConsultView';
import QuickList from './page/QuickList';
import QuickView from './page/QuickView';
import './css/default.css';
import './css/common.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const mbLevel = localStorage.getItem("mb_level");
    if(mbLevel){
      setUser(mbLevel)
    }
    AOS.init();
  }, [])
  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser}/>
      <main>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        
        <Route path="/land/search" element={<LandSearch user={user}/>}></Route>
        <Route path="/land/write" element={<LandWrite user={user} />}></Route>
        <Route path="/land/write/:land_id" element={<LandWrite user={user} />}></Route>

        <Route path="/consult/write" element={<ConsultWrite />}></Route>
        <Route path="/consult/write/:consult_id" element={<ConsultWrite />}></Route>
        <Route path="/consult/list" element={<ConsultList user={user} />}></Route>
        <Route path="/consult/view/:consult_id" element={<ConsultView />}></Route>

        <Route path="/quick/list" element={<QuickList user={user} />}></Route>
        <Route path="/quick/view/:quick_id" element={<QuickView user={user} />}></Route>
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
