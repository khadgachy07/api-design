import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";
let envConfig

if (stage === "production") {
    envConfig = require("./prod").default;
} else if (stage === "staging"){
    envConfig = require("./staging").default;
} else {
    envConfig = require("./local").default;
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    secrets: {jwtScret : process.env.JWT_SECRET,
    port : process.env.PORT,}
}

export default merge(defaultConfig, envConfig)