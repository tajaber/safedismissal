/* SafeDismiss prototype — shared i18n + state + UI helpers */
(function(){
  "use strict";

  /* ---------------- i18n dictionary ---------------- */
  const I18N = {
    app_name:{en:"SafeDismiss",ar:"الانصراف الآمن"},
    tagline:{en:"Safe, fast, and verified school dismissal",ar:"انصراف مدرسي آمن وسريع ومُتحقَّق منه"},
    nav_home:{en:"Home",ar:"الرئيسية"},
    choose_role:{en:"Choose your role to explore the prototype",ar:"اختر دورك لاستكشاف النموذج"},
    role_moderator:{en:"School Moderator",ar:"مشرف المدرسة"},
    role_moderator_d:{en:"Register school, invite parents, manage QR, audit logs & security policy",ar:"تسجيل المدرسة ودعوة أولياء الأمور وإدارة رموز QR والسجلات وسياسة الأمن"},
    role_admin:{en:"Dismissal Admin",ar:"مسؤول الانصراف"},
    role_admin_d:{en:"Approve first logins, set dismissal methods, deadlines & override decisions",ar:"اعتماد أول دخول وضبط طرق الانصراف والمواعيد وقرارات الاستثناء"},
    role_parent:{en:"Parent / Co-Parent",ar:"ولي الأمر / الشريك"},
    role_parent_d:{en:"Accept terms, manage kids, announce arrival, request override, show QR",ar:"قبول الشروط وإدارة الأبناء وإعلان الوصول وطلب الاستثناء وعرض QR"},
    role_security:{en:"Security / Gate",ar:"الأمن / البوابة"},
    role_security_d:{en:"Scan QR, verify identity, confirm release with one tap",ar:"مسح QR والتحقق من الهوية وتأكيد التسليم بلمسة"},
    role_dashboard:{en:"Web Dashboard",ar:"لوحة التحكم"},
    role_dashboard_d:{en:"System-wide summary of users, approvals & live activity",ar:"ملخص شامل للمستخدمين والموافقات والنشاط المباشر"},
    open:{en:"Open",ar:"فتح"},
    back:{en:"Back",ar:"رجوع"},
    next:{en:"Next",ar:"التالي"},
    cancel:{en:"Cancel",ar:"إلغاء"},
    confirm:{en:"Confirm",ar:"تأكيد"},
    save:{en:"Save",ar:"حفظ"},
    approve:{en:"Approve",ar:"اعتماد"},
    deny:{en:"Deny",ar:"رفض"},
    submit:{en:"Submit",ar:"إرسال"},
    close:{en:"Close",ar:"إغلاق"},
    search:{en:"Search",ar:"بحث"},
    status:{en:"Status",ar:"الحالة"},
    actions:{en:"Actions",ar:"إجراءات"},
    student:{en:"Student",ar:"الطالب"},
    grade:{en:"Grade",ar:"الصف"},
    parent:{en:"Parent",ar:"ولي الأمر"},
    method:{en:"Dismissal Method",ar:"طريقة الانصراف"},
    time:{en:"Time",ar:"الوقت"},

    /* auth */
    sign_in:{en:"Sign in",ar:"تسجيل الدخول"},
    secure_login:{en:"Secure Login",ar:"دخول آمن"},
    phone_or_email:{en:"Phone number or email",ar:"رقم الهاتف أو البريد"},
    password:{en:"Password",ar:"كلمة المرور"},
    continue:{en:"Continue",ar:"متابعة"},
    mfa_title:{en:"Two-Factor Verification",ar:"التحقق بخطوتين"},
    mfa_sub:{en:"Enter the 6-digit code sent to your phone ending •• 87",ar:"أدخل الرمز المكوّن من 6 أرقام المُرسل إلى هاتفك المنتهي بـ ٨٧"},
    verify:{en:"Verify & Continue",ar:"تحقق وتابع"},
    resend_code:{en:"Resend code",ar:"إعادة إرسال الرمز"},
    demo_hint:{en:"Demo: any code works",ar:"عرض: أي رمز يعمل"},

    /* moderator */
    mod_dash:{en:"Moderator Console",ar:"لوحة المشرف"},
    tab_overview:{en:"Overview",ar:"نظرة عامة"},
    tab_register:{en:"School Setup",ar:"إعداد المدرسة"},
    tab_invite:{en:"Invite Parents",ar:"دعوة أولياء الأمور"},
    tab_qr:{en:"Kid QR Codes",ar:"رموز QR للأبناء"},
    tab_audit:{en:"Audit Log",ar:"سجل التدقيق"},
    tab_terms:{en:"Terms & Policy",ar:"الشروط والسياسة"},
    security_toggle:{en:"Gate Security Verification",ar:"التحقق الأمني عند البوابة"},
    security_toggle_d:{en:"When ON, a security officer must scan & confirm before any release.",ar:"عند التفعيل، يجب أن يقوم ضابط الأمن بالمسح والتأكيد قبل أي تسليم."},
    required:{en:"Required",ar:"مطلوب"},
    not_required:{en:"Not Required",ar:"غير مطلوب"},
    invite_partner:{en:"Invite Parent & Co-Parent",ar:"دعوة ولي الأمر والشريك"},
    parent_phone:{en:"Parent phone",ar:"هاتف ولي الأمر"},
    parent_email:{en:"Parent email (optional)",ar:"بريد ولي الأمر (اختياري)"},
    coparent_phone:{en:"Co-parent phone",ar:"هاتف الشريك"},
    coparent_email:{en:"Co-parent email (optional)",ar:"بريد الشريك (اختياري)"},
    send_invite:{en:"Send Invitations",ar:"إرسال الدعوات"},
    generate_qr:{en:"Generate QR",ar:"إنشاء QR"},
    download_qr:{en:"Download",ar:"تنزيل"},
    terms_intro:{en:"Parents must accept these terms before first use.",ar:"يجب على أولياء الأمور قبول هذه الشروط قبل أول استخدام."},

    /* admin */
    admin_dash:{en:"Dismissal Admin",ar:"مسؤول الانصراف"},
    pending_first_login:{en:"Pending First-Login Approvals",ar:"موافقات أول دخول المعلّقة"},
    override_requests:{en:"Override Requests",ar:"طلبات الاستثناء"},
    config_methods:{en:"Configure Dismissal Methods",ar:"ضبط طرق الانصراف"},
    override_deadline:{en:"Override Deadline",ar:"الموعد النهائي للاستثناء"},
    deadline_help:{en:"Overrides are blocked within 30 minutes of dismissal.",ar:"تُمنع طلبات الاستثناء خلال 30 دقيقة من موعد الانصراف."},
    bus2:{en:"Bus pickup — 2 ways",ar:"الحافلة — ذهابًا وإيابًا"},
    bus1m:{en:"Bus pickup — 1 way — Morning only",ar:"الحافلة — اتجاه واحد — صباحًا فقط"},
    bus1a:{en:"Bus pickup — 1 way — Afternoon only",ar:"الحافلة — اتجاه واحد — مساءً فقط"},
    car:{en:"Car pick-up",ar:"بالسيارة"},

    /* parent */
    parent_dash:{en:"Parent Dashboard",ar:"لوحة ولي الأمر"},
    my_kids:{en:"My Children",ar:"أبنائي"},
    announce_arrival:{en:"ANNOUNCE ARRIVAL",ar:"إعلان الوصول"},
    announced_queue:{en:"Announced — In Queue",ar:"تم الإعلان — في الطابور"},
    pull_forward:{en:"School notified. Please pull forward into Lane Slot A.",ar:"تم إخطار المدرسة. تقدّم إلى المسار A."},
    request_override:{en:"Request Car Override",ar:"طلب الاستثناء بالسيارة"},
    show_qr:{en:"Show Pickup QR",ar:"عرض رمز الاستلام"},
    accept_terms:{en:"I accept the school's Terms & Conditions",ar:"أوافق على شروط وأحكام المدرسة"},
    accept_invite:{en:"Accept Invitation",ar:"قبول الدعوة"},
    override_blocked:{en:"Override window closed. Please phone the school: +966 11 555 0123",ar:"انتهى وقت طلب الاستثناء. يرجى الاتصال بالمدرسة: ٠١٢٣ ٥٥٥ ١١ ٩٦٦+"},
    override_sent:{en:"Override request sent to the school for approval.",ar:"تم إرسال طلب الاستثناء إلى المدرسة للموافقة."},
    coparent:{en:"Co-Parent",ar:"الشريك"},

    /* security */
    sec_dash:{en:"Gate Release Station",ar:"محطة التسليم بالبوابة"},
    scan_qr:{en:"SCAN PARENT QR",ar:"مسح رمز ولي الأمر"},
    scanning:{en:"Scanning…",ar:"جارٍ المسح…"},
    confirm_release:{en:"CONFIRM RELEASE",ar:"تأكيد التسليم"},
    released_saved:{en:"Released • Timestamped & Saved",ar:"تم التسليم • مُوثّق ومحفوظ"},
    active_queue:{en:"Active Pickup Queue",ar:"طابور الاستلام النشط"},
    search_phone:{en:"Battery dead? Search parent phone",ar:"بطارية فارغة؟ ابحث بهاتف ولي الأمر"},
    verify_identity:{en:"Verify Identity",ar:"التحقق من الهوية"},
    matched:{en:"Identity matched. Release enabled.",ar:"تطابقت الهوية. تم تفعيل التسليم."},

    /* dashboard */
    dash_title:{en:"System Dashboard",ar:"لوحة النظام"},
    total_schools:{en:"Schools",ar:"المدارس"},
    total_parents:{en:"Parents",ar:"أولياء الأمور"},
    total_students:{en:"Students",ar:"الطلاب"},
    pending_approvals:{en:"Pending Approvals",ar:"موافقات معلّقة"},
    releases_today:{en:"Releases Today",ar:"تسليمات اليوم"},
    overrides_today:{en:"Overrides Today",ar:"استثناءات اليوم"},
    live_activity:{en:"Live Activity",ar:"النشاط المباشر"},
    method_split:{en:"Dismissal Method Split",ar:"توزيع طرق الانصراف"},

    /* statuses */
    st_waiting:{en:"Waiting",ar:"بالانتظار"},
    st_inqueue:{en:"In Queue",ar:"في الطابور"},
    st_released:{en:"Released",ar:"تم التسليم"},
    st_pending:{en:"Pending",ar:"معلّق"},
    st_approved:{en:"Approved",ar:"معتمد"},
    st_denied:{en:"Denied",ar:"مرفوض"},
    notif:{en:"Notification",ar:"إشعار"},
    notif_center:{en:"Notifications",ar:"الإشعارات"},
    no_notifs:{en:"No notifications yet",ar:"لا توجد إشعارات بعد"},
    mark_read:{en:"Mark all read",ar:"تعليم الكل كمقروء"},
    skip_content:{en:"Skip to main content",ar:"تخطٍّ إلى المحتوى"},
    switch_profile:{en:"Switch profile",ar:"تبديل الملف"},
    override_closes:{en:"Override closes in",ar:"يغلق الاستثناء خلال"},
    qr_valid_today:{en:"Valid today only — regenerates daily for security",ar:"صالح اليوم فقط — يتجدد يوميًا للأمان"},
    qr_ref:{en:"Approval reference",ar:"مرجع الاعتماد"},
    qr_need_override:{en:"A pickup QR is issued only after the school approves a car override for today.",ar:"يُصدر رمز الاستلام فقط بعد موافقة المدرسة على استثناء السيارة لهذا اليوم."},
    qr_pending:{en:"Your override is awaiting school approval. The pickup QR appears once approved.",ar:"طلب الاستثناء بانتظار موافقة المدرسة. يظهر رمز الاستلام بعد الاعتماد."},
    qr_car_daily:{en:"Daily car pick-up pass",ar:"تصريح الاستلام بالسيارة اليومي"},
    scan_ref:{en:"Verified reference",ar:"المرجع المتحقق"},
    request_first:{en:"Request Car Override",ar:"طلب الاستثناء بالسيارة"},
    outdoor_mode:{en:"Outdoor / high-contrast",ar:"وضع الإضاءة العالية"},
    export_csv:{en:"Export CSV",ar:"تصدير CSV"},
    filter_log:{en:"Filter log…",ar:"تصفية السجل…"},
    reset_demo:{en:"Reset demo",ar:"إعادة ضبط العرض"},
    dismissal_frames:{en:"Dismissal time frames",ar:"أوقات الانصراف حسب المرحلة"},
    grade_band:{en:"Grade band",ar:"المرحلة"},
    dismissal_time:{en:"Dismissal time",ar:"وقت الانصراف"},
    frames_help:{en:"Each grade band can leave at a different time (e.g., KG leaves earlier). The override cutoff is calculated per band.",ar:"يمكن لكل مرحلة المغادرة في وقت مختلف (مثلاً تغادر الروضة مبكرًا). يُحسب موعد إغلاق الاستثناء لكل مرحلة على حدة."},
    cutoff_label:{en:"Override cutoff",ar:"إغلاق الاستثناء"},
    children:{en:"Children",ar:"الأبناء"},
    add_child:{en:"Add child",ar:"إضافة طفل"},
    children_help:{en:"Add one or more children. Each child can be in a different dismissal level (grade band), which sets their dismissal time and override cutoff.",ar:"أضف طفلًا واحدًا أو أكثر. يمكن أن يكون كل طفل في مرحلة انصراف مختلفة، ما يحدد وقت انصرافه وموعد إغلاق الاستثناء."},
    student_name:{en:"Student name",ar:"اسم الطالب"},
    student_id:{en:"Student ID",ar:"رقم الطالب"},
    dismissal_level:{en:"Dismissal level",ar:"مرحلة الانصراف"},
    remove:{en:"Remove",ar:"إزالة"}
  };

  /* ---------------- mock data ---------------- */
  const DEFAULT_STATE = {
    lang:"en",
    securityRequired:true,
    overrideDeadlineMin:30,
    gradeBands:[
      {id:"kg",name_en:"KG1–KG2",name_ar:"روضة ١–٢",dismissal:"12:30"},
      {id:"lower",name_en:"Grades 1–3",name_ar:"الصفوف ١–٣",dismissal:"13:30"},
      {id:"upper",name_en:"Grades 4–6",name_ar:"الصفوف ٤–٦",dismissal:"14:30"}
    ],
    students:[
      {id:"S-1042",name_en:"Layla Al-Harbi",name_ar:"ليلى الحربي",grade:"KG2",method:"bus2",parent:"Noura Al-Harbi",status:"waiting"},
      {id:"S-1043",name_en:"Yousef Al-Harbi",name_ar:"يوسف الحربي",grade:"5-B",method:"car",parent:"Noura Al-Harbi",status:"waiting"},
      {id:"S-1077",name_en:"Sara Mansour",name_ar:"سارة منصور",grade:"1-C",method:"bus1a",parent:"Ahmed Mansour",status:"waiting"},
      {id:"S-1099",name_en:"Omar Khalid",name_ar:"عمر خالد",grade:"4-A",method:"car",parent:"Khalid Saleh",status:"inqueue"},
      {id:"S-1120",name_en:"Hana Tariq",name_ar:"هناء طارق",grade:"KG1",method:"car",parent:"Tariq Aziz",status:"inqueue"}
    ],
    overrides:[
      {id:"OV-301",student:"Sara Mansour",from:"bus1a",to:"car",status:"pending",time:"01:48 PM"}
    ],
    firstLogins:[
      {id:"FL-9",parent:"Tariq Aziz",kid:"Hana Tariq",time:"Today 12:10 PM"},
      {id:"FL-10",parent:"Khalid Saleh",kid:"Omar Khalid",time:"Today 12:32 PM"}
    ],
    audit:[
      {time:"01:31 PM",actor:"Security · Gate 2",event_en:"Released Omar Khalid (QR verified)",event_ar:"تم تسليم عمر خالد (تم التحقق من QR)",type:"released"},
      {time:"01:28 PM",actor:"Admin · Reem",event_en:"Approved override OV-298 (bus→car)",event_ar:"اعتماد استثناء OV-298 (حافلة→سيارة)",type:"approved"},
      {time:"01:15 PM",actor:"Parent · Noura",event_en:"Announced arrival for Yousef Al-Harbi",event_ar:"إعلان وصول ليوسف الحربي",type:"info"},
      {time:"12:32 PM",actor:"System",event_en:"First-login request from Khalid Saleh",event_ar:"طلب أول دخول من خالد صالح",type:"pending"}
    ],
    notifications:[
      {id:"N-1",time:"01:31 PM",text_en:"Omar Khalid released at Gate 2",text_ar:"تم تسليم عمر خالد عند البوابة 2",type:"success",read:false},
      {id:"N-2",time:"12:32 PM",text_en:"New first-login request awaiting approval",text_ar:"طلب أول دخول جديد بانتظار الاعتماد",type:"warn",read:false}
    ]
  };

  const KEY="safedismiss_state_v2";
  function load(){
    try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.students){if(!s.notifications)s.notifications=[];if(!s.gradeBands)s.gradeBands=JSON.parse(JSON.stringify(DEFAULT_STATE.gradeBands));return s;}}catch(e){}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
  function save(s){localStorage.setItem(KEY,JSON.stringify(s));}
  let STATE=load();

  /* ---------------- i18n core ---------------- */
  function curLang(){return STATE.lang||"en";}
  function t(key){const e=I18N[key];if(!e)return key;return e[curLang()]||e.en||key;}
  function applyI18n(){
    const lang=curLang();
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==="ar"?"rtl":"ltr";
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      el.textContent=t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
      el.setAttribute("placeholder",t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll(".lang-toggle button").forEach(b=>{
      b.classList.toggle("active",b.dataset.lang===lang);
    });
    document.dispatchEvent(new CustomEvent("langchange",{detail:{lang}}));
    renderBell();
  }
  function setLang(lang){STATE.lang=lang;save(STATE);applyI18n();}

  /* ---------------- UI helpers ---------------- */
  function toast(msg,type){
    let wrap=document.querySelector(".toast-wrap");
    if(!wrap){wrap=document.createElement("div");wrap.className="toast-wrap";document.body.appendChild(wrap);}
    const el=document.createElement("div");
    el.className="toast "+(type||"");
    el.setAttribute("role","status");
    el.innerHTML="<strong>"+t("notif")+"</strong><br>"+msg;
    wrap.appendChild(el);
    setTimeout(()=>{el.style.opacity="0";el.style.transition="opacity .3s";setTimeout(()=>el.remove(),300);},4200);
  }
  function nowTime(){return new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});}
  function dateStr(d){return (d||new Date()).toISOString().slice(0,10);}
  /* ---- grade bands & per-band dismissal / override deadline ---- */
  function gradeBands(){return STATE.gradeBands||[];}
  /* map a grade label (e.g. "KG2", "3-A", "5-B") to its dismissal band */
  function bandForGrade(grade){
    const bands=gradeBands();
    const g=String(grade||"").toUpperCase().trim();
    let id;
    if(g.indexOf("KG")===0||g.indexOf("PRE")===0||g.indexOf("PK")===0)id="kg";
    else{const n=parseInt(g,10);if(n>=1&&n<=3)id="lower";else if(n>=4)id="upper";else id="upper";}
    return bands.find(b=>b.id===id)||bands[bands.length-1]||{id:"upper",name_en:"Grades 4–6",name_ar:"الصفوف ٤–٦",dismissal:"14:30"};
  }
  function bandName(band){return curLang()==="ar"?band.name_ar:band.name_en;}
  function timeToDate(hhmm,base){
    const d=base?new Date(base):new Date();const p=String(hhmm||"14:30").split(":");
    d.setHours(parseInt(p[0]||"14",10),parseInt(p[1]||"30",10),0,0);return d;
  }
  function fmtTime(hhmm){
    const d=timeToDate(hhmm);
    return d.toLocaleTimeString(curLang()==="ar"?"ar":"en-US",{hour:"2-digit",minute:"2-digit"});
  }
  /* per-student override window, computed from that student's grade band */
  function overrideInfoFor(student){
    const band=bandForGrade(student.grade);
    const dismissal=timeToDate(band.dismissal);
    const mins=STATE.overrideDeadlineMin||30;
    const deadline=new Date(dismissal.getTime()-mins*60000);
    const msLeft=deadline-new Date();
    return {band,dismissal,deadline,mins,msLeft,open:msLeft>0};
  }
  /* deterministic, day-scoped pickup token (rotates each calendar day) */
  function dayToken(seed){
    let h=2166136261>>>0;const s=String(seed)+"|"+dateStr();
    for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}
    return ("000000"+h.toString(36).toUpperCase()).slice(-7);
  }
  /* resolve whether a student has a valid pickup QR for TODAY and build its payload.
     A pickup QR is only issued when (a) the school approved a car override today, or
     (b) the kid is configured for car pick-up (daily car pass). Each override approval
     yields its own day-scoped, single-day token — yesterday's QR will not validate. */
  function pickupInfo(student){
    const today=dateStr();
    const ov=STATE.overrides.find(o=>o.student===student.name_en&&o.status==="approved"&&(o.date===today||!o.date));
    let ref;
    if(ov){ref=ov.id;ov.date=today;}
    else if(student.method==="car"){ref="CAR-"+today;}
    else if(student.status==="inqueue"){ref="ARR-"+today;}
    else{
      const pend=STATE.overrides.find(o=>o.student===student.name_en&&o.status==="pending");
      return {eligible:false,reason:pend?"pending":"need"};
    }
    const token=dayToken(student.id+"|"+ref);
    return {eligible:true,ref,token,date:today,payload:"SD1|"+student.id+"|"+today+"|"+ref+"|"+token};
  }
  /* persistent notification (inbox) + optional toast */
  function notify(en,ar,type,silent){
    STATE.notifications.unshift({id:"N-"+Date.now(),time:nowTime(),text_en:en,text_ar:ar||en,type:type||"",read:false});
    if(STATE.notifications.length>40)STATE.notifications.length=40;
    save(STATE);
    if(!silent)toast(curLang()==="ar"?(ar||en):en,type);
    renderBell();
  }
  function unreadCount(){return STATE.notifications.filter(n=>!n.read).length;}
  function renderBell(){
    const badge=document.querySelector("[data-bell-count]");
    if(badge){const c=unreadCount();badge.textContent=c;badge.style.display=c?"grid":"none";}
    const list=document.querySelector("[data-bell-list]");
    if(list){
      const ns=STATE.notifications;
      list.innerHTML=ns.length?ns.map(n=>
        "<div class='notif-item"+(n.read?"":" unread")+"'><span class='dot' style='background:var(--"+(n.type==='success'?'emerald':n.type==='danger'?'alert':n.type==='warn'?'amber':'navy')+")'></span><div><div>"+(curLang()==="ar"?n.text_ar:n.text_en)+"</div><div class='muted' style='font-size:12px'>"+n.time+"</div></div></div>"
      ).join(""):"<p class='muted' style='padding:14px'>"+t("no_notifs")+"</p>";
    }
  }
  function modal(opts){
    const bg=document.createElement("div");bg.className="modal-bg";
    bg.innerHTML='<div class="modal"><div class="m-h">'+opts.title+'</div><div class="m-b">'+opts.body+'</div><div class="m-f"></div></div>';
    const foot=bg.querySelector(".m-f");
    (opts.buttons||[{label:t("close"),class:"btn-ghost"}]).forEach(b=>{
      const btn=document.createElement("button");btn.className="btn "+(b.class||"btn-ghost");btn.textContent=b.label;
      btn.onclick=()=>{if(b.onClick)b.onClick();bg.remove();};
      foot.appendChild(btn);
    });
    bg.addEventListener("click",e=>{if(e.target===bg)bg.remove();});
    document.body.appendChild(bg);
    return bg;
  }

  /* ---------------- deterministic QR-like SVG ---------------- */
  function qrSvg(seed){
    seed=String(seed||"SAFE");
    let h=0;for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
    const N=21,cell=7,pad=0;let rects="";
    function rnd(){h^=h<<13;h^=h>>>17;h^=h<<5;h>>>=0;return h/4294967296;}
    function finder(x,y){
      let s="";
      s+=`<rect x="${x*cell}" y="${y*cell}" width="${7*cell}" height="${7*cell}" fill="#0f2c4d"/>`;
      s+=`<rect x="${(x+1)*cell}" y="${(y+1)*cell}" width="${5*cell}" height="${5*cell}" fill="#fff"/>`;
      s+=`<rect x="${(x+2)*cell}" y="${(y+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#0f2c4d"/>`;
      return s;
    }
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      const inFinder=(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);
      if(inFinder)continue;
      if(rnd()>0.55)rects+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#0f2c4d"/>`;
    }
    const size=N*cell;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="#fff"/>${rects}${finder(0,0)}${finder(N-7,0)}${finder(0,N-7)}</svg>`;
  }

  /* ---------------- shared chrome (topbar + footer) ---------------- */
  function buildChrome(role){
    const top=document.querySelector("[data-chrome='top']");
    if(top){
      top.innerHTML=
       '<a href="#main" class="skip-link" data-i18n="skip_content"></a>'+
       '<div class="topbar"><div class="container inner">'+
         '<a class="brand" href="index.html"><span class="logo">🛡️</span><span data-i18n="app_name"></span></a>'+
         (role?'<span class="role-pill">'+role+'</span>':'')+
         '<span class="spacer"></span>'+
         '<div class="bell" data-bell aria-label="Notifications" role="button" tabindex="0">'+
           '<span class="bell-ic">🔔</span><span class="bell-count" data-bell-count>0</span>'+
           '<div class="bell-panel hidden"><div class="bell-h"><span data-i18n="notif_center"></span><a href="#" data-bell-read data-i18n="mark_read"></a></div><div class="bell-list" data-bell-list></div></div>'+
         '</div>'+
         '<div class="lang-toggle"><button data-lang="en" aria-label="English">EN</button><button data-lang="ar" aria-label="Arabic">ع</button></div>'+
       '</div></div>';
      top.querySelectorAll(".lang-toggle button").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
      const bell=top.querySelector("[data-bell]"),panel=top.querySelector(".bell-panel");
      function togglePanel(){panel.classList.toggle("hidden");if(!panel.classList.contains("hidden")){STATE.notifications.forEach(n=>n.read=true);save(STATE);renderBell();}}
      bell.addEventListener("click",e=>{if(e.target.closest("[data-bell-read]"))return;togglePanel();});
      bell.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();togglePanel();}});
      top.querySelector("[data-bell-read]").onclick=e=>{e.preventDefault();STATE.notifications.forEach(n=>n.read=true);save(STATE);renderBell();};
      document.addEventListener("click",e=>{if(!bell.contains(e.target))panel.classList.add("hidden");});
    }
    const foot=document.querySelector("[data-chrome='foot']");
    if(foot){
      foot.innerHTML='<div class="proto-nav"><div class="container">'+
        '<a href="index.html">🏠 Home</a>'+
        '<a href="moderator.html">Moderator</a>'+
        '<a href="admin.html">Admin</a>'+
        '<a href="parent.html">Parent</a>'+
        '<a href="security.html">Security</a>'+
        '<a href="dashboard.html">Dashboard</a>'+
        '<a href="#" data-reset-demo style="color:var(--alert)">↻ <span data-i18n="reset_demo"></span></a>'+
        '</div></div>';
      const rb=foot.querySelector("[data-reset-demo]");
      if(rb)rb.onclick=(e)=>{e.preventDefault();const lang=curLang();STATE=JSON.parse(JSON.stringify(DEFAULT_STATE));STATE.lang=lang;save(STATE);location.reload();};
    }
    renderBell();
  }
  /* cross-tab live sync */
  window.addEventListener("storage",e=>{
    if(e.key===KEY){STATE=load();applyI18n();renderBell();document.dispatchEvent(new CustomEvent("sdsync"));}
  });

  function statusBadge(status){
    const map={
      waiting:["badge-amber","st_waiting"],inqueue:["badge-navy","st_inqueue"],
      released:["badge-green","st_released"],pending:["badge-amber","st_pending"],
      approved:["badge-green","st_approved"],denied:["badge-red","st_denied"]
    };
    const m=map[status]||["badge-navy",status];
    return '<span class="badge '+m[0]+'"><span class="dot" style="background:currentColor"></span>'+t(m[1])+'</span>';
  }

  /* ---------------- expose API ---------------- */
  window.SD={
    t,setLang,curLang,applyI18n,toast,modal,qrSvg,buildChrome,statusBadge,notify,nowTime,renderBell,
    dateStr,dayToken,pickupInfo,
    gradeBands,bandForGrade,bandName,overrideInfoFor,timeToDate,fmtTime,
    state:()=>STATE,
    save:()=>save(STATE),
    reset:()=>{STATE=JSON.parse(JSON.stringify(DEFAULT_STATE));save(STATE);},
    methodLabel:(m)=>t(m),
    studentName:(s)=>curLang()==="ar"?s.name_ar:s.name_en
  };

  document.addEventListener("DOMContentLoaded",()=>{
    const role=document.body.getAttribute("data-role")||"";
    buildChrome(role);
    applyI18n();
  });
})();
