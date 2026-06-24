const {JSDOM}=require("jsdom");
const fs=require("fs");const path=require("path");
const dir=__dirname+"/..";
const appjs=fs.readFileSync(path.join(dir,"assets","app.js"),"utf8");
let pass=0,fail=0;
function ok(c,m){if(c){pass++;}else{fail++;console.log("  ✗ "+m);}}

function loadPage(file,inline){
  const html=fs.readFileSync(path.join(dir,file),"utf8");
  const dom=new JSDOM(html,{runScripts:"outside-only",pretendToBeVisual:true,url:"https://x/"+file});
  const w=dom.window;
  w.localStorage.clear();
  // run app.js then inline scripts
  w.eval(appjs);
  w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(s=>s[1]);
  scripts.forEach(s=>{try{w.eval(s);}catch(e){console.log("inline err in "+file+": "+e.message);}});
  w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
  return w;
}

console.log("TEST: index.html i18n + lang toggle");
{
  const w=loadPage("index.html");
  const title=w.document.querySelector("[data-i18n='app_name']");
  ok(title&&title.textContent==="SafeDismiss","app_name EN renders");
  ok(w.document.documentElement.dir==="ltr","default dir ltr");
  w.SD.setLang("ar");
  ok(w.document.documentElement.dir==="rtl","AR sets rtl");
  ok(title.textContent.length>0&&title.textContent!=="app_name","AR app_name renders");
}

console.log("TEST: moderator security toggle");
{
  const w=loadPage("moderator.html");
  const before=w.SD.state().securityRequired;
  w.document.getElementById("secToggle").click();
  ok(w.SD.state().securityRequired!==before,"toggle flips securityRequired");
  const badge=w.document.getElementById("secBadge");
  ok(badge.textContent.length>0,"security badge has text");
  // QR grid
  ok(w.document.querySelectorAll("#qrGrid .qr").length===w.SD.state().students.length,"QR grid count matches students");
  // audit rows
  ok(w.document.querySelectorAll("#auditBody tr").length>=4,"audit rows render");
}

console.log("TEST: admin first-login + override decisions");
{
  const w=loadPage("admin.html");
  const flBefore=w.SD.state().firstLogins.length;
  ok(w.document.querySelectorAll("#firstLogins .btn-success").length===flBefore,"approve buttons match first-logins");
  w.document.querySelector("#firstLogins .btn-success").click();
  ok(w.SD.state().firstLogins.length===flBefore-1,"approving removes a first-login");
  // override approve
  const ap=w.document.querySelector("#ovBody [data-act='ap']");
  ok(!!ap,"override approve button exists");
  ap.click();
  ok(w.SD.state().overrides[0].status==="approved","override marked approved");
}

console.log("TEST: parent flow");
{
  const w=loadPage("parent.html");
  // onboard gate
  ok(!w.document.getElementById("app").classList.contains("hidden")===false,"app hidden before accept");
  w.document.getElementById("agree").checked=true;
  w.document.getElementById("agree").dispatchEvent(new w.Event("change"));
  ok(!w.document.getElementById("enter").disabled,"enter enabled after agree");
  w.document.getElementById("enter").click();
  ok(!w.document.getElementById("app").classList.contains("hidden"),"app visible after accept");
  // kids rendered (Tariq Jaber has 4)
  const kidCards=w.document.querySelectorAll("#kids > .card");
  ok(kidCards.length===4,"four kids rendered for Tariq Jaber, got "+kidCards.length);
  // announce on car kid
  const ann=w.document.querySelector("[data-announce]");
  ok(!!ann,"announce button present");
}

console.log("TEST: security release");
{
  const w=loadPage("security.html");
  const qBefore=w.SD.state().students.filter(s=>s.status==="inqueue").length;
  ok(w.document.querySelectorAll("#queueBody tr").length===qBefore,"queue rows match inqueue count");
  // release buttons disabled before scan
  const disabled=[...w.document.querySelectorAll("#queueBody [data-rel]")].every(b=>b.disabled);
  ok(disabled,"release buttons disabled before scan");
}

console.log("TEST: dashboard metrics");
{
  const w=loadPage("dashboard.html");
  ok(w.document.getElementById("kQueue").textContent!=="—","queue metric computed");
  ok(w.document.querySelectorAll("#activity > div").length>=4,"activity feed rendered");
  ok(w.document.querySelectorAll("#methodSplit > div").length===2,"method split bars rendered");
}

console.log("TEST: dynamic day-scoped pickup QR");
{
  const w=loadPage("parent.html");
  const st=w.SD.state();
  const carKid=st.students.find(s=>s.method==="car");
  const busKid=st.students.find(s=>s.method==="bus2"&&!st.overrides.some(o=>o.student===s.name_en)&&s.status!=="inqueue");
  const infoCar=w.SD.pickupInfo(carKid);
  ok(infoCar.eligible,"car kid gets a pickup QR");
  ok(infoCar.payload.indexOf(w.SD.dateStr())>-1,"payload embeds today's date");
  ok(infoCar.token===w.SD.dayToken(carKid.id+"|"+infoCar.ref),"token is deterministic for the day");
  const infoBus=w.SD.pickupInfo(busKid);
  ok(!infoBus.eligible&&infoBus.reason==="need","bus-only kid without override has no pickup QR");
  // token rotates by day
  const fakeSeed="X|REF";
  const realToday=w.SD.dayToken(fakeSeed);
  ok(typeof realToday==="string"&&realToday.length===7,"dayToken is a 7-char code");
  // approve an override -> ref becomes the override id
  const ov=st.overrides[0];ov.status="approved";ov.date=w.SD.dateStr();
  const stu=st.students.find(s=>s.name_en===ov.student);
  if(stu){const info=w.SD.pickupInfo(stu);ok(info.eligible&&info.ref===ov.id,"approved override yields override-scoped QR ref");}
}

console.log("TEST: iteration-2 features (notifications, co-parent, search)");
{
  const w=loadPage("parent.html");
  // notification bell present + notify increments unread
  ok(!!w.document.querySelector("[data-bell]"),"notification bell rendered");
  const before=w.SD.state().notifications.length;
  w.SD.notify("hello en","مرحبا","success",true);
  ok(w.SD.state().notifications.length===before+1,"notify appends a notification");
  // co-parent switcher exists and flips name
  w.document.getElementById("agree").checked=true;
  w.document.getElementById("agree").dispatchEvent(new w.Event("change"));
  w.document.getElementById("enter").click();
  const name1=w.document.getElementById("profileName").textContent;
  w.document.getElementById("switchProfile").click();
  const name2=w.document.getElementById("profileName").textContent;
  ok(name1!==name2,"profile switch changes the active guardian");
}
{
  const w=loadPage("security.html");
  // search filters by parent name
  w.document.getElementById("phoneSearch").value="Jaber";
  w.document.getElementById("searchBtn").click();
  const res=w.document.getElementById("searchResult").textContent;
  ok(res.indexOf("Jaber")>-1,"phone/name search filters the active queue");
  // non-matching query yields no match
  w.document.getElementById("phoneSearch").value="zzzzz";
  w.document.getElementById("searchBtn").click();
  ok(w.document.getElementById("searchResult").textContent.length>0,"non-match shows a message");
}

console.log("TEST: iteration-3 features (outdoor mode, audit filter/export, reset)");
{
  const w=loadPage("security.html");
  const out=w.document.getElementById("outdoor");
  ok(!!out,"outdoor mode toggle present");
  out.checked=true;out.dispatchEvent(new w.Event("change"));
  ok(w.document.body.classList.contains("hi-contrast"),"outdoor mode adds hi-contrast class");
  ok(w.localStorage.getItem("sd_outdoor")==="1","outdoor preference persisted");
}
{
  const w=loadPage("moderator.html");
  // switch to audit tab
  [...w.document.querySelectorAll("#tabs .tab")].find(t=>t.dataset.tab==="audit").click();
  const total=w.document.querySelectorAll("#auditBody tr").length;
  ok(total>=4,"audit rows render");
  const af=w.document.getElementById("auditFilter");
  af.value="Released";af.dispatchEvent(new w.Event("input"));
  const filtered=w.document.querySelectorAll("#auditBody tr").length;
  ok(filtered<total&&filtered>=1,"audit filter narrows rows ("+filtered+"/"+total+")");
  ok(typeof w.Blob!=="undefined","Blob available for CSV export");
  ok(!!w.document.getElementById("exportCsv"),"export CSV button present");
  // reset link present in footer
  ok(!!w.document.querySelector("[data-reset-demo]"),"reset demo control present in footer");
}

console.log("TEST: grade bands & per-kid override windows");
{
  const w=loadPage("parent.html");
  // band mapping
  ok(w.SD.bandForGrade("KG2").id==="kg","KG2 maps to kg band");
  ok(w.SD.bandForGrade("3-A").id==="lower","grade 3 maps to lower band");
  ok(w.SD.bandForGrade("5-B").id==="upper","grade 5 maps to upper band");
  // KG dismissal earlier than upper
  const bands=w.SD.gradeBands();
  const kg=bands.find(b=>b.id==="kg"),up=bands.find(b=>b.id==="upper");
  ok(kg.dismissal<up.dismissal,"KG dismissal time is earlier than upper grades");
  // per-kid override deadline derives from the kid's band
  const st=w.SD.state();
  const kgKid=st.students.find(s=>w.SD.bandForGrade(s.grade).id==="kg");
  const upKid=st.students.find(s=>w.SD.bandForGrade(s.grade).id==="upper");
  const oKg=w.SD.overrideInfoFor(kgKid),oUp=w.SD.overrideInfoFor(upKid);
  ok(oKg.deadline.getTime()<oUp.deadline.getTime(),"KG override cutoff is earlier than upper-grade cutoff");
  ok(oKg.mins===(st.overrideDeadlineMin||30),"override minutes come from school setting");
  // Tariq Jaber has kids across different levels
  const fam=st.students.filter(s=>s.parent==="Tariq Jaber");
  const levels=new Set(fam.map(s=>w.SD.bandForGrade(s.grade).id));
  ok(levels.size>=2,"parent has children in different dismissal levels ("+[...levels].join(",")+")");
}

console.log("TEST: multi-kid invite (name / id / level)");
{
  const w=loadPage("moderator.html");
  // open invite tab
  [...w.document.querySelectorAll("#tabs .tab")].find(t=>t.dataset.tab==="invite").click();
  const rowsBefore=w.document.querySelectorAll("#kidRows [data-kid]").length;
  ok(rowsBefore>=1,"an initial child row is present");
  w.document.getElementById("addKid").click();
  ok(w.document.querySelectorAll("#kidRows [data-kid]").length===rowsBefore+1,"Add child appends a row");
  // each row has name, id and level (band) fields
  const row=w.document.querySelector("#kidRows [data-kid]");
  ok(row.querySelector(".k-name")&&row.querySelector(".k-id")&&row.querySelector(".k-band"),"row has Name, ID and Level fields");
  ok(row.querySelector(".k-band").options.length===w.SD.gradeBands().length,"Level dropdown lists all dismissal bands");
  // fill two kids in different levels and send
  const rows=[...w.document.querySelectorAll("#kidRows [data-kid]")];
  rows[0].querySelector(".k-name").value="Test KGKid";rows[0].querySelector(".k-id").value="S-9001";rows[0].querySelector(".k-band").value="kg";
  rows[1].querySelector(".k-name").value="Test BigKid";rows[1].querySelector(".k-id").value="S-9002";rows[1].querySelector(".k-band").value="upper";
  const before=w.SD.state().students.length;
  w.document.getElementById("sendInvite").click();
  ok(w.SD.state().students.length===before+2,"sending invite creates both children");
  const k1=w.SD.state().students.find(s=>s.id==="S-9001");
  ok(k1&&w.SD.bandForGrade(k1.grade).id==="kg","created KG child maps to kg dismissal level");
}

console.log("TEST: admin editable dismissal time frames");
{
  const w=loadPage("admin.html");
  const inputs=w.document.querySelectorAll("#bandConfig input[type='time']");
  ok(inputs.length===w.SD.gradeBands().length,"one editable dismissal time per band");
  inputs[0].value="11:15";inputs[0].dispatchEvent(new w.Event("change"));
  ok(w.SD.gradeBands()[0].dismissal==="11:15","editing a band updates its dismissal time in state");
}

console.log("TEST: updated school/parents/kids data + Arabic");
{
  const w=loadPage("index.html");
  // school name bilingual
  ok(w.SD.t("school_name")==="Fareed Star Academy School","school name EN");
  w.SD.setLang("ar");
  ok(w.SD.t("school_name").indexOf("فريد ستار")>-1,"school name AR");
  ok(w.SD.personName("Tariq Jaber").indexOf("طارق")>-1,"parent name localizes to Arabic");
  w.SD.setLang("en");
  const st=w.SD.state();
  // two families with the expected kids
  const jaber=st.students.filter(s=>s.parent==="Tariq Jaber").map(s=>s.name_en);
  const yousef=st.students.filter(s=>s.parent==="Fadi Yousef").map(s=>s.name_en);
  ok(jaber.length===4 && jaber.indexOf("Bisan Jaber")>-1 && jaber.indexOf("Saad Jaber")>-1,"Tariq Jaber has 4 kids incl Bisan & Saad");
  ok(yousef.length===3 && yousef.indexOf("Mesk Yousef")>-1 && yousef.indexOf("Ismael Yousef")>-1,"Fadi Yousef has 3 kids incl Mesk & Ismael");
  // every kid has Arabic name + phone
  ok(st.students.every(s=>s.name_ar && s.phone),"every student has an Arabic name and a phone");
  // phone matches the parent
  ok(st.students.filter(s=>s.parent==="Tariq Jaber").every(s=>s.phone==="0790112233"),"Jaber kids carry Tariq's phone");
  // override-blocked message uses the new school phone
  ok(w.SD.t("override_blocked").indexOf("0791234567")>-1,"override-blocked message shows new school phone");
}

console.log("TEST: an override window is open (parent can request override)");
{
  const w=loadPage("parent.html");
  const st=w.SD.state();
  // demo guarantees at least one band's override window is currently open
  const openKid=st.students.find(s=>w.SD.overrideInfoFor(s).open);
  ok(!!openKid,"at least one kid can currently request an override");
  // Tariq Jaber (the default parent view) has an openable kid
  const tariqOpen=st.students.filter(s=>s.parent==="Tariq Jaber").some(s=>w.SD.overrideInfoFor(s).open);
  ok(tariqOpen,"Tariq Jaber has at least one child whose override window is open");
  // and the youngest band remains closed so the blocked case is still demoable
  const anyClosed=st.students.some(s=>!w.SD.overrideInfoFor(s).open);
  ok(anyClosed,"the blocked (window-closed) case is still demonstrable");
}

console.log("\n"+(fail?("FAILED: "+fail+" / passed "+pass):("ALL "+pass+" RUNTIME TESTS PASSED ✅")));
process.exit(fail?1:0);
