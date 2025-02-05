import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";
import AddTraineeForm from "@/components/AddTraineeForm"; // ✅ ייבוא הטופס
import { t } from "i18next";

interface User {
  _id: string;
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
      const data = await httpService.get("/api/users/all", true);
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
        users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await httpService.del(`/api/users/${userId}`, true);
      setUsers(users.filter((u) => u._id !== userId));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleTraineeAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // ✅ מעדכן את הרשימה אחרי הוספה
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("users_management")}</h1>

      {/* ✅ הוספת הטופס כאן */}
      <AddTraineeForm onTraineeAdded={handleTraineeAdded} />

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">{t("name")}</th>
            <th className="border p-2">{t("email")}</th>
            <th className="border p-2">{t("role")}</th>
            <th className="border p-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user._id,
                      e.target.value as "super_admin" | "coach" | "trainee"
                    )
                  }
                  className="border rounded p-1"
                >
                  <option value="trainee">{t("trainee")}</option>
                  <option value="coach">{t("coach")}</option>
                  <option value="super_admin">{t("super_admin")}</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  {t("delete")}
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
