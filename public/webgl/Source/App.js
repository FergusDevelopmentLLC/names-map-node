(function () {
    "use strict";

    //Cesium.BingMapsApi.defaultKey = 'AihaXS6TtE_olKOVdtkMenAMq1L5nDlnU69mRtNisz1vZavr1HhdqGRNkB2Bcqvs'; // For use with this application only

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

    var viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider : new Cesium.UrlTemplateImageryProvider({
        url : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png',
        credit : ''
      }),
      baseLayerPicker : false,
      animation : false,
      timeline: false,
      geocoder: false,
      skyBox: false
    });

    //////////////////////////////////////////////////////////////////////////
    // Configuring the Scene
    //////////////////////////////////////////////////////////////////////////

    // Create an initial camera view
    var initialPosition = new Cesium.Cartesian3.fromDegrees(-95, 39, 6000000);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -90, 0);
    var homeCameraView = {
        destination : initialPosition,
        orientation : {
            heading : initialOrientation.heading,
            pitch : initialOrientation.pitch,
            roll : initialOrientation.roll
        }
    };

    viewer.scene.camera.setView(homeCameraView);

    // Enable lighting based on sun/moon positions
    viewer.scene.globe.enableLighting = false;

    // Add some camera flight animation options
    homeCameraView.duration = 2.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    // Override the default home button
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    });

    //////////////////////////////////////////////////////////////////////////
    var colors = ["ALICEBLUE","BISQUE","BLACK","BLANCHEDALMOND","BLUE","BLUEVIOLET","BROWN","BURLYWOOD","CADETBLUE","CHARTREUSE","CHOCOLATE","CORAL","CORNFLOWERBLUE","CORNSILK","CRIMSON","CYAN","DARKBLUE","DARKCYAN","DARKGOLDENROD","DARKGRAY","DARKGREEN","DARKKHAKI","DARKMAGENTA","DARKOLIVEGREEN","DARKORANGE","DARKORCHID","DARKRED","DARKSALMON","DARKSEAGREEN","DARKSLATEBLUE","DARKSLATEGRAY","DARKTURQUOISE","DARKVIOLET","DEEPPINK","DEEPSKYBLUE","DIMGRAY","DODGERBLUE","FIREBRICK","FLORALWHITE","FORESTGREEN","FUSCHIA","GAINSBORO","GHOSTWHITE","GOLD","GOLDENROD","GRAY","GREEN","GREENYELLOW","HONEYDEW","HOTPINK","INDIANRED","INDIGO","IVORY","KHAKI","LAVENDAR_BLUSH","LAVENDER","LAWNGREEN","LEMONCHIFFON","LIGHTBLUE","LIGHTCORAL","LIGHTCYAN","LIGHTGOLDENRODYELLOW","LIGHTGRAY","LIGHTGREEN","LIGHTPINK","LIGHTSEAGREEN","LIGHTSKYBLUE","LIGHTSLATEGRAY","LIGHTSTEELBLUE","LIGHTYELLOW","LIME","LIMEGREEN","LINEN","MAGENTA","MAROON","MEDIUMAQUAMARINE","MEDIUMBLUE","MEDIUMORCHID","MEDIUMPURPLE","MEDIUMSEAGREEN","MEDIUMSLATEBLUE","MEDIUMSPRINGGREEN","MEDIUMTURQUOISE","MEDIUMVIOLETRED","MIDNIGHTBLUE","MINTCREAM","MISTYROSE","MOCCASIN","NAVAJOWHITE","NAVY","OLDLACE","OLIVE","OLIVEDRAB","ORANGE","ORANGERED","ORCHID","PALEGOLDENROD","PALEGREEN","PALETURQUOISE","PALEVIOLETRED","PAPAYAWHIP","PEACHPUFF","PERU","PINK","PLUM","POWDERBLUE","PURPLE","RED","ROSYBROWN","ROYALBLUE","SADDLEBROWN","SALMON","SANDYBROWN","SEAGREEN","SEASHELL","SIENNA","SILVER","SKYBLUE","SLATEBLUE","SLATEGRAY","SNOW","SPRINGGREEN","STEELBLUE","TAN","TEAL","THISTLE","TOMATO","TURQUOISE","VIOLET","WHEAT","WHITE","WHITESMOKE","YELLOW","YELLOWGREEN"];
    //colors = shuffle(colors);

    var name = getNameFromQS();
    var sex = getSexFromQS();
    var data_url = '/popular_name/getNameData/' + name + '/' + sex;

    var geojsonOptions = {
        clampToGround : true
    };

    var max_occ_yr = '';

    Cesium.loadJson(data_url).then(function(jsonData) {

      //var max_tot = Math.max.apply(Math,jsonData.map(function(occurrence){return occurrence.tot;}))
      //var max_occ = jsonData.find(function(occurrence){ return occurrence.tot == max_tot; })

      var most_popular_year = getMostPopularYearFrom(jsonData);

      var most_popular_year_obj = jsonData.filter(function(occurrence){
        return occurrence.yr == most_popular_year;
      });

      var occurrence_initial = [];
      var objs = [];
      for (var i = 0; i < most_popular_year_obj.length; i++) {
        var oc = {};
        oc.state = most_popular_year_obj[i].st;
        oc.normalized = most_popular_year_obj[i].oc / most_popular_year_obj[i].tot;
        occurrence_initial.push(most_popular_year_obj[i].oc / most_popular_year_obj[i].tot);
        objs.push(oc);
      }

      var minDataPoint = d3.min(occurrence_initial);
      var maxDataPoint = d3.max(occurrence_initial);

      // console.log(minDataPoint);
      // console.log(maxDataPoint);

      var linearScale = d3.scaleLinear().domain([minDataPoint, maxDataPoint]).range([0, 1000000]);

      for (var i = 0; i < objs.length; i++) {
        objs[i].normalized_scaled = linearScale(objs[i].normalized)
      }

      //console.log(objs);

      var statesPromise = Cesium.GeoJsonDataSource.load('./Source/SampleData/states_v5.geojson', geojsonOptions);

      // Save an new entity collection of states data
      var states;

      statesPromise.then(function(dataSource) {

        viewer.dataSources.add(dataSource);

        var stateEntities = dataSource.entities.values;

        //console.log(stateEntities);

        for (var i = 0; i < stateEntities.length; i++) {

          var entity = stateEntities[i];

          if (Cesium.defined(entity.polygon)) {

            entity.state = stateEntities[i].name;

            var state_match = objs.filter(function(state){
              var s = abbrRegion(entity.state, 'abbr');
              //console.log(s);

              return state.state == abbrRegion(entity.state, 'abbr');
            });

            var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
            entity.position = polyCenter;

            entity.polygon.material = Cesium.Color.MEDIUMAQUAMARINE.withAlpha(0);
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.BLACK;
            entity.polygon.extrudedHeight = 0;
            entity.polygon.height = 0;

            if(state_match.length > 0) {

              // if(state_match.state == 'MI') {
              //   console.log(state_match);
              // }

              var alpha = 1;
              // entity.polygon.material = Cesium.Color.MEDIUMAQUAMARINE.withAlpha(alpha);
              entity.polygon.material = eval('Cesium.Color.' + colors[i] + '.withAlpha(alpha)');
              entity.polygon.outline = true;
              entity.polygon.outlineColor = Cesium.Color.BLACK;
              entity.polygon.extrudedHeight = 0;
              entity.polygon.height = state_match[0].normalized_scaled;
            }
          }
        }
      });

    }).otherwise(function(error) {
        // an error occurred
    });



    function getMostPopularYearFrom(occurrences) {

      var year_accumulations = [];
  		var last_yr = occurrences[0].yr;
  		var year_accum = 0;

  		for(var oc in occurrences) {
  			// console.log(occurrences[oc].yr);
  			if(occurrences[oc].yr == last_yr) {
  				year_accum += occurrences[oc].oc;
  			}
  			else {
  				year_accumulations.push([last_yr, year_accum]);
  				year_accum = occurrences[oc].oc;
  				last_yr = occurrences[oc].yr;
  			}
  		}
  		year_accumulations.push([last_yr, year_accum]);

  		if(year_accumulations.length == 0)
  			return;

  		var most_pop_year = year_accumulations[0][0];
  		var most_pop_acc = year_accumulations[0][1];

  		for(var acc in year_accumulations) {
  			if(year_accumulations[acc][1] > most_pop_acc) {
  				most_pop_acc = year_accumulations[acc][1];
  				most_pop_year = year_accumulations[acc][0];
  			}
  		}

  		return most_pop_year;
    }



    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function find_in_object(my_object, my_criteria){

      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });

    }

    function getNameFromQS() {
  		var query = gup('name', document.location.search);
  		if(query != null) {
  			return query;
  		}
  		else {
  			return 'Mary';
  		}
  	}

    function getSexFromQS() {
  		var query = gup('sex', document.location.search);
  		if(query != null) {
  			return query;
  		}
  		else {
  			return 'F';
  		}
  	}

    function gup( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    }

}());
