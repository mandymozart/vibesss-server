import 'dotenv/config'
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
} = process.env

export default withAuth(
  config({
    db: {
      provider: 'mysql',
      url: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
      // url: 'file:./keystone.db',
    },
    lists,
    session,
    server: {
      cors: undefined
        // cors: { origin: ['*','http://localhost','http://127.0.0.1'] },
    },
    graphql: {
      cors: undefined
      // cors: { origin: ['*','http://localhost','http://127.0.0.1'] },
    },
    storage: {
      my_images: {
        kind: 's3',
        type: 'image',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
      },
      my_files: {
        kind: 's3',
        type: 'file',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
      },
    }
  })
);
