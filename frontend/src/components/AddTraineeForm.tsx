import React, { useState } from "react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddTraineeForm: React.FC<{ onTraineeAdded?: (user: any) => void }> = ({
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

  if (!user || (user.role !== "coach" && user.role !== "super_admin")) {
    return <p>אין לך הרשאה להוסיף מתאמנים חדשים</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const newUser = await authService.addTrainee(
        formData.name,
        formData.email,
        formData.password
      );
      setMessage("✅ מתאמן נוסף בהצלחה!");
      setFormData({ name: "", email: "", password: "" });
      if (onTraineeAdded) onTraineeAdded(newUser);
    } catch (error) {
      setMessage("❌ שגיאה: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>הוספת מתאמן חדש</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="שם"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "מוסיף..." : "הוסף מתאמן"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTraineeForm;
