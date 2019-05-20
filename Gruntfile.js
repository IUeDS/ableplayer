module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-jshint');

    var config = {
        src: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: [
                    // Ultimately this should be just 'scripts/*.js',
                    //  but for now we're maintaining the order which was
                    //  specified in the previous 'compile.sh' script
                    'scripts/ableplayer-base.js',
                    'scripts/initialize.js',
                    'scripts/preference.js',
                    'scripts/webvtt.js',
                    'scripts/buildplayer.js',
                    'scripts/track.js',
                    'scripts/youtube.js',
                    'scripts/slider.js',
                    'scripts/volume.js',
                    'scripts/dialog.js',
                    'scripts/misc.js',
                    'scripts/description.js',
                    'scripts/browser.js',
                    'scripts/control.js',
                    'scripts/caption.js',
                    'scripts/chapters.js',
                    'scripts/metadata.js',
                    'scripts/transcript.js',
                    'scripts/search.js',
                    'scripts/event.js',
                    'scripts/dragdrop.js',
                    'scripts/sign.js',
                    'scripts/langs.js',
                    'scripts/translation.js',
                    'scripts/JQuery.doWhen.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            },
            vendors: {
                src: [
                    'thirdparty/*.js',
                ],
                dest: 'build/js/vendors.js'
            },

        },
        removelogging: {
            dist: {
                src: [
                    'build/js/<%= pkg.name %>.js'
                ],
                dest: 'build/js/<%= pkg.name %>.dist.js'
            },
            options: {
                // Remove all console output (see https://www.npmjs.com/package/grunt-remove-logging)
            }
        },
        uglify: {
            min: {
                src    : ['build/js/<%= pkg.name %>.dist.js'],
                dest   : 'build/js/<%= pkg.name %>.min.js',
            },
            options: {
                // Add a banner with the package name and version
                //  (no date, otherwise a new build is different even if the code didn't change!)
                banner: '/*! <%= pkg.name %> V<%= pkg.version %> */\n',
                // Preserve comments that start with a bang (like the file header)
                preserveComments: "some"
            }
        },
        cssmin: {
            min: {
                src  : [
                    'styles/ableplayer.css',
                ],
                dest : 'build/css/<%= pkg.name %>.min.css',
            },
            options: {
                // Add a banner with the package name and version
                //  (no date, otherwise a new build is different even if the code didn't change!)
                //  (oddly, here we don't need a '\n' at the end!)
                banner: '/*! <%= pkg.name %> V<%= pkg.version %> */',
            }
        },
        copy: {
            
            assets: {
                
                files: [
                    {
                        //button icons
                        src: ['button-icons/**'],  // copy files and folders
                        dest: 'build/',    // destination folder
                        expand: true           // required when using cwd
                    },
                    {
                        //images
                        src: ['images/**'],  // copy files and folders
                        dest: 'build/',    // destination folder
                        expand: true           // required when using cwd
                    },
                    {
                        //translations
                        src: ['translations/**'],  // copy files and folders
                        dest: 'build/',    // destination folder
                        expand: true           // required when using cwd
                    },
                ]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'scripts/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    browser: true,
                    jquery: true,
                    devel: true,
                }
            }
        },
        clean: {
          build: ['build'],
        },

    });

    grunt.registerTask('default', ['concat', 'removelogging', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('test', ['jshint']);
};
