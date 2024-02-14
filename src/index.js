
import connectDB from "./Db/index.js";
import app from "./app.js";
import env from 'dotenv';

env.config('.env')

connectDB()
    .then(
        () => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`app was running on : ${process.env.PORT}`);
            });
        }
    )
    .catch(
        (error) => {
            console.log("MongoosDB connection Faild !!", error);
        }
    );