const UserType = `
  type User {
    id : ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input RegisterInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input LoginInput {
    password: String
    email: String
  }

  type Message {
    message: String
    success: Boolean
  }

  type Query {
    getUser:Message
    login(input: LoginInput) : Message
  }
  type Mutation {
    register(input: RegisterInput) : Message
  }
  `;

export default UserType;