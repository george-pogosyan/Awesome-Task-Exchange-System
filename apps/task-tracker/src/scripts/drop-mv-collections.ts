import { ReconstructViewDb } from '@lib/event-sourcing';
import mongoose from 'mongoose';

export async function dropMVCollections(app) {
  const db = mongoose.connections[mongoose.connections.length - 1].db;

  const collections = await db.listCollections().toArray();

  for (const collectionName of collections.map((c) => c.name)) {
    console.log(`skip: ${collectionName}`);
    if (collectionName.includes('-mv')) {
      console.log(`dropping: ${collectionName}`);
      await db.dropCollection(collectionName);
    }
  }

  await ReconstructViewDb.run(app);
}
