import path from "path";

const loadModels = (
  files: string[],
  searchValue?: string,
  replaceValue?: string
) => {
  const filteredFiles = files.filter(file => {
    const basename = path.basename(file);
    return basename.indexOf(".") > 0 && basename === "index.ts";
  });
  if (searchValue !== undefined && replaceValue !== undefined) {
    return filteredFiles.map(file => {
      return file.replace(searchValue, replaceValue);
    });
  } else {
    return filteredFiles;
  }
};

export default loadModels;
