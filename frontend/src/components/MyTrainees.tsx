/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { traineeService } from "@/services/traineeService";
import { useAuth } from "@/context/AuthContext";
import AddTraineeForm from "@/components/AddTraineeForm";

interface Trainee {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
}

const MyTrainees: React.FC = () => {
  const { user } = useAuth();
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "coach") return;
    fetchTrainees();
  }, [user]);

  const fetchTrainees = async () => {
    try {
      const data = await traineeService.getMyTrainees();
      setTrainees(data);
    } catch (err) {
      setError("Failed to load trainees");
    } finally {
      setLoading(false);
    }
  };

  const handleTraineeAdded = (newTrainee: Trainee) => {
    setTrainees((prevTrainees) => [...prevTrainees, newTrainee]);
  };

  const handleUpdate = async (traineeId: string, isActive: boolean) => {
    try {
      await traineeService.updateTrainee(traineeId, { isActive });
      setTrainees((prevTrainees) =>
        prevTrainees.map((t) => (t._id === traineeId ? { ...t, isActive } : t))
      );
    } catch (err) {
      setError("Failed to update trainee");
    }
  };

  const handleDelete = async (traineeId: string) => {
    try {
      await traineeService.deleteTrainee(traineeId);
      setTrainees((prevTrainees) =>
        prevTrainees.filter((t) => t._id !== traineeId)
      );
    } catch (err) {
      setError("Failed to delete trainee");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>My Trainees</h1>
      <AddTraineeForm onTraineeAdded={handleTraineeAdded} />
      {trainees.map((trainee) => (
        <div key={trainee._id} className="flex justify-between border p-2">
          <span>
            {trainee.name} - {trainee.email}
          </span>
          <button onClick={() => handleUpdate(trainee._id, !trainee.isActive)}>
            {trainee.isActive ? "Deactivate" : "Activate"}
          </button>
          <button onClick={() => handleDelete(trainee._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyTrainees;
