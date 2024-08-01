import './App.css';
import Login from './component/Login.jsx';
import Myobject from './component/Myobject.jsx';
import Post from './component/Post/Post.jsx'
import Mempage from './component/Membership/Mempage.jsx';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
