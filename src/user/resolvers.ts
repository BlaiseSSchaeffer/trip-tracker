import Address from "../address/address";
import config from "config";
import { INTEGER, STRING } from "sequelize";
import SequelizeSettings from "../utils/sequelizeSettings";
import User from "./user";

User.init(
  {
    id: {
      field: "id",
      type: INTEGER,
      primaryKey: true
    },
    firstName: {
      field: "firstName",
      type: STRING,
      allowNull: false
    },
    lastName: {
      field: "lastName",
      type: STRING,
      allowNull: false
    }
  },
  SequelizeSettings.initOptions(true, "users")
);
// User.hasMany(Address)
User.sync({ force: config.get("sequelize_force_sync_tables") });

const resolvers = {
  Query: {
    users: () => User.findAll()
  },
  Mutation: {
    addUser: () => {
      return {
        id: 1,
        firstName: "Brent",
        lastName: "Schaeffer"
      };
    }
  }
};

export default resolvers;
