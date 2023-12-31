import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

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
              <h1>{post.title}</h1>
              <img src={post.image} alt={`Image of ${post.title}`} />
              <h2>{post.description}</h2>
              {post.link ? (
                <a href={post.link}>Click Here to learn more</a>
              ) : (
                <h1>Link Unavailable</h1>
              )}

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
      <Link to="/addpost">Add Post</Link>
      <p>{status}</p>
    </div>
  );
};

export default HomePage;
