import { useEffect, useState } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1");
        setUsers(res.data);
        setText("");
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1", { text });
      setUsers([...users, res.data]);
      setText("");
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleCompleted = async (id, completed) => {
    try {
      await axios.put(`http://localhost:3001/api/v1/${id}`, {
        completed: !completed,
      });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, completed: !user.completed } : user
        )
      );
    } catch (error) {
      console.error("Completed error:", error);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/v1/${id}`, { text: editText });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, text: editText } : user
        )
      );
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={text}
          placeholder="Enter a task"
          onChange={(e) => setText(e.target.value)}
          className="flex-grow p-2 rounded-lg border-none bg-orange-200 text-black placeholder-gray-600"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700"
        >
          ADD
        </button>
      </div>

      <ul className="mt-6 w-full max-w-md">
        {users.map((user) => (
          <li
            key={user._id}
            className={`flex items-center justify-between bg-gray-200 text-black p-3 rounded-lg mb-2 shadow-md ${
              user.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircleIcon
                className={`h-6 w-6 cursor-pointer ${
                  user.completed ? "text-purple-600" : "text-gray-500"
                }`}
                onClick={() => handleCompleted(user._id, user.completed)}
              />
              {editId === user._id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border-none bg-white px-2 py-1 rounded-lg"
                />
              ) : (
                <span
                  className={`${
                    user.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {user.text}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editId === user._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <PencilIcon
                    className="h-5 w-5 text-purple-600 cursor-pointer hover:text-purple-700"
                    onClick={() => handleEdit(user._id, user.text)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(user._id)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
