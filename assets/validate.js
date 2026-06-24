const fs=require("fs");const path=require("path");
const dir=process.argv[2]||".";
const files=fs.readdirSync(dir).filter(f=>f.endsWith(".html"));
const appjs=fs.readFileSync(path.join(dir,"assets","app.js"),"utf8");

// extract i18n keys defined in dictionary
const dictKeys=new Set();
const dictMatch=appjs.match(/const I18N\s*=\s*{([\s\S]*?)\n  };/);
if(dictMatch){
  const re=/^\s*([a-z0-9_]+)\s*:\s*{/gim;let m;
  while((m=re.exec(dictMatch[1])))dictKeys.add(m[1]);
}
let errors=0;
console.log("Dictionary keys:",dictKeys.size);

for(const f of files){
  const html=fs.readFileSync(path.join(dir,f),"utf8");
  // check data-i18n keys exist
  const re=/data-i18n(?:-ph)?="([^"]+)"/g;let m;const missing=new Set();
  while((m=re.exec(html))){if(!dictKeys.has(m[1]))missing.add(m[1]);}
  if(missing.size){console.log("["+f+"] MISSING i18n keys:",[...missing].join(", "));errors+=missing.size;}
  // check internal links exist
  const lre=/href="([^"#:]+\.html)(?:\?[^"]*)?"/g;
  while((m=lre.exec(html))){const target=m[1];if(!fs.existsSync(path.join(dir,target))){console.log("["+f+"] BROKEN link:",target);errors++;}}
  // check script/style refs
  const sre=/(?:src|href)="(assets\/[^"]+)"/g;
  while((m=sre.exec(html))){if(!fs.existsSync(path.join(dir,m[1]))){console.log("["+f+"] MISSING asset:",m[1]);errors++;}}
}

// basic JS syntax check via vm compile
const vm=require("vm");
try{new vm.Script(appjs);console.log("app.js: syntax OK");}catch(e){console.log("app.js SYNTAX ERROR:",e.message);errors++;}

// check inline scripts compile
for(const f of files){
  const html=fs.readFileSync(path.join(dir,f),"utf8");
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  scripts.forEach((s,i)=>{
    try{new vm.Script(s[1]);}catch(e){console.log("["+f+"] inline script #"+i+" SYNTAX ERROR:",e.message);errors++;}
  });
}

console.log(errors?("\nTOTAL ISSUES: "+errors):"\nALL CHECKS PASSED ✅");
process.exit(errors?1:0);
