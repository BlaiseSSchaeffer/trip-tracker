import Address from "./address";

const resolvers = {
  Query: {
    addresses: () => {
      return Address.findAll();
    }
  }
};

export default resolvers;
