const srcConfig = {
  type: 'mongodb',
  url: 'mongodb+srv://7Z0tB7RV4yVuG6fPm7m:7Z0tB7RV4yVuG6fPm7m@cluster0.ddlxp.azure.mongodb.net/testmern',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: ['src/data/do/**/*.ts'],
  cli: {
    entitiesDir: 'src/data/do',
  },
};

module.exports = srcConfig;