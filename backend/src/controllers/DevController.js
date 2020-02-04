const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      try {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
          github_username,
          name,
          bio,
          avatar_url,
          techs: techsArray,
          location,
        });

        return response.json(dev);

      } catch (err) {
        return response.json({ "error": "1", "msg": "Usuário não encontrado no Github" });
      }

    }
    return response.json({ "error": "2", "msg": "Usuário já cadastrado como Dev" });
  },

  async update(request, response) {
    // nao atualizar github_username
    const { github_username, name, bio, avatar_url, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.updateOne({
        github_username: github_username,
        name,
        bio,
        avatar_url,
        techs: techsArray,
        location,
      });
      response.json(dev);
    }
    else {
      response.json('Dev não existe no database')
    };
  },


  async destroy(request, response) {
    const { github_username } = request.body;

    dev = await Dev.deleteOne({
      github_username: github_username
    });

    return response.json(github_username + ' apagado');
  },
};