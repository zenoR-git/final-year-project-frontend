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

  const addComment = (e) => {
    e.preventDefault()
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
    <div className="center-block myStyle1">
    <section className="content-item" id="comments">
    <div className="container">   
      <div className="row">
            <div className="col-sm-8">   
                <form>
                  <h3 className="pull-left">New Comment</h3>
                  <button type="submit" className="btn btn-normal pull-right" onClick={addComment}> Add Comment</button>
                    <fieldset>
                        <div className="row">
                            <div className="col-sm-3 col-lg-2 hidden-xs">
                            <img className="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                            </div>
                            <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                <textarea  id="message" rows="40" cols ="82" placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          >
          </textarea>
                  </div>
                        </div>  	
                    </fieldset>
                </form>
                
                <h3>Comments</h3>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="media">
              <a className="pull-left" href="#"><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
              <div className="media-body">
                  <h4 className="media-heading">Anonymous</h4>
                  <p>{comment.commentBody}</p>
                  <ul className="list-unstyled list-inline media-detail pull-left">
                      <li><i className="fa fa-calendar"></i>27/02/2014</li>
                      <li><i className="fa fa-thumbs-up"></i>13</li>
                  </ul>
                  <ul className="list-unstyled list-inline media-detail pull-right">
                      <li className=""><a href="#">Like</a></li>
                      <li className=""><a href="#">Reply</a></li>
                  </ul>
              </div>
             </div>
            );
          })}
          </div>
          </div>
          </div></div>
          </section>
          </div>
          </>
  )
}

export default App
