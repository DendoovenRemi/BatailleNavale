module.exports = function(grunt) {

	grunt.initConfig({

		karma: {
			dev: {
				configFile: 'karma.conf.js'
			}
		},

		clean: {
			dist: ['tmp']
		},

		copy: {
			main: {
				files: [{
					expand: true,
					src: ['public/**/*.*'], 
					dest: 'tmp/'
				},
				{
					expand: true, 
					flatten: true, 
					src: ['bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js'], 
					dest: 'tmp/public/lib/'
				}],
			},
		},

		connect:{
			server:{
				options:{
					protocol: 'http',
					hostname: 'localhost',
					port: 8080,
					base: 'tmp/public',
					open: true,
					livereload: true
				}
			}
		},

		json_server: {
			dev: {
				options: {
					host: 'localhost',
					port: '3030', 
					db: 'db.json'
				}
			}
		},

		watch: {
			all: {
				files: ['public/**/*.*'],
				tasks: ['copy'],
				options: {					
					livereload: true,
				}
			}
		},

		concurrent: {
	        server: {
	            tasks: [
	                'json_server',
	                'watch'
	            ],
	            options: {
	                logConcurrentOutput: true
	            }
	        },
    	},

		protractor: {
			options: {
				configFile: "node_modules/protractor/example/conf.js", // Default config file 
				keepAlive: true, // If false, the grunt process stops when the test fails. 
				noColor: false, // If true, protractor will not use colors in its output. 
				args: {
					seleniumAddress: 'http://localhost:4444/wd/hub',
					capabilities: [
						{ 'browserName': 'chrome' },
						{ 'browserName': 'firefox' }
					],
					baseUrl: 'http://localhost:8080',
					specs: [
						'tests/e2e/**/*.js'
					],
				}
			},
			your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
				options: {
					configFile: "protractor.conf.js", // Target-specific config file
				}
			},
		},
	})

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-json-server');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-protractor-runner');

	grunt.registerTask('server', "Serve your app", ['clean','copy','connect','concurrent:server']);

}