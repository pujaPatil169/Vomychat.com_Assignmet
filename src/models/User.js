const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  const User = mongoose.model('User', userSchema);