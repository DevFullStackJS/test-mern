require('dotenv-flow').config();

const {
  UPLOAD_DIR: uploadDir,
  PORT: port,
  JWT_SECRET: jwtSecret,
  JWT_EXPIRATION: jwtExpiration,
  JWT_REFRESH_TOKEN_EXPIRATION: jwtRefreshTokenExpiration,
  PWD_RESET_EXPIRATION: passwordResetExpiration,
  PWD_RESET_SECRET: passwordResetSecret,
  TYPEORM_DATABASE: database,
  TYPEORM_API_URL: boApiUrl,
  TYPEORM_DATABASE: boDatabase,
  TYPEORM_USERNAME: boUsername,
  TYPEORM_PASSWORD: boPassword,
  EMAIL_USER: emailUser,
  EMAIL_PASSWORD: emailPassword,
} = process.env;

export const configs = {
  emailUser,
  emailPassword,
  uploadDir,
  boPassword,
  boUsername,
  boDatabase,
  boApiUrl,
  port,
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  passwordResetExpiration,
  passwordResetSecret,
  database,
};
