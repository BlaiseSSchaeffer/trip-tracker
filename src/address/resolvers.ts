const resolvers = {
  Query: {
    addresses: () => {
      return [
        {
          id: 1,
          buildingNumber: 1600,
          streetName: "Pennsylvania Ave NW",
          city: "Washington",
          state: "DC",
          zip: 20500
        }
      ];
    }
  }
};

export default resolvers;
