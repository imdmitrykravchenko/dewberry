import execa from "execa";
import inquirer from "inquirer";
import fs from "fs";
import dotenv from "dotenv";

const env = dotenv.config();
const existentProjectName = env.error ? undefined : env.parsed.PROJECT_NAME;

inquirer
  .prompt([{ name: "projectName", default: existentProjectName }])
  .then(({ projectName }) => {
    if (existentProjectName) {
      if (projectName !== existentProjectName) {
        console.info(
          `Reinitialize "${existentProjectName}" Dewberry project as "${projectName}"`
        );
      } else {
        console.info(`Refresh existent Dewberry project "${projectName}"`);
      }
    } else {
      console.info(`Initialize new Dewberry project "${projectName}"`);
    }

    const exampleEnv = dotenv.config({ path: ".env.example" });

    const content = Object.entries({ ...env.parsed, ...exampleEnv.parsed })
      .map(
        ([key, value]) =>
          `${key}=${String(value).replace(/\{PROJECT_NAME}/gi, projectName)}`
      )
      .join("\n");

    fs.writeFileSync(".env", content);

    execa.commandSync(`sh docker/nginx/cert-gen.sh ${projectName}`);

    const hostsContent = fs.readFileSync("/etc/hosts").toString();
    const ip = "127\\.0\\.0\\.1.*\\s";

    const checksResult = Object.entries({
      front: new RegExp(`${ip}${projectName}\\.local`),
      api: new RegExp(`${ip}api\\.${projectName}\\.local`),
      cdn: new RegExp(`${ip}cdn\\.${projectName}\\.local`),
    }).reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value.test(hostsContent),
      }),
      {}
    );
    console.info("State of /etc/hosts:");
    Object.entries(checksResult).forEach(([key, result]) => {
      console.info(`${key}: ${result ? "" : "not "}found`);
    });
  });
