import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

after(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('mongoose connect & model', () => {
  it('model creation & save', async () => {
    const User = mongoose.model('User', new mongoose.Schema({ name: String }));
    const cnt = await User.countDocuments();
    expect(cnt).to.equal(0);
    await User.create({ name: 'Kim' });
    const afterCnt = await User.countDocuments();
    expect(afterCnt).to.equal(1);
  });
});