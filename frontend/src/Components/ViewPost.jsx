import { useEffect, useState } from "react";
import Axios from "axios";

const ViewPost = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");

  const getByID = async (postId) => {
    try {
      setLoading(true);
      const response = await Axios.get(`http://localhost:5000/home/${postId}`);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      setStatus("Error fetching post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getByID(id);
    }
  }, [id]);

  return (
    <div>
      <h1>ViewPost</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{JSON.stringify(posts)}</p>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
