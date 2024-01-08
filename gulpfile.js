const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Tâche pour compiler uniquement style.sass
gulp.task("sass", function () {
    return gulp
        .src("./src/sass/main.sass") // Source du fichier style.sass
        .pipe(sass().on("error", sass.logError)) // Compilation et gestion des erreurs
        .pipe(gulp.dest("./dist/css")); // Destination du fichier compilé
});

// Tâche pour surveiller les changements dans tous les fichiers .sass
gulp.task("watch", function () {
    gulp.watch("./src/sass/**/*.sass", gulp.series("sass")); // Surveillance de tous les fichiers .sass
});
