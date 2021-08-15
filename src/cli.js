#!/usr/bin/env node

const fs = require("fs");

const getFormattedName = require("./getFormattedName");
const getPaths = require("./getPaths");

const svgJson = {};

fs.readdir("./", async (err, files) => {
  const svgFiles = files.filter((file) => file.endsWith(".svg"));

  if (err) {
    console.log(err);
    return;
  }

  for (let i = 0; i < svgFiles.length; i++) {
    const fileName = svgFiles[i];
    const filePath = "./" + fileName;
    const fileData = await fs.readFileSync(filePath, { encoding: "utf8" });

    const name = getFormattedName(fileName);
    const paths = getPaths(fileData);

    if (paths) {
      svgJson[name] = paths;
    }
  }

  fs.writeFileSync("icons.json", JSON.stringify(svgJson, null, 2));
});
