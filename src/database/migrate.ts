import getMigrator from "./getMigrator";
const [, , local] = process.argv;

const migrator = getMigrator();

migrator(local === "local").then(
  (migrations) => {
    console.log(migrations.length > 0 ? "Migrated!" : "No migration to apply");
    migrations.map(({ name }) => {
      console.log(`- ${name}`);
    });
  },
  (e) => {
    console.log("Migration failed!");
    throw e;
  }
);
