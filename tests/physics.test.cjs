const {test}=require('node:test');
const assert=require('node:assert/strict');
const p=require('../physics.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('Pascal converts cm² and conserves volume and work',()=>{
 const r=p.pascal(9.81,1,10,10);
 close(r.pressure,98100);close(r.force2,98.1);close(r.stroke2,1);
 close(9.81*10/100,r.force2*r.stroke2/100);
});
test('equal piston areas do not amplify force',()=>{close(p.pascal(100,10,10,5).force2,100);});
test('zero applied force produces zero pressure',()=>{close(p.pascal(0,1,10,10).pressure,0);});
test('hydrostatic examples and surface pressure',()=>{close(p.hydro(1000,1),9810);close(p.hydro(1000,2),19620);close(p.hydro(1000,10),98100);close(p.hydro(850,2,20000),36677);});
test('absolute pressure supports partial vacuum',()=>{close(p.absolute(0,101.325),101.325);close(p.absolute(-80,80),0);close(p.absolute(100,101.325),201.325);});
test('oil contracts 0.4% at 6900 kPa and gas follows Boyle',()=>{close(p.compression(6900).liquid,0.996);close(p.compression(101.325).gas,0.5);close(p.compression(0).gas,1);});
test('flow follows head difference',()=>{assert.ok(p.flow(3,1)>0);assert.ok(p.flow(1,3)<0);close(p.flow(2,2),0);});
