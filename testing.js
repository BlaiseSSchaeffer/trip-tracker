const dialect = "mysqll";
const check = d => {
  if (d === "postgres" || d === "mysql") {
    return true;
  }
  return false;
};
if (check(dialect)) {
  console.log(true);
} else {
  console.log(false);
}
