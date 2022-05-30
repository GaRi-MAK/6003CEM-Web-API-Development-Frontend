import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function JustPost() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:5000/posts/j").then((response) => {
      setListOfPosts(response.data.listOfPosts);
      console.log(response.data.listOfPosts);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              history.push(`/post/${value.id}`);
            }}
          >
            <div className="title">  <h1>Breed : {value.title}</h1></div>
            <div className="body">{value.postText}</div>
            <div className="footer"><h1>Created by :{value.username}</h1></div>
          </div>
        );
      })}
    </div>
  );
}

export default JustPost;