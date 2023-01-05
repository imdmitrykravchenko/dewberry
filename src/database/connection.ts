import { createPool, createTypeParserPreset, sql } from "slonik";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT = 5432,
} = process.env;

const connectionString = `postgres://${POSTGRES_USER}:${encodeURIComponent(
  POSTGRES_PASSWORD
)}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const connection = createPool(connectionString, {
  typeParsers: createTypeParserPreset(),
  interceptors: [
    {
      afterPoolConnection: async (context, connection) => {
        await connection.query(sql.unsafe`
          create schema if not exists ${POSTGRES_DB};
          set search_path to ${POSTGRES_DB},public;
        `);

        return null;
      },
    },
  ],
});

export default connection;
