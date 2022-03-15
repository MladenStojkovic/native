export const getLocation = async query => {
  try {
    const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${query}`)
    const json = await response.json()
    return json
  } catch (err) {
    console.error(err)
  }
};
