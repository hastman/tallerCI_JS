"use strict";

module.exports = function (grunt) {
	grunt.initConfig({		
		csslint:{
			all:{
				files : {
					src : ['src/css/**/*.css']
				}
			}
		},
		jshint: {
			all:{
				files : {
					src : ['src/lib/**/*.js','Gruntfile.js']
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