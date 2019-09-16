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
  }
};

export default resolvers;
