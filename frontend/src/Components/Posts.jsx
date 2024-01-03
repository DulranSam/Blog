const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image} alt={`Image representing ${post.title}`} />
      <h2>{post.description}</h2>
      {post.link ? (
        <a href={post.link}>Click Here to learn more</a>
      ) : (
        <p>Link Unavailable</p>
      )}
    </div>
  );
};

export default PostPage;
