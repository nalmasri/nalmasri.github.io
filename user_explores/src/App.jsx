import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../../Assets/image2.png";

// ─── Data ────────────────────────────────────────────────────────────────────
const programs = [
  {id:1,  name:"هندسة الميكاترونكس الصناعية المتقدمة",            interests:["الهندسة","التكنولوجيا","الأتمتة","الميكانيك","الكهرباء","الإلكترونيات","الأنظمة الذكية","الصيانة"], learn:["تصميم وتشغيل الأنظمة الصناعية الذكية","برمجة أنظمة الأتمتة والتحكم الصناعي","استخدام الحساسات وأجهزة القياس في التطبيقات العملية","صيانة وتشغيل الأنظمة الكهروميكانيكية الحديثة","تطبيق تقنيات الروبوتات وSCADA وإنترنت الأشياء الصناعية"], jobs:["فني ميكاترونكس","فني أتمتة","فني صيانة متقدمة"], places:["المصانع","الشركات الصناعية"]},
  {id:2,  name:"تشكيل المعادن والتصنيع المتقدم",                  interests:["التصنيع","الميكانيك","الإنتاج","الجودة","الهندسة"], learn:["قراءة الرسومات الهندسية الخاصة بأعمال اللحام","تجهيز المعادن وعمليات القطع والثني قبل اللحام","تنفيذ تقنيات اللحام المختلفة باحتراف","فحص جودة اللحام ومعالجة العيوب","تطبيق السلامة المهنية وصيانة معدات اللحام"], jobs:["فني تصنيع","فني لحام"], places:["المصانع","الإنشاءات"]},
  {id:3,  name:"فني الأوتوترونكس (المركبات الهجينة/الكهربائية)",   interests:["التكنولوجيا","الميكانيك","الكهرباء","الإلكترونيات","الصيانة"], learn:["قراءة المخططات الكهربائية للمركبة","تتبع المشاكل الكهربائية في المركبة والعمل على حلها","صيانة نظام إدارة بطارية الجهد المرتفع","صيانة نظام المحول/العاكس","صيانة نظام نقل الحركة والمحرك الكهربائي","تشخيص وصيانة نظام الشاحن الداخلي للمركبة"], jobs:["فني أوتوترونكس","مستشار خدمة"], places:["مراكز الصيانة","وكالات السيارات"]},
  {id:4,  name:"ميكاترونكس المركبات الهجينة/الكهربائية",           interests:["التكنولوجيا","الميكانيك","الكهرباء","الإلكترونيات","الأنظمة الذكية","الصيانة"], learn:["صيانة محركات البنزين والنظام المتكامل لحقن الوقود","صيانة الأنظمة الإلكترونية في أنظمة الشحن وبدء التشغيل","صيانة مكونات أنظمة التوجيه والتعليق والفرامل","صيانة أنظمة الجهد العالي"], jobs:["فني مركبات كهربائية"], places:["مراكز الصيانة","وكالات السيارات"]},
  {id:5,  name:"فني الميكانيك وأنظمة الأنابيب الصناعية",           interests:["الميكانيك","التصنيع","الصيانة","الإنتاج"], learn:["قراءة مخططات الأنابيب والأنظمة الميكانيكية الصناعية","تركيب وتمديد شبكات الأنابيب الصناعية باحتراف","تشغيل وربط المضخات والمعدات الميكانيكية المختلفة","فحص الأنظمة واختبار الضغط والتسريب والتشغيل","صيانة الأنابيب والمكونات الميكانيكية في المنشآت الصناعية"], jobs:["فني ميكانيك صناعي"], places:["المصانع","المشاريع الصناعية"]},
  {id:6,  name:"ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية",  interests:["الميكانيك","الصيانة","الإنتاج","التصنيع"], learn:["تركيب الآلات والمعدات الصناعية وفق المخططات الفنية","تشغيل الأنظمة الميكانيكية ومراقبة أدائها","إجراء الصيانة الوقائية والدورية للمعدات","تشخيص الأعطال وإصلاحها باحتراف","توثيق أعمال الصيانة وإعداد التقارير الفنية"], jobs:["فني إنتاج","فني صيانة"], places:["المصانع"]},
  {id:7,  name:"إلكتروني تركيب وصيانة الأجهزة الإلكترونية الصناعية", interests:["الإلكترونيات","التكنولوجيا","الصيانة","الأتمتة","الأنظمة الذكية"], learn:["تركيب وصيانة الأجهزة والأنظمة الإلكترونية الصناعية","بناء الدوائر الكهربائية والإلكترونية واختبارها","برمجة أنظمة التحكم الدقيقة وPLC","تشغيل أنظمة الأتمتة والتحكم الصناعي","صيانة المستشعرات ولوحات التحكم والأجهزة الصناعية"], jobs:["فني إلكترونيات"], places:["المصانع","شركات التقنية"]},
  {id:8,  name:"أنظمة التبريد الصناعية",                           interests:["الميكانيك","الصيانة","الإنتاج","الطاقة"], learn:["قراءة مخططات أنظمة التبريد الصناعية وتنفيذها","فحص مكونات دوائر التبريد وتشغيلها","تنفيذ التمديدات والربط واللحام والتوصيلات الكهروميكانيكية","تشخيص الأعطال وصيانة أنظمة التبريد الصناعية","استخدام أنظمة التحكم والإلكترونيات لتحسين الأداء"], jobs:["فني تبريد"], places:["المصانع","شركات التبريد"]},
  {id:9,  name:"التصميم والتصنيع الرقمي",                          interests:["التصميم","التصنيع","التكنولوجيا","الهندسة","الإنتاج"], learn:["أساسيات الرسم الهندسي والقياسات ومقياس الرسم","استخدام برامج CAD في إنشاء الرسومات الهندسية","التعامل مع أنظمة التشغيل والبرامج الفنية المرتبطة بالتصميم","إعداد الرسومات الرقمية الدقيقة للتصنيع باستخدام CNC"], jobs:["مشغل CNC","فني تصنيع"], places:["المصانع"]},
  {id:10, name:"أنظمة الطاقة المتجددة",                            interests:["الطاقة","الكهرباء","التكنولوجيا","الأنظمة الذكية"], learn:["تركيب وصيانة أنظمة الطاقة الشمسية وطاقة الرياح","تقييم مواقع التركيب وتجهيزها وفق المتطلبات الفنية","تركيب الهياكل والتمديدات والأنظمة الكهربائية","تشغيل أنظمة المراقبة والتحكم وضبط إعداداتها","فحص الأنظمة وصيانتها لضمان كفاءة الأداء"], jobs:["فني طاقة"], places:["شركات الطاقة"]},
  {id:11, name:"تكنولوجيا إدارة النظم والشبكات",                   interests:["التكنولوجيا","الشبكات والتحول الرقمي","الأنظمة الذكية"], learn:["تركيب وربط شبكات الحاسوب وأجهزتها","ضبط إعدادات الشبكات وأنظمة التشغيل وخدمات الاتصال","تشخيص الأعطال وصيانة الحواسيب والشبكات","تحديث الأنظمة وترقية مكونات الشبكة واختبارها","توثيق الأعمال الفنية وحماية البيانات والعمل باحتراف"], jobs:["مسؤول شبكات"], places:["شركات التقنية"]},
  {id:12, name:"المواد المتقدمة (ألياف الكربون)",                   interests:["التكنولوجيا","الهندسة","التصنيع","الجودة"], learn:["تصنيع المواد المركبة","استخدام الألياف في التطبيقات الصناعية","تطبيقات صناعية متقدمة"], jobs:["فني مواد"], places:["صناعات متقدمة"]},
  {id:13, name:"الأنظمة الكهربائية المتكاملة في المباني الذكية",   interests:["الكهرباء","الأنظمة الذكية","البناء والإنشاءات","التكنولوجيا","الأتمتة"], learn:["تنفيذ التمديدات الكهربائية وفحصها وتأريضها في المباني","بناء الدارات الكهربائية والإلكترونية الأساسية واختبارها","تركيب أنظمة المراقبة والإنذار والتحكم والاتصال الداخلي","تنفيذ أنظمة التحكم بالمحركات والتمديدات الكهربائية الصناعية","تركيب شبكات الحاسوب وPLC والمشاركة في أنظمة المباني الذكية"], jobs:["فني مباني"], places:["شركات إدارة المباني"]},
  {id:14, name:"فني أنظمة التكييف والتبريد وأتمتتها",              interests:["الميكانيك","الصيانة","الأتمتة","الطاقة","الأنظمة الذكية"], learn:["تركيب أنظمة التكييف والتبريد والتهوية","تمديد الأنابيب وعزلها وفحصها وفق المخططات","تركيب أنظمة التهوية والتبريد التجاري","برمجة وحدات التحكم والحساسات وأنظمة الأتمتة","تشغيل الأنظمة وصيانتها بكفاءة واحتراف"], jobs:["فني HVAC"], places:["شركات المقاولات","المنشآت الكبيرة والفنادق والمولات"]},
  {id:15, name:"تمديدات صحية وتدفئة",                              interests:["البناء والإنشاءات","الميكانيك","الصيانة","الطاقة"], learn:["تركيب شبكات المياه والصرف الصحي والغاز","تمديد الأنابيب وعزلها وفحصها وتثبيتها","تركيب وتشغيل أنظمة التدفئة وسخانات المياه","تركيب الأدوات الصحية وربطها بالشبكات","فحص الأنظمة وصيانتها وتسليمها بكفاءة"], jobs:["سباك"], places:["شركات المقاولات","المنشآت الكبيرة والفنادق والمولات"]},
  {id:16, name:"كهرباء الشاحنات والحافلات",                        interests:["الكهرباء","التكنولوجيا","الصيانة","الميكانيك"], learn:["الأنظمة الكهربائية للشاحنات والحافلات","تشخيص الأعطال الكهربائية وإصلاحها","صيانة أنظمة الإضاءة والتحكم"], jobs:["فني كهرباء مركبات"], places:["ورشات كهرباء الشاحنات","شركات النقل العام والخاص","شركات الآليات الثقيلة"]},
  {id:17, name:"ميكانيك الشاحنات والحافلات",                       interests:["الميكانيك","الصيانة","التكنولوجيا"], learn:["صيانة المحركات والأنظمة الميكانيكية","تشخيص وإصلاح الأعطال","صيانة أنظمة الفرامل والتعليق"], jobs:["فني ميكانيك"], places:["ورشات ميكانيك الشاحنات","شركات النقل","شركات الآليات الثقيلة"]},
  {id:18, name:"تكنولوجيا الإنشاءات والهياكل المعدنية",            interests:["البناء والإنشاءات","التصنيع","الميكانيك","الهندسة","الجودة"], learn:["قراءة المخططات وقياس العناصر المعدنية بدقة","قطع وثني المعادن باستخدام أدوات ومعدات حديثة","تنفيذ أعمال اللحام والتجميع المعدني","تركيب الهياكل المعدنية وإنجاز التشطيبات","تطبيق السلامة المهنية والعمل بكفاءة داخل الورشة والموقع"], jobs:["فني إنشاءات"], places:["شركات تشكيل المعادن","مصانع الأثاث","شركات الصيانة العامة"]},
  {id:19, name:"تصميم الأزياء الرقمي (CAD Fashion)",               interests:["التصميم","التكنولوجيا","الإنتاج"], learn:["أساسيات تصميم الأزياء باستخدام الحاسوب والباترون الرقمي","رسم الأزياء والقطع المسطحة ثنائي الأبعاد بدقة","استخدام البرمجيات في تصميم الأزياء","إعداد لوحات الألوان والخامات وتصدير الملفات للإنتاج","تنفيذ مشاريع تصميم رقمية بطريقة احترافية ومنظمة"], jobs:["مصمم رقمي"], places:["مصانع تصميم الأزياء","مشاغل الخياطة"]},
  {id:20, name:"مطور التطبيقات المتقدمة",                          interests:["التكنولوجيا","الشبكات والتحول الرقمي","الأنظمة الذكية","التصميم"], learn:["تحليل متطلبات العميل وتخطيط وتصميم التطبيقات","برمجة التطبيقات باستخدام لغات وأطر عمل حديثة","تصميم واجهات المستخدم وبناء الواجهة الأمامية والخلفية","إدارة قواعد البيانات وربطها بالتطبيق","اختبار التطبيقات وتحسين أدائها وأمانها وتوثيقها"], jobs:["Associate Programmer","مطور تطبيقات","مصمم UI/UX"], places:["شركات البرمجة"]},
];

const interests = [
  {id:0,  label:"الأتمتة",        sub:"والتحكم",        emoji:"🤖", angle:-90,  key:"الأتمتة"},
  {id:1,  label:"الأنظمة الذكية", sub:"والتقنية",       emoji:"🧠", angle:-66,  key:"الأنظمة الذكية"},
  {id:2,  label:"الإلكترونيات",   sub:"والدوائر",       emoji:"📡", angle:-42,  key:"الإلكترونيات"},
  {id:3,  label:"الإنتاج",        sub:"والتصنيع",       emoji:"🏭", angle:-18,  key:"الإنتاج"},
  {id:4,  label:"البناء",         sub:"والإنشاءات",     emoji:"🏗️", angle:6,    key:"البناء والإنشاءات"},
  {id:5,  label:"التصميم",        sub:"والإبداع",       emoji:"🎨", angle:30,   key:"التصميم"},
  {id:6,  label:"التصنيع",        sub:"المتقدم",        emoji:"⚙️", angle:54,   key:"التصنيع"},
  {id:7,  label:"التكنولوجيا",    sub:"والرقمنة",       emoji:"💻", angle:78,   key:"التكنولوجيا"},
  {id:8,  label:"الجودة",         sub:"والمعايير",      emoji:"✅", angle:102,  key:"الجودة"},
  {id:9,  label:"الشبكات",        sub:"والتحول الرقمي", emoji:"🌐", angle:126,  key:"الشبكات والتحول الرقمي"},
  {id:10, label:"الصيانة",        sub:"الصناعية",       emoji:"🔧", angle:150,  key:"الصيانة"},
  {id:11, label:"الطاقة",         sub:"والمتجددة",      emoji:"⚡", angle:174,  key:"الطاقة"},
  {id:12, label:"الكهرباء",       sub:"والأنظمة",       emoji:"🔌", angle:198,  key:"الكهرباء"},
  {id:13, label:"الميكانيك",      sub:"والآلات",        emoji:"🔩", angle:222,  key:"الميكانيك"},
  {id:14, label:"الهندسة",        sub:"التطبيقية",      emoji:"📐", angle:246,  key:"الهندسة"},
];

const categoryIconKind = {
  0: 'gear',
  1: 'chip',
  2: 'circuit',
  3: 'factory',
  4: 'building',
  5: 'pen',
  6: 'wrench',
  7: 'laptop',
  8: 'check',
  9: 'network',
  10: 'wrench',
  11: 'bolt',
  12: 'plug',
  13: 'gear',
  14: 'ruler',
};

const CX = 360, CY = 285;
const BALL_R = 22;
const LONG_R = 180, MED_R = 148, SHORT_R = 112;
const LEAF_LONG = 258, LEAF_MED = 214, LEAF_SHORT = 168;

const sortedByAngle = [...interests].sort((a, b) => a.angle - b.angle);
const pattern = ['long', 'short', 'medium'];
const armType = {};
sortedByAngle.forEach((cat, i) => { armType[cat.id] = pattern[i % 3]; });

function posAt(angleDeg, r) {
  const a = angleDeg * Math.PI / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function getNodePos(cat) {
  const arm = armType[cat.id];
  const r = arm === 'long' ? LONG_R : arm === 'medium' ? MED_R : SHORT_R;
  return posAt(cat.angle, r);
}

function getLeafPos(cat) {
  const arm = armType[cat.id];
  const r = arm === 'long' ? LEAF_LONG : arm === 'medium' ? LEAF_MED : LEAF_SHORT;
  return posAt(cat.angle, r);
}

function getProgramsFor(cat) {
  return programs.filter(p => p.interests.includes(cat.key));
}

function CategoryIcon({ kind, active, hovered }) {
  const stroke = active ? '#fff' : hovered ? '#8a0f16' : '#AB131C';
  const fill = active ? '#fff' : hovered ? 'rgba(171,19,28,0.22)' : 'rgba(171,19,28,0.08)';
  const common = { stroke, fill, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke' };

  switch (kind) {
    case 'gear':
      return (
        <g transform="translate(0 0)">
          <circle cx="8" cy="8" r="3" {...common} />
          <circle cx="8" cy="8" r="6.2" fill="none" stroke={stroke} strokeWidth="1.8" />
          <path d="M8 0.8v2.1M8 13.1v2.1M0.8 8h2.1M13.1 8h2.1M2.5 2.5l1.5 1.5M12 12l1.5 1.5M2.5 13.5 4 12M12 4l1.5-1.5" {...common} fill="none" />
        </g>
      );
    case 'chip':
      return (
        <g>
          <rect x="2.5" y="2.5" width="11" height="11" rx="2.2" {...common} />
          <rect x="5" y="5" width="6" height="6" rx="1.2" fill="none" stroke={stroke} strokeWidth="1.8" />
          <path d="M1 5h1.2M1 8h1.2M1 11h1.2M13.8 5h1.2M13.8 8h1.2M13.8 11h1.2M5 1v1.2M8 1v1.2M11 1v1.2M5 13.8v1.2M8 13.8v1.2M11 13.8v1.2" {...common} fill="none" />
        </g>
      );
    case 'circuit':
      return (
        <g>
          <path d="M3 4.5h5.5v3H11a2 2 0 0 1 2 2v3" {...common} fill="none" />
          <path d="M4 4.5v-2M8.5 4.5v-2M12 12.5v2" {...common} fill="none" />
          <circle cx="3" cy="4.5" r="1.2" {...common} />
          <circle cx="8.5" cy="7.5" r="1.2" {...common} />
          <circle cx="13" cy="12.5" r="1.2" {...common} />
        </g>
      );
    case 'factory':
      return (
        <g>
          <path d="M2.5 13.5V7l3 1.8V7l3 1.8V6l3 1.8V13.5z" {...common} fill="none" />
          <path d="M3.5 13.5h9" {...common} fill="none" />
          <path d="M4 6.2 6 4.7M7 5.5 9 4M10 6.2l1.8-1.4" {...common} fill="none" />
          <rect x="4" y="9" width="1.2" height="1.2" fill={stroke} stroke="none" />
          <rect x="6.7" y="9" width="1.2" height="1.2" fill={stroke} stroke="none" />
          <rect x="9.4" y="9" width="1.2" height="1.2" fill={stroke} stroke="none" />
        </g>
      );
    case 'building':
      return (
        <g>
          <path d="M3 13.5V4.5h7.8v9" {...common} fill="none" />
          <path d="M6 13.5v-2.5h1.8v2.5" {...common} fill="none" />
          <path d="M5 6.2h1.2M7.6 6.2h1.2M5 8.3h1.2M7.6 8.3h1.2M5 10.4h1.2M7.6 10.4h1.2" {...common} fill="none" />
        </g>
      );
    case 'pen':
      return (
        <g>
          <path d="M3 11.8 10.8 4c.4-.4 1-.4 1.4 0l.8.8c.4.4.4 1 0 1.4L5.2 13.2 2.5 13.5z" {...common} fill="none" />
          <path d="M9.5 5.3l2.2 2.2" {...common} fill="none" />
          <path d="M2.5 13.5 5.2 13.2" {...common} fill="none" />
        </g>
      );
    case 'wrench':
      return (
        <g>
          <path d="M11.5 3.5a2.8 2.8 0 0 0-3.7 3.7L3.2 12a1.5 1.5 0 1 0 2.1 2.1l5-4.6a2.8 2.8 0 0 0 3.7-3.7l-2 2-1.6-.6-.6-1.6z" {...common} fill="none" />
        </g>
      );
    case 'laptop':
      return (
        <g>
          <rect x="3" y="4" width="10" height="6.2" rx="1" {...common} fill="none" />
          <path d="M2.5 12.5h11" {...common} fill="none" />
          <path d="M5 7.2h6" {...common} fill="none" />
        </g>
      );
    case 'check':
      return (
        <g>
          <path d="M3 8.2 6 11 13 4.5" {...common} fill="none" />
          <circle cx="8" cy="8" r="6.1" fill="none" stroke={stroke} strokeWidth="1.8" />
        </g>
      );
    case 'network':
      return (
        <g>
          <circle cx="8" cy="8" r="2" {...common} />
          <path d="M8 3.5v2.1M8 10.4v2.1M3.5 8h2.1M10.4 8h2.1M4.6 4.6l1.5 1.5M10.4 10.4l1.5 1.5M4.6 11.4 6.1 9.9M10.4 5.6l1.5-1.5" {...common} fill="none" />
        </g>
      );
    case 'bolt':
      return (
        <g>
          <path d="M9.3 1.8 4 8h3.1L6.7 14.2 12 8H8.9z" {...common} fill="none" />
        </g>
      );
    case 'plug':
      return (
        <g>
          <path d="M6 3.5v3M10 3.5v3M4.5 6.5h7v2.2a3.5 3.5 0 0 1-3.5 3.5h0A3.5 3.5 0 0 1 4.5 8.7z" {...common} fill="none" />
          <path d="M8 12.2v2M8 12.2h2" {...common} fill="none" />
        </g>
      );
    case 'ruler':
      return (
        <g>
          <path d="M3 11 11 3l2 2-8 8H3z" {...common} fill="none" />
          <path d="M6 6l1 1M7.8 4.2l1 1M4.2 7.8l1 1M9.6 5.4l1 1" {...common} fill="none" />
        </g>
      );
    default:
      return null;
  }
}

// ─── Background canvas ───────────────────────────────────────────────────────
function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const C = '#AB131C';
    const ALPHA = 0.07;
    const CELL = 110;
    const S = 28;

    const icons = [
      function gear(ctx) {
        const teeth = 8, R = S / 2, r = R * 0.65, ir = R * 0.38;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
          const a0 = (i / teeth) * Math.PI * 2, a1 = ((i + 0.35) / teeth) * Math.PI * 2,
            a2 = ((i + 0.65) / teeth) * Math.PI * 2, a3 = ((i + 1) / teeth) * Math.PI * 2;
          if (i === 0) ctx.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
          ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
          ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R);
          ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R);
          ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
          ctx.lineTo(Math.cos(a3) * r, Math.sin(a3) * r);
        }
        ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, ir, 0, Math.PI * 2); ctx.stroke();
      },
      function laptop(ctx) {
        const w = S * 0.85, h = S * 0.55;
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(-w / 2 - 4, h / 2 + 5);
        ctx.lineTo(w / 2 + 4, h / 2 + 5); ctx.lineTo(w / 2, h / 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-w * 0.25, -h * 0.1); ctx.bezierCurveTo(-w * 0.05, -h * 0.35, w * 0.05, -h * 0.35, w * 0.25, -h * 0.1);
        ctx.stroke();
      },
      function car(ctx) {
        const bw = S * 0.9, bh = S * 0.28, by = S * 0.08;
        ctx.beginPath();
        ctx.moveTo(-bw / 2, by); ctx.lineTo(-bw / 2, by - bh);
        ctx.lineTo(-bw * 0.28, by - bh - S * 0.22); ctx.lineTo(bw * 0.18, by - bh - S * 0.22);
        ctx.lineTo(bw / 2, by - bh); ctx.lineTo(bw / 2, by); ctx.closePath(); ctx.stroke();
        const wy = by + S * 0.07, wr = S * 0.14;
        ctx.beginPath(); ctx.arc(-bw * 0.3, wy, wr, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(bw * 0.3, wy, wr, 0, Math.PI * 2); ctx.stroke();
      },
      function energy(ctx) {
        ctx.beginPath();
        ctx.moveTo(-S * 0.18, -S * 0.48); ctx.lineTo(-S * 0.28, 0); ctx.lineTo(-S * 0.02, 0);
        ctx.lineTo(-S * 0.18, S * 0.48); ctx.lineTo(S * 0.28, 0); ctx.lineTo(S * 0.02, 0);
        ctx.closePath(); ctx.stroke();
      },
      function building(ctx) {
        const bw = S * 0.65, bh = S * 0.7, bx = -bw / 2, by = S * 0.38 - bh;
        ctx.strokeRect(bx, by, bw, bh);
        const ww = bw * 0.22, wh = bh * 0.16, gap = bw * 0.14;
        for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++)
          ctx.strokeRect(bx + gap + (ww + gap) * c, by + gap + (wh + gap * 1.2) * r, ww, wh);
        ctx.beginPath();
        ctx.moveTo(bx + bw - 4, by); ctx.lineTo(bx + bw + S * 0.25, by);
        ctx.moveTo(bx + bw + S * 0.25, by); ctx.lineTo(bx + bw + S * 0.25, by + S * 0.25);
        ctx.stroke();
      },
      function pen(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, S * 0.48);
        ctx.lineTo(-S * 0.22, -S * 0.1); ctx.lineTo(S * 0.22, -S * 0.1);
        ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-S * 0.22, -S * 0.1); ctx.lineTo(-S * 0.22, -S * 0.3);
        ctx.lineTo(S * 0.22, -S * 0.3); ctx.lineTo(S * 0.22, -S * 0.1); ctx.stroke();
        ctx.beginPath(); ctx.arc(-S * 0.48, -S * 0.05, 3, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(S * 0.32, S * 0.3, 3, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([2, 3]);
        ctx.moveTo(-S * 0.48, -S * 0.05); ctx.bezierCurveTo(-S * 0.2, S * 0.1, S * 0.1, S * 0.2, S * 0.32, S * 0.3);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    ];

    function draw() {
      const stage = canvas.parentElement;
      canvas.width = stage.offsetWidth;
      canvas.height = stage.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = C;
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = ALPHA;
      const cols = Math.ceil(canvas.width / CELL) + 1;
      const rows = Math.ceil(canvas.height / CELL) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * 3 + col) % icons.length;
          const offX = (row % 2 === 0) ? 0 : CELL * 0.5;
          const cx = col * CELL + offX;
          const cy = row * CELL;
          ctx.save();
          ctx.translate(cx, cy);
          icons[idx](ctx);
          ctx.restore();
        }
      }
    }

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

// ─── Programs Panel ──────────────────────────────────────────────────────────
function ProgramsPanel({ visible, cat, programs, selectedProgram, onSelectProgram, onClose, footerOffset = 0 }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  return (
    <div style={{
      position: 'absolute',
      left: isMobile ? 10 : 16,
      right: isMobile ? 10 : 'auto',
      top: isMobile ? 'auto' : '50%',
      bottom: isMobile ? footerOffset + 10 : 'auto',
      transform: isMobile
        ? `translateY(${visible ? 0 : 14}px)`
        : `translateY(-50%) translateX(${visible ? 0 : -16}px)`,
      width: isMobile ? 'auto' : 252,
      background: '#fff', border: '1.5px solid rgba(171,19,28,0.2)',
      borderRadius: 16, boxShadow: '0 8px 40px rgba(171,19,28,0.1)',
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity 0.4s, transform 0.4s',
      zIndex: 70, overflow: 'hidden',
    }}>
      <div style={{ background: '#AB131C', padding: '14px 14px 12px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontFamily: 'Tajawal,sans-serif', marginBottom: 4 }}>
              البرامج المتاحة
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white', fontFamily: 'Tajawal,sans-serif', lineHeight: 1.3 }}>
              {cat ? `${cat.label} ${cat.sub}` : '—'}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>
              {programs.length} برنامج متاح
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق قائمة البرامج"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      </div>
      <div style={{ overflowY: 'auto', maxHeight: isMobile ? 'calc(42dvh - 76px)' : '370px', padding: 10 }}>
        {programs.map(p => (
          <div
            key={p.id}
            onClick={() => onSelectProgram(p)}
            style={{
              border: `1px solid ${selectedProgram?.id === p.id ? '#AB131C' : 'rgba(171,19,28,0.1)'}`,
              borderRadius: 10, padding: '10px 12px', marginBottom: 7, cursor: 'pointer',
              transition: 'all 0.2s',
              background: selectedProgram?.id === p.id ? 'rgba(171,19,28,0.06)' : '#fafafa',
              boxShadow: selectedProgram?.id === p.id ? '0 2px 12px rgba(171,19,28,0.1)' : 'none',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2c2c2c', fontFamily: 'Tajawal,sans-serif', lineHeight: 1.4, marginBottom: 5 }}>
              {p.name}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {p.jobs.slice(0, 2).map((j, i) => (
                <span key={i} style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: 'rgba(171,19,28,0.08)', color: '#AB131C' }}>
                  {j}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Detail Panel ────────────────────────────────────────────────────────────
function DetailPanel({ visible, program, onClose, footerOffset = 0 }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  return (
    <div style={{
      position: 'absolute',
      right: isMobile ? 10 : 16,
      left: isMobile ? 10 : 'auto',
      top: isMobile ? 10 : '50%',
      bottom: isMobile ? footerOffset + 10 : 'auto',
      transform: isMobile
        ? `translateY(${visible ? 0 : 16}px)`
        : `translateY(-50%) translateX(${visible ? 0 : 16}px)`,
      width: isMobile ? 'auto' : 248,
      background: '#fff', border: '1.5px solid rgba(171,19,28,0.2)',
      borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(171,19,28,0.1)',
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity 0.4s, transform 0.4s',
      zIndex: 90,
    }}>
      <div style={{ background: '#2c2c2c', padding: '14px 14px 12px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontFamily: 'Tajawal,sans-serif', marginBottom: 4 }}>
              تفاصيل البرنامج
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'white', fontFamily: 'Tajawal,sans-serif', lineHeight: 1.4 }}>
              {program?.name || '—'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق تفاصيل البرنامج"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.24)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      </div>
      {program && (
        <div style={{ overflowY: 'auto', maxHeight: isMobile ? 'calc(100dvh - 140px)' : '440px', padding: '12px 14px' }}>
          <Section title="ماذا ستتعلم؟" />
          {program.learn.map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#555', padding: '4px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', lineHeight: 1.55 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#AB131C', flexShrink: 0, marginTop: 5, display: 'inline-block' }} />
              {l}
            </div>
          ))}
          <Section title="الفرص الوظيفية" />
          {program.jobs.map((j, i) => <JobRow key={i} text={j} />)}
          <Section title="أماكن العمل المستقبلية" />
          {program.places.map((pl, i) => <JobRow key={i} text={pl} />)}
        </div>
      )}
    </div>
  );
}

function Section({ title }) {
  return (
    <div style={{ fontSize: 9, letterSpacing: 2, color: '#AB131C', textTransform: 'uppercase', fontFamily: 'Tajawal,sans-serif', marginBottom: 7, marginTop: 12, fontWeight: 700 }}>
      {title}
    </div>
  );
}

function JobRow({ text }) {
  return (
    <div style={{ fontSize: 11, color: '#777', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(171,19,28,0.3)', flexShrink: 0, display: 'inline-block' }} />
      {text}
    </div>
  );
}

// ─── Main SVG ────────────────────────────────────────────────────────────────
function InterestNode({ cat, active, onClick }) {
  const np = getNodePos(cat);
  const [hovered, setHovered] = useState(false);

  const ringStyle = active
    ? { fill: '#AB131C', stroke: '#7a0b13', strokeWidth: 2.5, filter: 'drop-shadow(0 0 12px rgba(171,19,28,0.6))' }
    : hovered
    ? { fill: 'rgba(171,19,28,0.1)', stroke: 'rgba(171,19,28,0.5)', strokeWidth: 1.5, filter: 'drop-shadow(0 0 6px rgba(171,19,28,0.25))' }
    : { fill: 'rgba(171,19,28,0.04)', stroke: 'rgba(171,19,28,0.22)', strokeWidth: 1.5 };

  const innerStyle = active
    ? { fill: '#c0222b', stroke: '#8a0f16', strokeWidth: 1 }
    : { fill: 'rgba(171,19,28,0.08)', stroke: 'rgba(171,19,28,0.28)', strokeWidth: 1 };

  const coreStyle = active
    ? { fill: '#d42f3a' }
    : hovered
    ? { fill: 'rgba(171,19,28,0.35)' }
    : { fill: 'rgba(171,19,28,0.2)' };

  const labelFill = active ? '#ffffff' : '#555';
  const labelWeight = active ? 700 : 400;

  return (
    <g
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
    >
      <circle cx={np.x} cy={np.y} r={BALL_R + 9} style={{ ...ringStyle, transition: 'all 0.3s' }} />
      <circle cx={np.x} cy={np.y} r={BALL_R} style={{ ...innerStyle, transition: 'all 0.3s' }} />
      <circle cx={np.x} cy={np.y} r={BALL_R - 12} style={{ ...coreStyle, transition: 'all 0.3s' }} />
      <g transform={`translate(${np.x - 8} ${np.y - 22})`} style={{ pointerEvents: 'none' }}>
        <CategoryIcon kind={categoryIconKind[cat.id]} active={active} hovered={hovered} />
      </g>
      <text x={np.x} y={np.y - 2} textAnchor="middle" fill={labelFill} fontFamily="Cairo,sans-serif" fontSize={9} fontWeight={labelWeight} style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>{cat.label}</text>
      <text x={np.x} y={np.y + 9} textAnchor="middle" fill={labelFill} fontFamily="Cairo,sans-serif" fontSize={9} fontWeight={labelWeight} style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>{cat.sub}</text>
    </g>
  );
}

function LeafBadge({ cat, visible, programCount, onClick }) {
  const lp = getLeafPos(cat);
  const [hovered, setHovered] = useState(false);

  return (
    <g
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.4s',
        cursor: 'pointer',
        animation: visible ? 'leafPulse 2.5s ease-in-out infinite' : 'none',
      }}
    >
      <circle cx={lp.x} cy={lp.y} r={16} fill={hovered ? '#8a0f16' : '#AB131C'} style={{ transition: 'fill 0.3s' }} />
      <text x={lp.x} y={lp.y + 4} textAnchor="middle" fill="white" fontFamily="Tajawal,sans-serif" fontSize={11} fontWeight={800} style={{ pointerEvents: 'none' }}>{programCount}</text>
      <text x={lp.x} y={lp.y + 22} textAnchor="middle" fill="#666" fontFamily="Cairo,sans-serif" fontSize={8} style={{ pointerEvents: 'none' }}>برنامج</text>
    </g>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function CAVTInterestsExplorer({ onBack = () => {} }) {
  const [activeId, setActiveId] = useState(null);
  const [leafVisible, setLeafVisible] = useState({});
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 900;
  });
  const headerHeight = isMobile ? 56 : 64;
  const footerHeight = isMobile ? 220 : 178;

  const activeCategory = activeId !== null ? interests.find(c => c.id === activeId) : null;
  const activePrograms = activeCategory ? getProgramsFor(activeCategory) : [];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSelectInterest = useCallback((id) => {
    if (activeId === id) {
      setActiveId(null);
      setLeafVisible({});
      setSelectedProgram(null);
      setShowDetail(false);
      return;
    }
    setActiveId(id);
    setLeafVisible({});
    setSelectedProgram(null);
    setShowDetail(false);
    setShowHint(false);
    setTimeout(() => {
      setLeafVisible(prev => ({ ...prev, [id]: true }));
    }, 300);
  }, [activeId]);

  const handleSelectProgram = useCallback((p) => {
    setSelectedProgram(p);
    setShowDetail(true);
  }, []);

  const handleClosePrograms = useCallback(() => {
    setActiveId(null);
    setLeafVisible({});
    setSelectedProgram(null);
    setShowDetail(false);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedProgram(null);
    setShowDetail(false);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLeafClick = useCallback((id) => {
    // already shows panel — leaf click just focuses it
    if (activeId !== id) handleSelectInterest(id);
  }, [activeId, handleSelectInterest]);

  return (
    <div style={{ width: '100%', minHeight: '100dvh', fontFamily: 'Cairo,sans-serif', direction: 'rtl', overflow: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@300;400;700;800&display=swap');
        @keyframes hubB { 0%,100%{opacity:0.35} 50%{opacity:0.85} }
        @keyframes leafPulse { 0%,100%{filter:drop-shadow(0 0 3px rgba(171,19,28,0.2))} 50%{filter:drop-shadow(0 0 10px rgba(171,19,28,0.55))} }
        @keyframes flowLine { from{stroke-dashoffset:20} to{stroke-dashoffset:0} }
        * { margin:0; padding:0; box-sizing:border-box; }
      `}</style>

      {/* Header */}
      <div style={{
        
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: headerHeight, background: '#9C0D13',
        display: 'grid', alignItems: 'center',
        gridTemplateColumns: isMobile ? '88px 1fr 80px' : '150px 1fr 110px',
        gap: isMobile ? 6 : 12,
        padding: isMobile ? '0 10px' : '0 18px',
        boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
        direction: 'ltr',
      }}
      
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)',
            color: 'white', padding: isMobile ? '5px 12px' : '6px 18px', borderRadius: 6,
            fontFamily: 'Cairo,sans-serif', fontSize: isMobile ? 12 : 13, cursor: 'pointer',
            justifySelf: 'start',
          }}
        >
          رجوع
        </button>
        <span style={{
          direction: 'rtl',
          fontSize: isMobile ? 9 : 11, letterSpacing: isMobile ? 0.8 : 1.5, color: 'rgba(255,255,255,0.75)', fontFamily: 'Tajawal,sans-serif',
          whiteSpace: 'nowrap',
          maxWidth: isMobile ? '100%' : 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
          justifySelf: 'center',
        }}>
          اكتشف اهتماماتك — المسار الثاني
        </span>
        <img
          src={logo}
          alt="CAVT Logo"
          style={{
            height: isMobile ? 28 : 42,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            justifySelf: 'end',
            maxWidth: isMobile ? 84 : 140,
          }}
        />
      </div>

      {/* Stage */}
      <div style={{ position: 'relative', marginTop: headerHeight, minHeight: `calc(100vh - ${headerHeight}px)`, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#fff', overflow: 'hidden', paddingTop: isMobile ? 16 : 24 }}>
        <BackgroundCanvas />

        {/* Page Title */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: isMobile ? '0 16px 10px' : '0 24px 14px', direction: 'rtl' }}>
          <div style={{ marginBottom: isMobile ? 6 : 8 }}>
            <span style={{ background: 'linear-gradient(135deg, #e59a72, #9C0D13)', color: 'white', fontSize: 12, padding: '4px 16px', borderRadius: 20, fontWeight: 600, fontFamily: 'Tajawal,sans-serif', boxShadow: '0 8px 20px rgba(156,13,19,0.18)' }}>
              المسار الثاني — اعرف اهتماماتك
            </span>
          </div>
          <h1 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#24201d', marginBottom: isMobile ? 4 : 6, lineHeight: 1.2, letterSpacing: '-0.02em', fontFamily: 'Tajawal,sans-serif' }}>
            شو <span style={{ color: '#9C0D13' }}>اهتماماتك</span>؟
          </h1>
          <p style={{ color: '#6f655f', fontSize: isMobile ? 13 : 14, fontFamily: 'Tajawal,sans-serif', margin: 0 }}>
            اضغط على اهتمامك وشوف البرامج المناسبة الك
          </p>
        </div>

        {/* SVG - Compass */}
        <svg viewBox="0 0 760 640" style={{ width: isMobile ? '100vw' : 'min(960px,99vw)', height: isMobile ? 'auto' : 'min(800px,94vh)', maxHeight: isMobile ? '60dvh' : 'none', overflow: 'visible' }}>
          <defs>
            <radialGradient id="cFace" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#f8f3ec"/>
              <stop offset="100%" stopColor="#e8ddd0"/>
            </radialGradient>
            <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#AB131C" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#AB131C" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx="380" cy="322" r="148" fill="url(#cGlow)" style={{ animation:'hubB 3.5s ease-in-out infinite' }}/>

          {/* Spoke lines — red, L/M/S radii */}
          {interests.map(cat => {
            const arm   = armType[cat.id];
            const cardR = arm === 'long' ? 270 : arm === 'medium' ? 221 : 172;
            const rad   = cat.angle * Math.PI / 180;
            const x1 = 380 + 113 * Math.cos(rad);
            const y1 = 322 + 113 * Math.sin(rad);
            const x2 = 380 + cardR * Math.cos(rad);
            const y2 = 322 + cardR * Math.sin(rad);
            const lit = activeId === cat.id;
            return (
              <line key={cat.id}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#AB131C"
                strokeWidth={lit ? 2.6 : 1.8}
                strokeDasharray="6 4"
                strokeLinecap="round"
                opacity={lit ? 1 : 0.4}
                style={lit ? { animation:'flowLine 1.2s linear infinite' } : {}}
              />
            );
          })}

          {/* Dots on ring */}
          {interests.map(cat => {
            const rad = cat.angle * Math.PI / 180;
            const lit = activeId === cat.id;
            return (
              <circle key={cat.id}
                cx={380 + 113 * Math.cos(rad)}
                cy={322 + 113 * Math.sin(rad)}
                r={lit ? 7.5 : 5.5}
                fill="#AB131C"
                opacity={lit ? 1 : 0.5}
                style={{ transition:'r 0.25s, opacity 0.25s' }}
              />
            );
          })}

          {/* Quadrant arcs */}
          <path d="M 380 210 A 112 112 0 0 1 492 322" fill="none" stroke="#AB131C" strokeWidth="7" strokeLinecap="round"/>
          <path d="M 492 322 A 112 112 0 0 1 380 434" fill="none" stroke="#c41a22" strokeWidth="7" strokeLinecap="round"/>
          <path d="M 380 434 A 112 112 0 0 1 268 322" fill="none" stroke="#7a0b12" strokeWidth="7" strokeLinecap="round"/>
          <path d="M 268 322 A 112 112 0 0 1 380 210" fill="none" stroke="#e83040" strokeWidth="7" strokeLinecap="round"/>
          <circle cx="380" cy="210" r="7" fill="#AB131C"/>
          <circle cx="492" cy="322" r="7" fill="#c41a22"/>
          <circle cx="380" cy="434" r="7" fill="#7a0b12"/>
          <circle cx="268" cy="322" r="7" fill="#e83040"/>

          {/* Tick ring */}
          <circle cx="380" cy="322" r="106" fill="none" stroke="#ddd5c8" strokeWidth="1.3"/>
          {[0,45,90,135,180,225,270,315].map((deg,i) => {
            const a = deg * Math.PI / 180;
            const r1 = 96, r2 = i % 2 === 0 ? 89 : 92;
            return <line key={deg}
              x1={380+r1*Math.cos(a)} y1={322+r1*Math.sin(a)}
              x2={380+r2*Math.cos(a)} y2={322+r2*Math.sin(a)}
              stroke="#c8c0b2" strokeWidth="1.2"/>;
          })}
          <circle cx="380" cy="322" r="88" fill="none" stroke="#ddd5c8" strokeWidth="1"/>
          <circle cx="380" cy="322" r="84" fill="url(#cFace)"/>

          {/* Grey secondary needles */}
          {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(deg => (
            <polygon key={deg}
              points="380,241 384,293 380,299 376,293"
              fill="rgba(171,19,28,0.22)" opacity="0.85"
              transform={"rotate("+deg+",380,322)"}/>
          ))}
          {/* Dark diagonal needles */}
          {[45,135,225,315].map(deg => (
            <polygon key={deg}
              points="380,239 385,293 380,299 375,293"
              fill="#7a0b12"
              transform={"rotate("+deg+",380,322)"}/>
          ))}
          {/* Cardinal needles */}
          <polygon points="380,239 385.5,293 380,299 374.5,293" fill="#AB131C"/>
          <polygon points="380,405 385.5,351 380,345 374.5,351" fill="#9C0D13"/>
          <polygon points="463,322 409,327.5 403,322 409,316.5" fill="#9C0D13"/>
          <polygon points="297,322 351,327.5 357,322 351,316.5" fill="#9C0D13"/>

          {/* Hub */}
          <circle cx="380" cy="322" r="24" fill="#7a0b12"/>
          <circle cx="380" cy="322" r="21" fill="#AB131C"/>
          <circle cx="380" cy="322" r="14" fill="#fae8e8"/>
          <circle cx="380" cy="322" r="5.5" fill="#7a0b12"/>

          {/* N S E W labels */}
          <text x="380" y="196" textAnchor="middle" fill="#1e1e2e" fontFamily="Tajawal,sans-serif" fontSize="13" fontWeight="800">N</text>
          <text x="380" y="452" textAnchor="middle" fill="#1e1e2e" fontFamily="Tajawal,sans-serif" fontSize="13" fontWeight="800">S</text>
          <text x="252" y="327" textAnchor="middle" fill="#1e1e2e" fontFamily="Tajawal,sans-serif" fontSize="13" fontWeight="800">W</text>
          <text x="508" y="327" textAnchor="middle" fill="#1e1e2e" fontFamily="Tajawal,sans-serif" fontSize="13" fontWeight="800">E</text>

          {/* Interest cards — L/M/S radii, label only */}
          {interests.map(cat => {
            const arm   = armType[cat.id];
            const cardR = arm === 'long' ? 270 : arm === 'medium' ? 221 : 172;
            const rad   = cat.angle * Math.PI / 180;
            const cx    = 380 + cardR * Math.cos(rad);
            const cy    = 322 + cardR * Math.sin(rad);
            const W = 104, H = 80;
            const L = cx - W/2, T = cy - H/2;
            const isActive = activeId === cat.id;
            const progs = getProgramsFor(cat);
            return (
              <g key={cat.id}
                 onClick={() => handleSelectInterest(cat.id)}
                 style={{ cursor:'pointer' }}>
                <rect x={L+2} y={T+4} width={W} height={H} rx="13" fill="rgba(0,0,0,0.07)"/>
                <rect x={L} y={T} width={W} height={H} rx="13"
                  fill="rgba(255,255,255,0.97)"
                  stroke={isActive ? '#AB131C' : 'rgba(0,0,0,0.07)'}
                  strokeWidth={isActive ? 2.2 : 0.8}/>
                <rect x={cx-22} y={T+8} width="44" height="44" rx="10"
                  fill={isActive ? 'rgba(171,19,28,0.2)' : 'rgba(171,19,28,0.09)'}/>
                <g transform={"translate("+(cx-8)+" "+(T+22)+")"}>
                  <CategoryIcon kind={categoryIconKind[cat.id]} active={isActive} hovered={false}/>
                </g>
                <text x={cx} y={T+64}
                  textAnchor="middle"
                  fill={isActive ? '#AB131C' : '#2e2a28'}
                  fontFamily="Cairo,sans-serif" fontSize="11.5" fontWeight="700"
                  style={{ transition:'fill 0.2s' }}>{cat.label}</text>
                {isActive && progs.length > 0 && (
                  <>
                    <circle cx={L+W-10} cy={T+10} r={11} fill="#AB131C"/>
                    <text x={L+W-10} y={T+14} textAnchor="middle"
                      fill="white" fontFamily="Tajawal,sans-serif" fontSize="9" fontWeight="800">
                      {progs.length}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Programs Panel */}
        <ProgramsPanel
          visible={activeId !== null}
          cat={activeCategory}
          programs={activePrograms}
          selectedProgram={selectedProgram}
          onSelectProgram={handleSelectProgram}
          onClose={handleClosePrograms}
          footerOffset={0}
        />

        {/* Detail Panel */}
        <DetailPanel
          visible={showDetail}
          program={selectedProgram}
          onClose={handleCloseDetail}
          footerOffset={0}
        />

      </div>

      {/* Footer */}
      <div style={{
        background: '#414141',
        color: 'rgba(255,255,255,0.92)',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '18px 16px 14px' : '28px 48px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: isMobile ? 14 : 18,
          fontFamily: 'Tajawal,sans-serif',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1.6fr 0.9fr',
            gap: isMobile ? 20 : 24,
            alignItems: 'start',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <img
                src="data:image/png;base64,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"
                alt="CAVT Logo"
                style={{ width: isMobile ? 118 : 150, height: 'auto', objectFit: 'contain', display: 'block' }}
              />
              <div style={{ color: 'rgba(255,255,255,0.84)', fontSize: isMobile ? 12 : 14, lineHeight: 1.7, maxWidth: 280 }}>
                اكتشف اهتماماتك، وتعرّف على المسارات والبرامج المناسبة لك بطريقة واضحة وسريعة.
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 12 : 18, alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', paddingTop: isMobile ? 0 : 18 }}>
              {[
                { label: 'Home', href: 'http://localhost:3000/#' },
                { label: 'About Us', href: 'http://localhost:3000/#' },
                { label: 'FAQs', href: 'http://localhost:3000/#' },
                { label: 'Contact Us', href: 'http://localhost:3000/#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => event.preventDefault()}
                  style={{
                    color: 'rgba(255,255,255,0.92)',
                    textDecoration: 'none',
                    fontSize: isMobile ? 14 : 18,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', alignItems: 'flex-start', gap: 10, paddingTop: isMobile ? 0 : 6, flexWrap: 'wrap' }}>
              {[
                { label: 'f', name: 'Facebook' },
                { label: 'x', name: 'X' },
                { label: '◎', name: 'Instagram' },
                { label: 'in', name: 'LinkedIn' },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  aria-label={social.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#fff',
                    color: '#7b6f5e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: social.label === 'in' ? 16 : 18,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                    textTransform: 'lowercase',
                  }}
                >
                  {social.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: isMobile ? 0 : 6,
            flexWrap: 'wrap',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? 12 : 14 }}>
              © All rights reserved 2026 CAVT
            </div>
            <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: 'none',
                background: '#000',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
                position: isMobile ? 'static' : 'fixed',
                right: isMobile ? 'auto' : 22,
                bottom: isMobile ? 'auto' : 18,
                zIndex: 70,
              }}
            >
              ^
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
