"use strict";

module.exports = function (grunt) {
	grunt.initConfig({		
		csslint:{
			all:{
				files : {
					src : ['src/css/**/*.css']
				}
			}
		}
				
	});
	grunt.loadNpmTasks("grunt-contrib-csslint");

	grunt.registerTask('default', [
		'csslint'
	]);
};