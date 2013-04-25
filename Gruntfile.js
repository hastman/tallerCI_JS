"use strict";

module.exports = function (grunt) {

	var SRC_DIR = 'src/',
		SCRIPTS_DIR = SRC_DIR + 'lib/',		
		ALL_STYLES = SRC_DIR + 'css/**/*.css',
		SRC_TEST_DIR = SRC_DIR +'test/',
		SCRIPTS_UNIT_TEST = SRC_TEST_DIR+'unit/',
		SCRIPTS_BDD_TEST = SRC_TEST_DIR+'bdd/*.js',
		SRC_DIR_OUTPUT = 'dist/';

	grunt.initConfig({		
		pkg : grunt.file.readJSON('package.json'),
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
				curly : false,
				eqeqeq : true,
				forin : true,
				latedef :true,
				newcap : true,
				noarg : true,
				nonew : true,
				undef : true,
				unused : true,
				white : false,
				trailing : false,
				maxparams :3,
				maxstatements : 10,
				maxdepth : 2,
				maxcomplexity : 5

			},
			core : {
				options:{
					globals:{
						module : true,
						setTimeout : true, //TODO: fixme!!!! dependen del objeto window no deberian estar en el core
						localStorage : true //TODO: fixme!!!!
					}
				},
				files : {
					src : [SCRIPTS_DIR+'core/**/*.js']
				}
			},
			jquery : {
				options:{
					browser : true,
					jquery : true,
					globals:{
						module : true,
						require : true,
						console : true 
					}
				},
				files : {
					src : [SCRIPTS_DIR+'zepto_jquery/**/*.js']
				}
			},
			knockout : {
				options:{
					browser : true,					
					globals:{
						module : true,
						require : true,
						console : true 
					}
				},
				files : {
					src : [SCRIPTS_DIR+'knockout/**/*.js']
				}
			},
			gruntfile : {
				options:{
					node : true,
					maxstatements : false					
				},
				files : {
					src : ['Gruntfile.js']
				}
			},
			unit : {
				options:{
					node : true,
					expr : true,
					latedef : false,
					globals: {
						
						describe:true,
						beforeEach : true,
						afterEach : true,
						xdescribe: true,
						context : true,
						it: true,
						xit: true
					}					
				},
				files : {
					src : [SCRIPTS_UNIT_TEST+'**/*.js']
				}
			},
			bdd : {
				options:{
					node : true,
					expr : true,
					jquery: true,
					maxparams : 5, //TODO: fixme!!!!
					maxdepth:3, //TODO: fixme!!!!
					maxstatements:20, //TODO: fixme!!!!					
					globals: {
						localStorage : true,
						describe:true,
						beforeEach : true,
						afterEach : true,
						xdescribe: true,
						context : true,
						it: true,
						xit: true,
						chai : true,
						bdd : true,
						console:true
					}					
				},
				files : {
					src : [SCRIPTS_BDD_TEST]
				}
			}				
		},
		watch : {
			gruntfile : {
				files:  ['Gruntfile.js'],
				tasks : ['jshint:gruntfile','simplemocha:dev']
			},
			bdd : {
				files:  [SCRIPTS_BDD_TEST],
				tasks : ['jshint:bdd','simplemocha:dev']
			},
			unit : {
				files:  [SCRIPTS_UNIT_TEST+'**/*.js'],
				tasks : ['jshint:unit','simplemocha:dev']
			},
			knockout : {
				files: [SCRIPTS_DIR+'knockout/**/*.js'],
				tasks : ['jshint:knockout','simplemocha:dev']
			},
			jquery : {
				files: [SCRIPTS_DIR+'zepto_jquery/**/*.js'],
				tasks : ['jshint:jquery','simplemocha:dev']
			},
			core : {
				files: [SCRIPTS_DIR+'core/**/*.js'],
				tasks : ['jshint:core','simplemocha:dev']
			},
			styles : {
				files: [ALL_STYLES],
				tasks : ['csslint']
			}
		},
		simplemocha : {
			options : {
				timeout : 500, //unit test
				ui: 'bdd'
			},
			dev : {
				options : {
					reporter : 'dot'
				},
				files : {
					src : [SCRIPTS_UNIT_TEST+'**/*.js']
				}
			}
		},
		clean : [SRC_DIR_OUTPUT],
		copy : {
			main: {
				files : [
					{
						expand : true, 
						cwd : SRC_DIR,
						src : ['img/**','**/!(initial_*).html'],
						dest : SRC_DIR_OUTPUT
					},
					{
						expand : true, 
						cwd : './',
						src : ['vendor/**/!(almond.js)'],
						dest : SRC_DIR_OUTPUT+'js/'
					}
				]
			}
		},
		requirejs: {
			options : {
				baseUrl : SCRIPTS_DIR,
				cjsTranslate : true,
				useStrict : true,
				preserveLicenceseComments : false,				
				optimize : 'uglify2',
				include : ['../../vendor/almond.js']
			},	
			zeptoJquery:{
				options: {
					name : 'zepto_jquery/main',
					insertRequire : ['zepto_jquery/main'],
					out : "dist/js/dist-zepto_jquery.min.js",
					uglify2 : {
						report : 'gzip',
						mangle : {
							execpt : ['jQuery','Zepto']
						}
					}
				}
			},
			ko:{
				options: {
					name : 'knockout/main',
					insertRequire : ['knockout/main'],
					out : "dist/js/dist-ko.min.js",
					uglify2 : {
						report : 'gzip',
						mangle : {
							execpt : ['no']
						}
					}
				}
			}
		},
		cssmin: {
			options : {
				report : 'gzip'
			}
		}


	});

	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-simple-mocha");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.registerTask('default', [
		'csslint','jshint','simplemocha:dev'
	]);

	grunt.registerTask('dist', [
		'clean','cssmin','requirejs','copy'
	]);
};