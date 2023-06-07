import { getAllPosts, getPostDetails } from "../services/Posts";
import { useEffect, useState } from "react";
const List = () => {
  const [posts, setPosts] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const initializeData = async () => {
    const postsRes = await getAllPosts();
    setPosts(postsRes);
  };

  const handlePostDetail = async (id) => {
    const postDetail = await getPostDetails(id);
    setPostDetail(postDetail);
  };
  useEffect(() => {
    initializeData();
  }, []);
  return (
    <>
      {postDetail && (
        <header>
          <h1>{postDetail.title}</h1>
          <p>{postDetail.body}</p>
        </header>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handlePostDetail(post.id)}>
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
