"use client"
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

const usersData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 4, name: 'David', email: 'david@example.com' },
  { id: 5, name: 'Eve', email: 'eve@example.com' },
];

const UsersPage = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedUsers = showAll ? usersData : usersData.slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-2">
        {displayedUsers.map(user => (
          <li key={user.id} className="p-4 border rounded-lg shadow-sm">
            <div className="font-semibold">{user.name}</div>
            <div className="text-gray-600">{user.email}</div>
          </li>
        ))}
      </ul>
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show All Users
        </button>
      )}
    </div>
  );
};

export default UsersPage;
