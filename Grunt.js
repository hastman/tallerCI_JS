"use strict";

module.exports = function (grunt) {
	grunt.initCongfig({		
		csslint:{
			all:{
				files : {
					src : ['src/css/**/*.css']
				}
			}
		}
				
	});
	grunt.loadNpmTasks("grunt-contrib-csslint");
};