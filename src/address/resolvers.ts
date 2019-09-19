import Address from "./address";
import config from "config";
import { INTEGER, STRING } from "sequelize";
import SequelizeSettings from "../utils/sequelizeSettings";
import User from "../user/user";

Address.init(
  {
    id: {
      field: "id",
      type: INTEGER,
      primaryKey: true
    },
    buildingNumber: {
      field: "buildingNumber",
      type: INTEGER,
      allowNull: false
    },
    streetName: {
      field: "streetName",
      type: STRING,
      allowNull: false
    },
    city: {
      field: "city",
      type: STRING,
      allowNull: false
    },
    state: {
      field: "state",
      type: STRING,
      allowNull: false
    },
    zip: {
      field: "zip",
      type: INTEGER,
      allowNull: false
    }
  },
  SequelizeSettings.initOptions(true, "addresses")
);
// Address.hasMany(User);
Address.sync({ force: config.get("sequelize_force_sync_tables") });

const resolvers = {
  Query: {
    addresses: () => {
      // return [
      //   {
      //     id: 1,
      //     buildingNumber: 1600,
      //     streetName: "Pennsylvania Ave NW",
      //     city: "Washington",
      //     state: "DC",
      //     zip: 20500
      //   }
      // ];
      return Address.findAll();
    }
  }
};

export default resolvers;
