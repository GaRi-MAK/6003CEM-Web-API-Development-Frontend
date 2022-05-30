import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";


function Search() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [name, setName] = useState("");
    let history = useHistory();



    const getSearch = async () => {
        axios.get("http://localhost:5000/posts/j").then((response) => {
            setListOfPosts(response.data.listOfPosts);
            console.log(response.data.listOfPosts);
        });
    }

    const searchHandle = async () => {
        const data = { key: name };
        if (data) {
            axios.post("http://localhost:5000/posts/search", data).then((response) => {
                setListOfPosts(response.data.listOfPosts);
                console.log(response.data.listOfPosts);
            });

        } else {
            getSearch();
        }



    }
    return (
        <div className='searchList'>
            <div className="formContainer">  
                      <h3>Search List</h3>
                <div className="searchContainer">
                    <input
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    /><br/>
                    <button onClick={searchHandle}> searchHandle </button>
                </div></div>

            {listOfPosts.map((value, key) => {
                return (
                    <div
                        key={key}
                        className="post"
                        onClick={() => {
                            history.push(`/post/${value.id}`);
                        }}
                    >
                        <div className="title">  <h1>Title : {value.title}</h1></div>
                        <div className="body">{value.postText}</div>
                        <div className="footer"><h1>Created by :{value.username}</h1></div>
                    </div>
                );
            })}
        </div>
    )
}

export default Search