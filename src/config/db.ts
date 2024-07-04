// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     // let MONGO_URL=8987498543
//     await mongoose.connect("mongodb://localhost:27017/next_auth");
//     const connection = mongoose.connection;
//     connection.on("connected", () =>
//       console.log("Database Connection Successfully")
//     );
//     connection.on("error", (err) => {
//       console.log("somthing Went Wrong", err);
//       process.exit();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connected with server");
  } catch (error: any) {
    console.log(error.message);
  }
}

export default connectDB;
