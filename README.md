# Popular U.S. Names of the Last Century (1910 - 2016)

![](http://storage1.static.itmages.com/i/17/1026/h_1509053992_1986747_fcc467b31a.png "")

### Topic

Occurrences of male and female names in America from 1910 until 2016. The extent of the map will be all 50 states.

### Title

Popular U.S. Names of the Last Century (1910-2016)

### Map objectives

The Names topic was chosen because I wanted something neutral that could be universally engaging (as long the name matches within the database behind the map). I wanted to be able to send it someone and say, "check out this map I made, it's about YOUR NAME."

I want to find different ways for the data to be explored using different platforms (Leaflet, D3.js). By looking at the data in different ways, the final presentation and user interface can be better created that is understandable and easy to use.

### User persona

For instance, maybe this is a map that is provided as part of news article or post about the changing nature of baby names. The user is an expectant mother looking for a popular or unique name for her child. They can use the map to see names that are popular now and get an idea if the popularity is on the rise or fall. The user has low expertise and motivation, so the map should be as simple as possible to understand and manipulate.

### Use case

By using a slider to manipulate the year, users will need to see and understand how the changing colors on the map and highlighting of a bar chart column signifies popularity over time. Also, the user needs to understand that the map is dynamic for any name, and that they can change it.

### Data source

U.S. Social Security Administration
https://www.ssa.gov/oact/babynames/limits.html

Source data imported into pop_name table via python script with columns:

~~~~
id, state, sex, year, name, occurrences
~~~~

![](http://storage4.static.itmages.com/i/17/1026/h_1509054156_1732270_38d0153de0.png "")

### Thematic representation

U.S. State choropleth map, also a slider explore the name year by year.

### Content and User Interface requirements

* Map shows state name data by year for names in the Popular Name Database (1910 - present).

* A Random name/map is produced on initial page load from a database query from over 33k distinct names.

* User can request a random name by clicking on the shuffle icon.

* User can change name by clicking on the search icon.

* User can select Male/Female for the name search.

* User can slide year from when the name first entered the list to when/if it exited.

* The bar chart legend bars represent year and the current year is highlighted, based on the slider.

* There is a state outline and tooltip affordance when hovering over state that shows number of births in that state in the current slider year.

### Wireframes Mockups/Iterations

[lots of screenshots here](mockups.md)

###  Technology Stack

* [Backend Data wrangling](#backend)
  * [PostgreSQL](#install-postgresql) - Powerful, open source object-relational database system. - [link](https://www.postgresql.org/)
    * [PostGIS](#install-postgis) - Geospatial database extender for PostgreSQL. - [link](http://postgis.net/)
  * [Python](#python) - [link](https://www.python.org/)
  * [MapShaper]() - [link](http://mapshaper.org/)
  * [QGIS]() - A Free and Open Source Geographic Information System - [link](http://www.qgis.org/)
* [Web framework](#web-framework)
  * [Node.js](#install-node) - Runtime built on Chrome's V8 JavaScript engine. - [link](https://nodejs.org/)
  * [Git](#git) - Version control. - [link](https://git-scm.com/)
  * [Express.js](#express) - Web framework for Node.js. - [link](https://expressjs.com/)
  * [Knex.js](#knex) - Query builder for PostgreSQL/Node.js. - [link](http://knexjs.org/)
  * [Joi.js](#joi) - Validator for JavaScript objects. - [link](http://mongoosejs.com/)
  * [REST API](#rest-api)
* [Front End](#front-end) (/public folder)
  * topojson - An extension of GeoJSON that encodes topology! - [link](https://github.com/topojson/topojson)
  * SVG - [link](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)
  * [D3.js version 4](#d3js) - D3.js is a JavaScript library for manipulating documents based on data. - [link](https://d3js.org/)
  * [Awesomplete](#d3js) - Ultra lightweight, customizable, simple autocomplete widget with zero dependencies. - [link](http://leaverou.github.io/awesomplete/)
  * [Moment.js]() - Parse, validate, manipulate, and display dates and times in JavaScript. - [link](https://momentjs.com/)
  * [Simple Statistics]() - Statistical methods in readable JavaScript for browsers, servers, and people. - [link](https://simplestatistics.org/)
  * [Colorbrewer.js]() - Predefined color scales. - [link](https://bl.ocks.org/mbostock/5577023)

### Overview

https://youtu.be/Vedgn2wN3-E

#### Introduction/Motivation

I across this name topic early in the course when I Dogs of NYC map on reddit (https://project.wnyc.org/dogs-of-nyc/). After bit of searching I found Social Security administration name data for U.S. population from 1910 until 2016 (https://www.ssa.gov/oact/babynames/limits.html). I thought this topic would be a good one because I wanted it to be neutral, light subject that could be universally engaging. I wanted to be able to send the map to anyone and be able say, "check out this map I made, it's about YOUR NAME."

#### Target user goals and objectives

I imagined expectant parents using the tool to research potential baby names for an upcoming birth. Because the map can give information about the name's geography and current trends, prospective parents can get a better idea of the mix of names that their child will associate with. Maybe the parent is looking to research a family name or to find one that has a certain pattern such as, was once popular and became unpopular but is on the upswing. For example 'Maggie (Girl)'.

#### Walk through

* Map loads at the most popular year for the name
* Births for year
* Births since beginning of data (1910)
* Bar chart, each bar represents a year, so we see the trend
* Swatch color shows the popularity within a state
* Tool-tip to show state details
* Slider to change year
* Enter a name
* Autocomplete
* Random name
* URL entry

#### TODO/Wish list

[lots of ideas here](todo.md)

#### Interesting names
* Old Southern Names:
  * http://whatsinaname.us/?name=Dollie&sex=F
  * http://whatsinaname.us/?name=Earnestine&sex=F
  * http://whatsinaname.us/?name=Charley&sex=M
  * http://whatsinaname.us/?name=Nettie&sex=F
  * http://whatsinaname.us/?name=Earnestine&sex=F
* Theodore Roosevelt effect?
  * http://whatsinaname.us/?name=Roosevelt&sex=M
* Elvis Presley effect?
  * http://whatsinaname.us/?name=Elvis&sex=M
* Elon Musk effect?
  * http://whatsinaname.us/?name=Elon&sex=M
* Kiefer Sutherland effect?
  * http://whatsinaname.us/?name=Kiefer&sex=M
* Channing Tatum effect?
  * http://whatsinaname.us/?name=Channing&sex=M
* Star Wars effect (bump in 1980)?
  * http://whatsinaname.us/?name=Leia&sex=F
* Britney Spears effect (2000, Oops I Did It Again)?
  * http://whatsinaname.us/?name=Britney&sex=F
* Brian's Song (1971 tv movie tearjerker)?
  * http://whatsinaname.us/?name=Brian&sex=M
* Beyonce effect (2001)?
  * http://whatsinaname.us/?name=Beyonce&sex=F
* Marilyn Monroe plateau (1930s-1950s)?
  * http://whatsinaname.us/?name=Marilyn&sex=F
* Jacqueline Kennedy (1964, year after JFK killed)?
  * http://whatsinaname.us/?name=Jacqueline&sex=F
