import React, { useState } from "react";
import { traineeService } from "@/services/traineeService";
import { useAuth } from "@/context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddTraineeForm: React.FC<{ onTraineeAdded: (user: any) => void }> = ({
  onTraineeAdded,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user || user.role !== "coach") {
    return <p>אין לך הרשאה להוסיף מתאמנים</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const newUser = await traineeService.addTrainee(
        formData.name,
        formData.email,
        formData.password
      );
      setMessage("✅ מתאמן נוסף בהצלחה!");
      setFormData({ name: "", email: "", password: "" });
      onTraineeAdded(newUser);
    } catch (error) {
      setMessage("❌ שגיאה: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold">הוספת מתאמן חדש</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="שם"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full mt-2"
        />
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full mt-2"
        />
        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 w-full mt-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {loading ? "מוסיף..." : "הוסף מתאמן"}
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AddTraineeForm;
