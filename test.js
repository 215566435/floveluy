const globby = require('globby')

const filepaths = globby.sync(['**/*.js'], { cwd: '/Users/Floveluy/Desktop/floveluy/build/app/service' });
console.log(filepaths);