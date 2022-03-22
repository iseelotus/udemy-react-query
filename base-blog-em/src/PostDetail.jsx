import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // dependency array
  const { data, isLoading, isError } = useQuery(['comments', post.id], () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <h1>Still loading...</h1>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isSuccess && <p style={{ color: "green" }}>Delete successful</p>}
      {deleteMutation.isLoading && <p style={{ color: "purple" }}>Is deleting</p>}
      {updateMutation.isSuccess && <p style={{ color: "green" }}>Update successful</p>}
      {updateMutation.isLoading && <p style={{ color: "purple" }}>Is updating</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
