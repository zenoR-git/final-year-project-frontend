import { useEffect, useState } from "react";
import axios from "axios";

import './App.css'

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/comments`).then((response) => {  
    setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
      })
      .then((response) => {
        console.log(response.data.status)
        if(response.data.status==false){
          setNewComment("")
        }else{
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
        }
      });
  };

  return (
    <>
    <h1>Type a comment here</h1>
     <div className="container">
          <div className="typeSec">
          <textarea
            rows="20"
            cols ="80"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          >
          </textarea>
          </div>
          <div className="buttonSec">
          <button onClick={addComment}> Add Comment</button>
          </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
        </div>
    </>
  )
}

export default App
