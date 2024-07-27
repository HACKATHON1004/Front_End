import './App.css';
import Calendar from './component/Calendar/Calendar.jsx';
import Plan from './component/Calendar/Plan.jsx';
// import Home from './component/Home/Home.jsx'
import Login from './component/Login.jsx';
import Mempage from './component/Mempage.jsx';
import Myobject from './component/Myobject.jsx'
import Post from './component/Post/Post.jsx'
import PostWrite from './component/Post/PostWrite.jsx'
import PostContent from './component/Post/PostContent.jsx'
import RecruitPlacePost from './component/RecruitPlace/RecruitPlacePost.jsx';
import RecruitPlacePostWrite from './component/RecruitPlace/RecruitPlacePostWrite.jsx';
import RecruitPlaceHome from './component/RecruitPlace/RecruitPlaceHome.jsx';
import RecruitPlacePostContent from './component/RecruitPlace/RecruitPlacePostContent.jsx';
import FindPlace from './component/findPlace/findPlace.jsx';
import FP_Home from './component/findPlace/FP_Home.jsx';
import RecommendAI from './component/findPlace/RecommendAI.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.jsx';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/plan' element={<Plan/>}/>
          <Route path='/findMap' element={<FindPlace/>}/>
          <Route path='/findMapHome' element={<FP_Home/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/communityHome' element={<RecruitPlaceHome/>}/>
          <Route path='/recruitPlace' element={<RecruitPlacePost/>}/>
          <Route path='/freePost' element={<Post/>}/>
          <Route path='/recruitPlace_postContent' element={<RecruitPlacePostContent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
