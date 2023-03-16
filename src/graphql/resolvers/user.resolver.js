const userResolvers = {
  Query: {
    getUser: (resolver, arg, context) => {
      console.log(context);
      return {
        message: "ok",
        success: true
      }
    }
  }
}

export default userResolvers;