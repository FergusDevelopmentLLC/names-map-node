# Popular U.S. Surnames of the Last Century

Final Project Proposal

![](http://storage2.static.itmages.com/i/17/0911/h_1505100561_8959476_b8f21c9727.png "")

### Topic

  I'll be mapping the occurrences of male and female names in America from 1910 until 2016. The extent of the map will be all 50 states.

### Title

  Popular American Surnames of the Last Century

### Map objectives

The Names topic was chosen because I wanted something neutral that could be universally engaging (as long the name matches within the database behind the map). I wanted to be able to send it someone and say, "check out this map I made, it's about YOUR NAME."

I want to find different ways for the data to be explored using different platforms (Leaflet, Mapbox, D3). By looking at the data in different ways, the final presentation and user interface can be create that is easily understandable and takes into account ideas from the design content in the class.

### User Persona

  Maybe this is a map that is provided as part of news article or post about the changing nature of baby names. The user is an expectant mother looking for a popular or unique name for her child. They can use the map to see names that are popular now and get an idea if the popularity is on the rise or fall. The user has low expertise and motivation, so the map should be as simple as possible to understand and manipulate.

### Use case/scenario

  By using a slider to manipulate the year, users will need to see and understand how the changing colors on the map and highlighting of a histogram column signifies popularity over time. Also, the user needs to understand that the map is dynamic for any name, and that they can change it. Another goal is to possibly show how different name popularity is related over time.

### Data source

https://www.ssa.gov/oact/babynames/limits.html

Data screenshot:
http://storage9.static.itmages.com/i/17/0828/h_1503960370_4537145_c3520122ac.png

### Thematic representation

  U.S. State choropleth map, also a slider explore the name year by year.

### Content and requirements and User interface

Map shows state name data by year for names in the Popular Name Database (1910 - present)

Random name/map produced on initial page load from a database query from over 33k distinct names.

User can change name to see a new map and can request a random name.

User can select Male/Female for the name lookup.

User can slide year from when the name first entered the list to when/if it exited.

histogram in progress. See http://104.236.16.91:8645/names/d3/histogram.html

The bars represent year, and highlight based on the slider.

The most popular year for a name should be signified/displayed.

Bi-variate version is considered, in order to map 2 names simultaneously. Input 2 names.

### Wireframes

a series of low fidelity wireframes, paper prototypes, or mockups (in addition to the 1-2 pages)


![](http://storage3.static.itmages.com/i/17/0911/h_1505097386_1540974_fef790703f.png "")

![](http://storage1.static.itmages.com/i/17/0911/h_1505096468_4092358_b48c0cd0bd.png "")

![](http://storage2.static.itmages.com/i/17/0911/h_1505096535_3247971_aa76d0e156.png "")

![](http://storage3.static.itmages.com/i/17/0911/h_1505096576_9497553_1b96437af9.png "")

![](http://storage1.static.itmages.com/i/17/0911/h_1505096986_5526102_dbae722e6d.png "")

![](http://storage3.static.itmages.com/i/17/0911/h_1505097046_2645969_c83f97308e.png "")

![](http://storage5.static.itmages.com/i/17/0911/h_1505097554_9759760_2522635eb1.png "")

###  Technology Stack

* [Backend Data wrangling](#backend)
  * [PostgreSQL](#install-postgresql) - Powerful, open source object-relational database system. [link](https://www.postgresql.org/)
    * [PostGIS](#install-postgis) - Geospatial database extender for PostgreSQL. [link](http://postgis.net/)
  * Python
  * MapShaper
  * QGIS
* [Web framework](#web-framework)
  * [Node.js](#install-node) - Runtime built on Chrome's V8 JavaScript engine. [link](https://nodejs.org/)
  * [Git](#git) - Version control. [link](https://git-scm.com/)
  * [Express.js](#express) - Web framework for Node.js. [link](https://expressjs.com/)
  * [Knex.js](#knex) - Query builder for PostgreSQL/Node.js. [link](http://knexjs.org/)
  * [Joi.js](#joi) - Validator for JavaScript objects. [link](http://mongoosejs.com/)
  * [REST API](#rest-api)
* [Front End](#front-end) The stuff in the /public folder
  * [Vue.js](#vue) - Open-source progressive JavaScript framework for building user interfaces. [link](https://vuejs.org/)
  * [Bootstrap](#bootstrap) - Popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web. [link](http://getbootstrap.com/)
  * [Leaflet.js](#leaflet) - Leading open-source JavaScript library for mobile-friendly interactive maps. [link](http://leafletjs.com/)
  * GeoJSON
  * topojson

  * [D3.js version 4](#d3js) - D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. [link](https://d3js.org/)
* [Utilities](#utilities)
  * [Postman](#postman) - Powerful HTTP client for testing web services. [link](https://www.getpostman.com/)

### Map Notes/TODO items

A random name is selected at at the start from this rest service...
http://104.236.16.91:8645/popular_name/getRandomName

So, if you refresh the page you get a random name each time.

The edit (pencil) and shuffle icons in the legend are works in progress.

  If you can get a click to work on the shuffle icon, it simply reloads the page, producing a random name/map. This doesn't have to reload, could be written.

You can change the name by clicking on it, entering a name and pressing enter. This is not as smooth as I think it could be. Using a new thing, an editable DIV.
https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content

The mouseout on the tooltip is inconsistent. Is there a better svg native way?

Name pluralization on the tooltip could be better. Just appending an 's' currently.
https://english.stackexchange.com/questions/39150/pluralization-of-names

https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content

The map loads at the most popular year for the name. There are asterisks surrounding the year in the legend when the map is on the most popular year.

passing name/sex in url no longer works for some reason.
http://104.236.16.91:8645/names/d3/?name=Will&sex=M

The Male/Female switch is html styled with css over the svg. Maybe a native svg switch is better.

Same with slider. Will try to implement.

I really don't like the woman, anything better than a floating html div?

Is the ability to designate a sex even necessary?

I used this to make the Name entry work. New thing? Unsupported?
https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
This probably breaks all sorts of https://www.w3.org/WAI/intro/accessibility.php rules.

Make the number breaks clean, round them in some way.

Next step is to get histogram working...
http://104.236.16.91:8645/names/d3/histogram.html
(reload this page to get a randome name histogram, look at console to see name)
