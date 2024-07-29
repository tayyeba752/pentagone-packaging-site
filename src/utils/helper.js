import Env from "../Environments/Env";

export const getAsset = (filename) => {
  return Env.server + "/assets" + filename;
};
