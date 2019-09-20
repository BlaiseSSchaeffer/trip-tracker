import { Model, Identifier } from "sequelize";

class User extends Model {
  id!: Identifier;
  firstName!: string;
  lastName!: string;
  addressId!: Identifier | null;
}

export default User;
