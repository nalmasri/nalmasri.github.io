import { useState, useEffect, useRef, useCallback } from "react";
import logo from '../../Assets/image2.png';
import footerLogo from '../../Assets/footer_logo.png';

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
  {id:0,  label:"الأتمتة",        sub:"والتحكم",        emoji:"🤖", key:"الأتمتة"},
  {id:1,  label:"الأنظمة الذكية", sub:"والتقنية",       emoji:"🧠", key:"الأنظمة الذكية"},
  {id:2,  label:"الإلكترونيات",   sub:"والدوائر",       emoji:"📡", key:"الإلكترونيات"},
  {id:3,  label:"الإنتاج",        sub:"والتصنيع",       emoji:"🏭", key:"الإنتاج"},
  {id:4,  label:"البناء",         sub:"والإنشاءات",     emoji:"🏗️", key:"البناء والإنشاءات"},
  {id:5,  label:"التصميم",        sub:"والإبداع",       emoji:"🎨", key:"التصميم"},
  {id:6,  label:"التصنيع",        sub:"المتقدم",        emoji:"⚙️", key:"التصنيع"},
  {id:7,  label:"التكنولوجيا",    sub:"والرقمنة",       emoji:"💻", key:"التكنولوجيا"},
  {id:8,  label:"الجودة",         sub:"والمعايير",      emoji:"✅", key:"الجودة"},
  {id:9,  label:"الشبكات",        sub:"والتحول الرقمي", emoji:"🌐", key:"الشبكات والتحول الرقمي"},
  {id:10, label:"الصيانة",        sub:"الصناعية",       emoji:"🔧", key:"الصيانة"},
  {id:11, label:"الطاقة",         sub:"والمتجددة",      emoji:"⚡", key:"الطاقة"},
  {id:12, label:"الكهرباء",       sub:"والأنظمة",       emoji:"🔌", key:"الكهرباء"},
  {id:13, label:"الميكانيك",      sub:"والآلات",        emoji:"🔩", key:"الميكانيك"},
  {id:14, label:"الهندسة",        sub:"التطبيقية",      emoji:"📐", key:"الهندسة"},
];

// ─── Category color palette ───────────────────────────────────────────────────
const CAT_STYLES = [
  { bg: '#fff0ee', color: '#AB131C' },
  { bg: '#eef3ff', color: '#3b82f6' },
  { bg: '#f5eeff', color: '#8b5cf6' },
  { bg: '#fff7ee', color: '#d97706' },
  { bg: '#eefff3', color: '#10b981' },
  { bg: '#fff0f5', color: '#ec4899' },
  { bg: '#fffbee', color: '#b45309' },
  { bg: '#eefcff', color: '#0891b2' },
  { bg: '#eefffc', color: '#0f766e' },
  { bg: '#fff7ee', color: '#ea580c' },
  { bg: '#ede9fe', color: '#7c3aed' },
  { bg: '#fefce8', color: '#ca8a04' },
  { bg: '#fee2e2', color: '#dc2626' },
  { bg: '#f3e8ff', color: '#9333ea' },
  { bg: '#dbeafe', color: '#1d4ed8' },
];

function getProgramsFor(cat) {
  return programs.filter(p => p.interests.includes(cat.key));
}

// ─── Background canvas ───────────────────────────────────────────────────────
function BackgroundCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const C = '#AB131C'; const ALPHA = 0.05; const CELL = 110; const S = 28;
    const icons = [
      function gear(ctx) {
        const teeth = 8, R = S/2, r = R*0.65, ir = R*0.38;
        ctx.beginPath();
        for (let i=0;i<teeth;i++){const a0=(i/teeth)*Math.PI*2,a1=((i+0.35)/teeth)*Math.PI*2,a2=((i+0.65)/teeth)*Math.PI*2,a3=((i+1)/teeth)*Math.PI*2;if(i===0)ctx.moveTo(Math.cos(a0)*r,Math.sin(a0)*r);ctx.lineTo(Math.cos(a1)*r,Math.sin(a1)*r);ctx.lineTo(Math.cos(a1)*R,Math.sin(a1)*R);ctx.lineTo(Math.cos(a2)*R,Math.sin(a2)*R);ctx.lineTo(Math.cos(a2)*r,Math.sin(a2)*r);ctx.lineTo(Math.cos(a3)*r,Math.sin(a3)*r);}
        ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(0,0,ir,0,Math.PI*2);ctx.stroke();
      },
      function laptop(ctx){const w=S*0.85,h=S*0.55;ctx.strokeRect(-w/2,-h/2,w,h);ctx.beginPath();ctx.moveTo(-w/2,h/2);ctx.lineTo(-w/2-4,h/2+5);ctx.lineTo(w/2+4,h/2+5);ctx.lineTo(w/2,h/2);ctx.stroke();},
      function bolt(ctx){ctx.beginPath();ctx.moveTo(-S*0.18,-S*0.48);ctx.lineTo(-S*0.28,0);ctx.lineTo(-S*0.02,0);ctx.lineTo(-S*0.18,S*0.48);ctx.lineTo(S*0.28,0);ctx.lineTo(S*0.02,0);ctx.closePath();ctx.stroke();},
    ];
    function draw(){
      const stage=canvas.parentElement; if(!stage)return;
      canvas.width=stage.offsetWidth; canvas.height=stage.offsetHeight;
      const ctx=canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle=C; ctx.lineWidth=1.4; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.globalAlpha=ALPHA;
      const cols=Math.ceil(canvas.width/CELL)+1,rows=Math.ceil(canvas.height/CELL)+1;
      for(let row=0;row<rows;row++){for(let col=0;col<cols;col++){const idx=(row*3+col)%icons.length;const offX=(row%2===0)?0:CELL*0.5;ctx.save();ctx.translate(col*CELL+offX,row*CELL);icons[idx](ctx);ctx.restore();}}
    }
    draw(); window.addEventListener('resize',draw);
    return ()=>window.removeEventListener('resize',draw);
  },[]);
  return <canvas ref={canvasRef} style={{position:'fixed',inset:'64px 0 0 0',width:'100%',height:'calc(100% - 64px)',pointerEvents:'none',zIndex:0,opacity:0.6}} />;
}

// ─── Compass SVG ─────────────────────────────────────────────────────────────
function CompassSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 295 295" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="compassFace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8f3ec"/>
          <stop offset="100%" stopColor="#ede5d8"/>
        </radialGradient>
      </defs>
      {/* Quadrant arcs */}
      <path d="M 147.5 14.5 A 133 133 0 0 1 280.5 147.5" fill="none" stroke="#ab131c" strokeWidth="7" strokeLinecap="round"/>
      <path d="M 280.5 147.5 A 133 133 0 0 1 147.5 280.5" fill="none" stroke="#8a6820" strokeWidth="7" strokeLinecap="round"/>
      <path d="M 147.5 280.5 A 133 133 0 0 1 14.5 147.5" fill="none" stroke="#1e8878" strokeWidth="7" strokeLinecap="round"/>
      <path d="M 14.5 147.5 A 133 133 0 0 1 147.5 14.5" fill="none" stroke="#7a5abf" strokeWidth="7" strokeLinecap="round"/>
      {/* Quadrant dots */}
      <circle cx="147.5" cy="14.5"  r="6.5" fill="#ab131c"/>
      <circle cx="280.5" cy="147.5" r="6.5" fill="#8a6820"/>
      <circle cx="147.5" cy="280.5" r="6.5" fill="#1e8878"/>
      <circle cx="14.5"  cy="147.5" r="6.5" fill="#7a5abf"/>
      {/* Outer ring */}
      <circle cx="147.5" cy="147.5" r="114" fill="none" stroke="#ddd5c8" strokeWidth="1.2"/>
      {/* Tick marks */}
      <g stroke="#c8c0b2" strokeWidth="1.1">
        <line x1="147.5" y1="33.5" x2="147.5" y2="27" transform="rotate(0,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="30" transform="rotate(45,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="30" transform="rotate(90,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="27" transform="rotate(135,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="30" transform="rotate(180,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="27" transform="rotate(225,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="30" transform="rotate(270,147.5,147.5)"/>
        <line x1="147.5" y1="33.5" x2="147.5" y2="27" transform="rotate(315,147.5,147.5)"/>
      </g>
      <circle cx="147.5" cy="147.5" r="96" fill="none" stroke="#ddd5c8" strokeWidth="1"/>
      {/* Face */}
      <circle cx="147.5" cy="147.5" r="90" fill="url(#compassFace)"/>
      {/* Secondary needles (grey) */}
      <g fill="#cec6b8" opacity="0.75">
        {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(angle => (
          <polygon key={angle} points="147.5,57.5 151,118 147.5,124 144,118" transform={`rotate(${angle},147.5,147.5)`}/>
        ))}
      </g>
      {/* Dark diagonal needles */}
      {[45,135,225,315].map(angle => (
        <polygon key={angle} points="147.5,57.5 152,117 147.5,123 143,117" fill="#404040" transform={`rotate(${angle},147.5,147.5)`}/>
      ))}
      {/* Main N/S/E/W needles */}
      <polygon points="147.5,57.5 153,117 147.5,123 142,117" fill="#ab131c"/>
      <polygon points="147.5,237.5 153,178 147.5,172 142,178" fill="#1e8878"/>
      <polygon points="237.5,147.5 178,153 172,147.5 178,142" fill="#1e8878"/>
      <polygon points="57.5,147.5 117,153 123,147.5 117,142" fill="#1e8878"/>
      {/* Center hub */}
      <circle cx="147.5" cy="147.5" r="20" fill="#404040"/>
      <circle cx="147.5" cy="147.5" r="13" fill="#f2ece3"/>
      <circle cx="147.5" cy="147.5" r="5.5" fill="#404040"/>
      {/* Center text */}
      <text x="147.5" y="139" textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="9" fontWeight="800" fill="#fff">اهتماماتك</text>
      <text x="147.5" y="152" textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="6" fontWeight="400" fill="#404040" opacity="0.6">اضغط للاكتشاف</text>
      {/* Cardinal labels */}
      <text x="147.5" y="47"  textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="13" fontWeight="800" fill="#1e1e2e">N</text>
      <text x="147.5" y="258" textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="13" fontWeight="800" fill="#1e1e2e">S</text>
      <text x="47"    y="152" textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="13" fontWeight="800" fill="#1e1e2e">W</text>
      <text x="248"   y="152" textAnchor="middle" fontFamily="'Forma DJR Arabic',sans-serif" fontSize="13" fontWeight="800" fill="#1e1e2e">E</text>
    </svg>
  );
}

// ─── Interest Card ────────────────────────────────────────────────────────────
function InterestCard({ cat, onClick, active, delay = 0 }) {
  const style = CAT_STYLES[cat.id] || CAT_STYLES[0];
  const [hovered, setHovered] = useState(false);
  const count = getProgramsFor(cat).length;
  return (
    <div
      onClick={() => onClick(cat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active ? '#fff' : hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(4px)',
        borderRadius: 12,
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: active
          ? `0 8px 30px ${style.color}28`
          : hovered ? '0 12px 32px rgba(23,18,15,0.10)' : '0 6px 18px rgba(23,18,15,0.06)',
        cursor: 'pointer',
        border: active ? `1.5px solid ${style.color}` : hovered ? `1.5px solid ${style.color}40` : '1.5px solid transparent',
        direction: 'rtl',
        transition: 'all 0.25s cubic-bezier(0.2,0.9,0.3,1)',
        transform: hovered && !active ? 'translateY(-3px)' : 'translateY(0)',
        height: 72, minHeight: 72,
        animationName: 'fadeUp', animationDuration: '0.6s', animationDelay: `${delay}s`, animationFillMode: 'both',
        position: 'relative', zIndex: 2,
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 11,
        background: active ? style.color + '18' : style.bg,
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, border: `1px solid ${style.color}20`,
        transition: 'background 0.2s',
      }}>
        {cat.emoji}
      </div>
      <div style={{ flex: 1, textAlign: 'right', minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: active ? style.color : '#2e2a28', marginBottom: 3, transition: 'color 0.2s' }}>
          {cat.label}
        </div>
        <div style={{ fontSize: 10.5, color: '#6f655f', lineHeight: 1.3 }}>
          {cat.sub}
        </div>
      </div>
      <div style={{
        fontSize: 10, fontWeight: 700,
        background: active ? style.color : `${style.color}18`,
        color: active ? '#fff' : style.color,
        padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
        transition: 'all 0.2s',
      }}>
        {count}
      </div>
    </div>
  );
}

// ─── Programs Modal ───────────────────────────────────────────────────────────
function ProgramsModal({ cat, programs, onClose }) {
  const style = CAT_STYLES[cat.id] || CAT_STYLES[0];
  const [expandedId, setExpandedId] = useState(null);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(20,15,12,0.72)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 760,
          maxHeight: '90vh', overflowY: 'auto', direction: 'rtl',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          animation: 'modalIn 0.32s cubic-bezier(0.2,0.9,0.3,1) both',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${style.color} 0%, ${style.color}cc 100%)`,
          padding: '24px 28px 20px', borderRadius: '20px 20px 0 0', position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', left: 16, top: 16,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >✕</button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>
            {cat.emoji} &nbsp; {programs.length} برنامج تدريبي متاح
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.3 }}>
            {cat.label} <span style={{ opacity: 0.85 }}>{cat.sub}</span>
          </div>
        </div>

        {/* Programs */}
        <div style={{ padding: '24px 28px' }}>
          {programs.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9a8f87', padding: '40px 0', fontSize: 14 }}>
              لا توجد برامج متاحة لهذا المجال حالياً
            </div>
          ) : programs.map(p => (
            <div
              key={p.id}
              onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              style={{
                background: expandedId === p.id ? '#fafaf9' : '#f9f7f5',
                border: `1px solid ${expandedId === p.id ? style.color + '50' : 'rgba(100,84,77,0.1)'}`,
                borderRadius: 12, padding: '14px 18px', marginBottom: 10, cursor: 'pointer',
                transition: 'all 0.22s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#2e2a28', flex: 1 }}>{p.name}</div>
                <div style={{ fontSize: 20, color: style.color, flexShrink: 0, fontWeight: 300, lineHeight: 1 }}>
                  {expandedId === p.id ? '−' : '+'}
                </div>
              </div>
              {expandedId === p.id && (
                <div style={{ marginTop: 16, borderTop: '1px solid rgba(100,84,77,0.08)', paddingTop: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: style.color, marginBottom: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>ماذا ستتعلم؟</div>
                  {p.learn.map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, fontSize: 12.5, color: '#3a3632', lineHeight: 1.55 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: `linear-gradient(135deg, ${style.color}, ${style.color}aa)`, color: '#fff', fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {l}
                    </div>
                  ))}
                  <div style={{ fontSize: 10, fontWeight: 700, color: style.color, marginBottom: 10, marginTop: 16, letterSpacing: 1.5, textTransform: 'uppercase' }}>الفرص الوظيفية</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
                    {p.jobs.map((j, i) => (
                      <span key={i} style={{ background: '#eefff3', color: '#166534', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: '1px solid rgba(34,139,70,0.14)' }}>
                        💼 {j}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: style.color, marginBottom: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>أماكن العمل</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {p.places.map((pl, i) => (
                      <span key={i} style={{ background: '#fffbf0', color: '#7c4f12', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: '1px solid rgba(180,120,20,0.14)' }}>
                        🏢 {pl}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 28px 22px', borderTop: '1px solid rgba(100,84,77,0.1)', background: '#faf8f5', borderRadius: '0 0 20px 20px' }}>
          <p style={{ fontSize: 12, color: '#6f655f' }}>
            برامج <strong style={{ color: '#9C0D13' }}>CAVT</strong> المعتمدة — التدريب المهني المتقدم
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function CAVTInterestsExplorer({ onBack = () => {} }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 1100);
  const headerHeight = isMobile ? 56 : 64;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1100);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = (cat) => {
    setActiveCategory(prev => prev?.id === cat.id ? null : cat);
  };

  const activePrograms = activeCategory ? getProgramsFor(activeCategory) : [];

  // Distribute 15 interests across 4 columns
  const col1 = interests.slice(0, 4);
  const col2 = interests.slice(4, 8);
  const col3 = interests.slice(8, 12);
  const col4 = interests.slice(12, 15);

  return (
    <div style={{
      width: '100%', minHeight: '100dvh',
      fontFamily: "'Forma DJR Arabic',sans-serif",
      direction: 'rtl',
      background: 'radial-gradient(circle at top left,rgba(171,19,28,0.06),transparent 30%), radial-gradient(circle at bottom right,rgba(122,90,191,0.06),transparent 30%), linear-gradient(180deg,#fbf8f5 0%,#f8f5f2 50%,#f2ebe3 100%)',
      display: 'flex', flexDirection: 'column', color: '#24201d',
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes compassFloat { 0%,100%{transform:translateY(0) drop-shadow(0 14px 28px rgba(0,0,0,0.13))} 50%{transform:translateY(-6px) drop-shadow(0 20px 36px rgba(0,0,0,0.15))} }
        @keyframes modalIn { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1ede8;border-radius:3px} ::-webkit-scrollbar-thumb{background:rgba(156,13,19,0.3);border-radius:3px}
      `}</style>

      <BackgroundCanvas />

      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: headerHeight, background: '#9C0D13',
        display: 'grid', alignItems: 'center',
        gridTemplateColumns: isMobile ? '80px 1fr 88px' : '110px 1fr 150px',
        gap: isMobile ? 6 : 12,
        padding: isMobile ? '0 10px' : '0 18px',
        boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
        direction: 'ltr',
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)',
          color: 'white', padding: isMobile ? '5px 12px' : '6px 18px', borderRadius: 6,
          fontFamily: "'Forma DJR Arabic',sans-serif", fontSize: isMobile ? 12 : 13, cursor: 'pointer',
          justifySelf: 'start', whiteSpace: 'nowrap',
        }}>رجوع</button>
        <span style={{
          direction: 'rtl', fontSize: isMobile ? 9 : 11, letterSpacing: isMobile ? 0.5 : 1.2,
          color: 'rgba(255,255,255,0.75)', fontFamily: "'Forma DJR Arabic',sans-serif",
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          textAlign: 'center', justifySelf: 'center',
        }}>اكتشف اهتماماتك — المسار الثاني</span>
        <img src={logo} alt="CAVT Logo" style={{
          height: 42, width: 'auto', objectFit: 'contain', display: 'block', justifySelf: 'end',
        }} />
      </div>

      {/* Page content */}
      <div style={{ marginTop: headerHeight, flex: 1, padding: isMobile ? '20px 14px 32px' : '32px 24px 40px', position: 'relative', zIndex: 1 }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 32, animation: 'fadeUp 0.55s ease both' }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e59a72,#9C0D13)', color: 'white', fontSize: 11, padding: '4px 18px', borderRadius: 20, fontWeight: 600, marginBottom: 12, boxShadow: '0 6px 18px rgba(190,40,2,0.18)' }}>
            المسار الثاني — اعرف اهتماماتك
          </div>
          <h1 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 900, color: '#24201d', marginBottom: 6, lineHeight: 1.25 }}>
            اختر <span style={{ color: '#AB131C' }}>مجال اهتمامك</span>
          </h1>
          <p style={{ color: '#6f655f', fontSize: isMobile ? 12 : 13 }}>
            اضغط على أي مجال لاستعراض البرامج التدريبية المتاحة
          </p>
        </div>

        {isMobile ? (
          /* ── Mobile layout ── */
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 240, height: 240, animation: 'compassFloat 5s ease-in-out infinite', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.14))' }}>
                <CompassSVG />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
              {interests.map((cat, i) => (
                <InterestCard key={cat.id} cat={cat} onClick={handleSelectCategory} active={activeCategory?.id === cat.id} delay={i * 0.035} />
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop 5-column layout ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 310px 1fr 1fr',
            gap: '12px 18px',
            alignItems: 'center',
            maxWidth: 1360,
            margin: '0 auto',
          }}>
            {/* Col 1 — left outer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col1.map((cat, i) => (
                <InterestCard key={cat.id} cat={cat} onClick={handleSelectCategory} active={activeCategory?.id === cat.id} delay={i * 0.06} />
              ))}
            </div>

            {/* Col 2 — left inner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col2.map((cat, i) => (
                <InterestCard key={cat.id} cat={cat} onClick={handleSelectCategory} active={activeCategory?.id === cat.id} delay={(i + 4) * 0.06} />
              ))}
            </div>

            {/* Center — compass */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: 295, height: 295, animation: 'compassFloat 5s ease-in-out infinite', filter: 'drop-shadow(0 14px 30px rgba(0,0,0,0.14))' }}>
                <CompassSVG />
              </div>
            </div>

            {/* Col 3 — right inner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col3.map((cat, i) => (
                <InterestCard key={cat.id} cat={cat} onClick={handleSelectCategory} active={activeCategory?.id === cat.id} delay={(i + 8) * 0.06} />
              ))}
            </div>

            {/* Col 4 — right outer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifySelf: 'stretch' }}>
              {col4.map((cat, i) => (
                <InterestCard key={cat.id} cat={cat} onClick={handleSelectCategory} active={activeCategory?.id === cat.id} delay={(i + 12) * 0.06} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Programs Modal */}
      {activeCategory && (
        <ProgramsModal cat={activeCategory} programs={activePrograms} onClose={() => setActiveCategory(null)} />
      )}

      {/* Footer */}
      <div style={{ background: '#414141', color: 'rgba(255,255,255,0.92)', boxShadow: '0 -8px 24px rgba(0,0,0,0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '28px 48px 22px',
          display: 'flex', flexDirection: 'column', gap: 18,
          fontFamily: "'Forma DJR Arabic',sans-serif",
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1.6fr 0.9fr', gap: isMobile ? 20 : 24, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <img src={footerLogo} alt="CAVT Logo" style={{ width: isMobile ? 118 : 150, height: 'auto', objectFit: 'contain', display: 'block' }} />
              <div style={{ color: 'rgba(255,255,255,0.84)', fontSize: isMobile ? 12 : 14, lineHeight: 1.7, maxWidth: 280 }}>
                اكتشف اهتماماتك، وتعرّف على المسارات والبرامج المناسبة لك بطريقة واضحة وسريعة.
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', justifyContent: 'center', paddingTop: 18 }}>
              {['Home','About Us','FAQs','Contact Us'].map(label => (
                <a key={label} href="#" onClick={e => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.92)', textDecoration: 'none', fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>{label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', alignItems: 'flex-start', gap: 10, paddingTop: 6, flexWrap: 'wrap' }}>
              {[{l:'f',n:'Facebook'},{l:'x',n:'X'},{l:'◎',n:'Instagram'},{l:'in',n:'LinkedIn'}].map(s => (
                <button key={s.n} type="button" aria-label={s.n} style={{ width:40,height:40,borderRadius:'50%',border:'none',background:'#fff',color:'#7b6f5e',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:s.l==='in'?16:18,cursor:'pointer',boxShadow:'0 2px 6px rgba(0,0,0,0.14)' }}>{s.l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 6, flexWrap: 'wrap' }}>
            <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 14 }}>© All rights reserved 2026 CAVT</div>
            <button type="button" onClick={handleScrollTop} aria-label="Scroll to top" style={{ width:64,height:64,borderRadius:'50%',border:'none',background:'#000',color:'#fff',cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:28,boxShadow:'0 6px 16px rgba(0,0,0,0.28)',position:'fixed',right:22,bottom:18,zIndex:70 }}>^</button>
          </div>
        </div>
      </div>
    </div>
  );
}
