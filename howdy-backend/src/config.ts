import * as dotenv from 'dotenv';

dotenv.config();

/**
* Config file
*/
const config : {
  port: number,
  access_key_id_aws: string,
  secret_access_key_aws:string,
  bucket_name: string,
  SECRET_KEY: string,
  BCRYPT_WORK_FACTOR: number,
} = {
  port : Number(process.env.PORT) ?? 8080,
  access_key_id_aws : process.env.ACCESS_KEY_ID_AWS ?? " ",
  secret_access_key_aws : process.env.SECRET_ACCESS_KEY_AWS ?? '',
  bucket_name: process.env.BUCKET_NAME ?? 'test-bucket',
  SECRET_KEY : process.env.SECRET_KEY ?? 'supersecret',
  BCRYPT_WORK_FACTOR: 12,
}

export default config;