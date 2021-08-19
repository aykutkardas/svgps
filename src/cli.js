#!/usr/bin/env node

const fs = require("fs");

const getFormattedName = require("./getFormattedName");
const parse = require("./parse");

const svgJson = {};

async function main() {
  const [, , inputDir, outputDir] = process.argv;

  if (!inputDir || !outputDir) throw "Input and Output is required!";

  const isExistInput = fs.existsSync(inputDir);
  const isExistOutput = fs.existsSync(outputDir);

  if (!isExistInput) throw "Input path is not exist!";
  if (!isExistOutput) throw "Output path is not exist!";

  const inputDirContent = fs.readdirSync(inputDir, "utf-8");

  if (!inputDirContent) return;

  const svgFiles = inputDirContent.filter((file) => file.endsWith(".svg"));

  for (let i = 0; i < svgFiles.length; i++) {
    const fileName = svgFiles[i];
    const filePath = inputDir + "/" + fileName;
    const fileData = await fs.readFileSync(filePath, { encoding: "utf8" });

    const name = getFormattedName(fileName);
    const paths = parse(fileData);

    if (paths) {
      svgJson[name] = paths;
    }
  }

  fs.writeFileSync(outputDir + "/icons.json", JSON.stringify(svgJson, null, 2));
}

try {
  main();
} catch (err) {
  console.log(err);
}
