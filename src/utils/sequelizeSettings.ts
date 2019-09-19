import config from "config";
import { InitOptions, Sequelize } from "sequelize";

class SequelizeSettings {
  public static initOptions(freezeTableName?: boolean, tableName?: string) {
    if (freezeTableName && tableName) {
      this.initOpts.freezeTableName = freezeTableName!;
      this.initOpts.tableName = tableName!;
    } else {
      throw new Error(
        "If freezeTableName is passed in, tableName must be passed in as well. freezeTableName and tableName are all or nothing."
      );
    }
    return this.initOpts;
  }

  private static initOpts: InitOptions = {
    sequelize: new Sequelize({
      // dialect: process.env.DB_DIALECT === ("mysql" || "postgres" || "sqlite" || "mariadb" || "mssql") ? process.env.DB_DIALECT : "postgres",
      dialect: "postgres",
      // username: process.env.DB_USERNAME,
      username: "blaise2s",
      // password: process.env.DB_PASSWORD,
      password: "password",
      // host: process.env.DB_HOST,
      host: "localhost",
      // port: +process.env.DB_PORT,
      port: 5432,
      // database: process.env.DB_NAME,
      database: "trip_tracker"
      // ssl: true,
      // dialectOptions: {
      //     ssl: { require: true },
      // }
    }),
    // schema: process.env.DB_SCHEMA,
    underscored: config.get("db_underscored"),
    schema: process.env.DB_SCHEMA || config.get("db_schema"),
    createdAt: config.get("db_created_at"),
    updatedAt: config.get("db_updated_at")
  };
}

export default SequelizeSettings;
