export const httpService = { get };

const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3030";

async function get(endpoint: string) {
  try {
    const res = await fetch(BASE_URL + endpoint);
    return res.json();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}
