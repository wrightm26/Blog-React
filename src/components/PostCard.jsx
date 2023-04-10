import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {

	const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let response = await fetch(
      `http://127.0.0.1:5000/api/posts/${post.id}`,
      {
        method: "DELETE",
        headers: myHeaders,
      }
    );

    let data = await response.json();

    if (data.error) {
      console.log(data.error, "danger");
    } else {
      console.log(`${data.success}`, "success");
      navigate("/");
    }
  }


  return (
    <div className="card mt-5 ">
      <div className="card-header">
          { post.date_created } | Post ID: { post.id }
          <h3><strong>{ post.title }</strong></h3>
      </div>
      <div className="card-body ">
        <blockquote className="blockquote mb-0">
            <p>{ post.content }</p>
            <footer className="blockquote-footer lh-3"><cite title="Source Title">from OurBlog</cite></footer>
            <Link role="button" className="btn btn-secondary me-3" to="/edit" type="submit">Edit</Link>
<button role="button" className="btn btn-outline-danger" aria-disabled="true" type="submit" onClick={handleDelete}>Delete</button>
          </blockquote>
        </div>
      </div>
    )
}
