import { useState } from "react";
import Axios from "axios";

const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    link: "",
    photo: "",
  });
  const [error, setError] = useState("");

  const AddNewPost = async (e) => {
    e.preventDefault();
    setError("");
    const { title, description, link, photo } = data;
    try {
      setLoading(true);
      const newPostData = await Axios.post("http://localhost:5000/home", {
        title,
        description,
        link,
        photo,
      });
      if (newPostData.status === 201) {
        setError("Post Added");
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={AddNewPost}>
        <input
          onChange={handleChange}
          placeholder="Enter title..."
          name="title"
          required
        ></input>
        <input
          onChange={handleChange}
          placeholder="Enter description..."
          name="description"
          required
        ></input>
        <input
          onChange={handleChange}
          placeholder="Enter link..."
          name="link"
        ></input>
        <input
          onChange={handleChange}
          placeholder="Enter photo..."
          name="photo"
        ></input>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Post"}
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default AddPost;
