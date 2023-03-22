import './App.css';
import { PostList } from './components/PostList';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/posts/:id" element={<h1>Post</h1>} />
      </Routes>
    </div>
  );
}

export default App;
