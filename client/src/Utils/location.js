import axios from "./axios";

export const getLocationById = function(location) {
  return axios.post('/country/location', {location: location})
  .then((res) => {
    return res.data.location;
  });
}