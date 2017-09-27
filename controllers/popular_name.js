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
      select date_part('year', year) as yr, pop_name.state as st, pop_name.occurrences as oc, cast(name_tot_sex_st_year.total_for_state as INTEGER) as tot
      from pop_name
      inner join name_tot_sex_st_year
      	on date_part('year', year) = name_tot_sex_st_year.yr
      	and pop_name.state = name_tot_sex_st_year.state
      	and pop_name.sex = name_tot_sex_st_year.sex
      where pop_name.name = '#name#'
      and pop_name.state != 'DC'
      and pop_name.sex = '#sex#'
      order by pop_name.year, pop_name.state;
    `;

    sql = sql.replace('#name#', name);
    sql = sql.replace('#sex#', sex);

    const result = await knex.raw(sql);
    res.status(200).json(result.rows);
  },

  getNameData: async (req, res, next) => {

    const name = req.value.params.name;
    const sex = req.value.params.sex;

    var sql = `
      select data
      from name
      where name = '#name#'
      and sex = '#sex#';
    `;

    sql = sql.replace('#name#', name);
    sql = sql.replace('#sex#', sex);

    const result = await knex.raw(sql);
    //res.status(200).json(result.rows);

    console.log(result.rows[0].data);

    res.status(200).send(result.rows[0].data);

  },

  getMostPopularNames: async (req, res, next) => {

    const threshold = req.value.params.threshold;

    // var sql = `
    //   select max(name) as name, max(sex) as sex, sum(occurrences) as tot
    //   from pop_name
    //   group by name, sex
    //   having sum(occurrences) > #threshold#
    //   --order by sum(occurrences) desc;
    //   order by max(name);
    // `;

    var sql = `
      select max(name) as name, max(sex) as sex
      from pop_name
      group by name, sex
      having sum(occurrences) > #threshold#
      order by max(name);
    `;

    sql = sql.replace('#threshold#', threshold);
    const result = await knex.raw(sql);
    res.status(200).json(result.rows);

  },

  //gets data for top_name map
  // getTopNamesForSex: async (req, res, next) => {
  //
  //   const sex = req.value.params.sex;
  //
  //   var sql = `
  //   select date_part('year', year) as yr, state as st, top_name as name, total
  //   from top_name
  //   where sex = '#sex#'
  //   order by year, state, total;
  //   `;
  //
  //   sql = sql.replace('#sex#', sex);
  //   const result = await knex.raw(sql);
  //   res.status(200).json(result.rows);
  //
  // }

};
