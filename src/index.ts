const Joi = require('joi')
const Sequelize = require('sequelize')
const Hapi = require('hapi');
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const port = process.env.PORT || 3000;
const server = new Hapi.Server(
  {
    port
  }
);

export const failAction = async (request, h, err) => {
  console.error('err', err)
  throw err;
}

(async () => {
  if (!process.env.POSTGRES_HOST) {
    throw Error(
      "process.env.POSTGRES_HOST must be a: user:pass@ipService:port ",
    );
  }
  const sequelize = new Sequelize(
    `postgres://${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB || "cows"}`,
    {
      ssl: process.env.POSTGRES_SSL,
      dialectOptions: {
        ssl: process.env.POSTGRES_SSL,
      },
    }
  );
  await sequelize.authenticate();
  console.log("postgres is running");

  const Cow = sequelize.define("cow", {
    collarId: Sequelize.STRING,
    cowNumber: Sequelize.STRING,
    collarStatus: Sequelize.STRING,
  });

  await Cow.sync({ force: true });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "BackEnd TypeScript Project - Lachlan Pearce",
          version: "2.0",
        },
      }
    },
  ]);

  server.route([
    {
      method: "GET",
      path: "/cows",
      handler: () => {
        return Cow.findAll();
      },
      config: {
        description: "List All Cows",
        notes: "Get all cows from database",
        tags: ["api"],
      },
    },
    
    {
      method: "POST",
      path: "/cows",
      config: {
        handler: (req) => {
          const { payload } = req;
          return Cow.create(payload);
        },
        description: "Add a new cow",
        notes: "Add a new cow to database",
        tags: ["api"],
        validate: {
          failAction,

          payload: {
            collarId: Joi.string().required(),
            cowNumber: Joi.string().required(),
            collarStatus: Joi.string().required(),
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/cows/{id}",
      config: {
        handler: (req) => {
          const { payload } = req;
          return Cow.update(payload, { where: { id: req.params.id } });
        },
        description: "Update a cow",
        notes: "Update an existing cow",
        tags: ["api"],
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
          payload: {
            collarId: Joi.string().required(),
            cowNumber: Joi.string().required(),
            collarStatus: Joi.string().required(),
          },
        },
      },
    },
  ]);

  await server.start();
  console.log("server running at", server.info.port);
})();
