import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, deletePost } from './features/PostReducer';
import { useState } from 'react';
import sha512 from 'js-sha512';

function App() {
  const postList = useSelector((state) => state.posts.value);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch(); 

  const handleClick = () => {
    const date = Date.now();
    dispatch(addPost(
      {
        id:sha512(name+content+toString(date)),
        name:name,
        content:content,
      }
    ))
    setName("");
    setContent("")
  }

  return (
    <div className="App">
      {console.log(postList)}
      <div>
        <h1>React-Redux掲示板</h1>
      </div>
      <div>
        <input type="text" placeholder='お名前' onChange={(e) => setName(e.target.value)} value={name}/>
        <input type="text" placeholder='投稿内容' onChange={(e) => setContent(e.target.value)} value={content} />
        <button onClick={handleClick}>投稿</button>
        <hr />
      </div>
      <div className='displayPosts'>
        {/* eslint-disable-next-line */}
          {postList.map((post) => (
            <div key={post.id} className='post'>
              <h1 className='postName'>{post.name}</h1>
              <h1 className='postContent'>{post.content}</h1>
              <button onClick={() => dispatch(deletePost({id:post.id}))}>削除</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
