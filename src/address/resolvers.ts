import Address from "./address";
import { INTEGER, STRING } from "sequelize";
import SequelizeSettings from "../utils/sequelizeSettings";

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
Address.sync({ force: false });

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
