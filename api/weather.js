export const getWeather = async (id) => {
  try {
    const response = await fetch(`https://www.metaweather.com/api/location/${id}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
