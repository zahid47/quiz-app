import { version } from "../../../package.json";

const docs = {
  openapi: "3.0.0",
  info: {
    version,
    title: "Dynamic Quiz API",
    description: "Docs WIP",
  },
  servers: [
    {
      url: "http://0.0.0.0:8000",
    },
  ],
  tags: [{ name: "user" }],

  //TODO: finish the docs
};

export default docs;
