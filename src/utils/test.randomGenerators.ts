import { faker } from "@faker-js/faker";

export const generateRandomUser = (role?: "admin") => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: role,
  };
};
