const exec = require("child_process").exec;

const run = (command: string) => {
  exec(command, (error: any, stdout: any, stderr: any) => {
    console.log("-----------------");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    if (error !== null) {
      console.log("exec error", +error);
    }
    console.log("-----------------");
  });
};

export default run;
