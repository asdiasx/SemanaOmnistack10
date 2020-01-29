const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    return response.json({ devs });
  },

  async select(request, response) {
    const { github_username } = request.query;
    const dev = await Dev.findOne({ github_username });
    if (dev) { response.json(dev) }
    else {
      response.json('Dev não encontrado no database')
    };
  },
}