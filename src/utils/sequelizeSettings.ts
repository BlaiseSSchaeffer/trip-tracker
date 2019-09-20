import config from "config";
import { InitOptions, Sequelize, Options, ModelOptions } from "sequelize";

enum DIALECT {
  mysql = "mysql"
}

class SequelizeSettings {
  private static modelOpts: ModelOptions = {
    schema: SequelizeSettings.findVariable("DB_SCHEMA", "db_schema"),
    underscored: config.get("db_underscored"),
    createdAt: config.get("db_created_at"),
    updatedAt: config.get("db_updated_at")
  };

  public static modelOptions(freezeTableName?: boolean, tableName?: string) {
    if (freezeTableName && tableName) {
      this.modelOpts.freezeTableName = freezeTableName!;
      this.modelOpts.tableName = tableName!;
    } else if (freezeTableName || tableName) {
      throw new Error(
        "If freezeTableName is passed in, tableName must be passed in as well. freezeTableName and tableName are all or nothing."
      );
    }
    return this.modelOpts;
  }

  private static dialectCheck(d: string) {
    if (
      d === "mysql" ||
      d === "postgres" ||
      d === "sqlite" ||
      d === "mariadb" ||
      d === "mssql"
    ) {
      return true;
    }
    return false;
  }

  private static determineDialect():
    | "mysql"
    | "postgres"
    | "sqlite"
    | "mariadb"
    | "mssql" {
    const envDialect = process.env.DB_DIALECT;
    const configDialect: string | undefined = config.get("db_dialect");
    if (envDialect && this.dialectCheck(envDialect)) {
      // @ts-ignore see dialectCheck(d: string)
      return envDialect;
    } else if (configDialect && this.dialectCheck(configDialect)) {
      // @ts-ignore see dialectCheck(d: string)
      return configDialect;
    } else {
      return "postgres";
    }
  }

  private static findVariable(
    envVar: string,
    configVar: string,
    Default?: string
  ): string | undefined {
    if (process.env[envVar]) {
      return process.env[envVar]!;
    } else if (config.get(configVar)) {
      return config.get(configVar);
    } else if (Default) {
      return Default;
    }
  }

  private static sequelizeOpts: Options = {
    dialect: SequelizeSettings.determineDialect(),
    username: SequelizeSettings.findVariable("DB_USER", "db_user"),
    password: SequelizeSettings.findVariable("DB_PASSWORD", "db_password"),
    host: SequelizeSettings.findVariable("DB_HOST", "db_host"),
    port: SequelizeSettings.findVariable("DB_PORT", "db_port")
      ? +SequelizeSettings.findVariable("DB_PORT", "db_port")!
      : undefined,
    database: SequelizeSettings.findVariable("DB_NAME", "db_name")
  };

  public static sequelizeOptions() {
    return this.sequelizeOpts;
  }
}

export default SequelizeSettings;
