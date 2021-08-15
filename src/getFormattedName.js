const slugify = require("slugify");

function getFormattedName(fileName) {
  return slugify(fileName.replace(".svg", ""), {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
}

module.exports = getFormattedName;
