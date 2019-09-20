import { Sequelize, INTEGER, STRING, BelongsToManyOptions } from "sequelize";
import Address from "../address/address";
import SequelizeSettings from "../utils/sequelizeSettings";

const initUser = (sequelize: Sequelize) => {
  const User = sequelize.define(
    "User",
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
    SequelizeSettings.modelOptions(true, "users")
  );

  // @ts-ignore
  // User.belongsToMany(Address, { through: "user_adresses"});

  return User;
};

export default initUser;
