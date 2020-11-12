const knexConfig = require('../knexfile.js');
const Knex = require('knex');
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

module.exports = {

  getStates: async (req, res, next) => {

    const sql =  `select statefp, ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, .01), 2) as geojson, statens, affgeoid, geoid, stusps, name, lsad, aland, awater
                  from state
                  where state.stusps not in ('AS', 'DC', 'FM', 'GU', 'MH', 'MP', 'PW', 'PW', 'VI')
                  order by statefp;`

    const result = await knex.raw(sql)
    const states = result.rows
    
    res.status(200).json(getFeatureCollectionFor(states));

  }
};

getFeatureCollectionFor = (coll) => {

  let features = coll.map((feature) => {
    return {
      "type": "Feature",
      "geometry": {
        "type": JSON.parse(feature.geojson).type,
        "coordinates": JSON.parse(feature.geojson).coordinates
      },
      "properties": feature.properties
    }
  })
  
  return {
    "type": "FeatureCollection",
    "features": features
  };

}
