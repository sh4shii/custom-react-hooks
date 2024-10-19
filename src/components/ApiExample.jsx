import React, { useEffect } from "react";
import useApi from "../hooks/useApi";

const ApiExample = () => {
  const {
    data,
    loading,
    error,
    GetData,
    GetDataById,
    PostData,
    PutData,
    DeleteData,
    PatchData,
  } = useApi("https://jsonplaceholder.typicode.com/posts");

  const handleGetById = async (id) => {
    await GetDataById(id);
  };

  const handlePost = async () => {
    const newData = {
      title: "New Post",
      body: "This is a new post",
      userId: 1,
    };
    await PostData(newData);
    GetData(); // Refresh the data after posting
  };

  const handlePut = async (id) => {
    const updatedData = {
      title: "Updated Post",
      body: "This post has been updated",
      userId: 1,
    };
    await PutData(id, updatedData);
    GetData(); // Refresh the data after updating
  };

  const handleDelete = async (id) => {
    await DeleteData(id);
    GetData(); // Refresh the data after deletion
  };

  const handlePatch = async (id) => {
    const partialData = { title: "Partially Updated Post" };
    await PatchData(id, partialData);
    GetData(); // Refresh the data after patching
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>API Example</h1>
      <button onClick={() => handleGetById(1)}>Get Data by ID (1)</button>
      <button onClick={handlePost}>Post Data</button>
      <button onClick={() => handlePut(1)}>Put Data (ID: 1)</button>
      <button onClick={() => handleDelete(1)}>Delete Data (ID: 1)</button>
      <button onClick={() => handlePatch(1)}>Patch Data (ID: 1)</button>
      <h2>Data:</h2>
      {data && data[0]?.title}
    </div>
  );
};

export default ApiExample;
