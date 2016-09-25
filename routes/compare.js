var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req);

  // res.render('index', { title: 'aa'});
  const spawn = require('child_process').spawn;
  // const ls = spawn('compare', ['-verbose', '-metric', 'AE', './uploaded/744e4a690f71c7de3d5db480ce08e92a.psd', './uploaded/e7462c08a560ff155508d3867e099654.psd', './tmp/2.png']);
  const ls = spawn('compare', ['-verbose', '-metric', 'AE', './uploaded/744e4a690f71c7de3d5db480ce08e92a', './uploaded/e7462c08a560ff155508d3867e099654', './public/images/tmp/2.png']);
  // const ls = spawn('composite', ['-verbose', '-compose', 'difference', './uploaded/744e4a690f71c7de3d5db480ce08e92a.psd', './uploaded/e7462c08a560ff155508d3867e099654.psd', './tmp/3.png']);
  
  // 黒背景比較composite -compose difference TEST_1.jpg TEST_3.jpg diff_4.jpg
  // res.render('index', { title: "hoge", log: "data"});
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {


    // console.log(`child s ss exited with code ${code}`);
    // const ls2 = spawn('composite', ['-verbose', '-compose', 'difference', './uploaded/744e4a690f71c7de3d5db480ce08e92a.psd', './tmp/3.png', './tmp/4.png']);
    //   ls2.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    // ls2.stderr.on('data', (data) => {
    //   console.log(`stderr: ${data}`);
    // });

    // ls2.on('close', (code) => {
      // res.render('index', { title: "hoge", log: './public/images/tmp/2.png' });
      res.render('compare', { title: "hoge", log: './images/tmp/2.png' });
      
    // });

  });
});
module.exports = router;

