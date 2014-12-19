/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    concat: {
      dist: {
        src: ['public/js/modules/*.js'],
        dest: 'public/js/requester.js'
      }
    },
    mindirect: {
      dist: {
        src: ['public/js/requester.js'],
        dest: 'public/js/requester.min.js'
      }
    },
    watch: {
      files: ['public/js/modules/*.js', 'public/js/templates/*'],
      tasks: ['concat', 'handlebars']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    handlebars: {
      compile: {
        options: {
          partialsUseNamespace: true,
          namespace: 'Handlebars.templates',
          processPartialName: function(filePath) {
            var pieces = filePath.split("/");
            var name = pieces[pieces.length - 1].split(".")[0];
            return name;
          },
          processName: function(filePath) {
            var pieces = filePath.split("/");
            var name = pieces[pieces.length - 1].split(".")[0];
            return name;
          }
        },
        files: {
          "public/js/templates.js": "public/js/templates/*"
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mindirect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat']);

};
