import { Sequelize, INTEGER, STRING } from "sequelize";
import User from "../user/user";
import SequelizeSettings from "../utils/sequelizeSettings";

const initAddress = (sequelize: Sequelize) => {
  const Address = sequelize.define(
    "Address",
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
    SequelizeSettings.modelOptions(true, "addresses")
  );

  // @ts-ignore
  // Address.belongsToMany(User, { through: "user_adresses"});

  return Address;
};

export default initAddress;
