import './App.css';
import Calendar from './component/Calendar/Calendar.jsx';
import Myobject from './component/Myobject/Myobject.jsx'
import Plan from './component/Calendar/Plan.jsx';
// import Home from './component/Home/Home.jsx'
import Login from './component/Login.jsx';
import Mempage from './component/Membership/Mempage.jsx';
import Post from './component/Post/Post.jsx'
import PostWrite from './component/Post/PostWrite.jsx'
import PostContent from './component/Post/PostContent.jsx'
import RecruitPlacePost from './component/RecruitPlace/RecruitPlacePost.jsx';
import RecruitPlacePostWrite from './component/RecruitPlace/RecruitPlacePostWrite.jsx';
import RecruitPlaceHome from './component/RecruitPlace/RecruitPlaceHome.jsx';
import RecruitPlacePostContent from './component/RecruitPlace/RecruitPlacePostContent.jsx';
import FindPlace from './component/findPlace/findPlace.jsx';
import FP_Home from './component/findPlace/FP_Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import PlaceReview from './component/placeReview/PlaceReview.jsx';
import RE_Home from './component/RecommendExercise/RE_Home.jsx';
import PlaceReviewContent from './component/placeReview/PlaceReviewContent.jsx';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/plan' element={<Plan/>}/>
          <Route path='/findMap' element={<FindPlace/>}/>
          <Route path='/signUp' element={<Mempage/>}/>
          <Route path='/inputUserInfo' element={<Myobject/>}/>
          <Route path='/findMapHome' element={<FP_Home/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/communityHome' element={<RecruitPlaceHome/>}/>
          <Route path='/recruitPlace' element={<RecruitPlacePost/>}/>
          <Route path='/postContent' element={<PostContent/>}/>
          <Route path='/freePost' element={<Post/>}/>
          <Route path='/recruitPlace_postContent' element={<RecruitPlacePostContent/>}/>
          <Route path='/recruitPlace/Post' element={<RecruitPlacePostWrite/>}/>
          <Route path='/recruitPlace/post/:id' element={<RecruitPlacePostContent/>}/>
          <Route path='/placeReview' element={<PlaceReview/>}/>
          <Route path='/RecommendExercise' element={<RE_Home/>}/>
          <Route path='/placeReview/:id' element={<PlaceReviewContent/>}/>
          <Route path='/freePost/post' element={<PostWrite/>}/>
          <Route path='/freePost/post/:id' element={<PostContent/>}/>
          <Route path='/calendar/plan/:id' element={<Plan/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
