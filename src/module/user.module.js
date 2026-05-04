const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    //mongoose.Schema() expects a plain object as its argument
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


  // can't use arrow beacuse of the use of this
    //Then inside the pre("save") hook, this refers to that user object.
 userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;


