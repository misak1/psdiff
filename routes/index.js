var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);

  // res.render('index', { title: 'aa'});
  const spawn = require('child_process').spawn;
  const ls = spawn('ls', ['-lh', '/usr']);


  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`); 
    res.render('index', { title: "hoge", log: data});
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child s ss exited with code ${code}`);
  });
});
module.exports = router;


// compare -metric AE \
// ./tmp/114418/1.png \
// ./tmp/202440/1.png \
// ./tmp/diff/1.png