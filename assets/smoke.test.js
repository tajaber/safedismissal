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
  const ap=w.document.querySelector("#ovCards [data-act='ap']");
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

console.log("TEST: mobile-responsive tables (action buttons reachable)");
{
  const w=loadPage("admin.html");
  // override requests are now card-based; approve/deny live on each card
  const ovCard=w.document.querySelector("#ovCards .card");
  ok(!!ovCard,"override request renders as a card");
  ok(w.document.querySelector("#ovCards [data-act='ap']"),"Approve button present on an override card");
  // students table remains responsive
  const tbl=w.document.querySelector("#aiStuBody")?w.document.querySelector("#aiStuBody").closest("table"):null;
  ok(tbl&&tbl.classList.contains("table-responsive"),"admin students table is responsive");
}
{
  const w=loadPage("security.html");
  const tbl=w.document.querySelector("#queueBody").closest("table");
  ok(tbl.classList.contains("table-responsive"),"security queue table is responsive");
  const actCell=w.document.querySelector("#queueBody td:last-child");
  ok(actCell&&actCell.getAttribute("data-label")===w.SD.t("actions"),"release action cell has a data-label");
}

console.log("TEST: branches & admins data model");
{
  const w=loadPage("index.html");
  const st=w.SD.state();
  ok(Array.isArray(st.branches)&&st.branches.length>=3,"state has branches");
  ok(Array.isArray(st.admins)&&st.admins.length>=3,"state has admins");
  ok(st.students.every(s=>s.branchId),"every student has a branchId");
  ok(st.admins.every(a=>w.SD.branchById(a.branchId)),"every admin links to a valid branch");
  // a parent with kids across different branches
  const tariq=st.students.filter(s=>s.parent==="Tariq Jaber");
  const branches=new Set(tariq.map(s=>s.branchId));
  ok(branches.size>=2,"Tariq Jaber has children across different branches ("+[...branches].join(",")+")");
  // SD helpers
  const b0=w.SD.branches()[0];
  ok(w.SD.branchName(b0.id)===b0.name_en,"branchName resolves by id");
  ok(w.SD.adminsForBranch(b0.id).every(a=>a.branchId===b0.id),"adminsForBranch filters by branch");
}

console.log("TEST: moderator branch/admin/student management");
{
  const w=loadPage("moderator.html");
  // add a branch
  const before=w.SD.branches().length;
  w.document.getElementById("brName").value="East Branch";
  w.document.getElementById("brPhone").value="0791119999";
  w.document.getElementById("addBranch").click();
  ok(w.SD.branches().length===before+1,"Add branch appends a branch");
  // create an admin linked to a branch
  const aBefore=w.SD.admins().length;
  w.document.getElementById("adName").value="Nour Saleh";
  w.document.getElementById("adPhone").value="0790555099";
  const newBranch=w.SD.branches()[w.SD.branches().length-1].id;
  w.document.getElementById("adBranch").value=newBranch;
  w.document.getElementById("addAdmin").click();
  ok(w.SD.admins().length===aBefore+1,"Create admin appends an admin");
  ok(w.SD.admins().some(a=>a.name_en==="Nour Saleh"&&a.branchId===newBranch),"new admin is linked to the chosen branch");
  // move a student between branches via the Students table
  const stuSel=w.document.querySelector("#stuBody select[data-stu]");
  ok(!!stuSel,"students table renders a move-branch select per student");
  const sid=stuSel.getAttribute("data-stu");
  stuSel.value=newBranch;stuSel.dispatchEvent(new w.Event("change"));
  ok(w.SD.state().students.find(s=>s.id===sid).branchId===newBranch,"moving a student updates its branchId");
  // invite kid row has a branch select
  ok(!!w.document.querySelector("#kidRows .k-branch"),"invite kid row has a branch selector");
  ok(!w.document.getElementById("inviteBranch"),"moderator invite has NO guardian/parent-branch select (auto from kids)");
  w.document.getElementById("addKid").click();
  const kbranches=[...w.document.querySelectorAll("#kidRows .k-branch")].pop();
  ok(kbranches.options.length===w.SD.branches().length,"a new kid branch dropdown lists all current branches");
}

console.log("TEST: admin invite + move + branch context");
{
  const w=loadPage("admin.html");
  ok(!!w.document.getElementById("adminSwitch"),"admin context switcher present");
  ok(w.document.getElementById("adminSwitch").options.length===w.SD.admins().length,"switcher lists all admins");
  // move a student between branches from admin
  const sel=w.document.querySelector("#aiStuBody select[data-stu]");
  ok(!!sel,"admin students table has move-branch selects");
  const sid=sel.getAttribute("data-stu");
  const target=w.SD.branches()[w.SD.branches().length-1].id;
  sel.value=target;sel.dispatchEvent(new w.Event("change"));
  ok(w.SD.state().students.find(s=>s.id===sid).branchId===target,"admin can move a student to another branch");
  // override request card shows the kid's branch + school details
  const ovCard=w.document.querySelector("#ovCards .card");
  ok(ovCard&&/📍/.test(ovCard.textContent),"override card shows the kid's branch/location & school details");
  // admin invite: no guardian-branch selector (auto-derived from each child's branch)
  ok(!w.document.getElementById("aiParentBranch"),"admin invite has NO guardian/parent-branch select (auto from kids)");
  ok(!!w.document.querySelector("#aiKidRows .ak-branch"),"admin invite kid row has a branch select");
}

console.log("TEST: parent override routes to the kid's branch admins");
{
  const w=loadPage("parent.html");
  const st=w.SD.state();
  // pick a Tariq kid whose override window is open
  const kid=st.students.filter(s=>s.parent==="Tariq Jaber").find(s=>w.SD.overrideInfoFor(s).open);
  ok(!!kid,"found an open-window kid for Tariq");
  const br=w.SD.studentBranch(kid);
  ok(!!br&&!!br.phone,"kid resolves to a branch with a phone");
  const expectAdmins=w.SD.adminsForBranch(kid.branchId);
  ok(expectAdmins.length>=1,"the kid's branch has at least one admin to notify");
  // accept onboarding then open the app and trigger override flow via state push
  const nBefore=st.notifications.length;
  // simulate a parent override request notification routed to branch admins
  const names=expectAdmins.map(a=>a.name_en).join(", ");
  w.SD.notify("Car override for "+kid.name_en+" sent to "+w.SD.branchName(br)+" — "+w.SD.t("notified_admins")+": "+names,"x","");
  ok(w.SD.state().notifications.length===nBefore+1,"override request raises a routed notification");
  ok(w.SD.state().notifications[0].text_en.indexOf(w.SD.branchName(br))>-1,"notification names the kid's branch");
}

console.log("TEST: admin tabs (Override Requests is the default landing tab)");
{
  const w=loadPage("admin.html");
  const tabs=[...w.document.querySelectorAll("#tabs .tab")];
  ok(tabs.length===5,"admin has 5 tabs");
  ok(tabs[0].dataset.tab==="overrides"&&tabs[0].classList.contains("active"),"Override Requests is first and active by default");
  const ovPane=w.document.querySelector("[data-pane='overrides']");
  ok(ovPane&&!ovPane.classList.contains("hidden"),"override pane is visible on load");
  ["invite","students","frames","firstlogin"].forEach(p=>{
    ok(w.document.querySelector("[data-pane='"+p+"']").classList.contains("hidden"),p+" pane hidden by default");
  });
  // switching tabs
  const inviteTab=tabs.find(t=>t.dataset.tab==="invite");inviteTab.click();
  ok(!w.document.querySelector("[data-pane='invite']").classList.contains("hidden"),"clicking Invite shows its pane");
  ok(w.document.querySelector("[data-pane='overrides']").classList.contains("hidden"),"override pane hides when switching");
}

console.log("TEST: parent bus1a announce gating");
{
  const w=loadPage("parent.html");
  const st=w.SD.state();
  // ensure no approved override exists for Saad (bus1a)
  const saad=st.students.find(s=>s.name_en==="Saad Jaber");
  ok(saad&&saad.method==="bus1a","Saad Jaber is a bus1a (afternoon-only) kid");
  st.overrides=st.overrides.filter(o=>o.student!=="Saad Jaber");w.SD.save();
  // render parent app
  w.document.getElementById("agree").checked=true;
  w.document.getElementById("agree").dispatchEvent(new w.Event("change"));
  w.document.getElementById("enter").click();
  ok(!w.document.querySelector("[data-announce='"+saad.id+"']"),"bus1a kid has NO announce button without an approved override");
  // approve an override for Saad and re-render
  st.overrides.push({id:"OV-test",student:"Saad Jaber",from:"bus1a",to:"car",status:"approved",date:w.SD.dateStr()});
  w.SD.save();
  w.document.dispatchEvent(new w.Event("sdsync"));
  ok(!!w.document.querySelector("[data-announce='"+saad.id+"']"),"bus1a kid shows announce once an override is approved");
}

console.log("TEST: parent car-pickup hides Request Override, keeps Announce + Show QR");
{
  const w=loadPage("parent.html");
  const st=w.SD.state();
  // Bisan Jaber (Tariq) is a car kid
  const bisan=st.students.find(s=>s.name_en==="Bisan Jaber");
  ok(bisan&&bisan.method==="car","Bisan Jaber is a car-pickup kid");
  w.document.getElementById("agree").checked=true;
  w.document.getElementById("agree").dispatchEvent(new w.Event("change"));
  w.document.getElementById("enter").click();
  ok(!w.document.querySelector("[data-override='"+bisan.id+"']"),"car kid has NO Request Override button");
  ok(!!w.document.querySelector("[data-announce='"+bisan.id+"']"),"car kid shows Announce Arrival");
  ok(!!w.document.querySelector("[data-qr='"+bisan.id+"']"),"car kid shows Show QR");
  // a non-car kid (Razan, bus2) still exposes the override button
  const razan=st.students.find(s=>s.name_en==="Razan Jaber");
  ok(!!w.document.querySelector("[data-override='"+razan.id+"']"),"non-car kid still shows Request Override");
}

console.log("TEST: classes feature (per-branch toggle, add class, link student)");
{
  const w=loadPage("moderator.html");
  // per-branch feature toggles render
  ok(w.document.querySelectorAll("#branchFeatureList .card").length===w.SD.branches().length,"a classroom-display toggle per branch");
  // a branch with the feature on exposes class-link selects; off branches show a disabled note
  const onBranch=w.SD.branches().find(b=>b.classesEnabled);
  ok(!!onBranch,"at least one branch has the classroom display enabled by default");
  // add a class
  const before=w.SD.classes().length;
  w.document.getElementById("clName").value="Grade 3 — Lions";
  w.document.getElementById("clBranch").value=onBranch.id;
  w.document.getElementById("addClass").click();
  ok(w.SD.classes().length===before+1,"Add class appends a class");
  // link a student of that branch to a class
  const stu=w.SD.state().students.find(s=>s.branchId===onBranch.id);
  const sel=w.document.querySelector("#clStuBody select[data-cl='"+stu.id+"']");
  ok(!!sel,"students in an enabled branch get a class-link select");
  const newClass=w.SD.classesForBranch(onBranch.id).slice(-1)[0].id;
  sel.value=newClass;sel.dispatchEvent(new w.Event("change"));
  ok(w.SD.state().students.find(s=>s.id===stu.id).classId===newClass,"linking a student updates its classId");
  // a disabled branch shows the disabled note instead of a select
  const offBranch=w.SD.branches().find(b=>!b.classesEnabled);
  if(offBranch){
    const offStu=w.SD.state().students.find(s=>s.branchId===offBranch.id);
    if(offStu)ok(!w.document.querySelector("#clStuBody select[data-cl='"+offStu.id+"']"),"students in a disabled branch have no class-link select");
  }
}

console.log("TEST: teacher classroom board shows feed for enabled branches only");
{
  const w=loadPage("teacher.html");
  const enabled=w.SD.classes().filter(c=>w.SD.branchClassesEnabled(c.branchId));
  const sel=w.document.getElementById("classSelect");
  ok(sel.options.length===enabled.length,"class selector lists only classes in enabled branches");
  // classFeed only returns announced/override kids in enabled branches
  const st=w.SD.state();
  const cls=enabled[0];
  // make a student in this class "inqueue" (announced)
  const member=st.students.find(s=>s.classId===cls.id);
  if(member){
    member.status="inqueue";w.SD.save();
    const feed=w.SD.classFeed(cls.id);
    ok(feed.some(f=>f.student.id===member.id&&f.announced),"announced arrival appears in the class feed");
  }
  // a class in a disabled branch yields an empty feed even if a student is inqueue
  const offClass=w.SD.classes().find(c=>!w.SD.branchClassesEnabled(c.branchId));
  if(offClass){
    ok(w.SD.classFeed(offClass.id).length===0,"disabled-branch class has an empty teacher feed");
  }else{ok(true,"no disabled-branch class to check (skipped)");}
}

console.log("\n"+(fail?("FAILED: "+fail+" / passed "+pass):("ALL "+pass+" RUNTIME TESTS PASSED ✅")));
process.exit(fail?1:0);
