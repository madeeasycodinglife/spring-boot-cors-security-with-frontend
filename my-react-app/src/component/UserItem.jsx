import React, { useState } from "react";
import UserService from "./UserService";

const UserItem = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUpdate = () => {
    UserService.updateUser(updatedUser)
      .then(() => {
        setIsEditing(false);
        onUpdate(updatedUser);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDelete = () => {
    UserService.deleteUser(user.id)
      .then(() => onDelete(user.id))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
          <button
            onClick={handleUpdate}
            type="button"
            className="btn btn-primary ms-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {user.name} - {user.email}
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="btn btn-primary ms-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-warning ms-2"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default UserItem;
