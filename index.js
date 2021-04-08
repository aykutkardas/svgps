#!/usr/bin/env node

const fs = require("fs");
const slugify = require("slugify");

const svgJson = {};

fs.readdir("./", async (err, files) => {
  const svgFiles = files.filter((file) => file.endsWith(".svg"));

  for (let i = 0; i < svgFiles.length; i++) {
    const fileName = svgFiles[i];
    const filePath = "./" + fileName;
    const fileData = await fs.readFileSync(filePath, { encoding: "utf8" });

    const name = slugify(fileName.replace(".svg", ""), {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });

    let paths = fileData.match(/ d="[^"]*"/gim);

    if (paths) {
      svgJson[name] = paths.map((i) => i.replace(/\"| d=/gim, "")).join(" ");
    }
  }

  fs.writeFileSync("icons.json", JSON.stringify(svgJson, null, 2));
});
