import { faker } from "@faker-js/faker";

export const generateRandomUser = (role?: "admin") => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: role,
  };
};

export const generateRandomQuestion = (numberOfOptions: number) => {
  const options = [];
  for (let i = 0; i < numberOfOptions; i++) {
    options.push({
      title: faker.lorem.sentence(),
    });
  }

  return {
    title: faker.lorem.sentence() + "?",
    score: 5,
    options,
  };
};
