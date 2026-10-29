const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function setup(reduced=false){
 const nodes=new Map();
 function node(id){if(!nodes.has(id))nodes.set(id,{value:id==='#example-pressure'?'60':'0',innerHTML:'',textContent:'',setAttribute(){}});return nodes.get(id);}
 let next=0;const frames=new Map();
 const ctx=vm.createContext({document:{querySelector:node,querySelectorAll:()=>[]},fmt:n=>String(Math.round(n*10)/10),Physics:require('../physics.js'),window:{matchMedia:()=>({matches:reduced})},requestAnimationFrame:cb=>{frames.set(++next,cb);return next;},cancelAnimationFrame:id=>frames.delete(id)});
 vm.runInContext(fs.readFileSync(require.resolve('../examples.js'),'utf8'),ctx);
 function tick(t){const callbacks=[...frames.values()];frames.clear();callbacks.forEach(cb=>cb(t));}
 return {node,tick,read:expr=>vm.runInContext(expr,ctx)};
}
test('pressure waits for contact, rises equally, pauses, resumes and stops at target',()=>{
 const a=setup();a.node('#pressure-play').onclick();a.tick(0);a.tick(650);
 assert.equal(a.read('pressureValues(pressureProgress,60).pressure'),0);
 a.tick(3250);
 const p=a.read('pressureValues(pressureProgress,60).pressure');assert.ok(p>0&&p<60);
 const values=[...a.node('#pressure-readings').innerHTML.matchAll(/<strong>(.*?)<\/strong>/g)].map(x=>x[1]);assert.equal(values.length,4);assert.equal(new Set(values).size,1);
 a.node('#pressure-play').onclick();const frozen=a.read('pressureProgress');a.tick(5000);assert.equal(a.read('pressureProgress'),frozen);
 a.node('#pressure-play').onclick();a.tick(6000);a.tick(10000);
 assert.equal(a.read('pressureProgress'),1);assert.equal(a.read('pressureRunning'),false);assert.match(a.node('#pressure-observation').textContent,/60 kPa/);
 a.node('#example-pressure').value='0';a.node('#example-pressure').oninput();assert.equal(a.read('pressureProgress'),0);assert.match(a.node('#pressure-readings').innerHTML,/\+0 kPa/);
});
test('reduced motion advances by button and never auto-animates',()=>{
 const a=setup(true);for(let i=0;i<5;i++)a.node('#pressure-play').onclick();
 assert.equal(a.read('pressureProgress'),1);assert.equal(a.read('pressureRunning'),false);
});

test('four pressure arrows share one origin and point outward with equal length',()=>{
 const a=setup();a.node('#pressure-play').onclick();a.tick(0);a.tick(6500);
 const group=a.node('#pressure-scene').innerHTML.match(/<g class="[^"]*">(.*?)<\/g>/)[1];
 const arrows=[...group.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)/g)].map(m=>m.slice(1).map(Number));
 assert.equal(arrows.length,4);
 const vectors=arrows.map(([x,y,ex,ey])=>{assert.equal(x,200);assert.equal(y,200);return [ex-x,ey-y];});
 const lengths=vectors.map(([x,y])=>Math.hypot(x,y));assert.equal(new Set(lengths).size,1);
 assert.ok(vectors.some(([x,y])=>x===0&&y<0));assert.ok(vectors.some(([x,y])=>x===0&&y>0));
 assert.ok(vectors.some(([x,y])=>x<0&&y===0));assert.ok(vectors.some(([x,y])=>x>0&&y===0));
});
