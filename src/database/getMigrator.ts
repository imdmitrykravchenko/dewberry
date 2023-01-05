import { migrate } from "postgres-migrations";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getMigrator = () => {
  const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT = 5432,
  } = process.env;

  return (local = false) =>
    migrate(
      {
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        host: local ? "localhost" : POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        ensureDatabaseExists: true,
        defaultDatabase: "postgres",
      },
      path.resolve(__dirname, "./migrations")
    );
};

export default getMigrator;
