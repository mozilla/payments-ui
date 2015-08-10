var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	insert = require('gulp-insert'),
	webpack = require('gulp-webpack')
;

var packageName = 'react-json-table';
var pack = require( './package.json' );

var getWPConfig = function( filename ){
	return {
		externals: {
			react: {
				root: 'React'
			}
		},
		output: {
			libraryTarget: 'umd',
			library: 'JsonTable',
			filename: filename + '.js'
		}
	};
};

var cr = ('/*\n%%name%% v%%version%%\n%%homepage%%\n%%license%%: https://github.com/arqex/' + packageName + '/raw/master/LICENSE\n*/\n')
	.replace( '%%name%%', pack.name)
	.replace( '%%version%%', pack.version)
	.replace( '%%license%%', pack.license)
	.replace( '%%homepage%%', pack.homepage)
;

function build( config, minify ){
	var stream =  gulp.src('./rjt.js')
		.pipe( webpack( config ) )
	;

	if( minify ){
		stream.pipe( uglify() );
	}

	return stream.pipe( insert.prepend( cr ) )
		.pipe( gulp.dest('build/') )
	;
}

gulp.task("build", function( callback ) {
	build( getWPConfig( packageName ) );
	return build( getWPConfig( packageName + '.min' ), true );
});

gulp.task( 'default', ['build'] );
