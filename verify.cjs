global.window = {};
const fs = require('fs'), cp = require('child_process');
for (const f of ['part1','part2','part3','part4']) eval(fs.readFileSync(`data/${f}.js`,'utf8').replace(/^const /gm,'var '));
let bad = 0;
window.LESSONS.forEach((l,i)=>{
  const out = cp.spawnSync('python3',['-I','-c',l.solution],{input:l.stdin,encoding:'utf8'});
  const got=(out.stdout||'').trim(), exp=l.expected.trim();
  if(got!==exp){bad++;console.log(`#${i+1} ${l.title}\n--got--\n${got}\n--exp--\n${exp}\n${out.stderr}`)}
});
console.log(window.LESSONS.length+' lessons, '+bad+' mismatches');
