const knexConfig = require('../knexfile.js');
const Knex = require('knex');
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

module.exports = {

  getRandomName: async (req, res, next) => {

    var sql = `
      select sex, name
      from names_distinct
      order by random() limit 1;
    `;

    const result = await knex.raw(sql);
    res.status(200).json(result.rows);
  },

  getOccurancesByNameSex: async (req, res, next) => {

    const name = req.value.params.name;
    const sex = req.value.params.sex;

    var sql = `
      select date_part('year', year) as yr, pop_name.state as st, pop_name.occurrences as oc
      from pop_name
      where pop_name.name = '#name#'
      and pop_name.state != 'DC'
      and sex = '#sex#'
      order by year;
    `;

    sql = sql.replace('#name#', name);
    sql = sql.replace('#sex#', sex);

    const result = await knex.raw(sql);
    res.status(200).json(result.rows);
  },

  getMostPopularNames: async (req, res, next) => {

    const threshold = req.value.params.threshold;

    var sql = `
      select max(name) as name, max(sex) as sex, sum(occurrences) as tot
      from pop_name
      group by name, sex
      having sum(occurrences) > #threshold#
      --order by sum(occurrences) desc;
      order by max(name);
    `;

    sql = sql.replace('#threshold#', threshold);
    const result = await knex.raw(sql);
    res.status(200).json(result.rows);

  }

};
