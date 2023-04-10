import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function EditPost({ loggedIn }) {

    const navigate = useNavigate();
    const [post, setPost] = useState({title: "", content: ""})
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (!loggedIn)
			fetch(`http://127.0.0.1:5000/api/posts/${post.id}`)
				.then((res) => res.json())
				.then((data) => {
                    setPost(data);
					setTitle(data.title);
					setContent(data.content);
				});
	}, [post.id]);

	async function handleSubmit(e) {
		e.preventDefault();

		let updatedTitle = title;
		let updatedContent = content;

		let token = localStorage.getItem("token");

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);

		let requestBody = JSON.stringify({
			title: updatedTitle,
			content: updatedContent,
		});
        console.log(requestBody);

		let response = await fetch(
			`http://127.0.0.1:5000/api/posts/${post.id}`,
			{
				method: "PUT",
				headers: myHeaders,
				body: requestBody,
			}
		);

		let data = await response.json();

		if (data.error) {
			console.log(data.error, "danger");
			navigate("/login");
		} else {
			console.log(`${data.title} has been updated`, "success");
			navigate("/");
		}
	}

	return (
		<>
			<h3 className="text-center mt-5">Edit Post</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group mt-5">
					<input
						type="text"
						name="title"
						className="form-control my-3"
						value={setTitle}
                        placeholder="Enter Title"
						onChange={(e) => setTitle(e.target.value)}
					></input>
					<textarea
						name="content"
						className="form-control my-3"
						value={setContent}
                        placeholder="Enter body"
						onChange={(e) => setContent(e.target.value)}
					/>
                    <div className="btn-group">
					<input
						type="submit"
						value="Update Post"
						className="btn btn-secondary w-100"
					/>

				</div>
                </div>
			</form>
		</>
	);
}
