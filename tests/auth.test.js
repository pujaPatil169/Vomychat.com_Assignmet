const request = require("supertest");
const app = require("../server"); // Adjust based on your file structure
const { connectDB, disconnectDB } = require("./setupTestDB");

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Auth API", () => {
  test("User can register successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("Should not allow duplicate email registration", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("User already registered");
  });

  test("User can log in with correct credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("User cannot log in with wrong password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "wrongpassword"
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid credentials");
  });
});
