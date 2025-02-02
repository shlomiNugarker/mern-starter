import { httpService } from "@/services/http.service";

export const traineeService = {
  getMyTrainees,
  updateTrainee,
  deleteTrainee,
};

async function getMyTrainees() {
  return httpService.get("/api/trainees/my-trainees", true);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateTrainee(traineeId: string, data: any) {
  return httpService.put(`/api/trainees/${traineeId}`, data, true);
}

async function deleteTrainee(traineeId: string) {
  return httpService.del(`/api/trainees/${traineeId}`, true);
}
