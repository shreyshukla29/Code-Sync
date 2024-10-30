// models/User.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeRoom: {
    roomId: { type: String, default: null },
    role: { type: String, enum: ['host', 'participant'], default: 'participant' },
    joinedAt: { type: Date },
  },
  invitations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Invitation',
    },
  ],
}, { timestamps: true });




userSchema.pre("save", async function () {
  console.log("executing pre save hook");
  console.log(this);

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  console.log(this);
});

export default mongoose.model('User', userSchema);
