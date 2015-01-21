module.exports = function(grunt) {
  var root_path = './';
  var directory = '';
  var project_path = root_path + 'htdocs/';
  var asset_path = root_path + 'assets/';

  grunt.initConfig({
    sass: {
      target: {
        options: {
          style: 'expanded'
        },
        files: {
          'htdocs/css/style-min.css': 'assets/sass/style.scss'
        }
      }
    },
    uglify: {
      target: {
        options: {},
        files: {
          'htdocs/js/common-min.js': 'assets/js/common.js',
          'htdocs/js/ga.js': 'assets/js/ga.js'
        }
      }
    },
    watch: {
      copy: {
        files: asset_path + '**/*.html',
        tasks: ['copy']
      },
      scss: {
        files: asset_path + '**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: asset_path + '**/*.js',
        tasks: ['uglify']
      }
    }
  });

  // プラグイン記述
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // タスク
  grunt.registerTask('default', ['watch']);
};
