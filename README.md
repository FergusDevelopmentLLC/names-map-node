# Popular U.S. Names of the Last Century (1910 - 2016)

![](http://storage2.static.itmages.com/i/17/0911/h_1505100561_8959476_b8f21c9727.png "")

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

![](http://storage9.static.itmages.com/i/17/0828/h_1503960370_4537145_c3520122ac.png "")

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

### Wireframes

#### Leaflet prototype:

http://104.236.16.91:8645/names/leaflet/
![](http://storage3.static.itmages.com/i/17/0911/h_1505101581_7314008_10493da923.png "")

#### Legend wireframe:

![](http://storage3.static.itmages.com/i/17/0911/h_1505097386_1540974_fef790703f.png "")

#### Experiments:

![](http://storage2.static.itmages.com/i/17/0911/h_1505096535_3247971_aa76d0e156.png "")

![](http://storage3.static.itmages.com/i/17/0911/h_1505096576_9497553_1b96437af9.png "")

![](http://storage1.static.itmages.com/i/17/0911/h_1505096986_5526102_dbae722e6d.png "")

![](http://storage3.static.itmages.com/i/17/0911/h_1505097046_2645969_c83f97308e.png "")

![](http://storage5.static.itmages.com/i/17/0911/h_1505097554_9759760_2522635eb1.png "")

#### Bi-variate (map 2 names)

![](http://storage1.static.itmages.com/i/17/0911/h_1505096468_4092358_b48c0cd0bd.png "")

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

* Make a version like this, with a slider only:
![](http://storage4.static.itmages.com/i/17/0918/h_1505752993_5628952_a2242a6943.png "")
https://www.reddit.com/r/MapPorn/comments/70u7c4/most_popular_girl_names_in_usa_757568/
* Improve error handling (Oprah error?)
* Jigsaw Morphing, states become bubbles (examples):
  ![](http://storage9.static.itmages.com/i/17/0918/h_1505754540_9103692_65ed8eeee3.png "")
  * https://bl.ocks.org/veltman/c582a31d347e04dd75d5331b0074558e
  * http://bestschoolday.huffingtonpost.com/#mt=map&filter=total&geo=US
* Normalization of data by total births per state per year. Data available?
* Bi-variate version map 2 names simultaneously. Allow input 2 names.
* Histogram instead of bar chart.
* The mouseout on the tooltip is inconsistent. Find a better svg native tooltip?
* Native svg switch.
* Rounded breaks
* Better formatting of legend text data
* Double check on possible sql injection.
* Name pluralization on the tooltip could be better. Just appending an 's' currently.
https://english.stackexchange.com/questions/39150/pluralization-of-names

#### Interesting names
* Old Southern Names:
  * http://104.236.16.91:8645/names/d3/?name=Dollie&sex=F
  * http://104.236.16.91:8645/names/d3/?name=Earnestine&sex=F
  * http://104.236.16.91:8645/names/d3/?name=Charley&sex=M
  * http://104.236.16.91:8645/names/d3/?name=Nettie&sex=F
  * http://104.236.16.91:8645/names/d3/?name=Earnestine&sex=F
* Theodore Roosevelt effect?
  * http://104.236.16.91:8645/names/d3/?name=Roosevelt&sex=M
* Elvis Presley effect?
  * http://104.236.16.91:8645/names/d3/?name=Elvis&sex=M
* Elon Musk effect?
  * http://104.236.16.91:8645/names/d3/?name=Elon&sex=M
* Kiefer Sutherland effect?
  * http://104.236.16.91:8645/names/d3/?name=Kiefer&sex=M
* Channing Tatum effect?
  * http://104.236.16.91:8645/names/d3/?name=Channing&sex=M
* Star Wars effect (bump in 1978)?
  * http://104.236.16.91:8645/names/d3/?name=Leia&sex=F
