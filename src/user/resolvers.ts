import User from "./user";

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
