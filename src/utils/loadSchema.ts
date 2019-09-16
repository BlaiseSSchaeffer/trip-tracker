import fs from "fs";

const loadSchema = (files: string[]) => {
  return files
    .filter(file => file.endsWith(".graphql"))
    .map(file => fs.readFileSync(file, "utf-8"));
};

export default loadSchema;
