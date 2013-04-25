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
			all:{
				files : {
					src : [SCRIPTS_DIR,'Gruntfile.js']
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