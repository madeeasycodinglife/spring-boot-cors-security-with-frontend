import React, { useState, useEffect } from "react";
import UserService from "./UserService";
import UserItem from "./UserItem";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleCreateUser = () => {
    UserService.createUser(newUser)
      .then(() => {
        console.log("User created successfully");
        setNewUser({ name: "", email: "" });
        // Refresh the user list after creating a new user
        UserService.getAllUsers()
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userIdToDelete) => {
    UserService.deleteUser(userIdToDelete)
      .then(() => {
        console.log("User deleted successfully");
        const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />
        ))}
      </ul>
      <h2>Add User</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button
          onClick={handleCreateUser}
          type="button"
          className="btn btn-success ms-2"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserList;
