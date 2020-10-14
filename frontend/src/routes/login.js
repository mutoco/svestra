import fetch from 'node-fetch';

const AUTH_URL = `${process.env.STRAPI_API_URL}/admin/login`;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(AUTH_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    const parsed = await result.json();

    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.token = parsed.data.token;
    res.end(JSON.stringify({ token: parsed.data.token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
