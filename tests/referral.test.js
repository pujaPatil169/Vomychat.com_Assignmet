describe("Referral System", () => {
    test("Valid referral code should register user and increment referral count", async () => {
      const referrer = await request(app).post("/api/auth/register").send({
        name: "Referrer",
        email: "referrer@example.com",
        password: "password123"
      });
  
      const referralCode = referrer.body.referralCode;
  
      const response = await request(app).post("/api/auth/register").send({
        name: "Referred User",
        email: "referred@example.com",
        password: "password123",
        referralCode: referralCode
      });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
  
      const referrerData = await request(app).get(`/api/referrals/${referrer.body.userId}`);
      expect(referrerData.body.referralCount).toBe(1);
    });
  
    test("Should not allow self-referral", async () => {
      const user = await request(app).post("/api/auth/register").send({
        name: "Self Referrer",
        email: "self@example.com",
        password: "password123"
      });
  
      const response = await request(app).post("/api/auth/register").send({
        name: "Self Attempt",
        email: "selfattempt@example.com",
        password: "password123",
        referralCode: user.body.referralCode
      });
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Cannot refer yourself");
    });
  
    test("Invalid referral code should return an error", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Invalid Referral",
        email: "invalid@example.com",
        password: "password123",
        referralCode: "INVALIDCODE"
      });
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid referral code");
    });
  });
  