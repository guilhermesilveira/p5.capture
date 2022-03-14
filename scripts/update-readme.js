const { join } = require("path");
const fs = require("fs/promises");
const prettier = require("prettier");
const package = require("../package.json");

const INPUT_FILENAME = join(__dirname, "README.template.md");
const OUTPUT_FILENAME = join(__dirname, "..", "README.md");
const WARNING_COMMENT =
  "<!-- Do not edit this file directly because it was generated -->\n";

const main = async () => {
  const file = await fs.readFile(INPUT_FILENAME, "utf8");

  let newFile = WARNING_COMMENT;
  newFile += file.replace(/\{\{ version \}\}/g, package.version);

  await fs.writeFile(
    OUTPUT_FILENAME,
    prettier.format(newFile, {
      parser: "markdown",
      printWidth: 100,
      trailingComma: "all",
    }),
  );
};

main();