export const httpService = { get, post, put, del };

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function post(endpoint: string, data: any) {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function put(endpoint: string, data: any) {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

async function del(endpoint: string) {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      method: "DELETE",
    });
    return res.json();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}
