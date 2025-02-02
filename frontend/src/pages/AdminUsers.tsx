import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "coach" | "trainee";
}

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "super_admin") {
      navigate("/unauthorized"); // 🔒 רק סופר אדמין יכול לגשת
    }
    fetchUsers();
  }, [navigate, user]);

  const fetchUsers = async () => {
    try {
      const data = await httpService.get("/api/users", true);
      setUsers(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "super_admin" | "coach" | "trainee"
  ) => {
    try {
      await httpService.put(
        `/api/users/${userId}/role`,
        { role: newRole },
        true
      );
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await httpService.del(`/api/users/${userId}`, true);
      setUsers(users.filter((u) => u.id !== userId));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user.id,
                      e.target.value as "super_admin" | "coach" | "trainee"
                    )
                  }
                  className="border rounded p-1"
                >
                  <option value="trainee">Trainee</option>
                  <option value="coach">Coach</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
