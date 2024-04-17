import express, { Express, Request, Response} from 'express'
const mongoose = require('mongoose');
import realisateurRoutes from './routes/realisateurRoutes';
import filmRoutes from './routes/filmRoutes';
import seanceRoutes from './routes/seanceRoutes';

const app: Express = express()
const PORT = 3000

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const uri = "mongodb+srv://tisbaraphael:azerty@cluster0.ugp0oru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (err) {
    console.log("Failed to connect to Mongo");
    console.log(err);
  }
}
run().catch(console.dir);

app.use(express.json())
app.use('/api/realisateurs', realisateurRoutes)
app.use('/api/films', filmRoutes)
app.use('/api/seances', seanceRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})