module.exports = function (grunt) {
  // Do grunt-related things in here
  const sass = require("sass");

  grunt.initConfig({
    purgecss: {
      my_target: {
        options: {
          content: ['*.html', 'src/*.html', 'assets/js/*.js', '*.js'],
        },
        files: {
          "public/assets/css/style.css": ["src/assets/css/style-ready.css"],
        },
      },
    },
    sass: {
      options: {
        sass: {
          sourceMap: false,
          noCache: true,
        },
      },
      main: {
        files: {
          "src/assets/css/style-ready.css": "src/assets/scss/main.scss",
        },
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "src/assets/css",
            src: ["*.css", "!*.min.css", "!style-ready.css"],
            dest: "src/assets/css/min",
            ext: ".min.css",
          },
        ],
      },
    },
    uglify: {
      target: {
        files: {
          "src/assets/js/min/script.min.js": ["src/assets/js/script.js"],
          "src/assets/js/min/form.min.js": ["src/assets/js/form.js"],
        },
      },
    },
    autoprefixer: {
      options: {
        browsers: ["> 0.3%", "last 7 versions", "ie > 7", "ff > 3.4", "chrome > 3", "safari > 3"],
      },
      dist: {
        // Target
        files: {
          "src/assets/css/style.css": "src/assets/css/style-ready.css",
        },
      },
    },
    clean: {
      all_css: ["src/assets/css/**/*.css"],
      css_map: ["src/assets/css/*.map"],
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 9001,
          protocol: "http",
          hostname: "localhost",
          base: ".",
          open: true,
        },
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      sass: {
        // You need a task, can be any string
        files: ["src/**/*.scss", "!**/*.css", "!**/*.map"],
        tasks: ["css"],
      },
      js: {
        // You need a task, can be any string
        files: ["src/**/*.js", "!**/*.min.js"],
        tasks: ["uglify"],
      },
      html: {
        // You need a task, can be any string
        files: ["src/*.html"],
      },
    },
    copy: {
      main: {
        files: [
          // includes files within path
          { expand: true, cwd: "src/", src: ["*.html"], dest: "public/" },
          { expand: true, cwd: "src/", src: ["assets/css/min/*.min.css"], dest: "public/" },
          { expand: true, cwd: "src/", src: ["assets/js/min/*.min.js"], dest: "public/" },
          { expand: true, cwd: "src/", src: ["img/**/*"], dest: "public/" },
        ],
      },
    },
  });

  grunt.registerTask("clean", ["clean"]);
  grunt.registerTask("css", ["sass", "autoprefixer", "cssmin"]);
  grunt.registerTask("public", ["purgecss", "copy"]);
  grunt.registerTask("default", ["connect", "watch"]);

  // Load up tasks
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-sass-scss");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-purgecss");
  grunt.loadNpmTasks("grunt-contrib-copy");
};
