import axios from "axios";

export const GetData = async () => {
  const result = await axios.get(
    `https://my-json-server.typicode.com/akbarramadhannnn/evermos-frontend/db`
  );
  return result.data;
};
