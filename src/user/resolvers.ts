const resolvers = {
  Query: {
    users: () => {
      return [
        {
          id: 1,
          firstName: "Blaise",
          lastName: "Schaeffer"
        }
      ];
    }
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
