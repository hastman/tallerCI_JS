"use strict";

module.exports = function (grunt) {

	var SRC_DIR = 'src/',
		SCRIPTS_DIR = SRC_DIR + 'lib/',
		ALL_STYLES = SRC_DIR + 'css/**/*.css';

	grunt.initConfig({		
		csslint:{
			all:{
				files : {
					src : [ALL_STYLES]
				}
			}
		},
		jshint: {
			options:{
				//Neutral enviroment
				//funciones de jshint ver descripcion en su sitio
				browser : false,
				node : false,
				jquery: false,
				strict : true,
				globalstrict : true,
				bitwise : true,
				camelcase : true,
				curly : true,
				eqeqeq : true,
				forin : true,
				latedef :true,
				newcap : true,
				noarg : true,
				nonew : true,
				undef : true,
				unused : true,
				white : true,
				trailing : true,
				maxparams :3,
				maxstatements : 10,
				maxdepth : 2,
				maxcomplexity : 5
			},
			core : {				
				files : {
					src : [SCRIPTS_DIR+'core/**/*.js']
				}
			},
			jquery : {
				files : {
					src : [SCRIPTS_DIR+'zepto_jquery/**/*.js']
				}
			},
			knockout : {
				files : {
					src : [SCRIPTS_DIR+'knockout/**/*.js']
				}
			},
			gruntfile : {
				files : {
					src : ['Gruntfile.js']
				}
			}
			
		}

				
	});
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask('default', [
		'csslint','jshint'
	]);
};