import { useEffect, useState } from "react";
import Axios from "axios";
import PostPage from "./Posts";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const displayPosts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:5000/home");
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      setStatus("Error fetching posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      await Axios.delete(`http://localhost:5000/home/${id}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
      setStatus("Error deleting post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modifyPost = async (id) => {
    try {
      setLoading(true);
      await Axios.put(`http://localhost:5000/home/${id}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
      setStatus("Error deleting post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Home Page</h1>
      <div style={{ margin: "2%" }}>
        {loading ? (
          <h1>Loading...</h1>
        ) : posts && posts.length ? (
          posts.map((post) => (
            <div key={post._id}>
              <PostPage post={post}></PostPage>
              <button
                onClick={() => {
                  modifyPost(post._id);
                }}
              >
                Modify Post
              </button>
              <button
                onClick={() => {
                  deletePost(post._id);
                }}
              >
                Delete Post
              </button>
            </div>
          ))
        ) : (
          <h1>No posts available</h1>
        )}
      </div>

      <p>{status}</p>
    </div>
  );
};

export default HomePage;
