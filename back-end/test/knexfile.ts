const configKnex = {
  client: "sqlite",
  connection: {
    filename: "./db/app.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};

const config = configKnex;

export default config;
