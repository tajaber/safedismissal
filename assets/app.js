/* SafeDismiss prototype — shared i18n + state + UI helpers */
(function(){
  "use strict";

  /* ---------------- i18n dictionary ---------------- */
  const I18N = {
    app_name:{en:"SafeDismiss",ar:"الانصراف الآمن"},
    tagline:{en:"Safe, fast, and verified school dismissal",ar:"انصراف مدرسي آمن وسريع ومُتحقَّق منه"},
    nav_home:{en:"Home",ar:"الرئيسية"},
    nav_moderator:{en:"Moderator",ar:"المشرف"},
    nav_admin:{en:"Admin",ar:"المسؤول"},
    nav_parent:{en:"Guardian/Parent",ar:"ولي الأمر1"},
    nav_security:{en:"Security",ar:"الأمن"},
    nav_dashboard:{en:"Dashboard",ar:"لوحة التحكم"},
    choose_role:{en:"Choose your role to explore the prototype",ar:"اختر دورك لاستكشاف النموذج"},
    role_moderator:{en:"School Moderator",ar:"مشرف المدرسة"},
    role_moderator_d:{en:"Register school, invite guardians/parents, manage QR, audit logs & security policy",ar:"تسجيل المدرسة ودعوة أولياء الأمور وإدارة رموز QR والسجلات وسياسة الأمن"},
    role_admin:{en:"Dismissal Admin",ar:"مسؤول الانصراف"},
    role_admin_d:{en:"Approve first logins, set dismissal methods, deadlines & override decisions",ar:"اعتماد أول دخول وضبط طرق الانصراف والمواعيد وقرارات الاستثناء"},
    role_parent:{en:"Guardian/Parent / Guardian/Parent2",ar:"ولي الأمر1 / ولي الأمر2"},
    role_parent_d:{en:"Accept terms, manage kids, announce arrival, request override, show QR",ar:"قبول الشروط وإدارة الأبناء وإعلان الوصول وطلب الاستثناء وعرض QR"},
    role_security:{en:"Security / Gate",ar:"الأمن / البوابة"},
    role_security_d:{en:"Scan QR, verify identity, confirm release with one tap",ar:"مسح QR والتحقق من الهوية وتأكيد التسليم بلمسة"},
    role_dashboard:{en:"Web Dashboard",ar:"لوحة التحكم"},
    role_dashboard_d:{en:"System-wide summary of users, approvals & live activity",ar:"ملخص شامل للمستخدمين والموافقات والنشاط المباشر"},

    /* landing page */
    nav_features:{en:"Features",ar:"المزايا"},
    nav_how:{en:"How it works",ar:"كيف يعمل"},
    nav_roles:{en:"Roles",ar:"الأدوار"},
    nav_launch:{en:"Launch demo",ar:"تشغيل العرض"},
    land_badge:{en:"Built for safer schools",ar:"مصمّم لمدارس أكثر أمانًا"},
    land_title:{en:"School dismissal made",ar:"انصراف مدرسي"},
    land_title_hl:{en:"safe, fast & verified",ar:"آمن وسريع ومُتحقَّق"},
    land_sub:{en:"SafeDismiss links schools, guardians/parents and security in one verified flow — from arrival to release, every hand-over is logged, confirmed and child-safe.",ar:"يربط الانصراف الآمن بين المدرسة وأولياء الأمور والأمن في تدفّق واحد مُتحقَّق — من الوصول حتى التسليم، كل عملية تسجَّل وتُؤكَّد بأمان كامل للطفل."},
    land_cta_primary:{en:"Explore the demo",ar:"استكشف العرض"},
    land_cta_secondary:{en:"See how it works",ar:"شاهد كيف يعمل"},
    pv_title:{en:"Live dismissal",ar:"الانصراف المباشر"},
    pv_now:{en:"Now",ar:"الآن"},
    pv_released:{en:"Released",ar:"تم التسليم"},
    pv_inqueue:{en:"In queue",ar:"في الطابور"},
    pv_gate:{en:"Gate 2 · verified",ar:"البوابة 2 · مُتحقَّق"},
    pv_arriving:{en:"Guardian/Parent arriving",ar:"ولي الأمر1 قادم"},

    stat_schools_n:{en:"120+",ar:"+١٢٠"},
    stat_schools_l:{en:"Schools onboarded",ar:"مدرسة مشتركة"},
    stat_time_n:{en:"3 min",ar:"٣ دقائق"},
    stat_time_l:{en:"Avg. release time",ar:"متوسط زمن التسليم"},
    stat_safe_n:{en:"100%",ar:"١٠٠٪"},
    stat_safe_l:{en:"Verified hand-overs",ar:"عمليات تسليم مُتحقَّقة"},

    feat_eyebrow:{en:"Why SafeDismiss",ar:"لماذا الانصراف الآمن"},
    feat_head:{en:"Everything a safe dismissal needs",ar:"كل ما يحتاجه انصراف آمن"},
    feat_sub:{en:"One connected platform for schools, families and security teams.",ar:"منصّة واحدة متّصلة للمدارس والعائلات وفرق الأمن."},
    feat1_t:{en:"Verified QR release",ar:"تسليم بـ QR مُتحقَّق"},
    feat1_d:{en:"Single-day, rotating QR codes scanned at the gate — no wrong hand-overs, ever.",ar:"رموز QR متجدّدة ليوم واحد تُمسح عند البوابة — لا تسليم خاطئ أبدًا."},
    feat2_t:{en:"Real-time queue",ar:"طابور لحظي"},
    feat2_d:{en:"Guardians/parents announce arrival; staff see a live, ordered pickup queue per grade band.",ar:"يعلن أولياء الأمور وصولهم؛ ويرى الطاقم طابور استلام مباشر مرتّب لكل فئة صفية."},
    feat3_t:{en:"Guardian/Parent & Guardian/Parent2 app",ar:"تطبيق ولي الأمر1 وولي الأمر2"},
    feat3_d:{en:"Manage kids, request overrides and show pickup passes — bilingual, mobile-first.",ar:"إدارة الأبناء وطلب الاستثناءات وعرض تصاريح الاستلام — بلغتين وبتصميم للجوال."},
    feat4_t:{en:"Audit & child safety",ar:"تدقيق وسلامة الطفل"},
    feat4_d:{en:"Every action is time-stamped and logged for a complete, exportable audit trail.",ar:"كل إجراء مختوم بالوقت ومسجَّل ضمن سجل تدقيق كامل قابل للتصدير."},

    how_eyebrow:{en:"How it works",ar:"كيف يعمل"},
    how_head:{en:"From arrival to release in three steps",ar:"من الوصول حتى التسليم في ثلاث خطوات"},
    how1_t:{en:"Announce arrival",ar:"إعلان الوصول"},
    how1_d:{en:"Guardian/Parent taps “I'm here” in the app on the way to school.",ar:"يضغط ولي الأمر1 «أنا هنا» في التطبيق وهو في الطريق إلى المدرسة."},
    how2_t:{en:"Verify at the gate",ar:"التحقق عند البوابة"},
    how2_d:{en:"Security scans the day's QR and confirms identity in one tap.",ar:"يمسح الأمن رمز QR الخاص باليوم ويؤكّد الهوية بلمسة واحدة."},
    how3_t:{en:"Confirm release",ar:"تأكيد التسليم"},
    how3_d:{en:"The student is released and everyone is notified instantly.",ar:"يتم تسليم الطالب ويُخطَر الجميع فورًا."},

    roles_eyebrow:{en:"Try the prototype",ar:"جرّب النموذج"},
    cta_title:{en:"Ready for a safer dismissal?",ar:"جاهز لانصراف أكثر أمانًا؟"},
    cta_sub:{en:"Pick any role below and explore the full SafeDismiss experience.",ar:"اختر أي دور بالأسفل واستكشف تجربة الانصراف الآمن كاملة."},
    cta_button:{en:"Start exploring",ar:"ابدأ الاستكشاف"},
    foot_rights:{en:"Prototype for demonstration purposes.",ar:"نموذج لأغراض العرض التوضيحي."},

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
    parent:{en:"Guardian/Parent",ar:"ولي الأمر1"},
    method:{en:"Dismissal Method",ar:"طريقة الانصراف"},
    time:{en:"Time",ar:"الوقت"},

    /* auth */
    sign_in:{en:"Sign in",ar:"تسجيل الدخول"},
    secure_login:{en:"Secure Login",ar:"دخول آمن"},
    phone_or_email:{en:"Phone number or email",ar:"رقم الهاتف أو البريد"},
    password:{en:"Password",ar:"كلمة المرور"},
    continue:{en:"Continue",ar:"متابعة"},
    mfa_title:{en:"Two-Factor Verification",ar:"التحقق بخطوتين"},
    mfa_sub:{en:"Enter the 6-digit code sent to your phone ending •• 33",ar:"أدخل الرمز المكوّن من 6 أرقام المُرسل إلى هاتفك المنتهي بـ ٣٣"},
    verify:{en:"Verify & Continue",ar:"تحقق وتابع"},
    resend_code:{en:"Resend code",ar:"إعادة إرسال الرمز"},
    demo_hint:{en:"Demo: any code works",ar:"عرض: أي رمز يعمل"},

    /* moderator */
    mod_dash:{en:"Moderator Console",ar:"لوحة المشرف"},
    tab_overview:{en:"Overview",ar:"نظرة عامة"},
    tab_register:{en:"School Setup",ar:"إعداد المدرسة"},
    tab_invite:{en:"Invite Guardians/Parents",ar:"دعوة أولياء الأمور"},
    tab_qr:{en:"Kid QR Codes",ar:"رموز QR للأبناء"},
    tab_audit:{en:"Audit Log",ar:"سجل التدقيق"},
    tab_terms:{en:"Terms & Policy",ar:"الشروط والسياسة"},
    security_toggle:{en:"Gate Security Verification",ar:"التحقق الأمني عند البوابة"},
    security_toggle_d:{en:"When ON, a security officer must scan & confirm before any release.",ar:"عند التفعيل، يجب أن يقوم ضابط الأمن بالمسح والتأكيد قبل أي تسليم."},
    required:{en:"Required",ar:"مطلوب"},
    not_required:{en:"Not Required",ar:"غير مطلوب"},
    invite_partner:{en:"Invite Guardian/Parent & Guardian/Parent2",ar:"دعوة ولي الأمر1 وولي الأمر2"},
    parent_phone:{en:"Guardian/Parent phone",ar:"هاتف ولي الأمر1"},
    parent_email:{en:"Guardian/Parent email (optional)",ar:"بريد ولي الأمر1 (اختياري)"},
    coparent_phone:{en:"Guardian/Parent2 phone",ar:"هاتف ولي الأمر2"},
    coparent_email:{en:"Guardian/Parent2 email (optional)",ar:"بريد ولي الأمر2 (اختياري)"},
    send_invite:{en:"Send Invitations",ar:"إرسال الدعوات"},
    generate_qr:{en:"Generate QR",ar:"إنشاء QR"},
    download_qr:{en:"Download",ar:"تنزيل"},
    terms_intro:{en:"Guardians/parents must accept these terms before first use.",ar:"يجب على أولياء الأمور قبول هذه الشروط قبل أول استخدام."},

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
    parent_dash:{en:"Guardian/Parent Dashboard",ar:"لوحة ولي الأمر1"},
    my_kids:{en:"My Children",ar:"أبنائي"},
    announce_arrival:{en:"ANNOUNCE ARRIVAL",ar:"إعلان الوصول"},
    announced_queue:{en:"Announced — In Queue",ar:"تم الإعلان — في الطابور"},
    pull_forward:{en:"School notified. Please pull forward into Lane Slot A.",ar:"تم إخطار المدرسة. تقدّم إلى المسار A."},
    request_override:{en:"Request Car Override",ar:"طلب الاستثناء بالسيارة"},
    show_qr:{en:"Show Pickup QR",ar:"عرض رمز الاستلام"},
    accept_terms:{en:"I accept the school's Terms & Conditions",ar:"أوافق على شروط وأحكام المدرسة"},
    accept_invite:{en:"Accept Invitation",ar:"قبول الدعوة"},
    override_blocked:{en:"Override window closed. Please phone the school: 0791234567",ar:"انتهى وقت طلب الاستثناء. يرجى الاتصال بالمدرسة: 0791234567"},
    override_sent:{en:"Override request sent to the school for approval.",ar:"تم إرسال طلب الاستثناء إلى المدرسة للموافقة."},
    coparent:{en:"Guardian/Parent2",ar:"ولي الأمر2"},

    /* security */
    sec_dash:{en:"Gate Release Station",ar:"محطة التسليم بالبوابة"},
    scan_qr:{en:"SCAN GUARDIAN/PARENT QR",ar:"مسح رمز ولي الأمر1"},
    scanning:{en:"Scanning…",ar:"جارٍ المسح…"},
    confirm_release:{en:"CONFIRM RELEASE",ar:"تأكيد التسليم"},
    released_saved:{en:"Released • Timestamped & Saved",ar:"تم التسليم • مُوثّق ومحفوظ"},
    active_queue:{en:"Active Pickup Queue",ar:"طابور الاستلام النشط"},
    search_phone:{en:"Battery dead? Search guardian/parent phone",ar:"بطارية فارغة؟ ابحث بهاتف ولي الأمر1"},
    verify_identity:{en:"Verify Identity",ar:"التحقق من الهوية"},
    matched:{en:"Identity matched. Release enabled.",ar:"تطابقت الهوية. تم تفعيل التسليم."},

    /* dashboard */
    dash_title:{en:"System Dashboard",ar:"لوحة النظام"},
    total_schools:{en:"Schools",ar:"المدارس"},
    total_parents:{en:"Guardians/Parents",ar:"أولياء الأمور"},
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
    remove:{en:"Remove",ar:"إزالة"},
    school_name:{en:"Fareed Star Academy School",ar:"مدرسة فريد ستار الأكاديمية"},
    school_city:{en:"Amman, Jordan",ar:"عمّان، الأردن"},
    school_phone:{en:"0791234567",ar:"0791234567"},
    label_phone:{en:"Phone",ar:"الهاتف"},
    label_city:{en:"City",ar:"المدينة"},
    label_address:{en:"Address",ar:"العنوان"},
    label_school:{en:"School name",ar:"اسم المدرسة"},
    onboard_terms_note:{en:"By continuing you accept the school's Terms & Conditions, QR usage policy, and dismissal rules.",ar:"بالمتابعة فإنك توافق على شروط وأحكام المدرسة وسياسة استخدام رمز QR وقواعد الانصراف."},

    /* branches & admins */
    tab_branches:{en:"Branches",ar:"الفروع"},
    tab_admins:{en:"Admins",ar:"المسؤولون"},
    tab_students:{en:"Students",ar:"الطلاب"},
    branches_title:{en:"Branches & Locations",ar:"الفروع والمواقع"},
    branches_help:{en:"A school can operate several branches/locations. Each branch has its own name and phone, and is selected when adding parents and students.",ar:"يمكن أن تدير المدرسة عدة فروع/مواقع. لكل فرع اسمه وهاتفه الخاص، ويُحدَّد عند إضافة أولياء الأمور والطلاب."},
    add_branch:{en:"Add branch",ar:"إضافة فرع"},
    branch_name:{en:"Branch name",ar:"اسم الفرع"},
    branch_phone:{en:"Branch phone",ar:"هاتف الفرع"},
    branch:{en:"Branch",ar:"الفرع"},
    select_branch:{en:"Select branch",ar:"اختر الفرع"},
    branch_saved:{en:"Branch saved",ar:"تم حفظ الفرع"},
    branch_required:{en:"Enter a branch name and phone",ar:"أدخل اسم الفرع وهاتفه"},
    admins_title:{en:"Admin Accounts",ar:"حسابات المسؤولين"},
    admins_help:{en:"Create dismissal-admin accounts and link each one to a branch. You can move an admin to another branch at any time.",ar:"أنشئ حسابات مسؤولي الانصراف واربط كل مسؤول بفرع. يمكنك نقل المسؤول إلى فرع آخر في أي وقت."},
    create_admin:{en:"Create admin",ar:"إنشاء مسؤول"},
    admin_name:{en:"Admin name",ar:"اسم المسؤول"},
    admin_phone:{en:"Admin phone",ar:"هاتف المسؤول"},
    admin_created:{en:"Admin account created",ar:"تم إنشاء حساب المسؤول"},
    admin_moved:{en:"Admin moved to",ar:"تم نقل المسؤول إلى"},
    admin_required:{en:"Enter an admin name and phone",ar:"أدخل اسم المسؤول وهاتفه"},
    assigned_branch:{en:"Assigned branch",ar:"الفرع المُسنَد"},
    move_branch:{en:"Move to branch",ar:"النقل إلى فرع"},
    student_moved:{en:"Student moved to",ar:"تم نقل الطالب إلى"},
    students_title:{en:"Students & Branch Assignment",ar:"الطلاب وإسناد الفروع"},
    students_help:{en:"Each student belongs to one branch at a time. Move a student between branches whenever needed.",ar:"ينتمي كل طالب إلى فرع واحد في كل مرة. انقل الطالب بين الفروع متى لزم الأمر."},
    students_word:{en:"students",ar:"طالب"},
    search_name:{en:"Search by name, ID, grade…",ar:"ابحث بالاسم أو الرقم أو الصف…"},
    all_branches:{en:"All branches",ar:"كل الفروع"},
    all_grades:{en:"All grades",ar:"كل الصفوف"},
    confirm_move_title:{en:"Move student",ar:"نقل الطالب"},
    confirm_move_q:{en:"Move {student} from {from} to {to}? This updates the student's branch record.",ar:"نقل {student} من {from} إلى {to}؟ سيؤدي هذا إلى تحديث سجل فرع الطالب."},
    parent_branch:{en:"Guardian/Parent branch",ar:"فرع ولي الأمر1"},
    parent_branch_auto:{en:"The guardian/parent's branch is assigned automatically from each child's branch — no need to pick one here.",ar:"يُسنَد فرع ولي الأمر تلقائيًا من فرع كل طفل — لا حاجة لاختياره هنا."},
    no_students:{en:"No students yet",ar:"لا يوجد طلاب بعد"},
    your_branch:{en:"Your branch",ar:"فرعك"},
    acting_as:{en:"Acting as",ar:"تعمل بصفة"},
    switch_admin:{en:"Switch admin",ar:"تبديل المسؤول"},
    branch_location:{en:"Branch / Location",ar:"الفرع / الموقع"},
    notified_admins:{en:"Notified branch admins",ar:"تم إخطار مسؤولي الفرع"},

    /* admin tabs */
    tab_override_requests:{en:"Override Requests",ar:"طلبات الاستثناء"},
    tab_invite_parent:{en:"Invite Guardian/Parent",ar:"دعوة ولي الأمر"},
    tab_students_branch:{en:"Students & Branches",ar:"الطلاب والفروع"},
    tab_dismissal_frames:{en:"Dismissal Times",ar:"أوقات الانصراف"},
    tab_first_login:{en:"First-Login Approvals",ar:"موافقات أول دخول"},
    no_override_requests:{en:"No override requests right now.",ar:"لا توجد طلبات استثناء حاليًا."},
    school_details:{en:"School details",ar:"تفاصيل المدرسة"},
    requested_at:{en:"Requested",ar:"وقت الطلب"},
    requested_by:{en:"Requested by",ar:"مقدّم الطلب"},

    /* classes & teacher */
    nav_teacher:{en:"Teacher",ar:"المعلّم"},
    role_teacher:{en:"Teacher / Classroom",ar:"المعلّم / الصف"},
    role_teacher_d:{en:"See approved overrides & announced arrivals for your class in real time",ar:"اطّلع على الاستثناءات المعتمدة وإعلانات الوصول لصفك لحظيًا"},
    tab_classes:{en:"Classes",ar:"الفصول"},
    classes_title:{en:"Classes & Classroom Display",ar:"الفصول وعرض الصف"},
    classes_help:{en:"Enable the classroom display per branch so teachers see approved overrides and announced arrivals. When enabled, add classes and link students to them.",ar:"فعِّل عرض الصف لكل فرع ليرى المعلّمون الاستثناءات المعتمدة وإعلانات الوصول. عند التفعيل، أضف الفصول واربط الطلاب بها."},
    classroom_display:{en:"Classroom display",ar:"عرض الصف"},
    feature_on:{en:"Enabled",ar:"مفعّل"},
    feature_off:{en:"Disabled",ar:"معطّل"},
    add_class:{en:"Add class",ar:"إضافة فصل"},
    class_name:{en:"Class name",ar:"اسم الفصل"},
    class_label:{en:"Class",ar:"الفصل"},
    no_class:{en:"No class",ar:"بدون فصل"},
    link_class:{en:"Link to class",ar:"الربط بفصل"},
    classes_disabled_branch:{en:"Classroom display is disabled for this branch.",ar:"عرض الصف معطّل لهذا الفرع."},
    no_classes:{en:"No classes yet. Add one above.",ar:"لا توجد فصول بعد. أضف فصلًا بالأعلى."},
    class_added:{en:"Class added",ar:"تمت إضافة الفصل"},
    teacher_dash:{en:"Classroom Board",ar:"لوحة الصف"},
    teacher_sub:{en:"Live approved overrides & announced arrivals for your class",ar:"الاستثناءات المعتمدة وإعلانات الوصول لصفك مباشرةً"},
    select_class:{en:"Select class",ar:"اختر الفصل"},
    feed_announced:{en:"Announced — heading to gate",ar:"تم الإعلان — متوجه للبوابة"},
    feed_override:{en:"Override approved — car pick-up",ar:"اعتُمد الاستثناء — استلام بالسيارة"},
    feed_empty:{en:"Nothing to show yet. Approved overrides and announced arrivals will appear here.",ar:"لا شيء لعرضه بعد. ستظهر هنا الاستثناءات المعتمدة وإعلانات الوصول."},
    no_class_branches:{en:"No branch has the classroom display enabled yet. Ask your moderator to enable it.",ar:"لا يوجد فرع مفعّل لعرض الصف بعد. اطلب من المشرف تفعيله."}
  };

  /* ---------------- mock data ---------------- */
  const DEFAULT_STATE = {
    lang:"en",
    securityRequired:true,
    overrideDeadlineMin:30,
    branches:[
      {id:"main",name_en:"Main Campus",name_ar:"المقر الرئيسي",phone:"0791234567",classesEnabled:true},
      {id:"north",name_en:"North Branch",name_ar:"الفرع الشمالي",phone:"0791112222",classesEnabled:true},
      {id:"west",name_en:"West Branch",name_ar:"الفرع الغربي",phone:"0791113333",classesEnabled:false}
    ],
    classes:[
      {id:"C-1",name_en:"KG1 — Sunflowers",name_ar:"روضة ١ — دوار الشمس",branchId:"main"},
      {id:"C-2",name_en:"Grade 5 — Falcons",name_ar:"الصف الخامس — الصقور",branchId:"main"},
      {id:"C-3",name_en:"KG2 — Tulips",name_ar:"روضة ٢ — الزنابق",branchId:"north"},
      {id:"C-4",name_en:"Grade 4 — Eagles",name_ar:"الصف الرابع — النسور",branchId:"north"}
    ],
    admins:[
      {id:"A-1",name_en:"Reem Odeh",name_ar:"ريم عودة",phone:"0790555001",branchId:"main"},
      {id:"A-2",name_en:"Sami Haddad",name_ar:"سامي حداد",phone:"0790555002",branchId:"north"},
      {id:"A-3",name_en:"Lara Nimer",name_ar:"لارا نمر",phone:"0790555003",branchId:"west"}
    ],
    gradeBands:[
      {id:"kg",name_en:"KG1–KG2",name_ar:"روضة ١–٢",dismissal:"12:30"},
      {id:"lower",name_en:"Grades 1–3",name_ar:"الصفوف ١–٣",dismissal:"13:30"},
      {id:"upper",name_en:"Grades 4–6",name_ar:"الصفوف ٤–٦",dismissal:"14:30"}
    ],
    students:[
      {id:"S-2001",name_en:"Bisan Jaber",name_ar:"بيسان جابر",grade:"KG1",method:"car",parent:"Tariq Jaber",phone:"0790112233",branchId:"main",classId:"C-1",status:"waiting"},
      {id:"S-2002",name_en:"Razan Jaber",name_ar:"رزان جابر",grade:"2-A",method:"bus2",parent:"Tariq Jaber",phone:"0790112233",branchId:"north",classId:"",status:"waiting"},
      {id:"S-2003",name_en:"Majed Jaber",name_ar:"ماجد جابر",grade:"5-B",method:"car",parent:"Tariq Jaber",phone:"0790112233",branchId:"main",classId:"C-2",status:"inqueue"},
      {id:"S-2004",name_en:"Saad Jaber",name_ar:"سعد جابر",grade:"3-C",method:"bus1a",parent:"Tariq Jaber",phone:"0790112233",branchId:"west",classId:"",status:"waiting"},
      {id:"S-2005",name_en:"Mesk Yousef",name_ar:"مسك يوسف",grade:"KG2",method:"car",parent:"Fadi Yousef",phone:"0790332211",branchId:"north",classId:"C-3",status:"inqueue"},
      {id:"S-2006",name_en:"Wesam Yousef",name_ar:"وسام يوسف",grade:"4-A",method:"bus2",parent:"Fadi Yousef",phone:"0790332211",branchId:"north",classId:"C-4",status:"waiting"},
      {id:"S-2007",name_en:"Ismael Yousef",name_ar:"إسماعيل يوسف",grade:"1-B",method:"car",parent:"Fadi Yousef",phone:"0790332211",branchId:"west",classId:"",status:"waiting"}
    ],
    overrides:[
      {id:"OV-301",student:"Razan Jaber",from:"bus2",to:"car",status:"pending",time:"01:48 PM",requestor:"Tariq Jaber",requestorPhone:"0790112233"}
    ],
    firstLogins:[
      {id:"FL-9",parent:"Fadi Yousef",kid:"Mesk Yousef",time:"Today 12:10 PM"},
      {id:"FL-10",parent:"Tariq Jaber",kid:"Saad Jaber",time:"Today 12:32 PM"}
    ],
    audit:[
      {time:"01:31 PM",actor:"Security · Gate 2",event_en:"Released Majed Jaber (QR verified)",event_ar:"تم تسليم ماجد جابر (تم التحقق من QR)",type:"released"},
      {time:"01:28 PM",actor:"Admin · Reem",event_en:"Approved override OV-298 (bus→car)",event_ar:"اعتماد استثناء OV-298 (حافلة→سيارة)",type:"approved"},
      {time:"01:15 PM",actor:"Guardian/Parent · Tariq Jaber",event_en:"Announced arrival for Majed Jaber",event_ar:"إعلان وصول لماجد جابر",type:"info"},
      {time:"12:32 PM",actor:"System",event_en:"First-login request from Fadi Yousef",event_ar:"طلب أول دخول من فادي يوسف",type:"pending"}
    ],
    notifications:[
      {id:"N-1",time:"01:31 PM",text_en:"Majed Jaber released at Gate 2",text_ar:"تم تسليم ماجد جابر عند البوابة 2",type:"success",read:false},
      {id:"N-2",time:"12:32 PM",text_en:"New first-login request awaiting approval",text_ar:"طلب أول دخول جديد بانتظار الاعتماد",type:"warn",read:false}
    ]
  };

  const KEY="safedismiss_state_v5";
  function load(){
    try{
      const s=JSON.parse(localStorage.getItem(KEY));
      if(s&&s.students){
        if(!s.notifications)s.notifications=[];
        if(!s.gradeBands)s.gradeBands=JSON.parse(JSON.stringify(DEFAULT_STATE.gradeBands));
        if(!s.branches)s.branches=JSON.parse(JSON.stringify(DEFAULT_STATE.branches));
        if(!s.admins)s.admins=JSON.parse(JSON.stringify(DEFAULT_STATE.admins));
        if(!s.classes)s.classes=JSON.parse(JSON.stringify(DEFAULT_STATE.classes));
        s.branches.forEach(b=>{if(typeof b.classesEnabled==="undefined")b.classesEnabled=false;});
        const def=s.branches[0]?s.branches[0].id:"main";
        s.students.forEach(st=>{if(!st.branchId)st.branchId=def;if(typeof st.classId==="undefined")st.classId="";});
        return s;
      }
    }catch(e){}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
  function save(s){localStorage.setItem(KEY,JSON.stringify(s));}
  let STATE=load();

  /* Demo aid: dismissal times are real clock times, so once the day's cutoff passes
     every override looks "closed". To keep the prototype demoable at any time, if NO
     grade band still has an open override window we re-seed the band dismissal times
     relative to the current clock — keeping the youngest band just past its cutoff
     (so the "window closed → phone the school" case still shows) and the older bands
     open (so a parent can actually request an override). */
  function reseedDismissalTimes(){
    const offsets={kg:-20,lower:90,upper:150}; // minutes from now
    (STATE.gradeBands||[]).forEach((b,i)=>{
      const off=(b.id in offsets)?offsets[b.id]:(60+i*60);
      const d=new Date(Date.now()+off*60000);
      d.setMinutes(Math.round(d.getMinutes()/5)*5,0,0);
      b.dismissal=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
    });
  }
  function anyOverrideWindowOpen(){
    const mins=STATE.overrideDeadlineMin||30;
    return (STATE.gradeBands||[]).some(b=>{
      const p=String(b.dismissal||"14:30").split(":");
      const d=new Date();d.setHours((+p[0]||14),(+p[1]||30),0,0);
      return (d.getTime()-mins*60000)-Date.now()>0;
    });
  }
  if(!anyOverrideWindowOpen()){reseedDismissalTimes();save(STATE);}

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

  /* ---------------- theme (light / dark) ---------------- */
  function curTheme(){return STATE.theme||"light";}
  function applyTheme(){
    const dark=curTheme()==="dark";
    document.body.classList.toggle("theme-dark",dark);
    document.querySelectorAll("[data-theme-toggle]").forEach(b=>{
      b.textContent=dark?"☀️":"🌙";
      b.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");
    });
  }
  function setTheme(theme){STATE.theme=theme;save(STATE);applyTheme();}
  function toggleTheme(){setTheme(curTheme()==="dark"?"light":"dark");}

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

  /* ---- branches & admins ---- */
  function branches(){return STATE.branches||[];}
  function branchById(id){return branches().find(b=>b.id===id)||branches()[0]||null;}
  function branchName(b){if(!b)return "";if(typeof b==="string")b=branchById(b);return b?(curLang()==="ar"?b.name_ar:b.name_en):"";}
  function branchPhone(b){if(typeof b==="string")b=branchById(b);return b?b.phone:"";}
  function admins(){return STATE.admins||[];}
  function adminsForBranch(branchId){return admins().filter(a=>a.branchId===branchId);}
  function adminName(a){return curLang()==="ar"?a.name_ar:a.name_en;}
  function addBranch(name,phone){
    const id="br"+Date.now().toString(36);
    STATE.branches.push({id,name_en:name,name_ar:name,phone:phone});
    save(STATE);return id;
  }
  function addAdmin(name,phone,branchId){
    const id="A-"+Date.now().toString(36);
    STATE.admins.push({id,name_en:name,name_ar:name,phone:phone,branchId:branchId});
    save(STATE);return id;
  }
  function moveAdmin(adminId,branchId){
    const a=admins().find(x=>x.id===adminId);if(a){a.branchId=branchId;save(STATE);}
    return a;
  }
  function moveStudent(studentId,branchId){
    const s=(STATE.students||[]).find(x=>x.id===studentId);if(s){s.branchId=branchId;save(STATE);}
    return s;
  }
  function studentBranch(student){return branchById(student&&student.branchId);}

  /* ---- classes & teacher feed (per-branch feature) ---- */
  function classes(){return STATE.classes||[];}
  function classById(id){return classes().find(c=>c.id===id)||null;}
  function className(c){if(typeof c==="string")c=classById(c);return c?(curLang()==="ar"?c.name_ar:c.name_en):"";}
  function classesForBranch(branchId){return classes().filter(c=>c.branchId===branchId);}
  function branchClassesEnabled(branchId){const b=branchById(branchId);return !!(b&&b.classesEnabled);}
  function setBranchClasses(branchId,on){const b=branchById(branchId);if(b){b.classesEnabled=!!on;save(STATE);}return b;}
  function addClass(name,branchId){
    const id="C-"+Date.now().toString(36);
    STATE.classes.push({id,name_en:name,name_ar:name,branchId:branchId});
    save(STATE);return id;
  }
  function setStudentClass(studentId,classId){
    const s=(STATE.students||[]).find(x=>x.id===studentId);if(s){s.classId=classId;save(STATE);}return s;
  }
  /* Teacher feed for a class: announced arrivals (inqueue) + approved overrides today.
     Only returns data when the student's branch has the classroom feature enabled. */
  function classFeed(classId){
    const today=dateStr();
    return (STATE.students||[]).filter(s=>s.classId===classId&&branchClassesEnabled(s.branchId)).map(s=>{
      const ov=(STATE.overrides||[]).find(o=>o.student===s.name_en&&o.status==="approved"&&(o.date===today||!o.date));
      return {student:s,announced:s.status==="inqueue",overrideApproved:!!ov};
    }).filter(x=>x.announced||x.overrideApproved);
  }


  /* Arabic display names for people (parents). Falls back to the given name. */
  const PEOPLE_AR={
    "Tariq Jaber":"طارق جابر",
    "Fadi Yousef":"فادي يوسف"
  };
  function personName(n){return curLang()==="ar"?(PEOPLE_AR[n]||n):n;}
  /* Localize a student name given its English form (used where only the en name is stored). */
  function localizeStudentName(enName){
    if(curLang()!=="ar")return enName;
    const s=(STATE.students||[]).find(x=>x.name_en===enName);
    return s?s.name_ar:enName;
  }
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
         '<button class="theme-toggle" data-theme-toggle type="button" aria-label="Toggle theme">🌙</button>'+
       '</div></div>';
      top.querySelectorAll(".lang-toggle button").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
      const tt=top.querySelector("[data-theme-toggle]");
      if(tt)tt.onclick=()=>toggleTheme();
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
        '<a href="index.html">🏠 <span data-i18n="nav_home"></span></a>'+
        '<a href="moderator.html" data-i18n="nav_moderator"></a>'+
        '<a href="admin.html" data-i18n="nav_admin"></a>'+
        '<a href="parent.html" data-i18n="nav_parent"></a>'+
        '<a href="security.html" data-i18n="nav_security"></a>'+
        '<a href="teacher.html" data-i18n="nav_teacher"></a>'+
        '<a href="dashboard.html" data-i18n="nav_dashboard"></a>'+
        '<a href="#" data-reset-demo style="color:var(--alert)">↻ <span data-i18n="reset_demo"></span></a>'+
        '</div></div>';
      const rb=foot.querySelector("[data-reset-demo]");
      if(rb)rb.onclick=(e)=>{e.preventDefault();const lang=curLang();STATE=JSON.parse(JSON.stringify(DEFAULT_STATE));STATE.lang=lang;save(STATE);location.reload();};
    }
    renderBell();
  }
  /* cross-tab live sync */
  window.addEventListener("storage",e=>{
    if(e.key===KEY){STATE=load();applyTheme();applyI18n();renderBell();document.dispatchEvent(new CustomEvent("sdsync"));}
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
    setTheme,toggleTheme,curTheme,applyTheme,
    dateStr,dayToken,pickupInfo,
    gradeBands,bandForGrade,bandName,overrideInfoFor,timeToDate,fmtTime,
    branches,branchById,branchName,branchPhone,admins,adminsForBranch,adminName,
    addBranch,addAdmin,moveAdmin,moveStudent,studentBranch,
    classes,classById,className,classesForBranch,branchClassesEnabled,setBranchClasses,addClass,setStudentClass,classFeed,
    personName,localizeStudentName,
    state:()=>STATE,
    save:()=>save(STATE),
    reset:()=>{STATE=JSON.parse(JSON.stringify(DEFAULT_STATE));save(STATE);},
    methodLabel:(m)=>t(m),
    studentName:(s)=>curLang()==="ar"?s.name_ar:s.name_en
  };

  document.addEventListener("DOMContentLoaded",()=>{
    const role=document.body.getAttribute("data-role")||"";
    buildChrome(role);
    applyTheme();
    applyI18n();
  });
})();
