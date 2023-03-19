import dotenv from "dotenv";
import Joi from "joi";

dotenv.config({ path: "config.env" });

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(5000),
    DATABASE_CONNECTION: Joi.string().required().description("MongoDB URL"),
    DATABASE_PASSWORD: Joi.string().required().description("MongoDB Password"),
    JWT_SECRET: Joi.string().required().description("JWT Secret Key"),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.PORT,
  },
  db: {
    url: envVars.DATABASE_CONNECTION,
    password: envVars.DATABASE_PASSWORD,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
};

export default config;
