import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('Connected to DB')
        })

        connection.on('error', (err) => {
            console.log('Error in connecting to DB' + err)

            process.exit()
        })

    }catch(err) {
        console.log('Something went wrong in connecting to DB')
        console.log(err)
    }
}