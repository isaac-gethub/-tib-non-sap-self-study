(function(){
'use strict';
const SH=[["Tasks",[["#","Data tabs","Question","Tool to use","Your answer"],["T1","Accounts, Requests","How many accounts and how many requests? Prove the row counts without scrolling.","COUNTA / ROWS",""],["T2","Accounts, Requests","How many accounts have no request? Name them.","COUNTIF or XLOOKUP / INDEX-MATCH",""],["T3","Accounts, Requests","For each account with a request, how many business days after creation was it approved? How many are late (approved after ERDAT)?","NETWORKDAYS-1",""],["T4","Accounts, Requests","Which user holds a role different from the approved role?","INDEX/MATCH and compare",""],["T5","Accounts","Pivot table: how many accounts per role?","PivotTable",""],["T6","HR_Leavers, SAP_Activity","How many leavers have no SAP account? Name them.","COUNTIF / XLOOKUP",""],["T7","HR_Leavers, SAP_Activity","How many leavers were locked more than 3 business days after termination? Name them and give the days.","NETWORKDAYS-1",""],["T8","HR_Leavers, SAP_Activity","Which leavers logged on after the termination date? Give business days after.","Compare dates",""],["T9","Imports, Tickets","How many imports were approved after the import date? Name them.","COUNTIFS / compare",""],["T10","Imports","Is any developer also the importer? Name the request.","COUNTIFS on matching columns",""],["T11","Tickets","Which imports have no primary UAT date?","COUNTBLANK / filter",""]],false],["Accounts",[["BNAME","ERDAT","ROLE"],["U101","2026-02-06","Z_FI_AR_CLERK"],["U102","2026-02-02","Z_HR_DISPLAY"],["U103","2026-02-20","Z_FI_AR_CLERK"],["U104","2026-02-05","Z_FI_GL_VIEW"],["U105","2026-02-04","Z_FI_AR_CLERK"],["U106","2026-02-12","Z_FI_AP_CLERK"],["U107","2026-02-16","Z_HR_DISPLAY"],["U108","2026-02-09","Z_HR_DISPLAY"],["U109","2026-02-19","Z_FI_AP_CLERK"],["U110","2026-02-26","Z_FI_AP_CLERK"],["U111","2026-02-26","Z_FI_GL_VIEW"],["U112","2026-02-13","Z_PUR_BUYER"],["U113","2026-02-10","Z_FI_AR_CLERK"],["U114","2026-02-05","Z_HR_DISPLAY"],["U115","2026-02-24","Z_HR_DISPLAY"],["U116","2026-02-03","Z_FI_GL_VIEW"],["U117","2026-02-27","Z_FI_GL_VIEW"],["U118","2026-02-12","Z_FI_AR_CLERK"],["U119","2026-02-18","Z_FI_GL_VIEW"],["U120","2026-02-24","Z_FI_AR_CLERK"],["U121","2026-02-12","Z_FI_GL_VIEW"],["U122","2026-02-09","Z_PUR_BUYER"],["U123","2026-02-03","Z_FI_GL_VIEW"],["U124","2026-02-25","Z_FI_AP_CLERK"],["U125","2026-02-19","Z_FI_GL_VIEW"],["U126","2026-02-24","Z_FI_GL_VIEW"],["U127","2026-02-24","Z_PUR_BUYER"],["U128","2026-02-18","Z_FI_AR_CLERK"],["U129","2026-02-13","Z_HR_DISPLAY"],["U130","2026-02-17","Z_PUR_BUYER"]],true],["Requests",[["REQ_ID","BNAME","APPROVER","APPROVED_AT","APPROVED_ROLE"],["REQ001","U101","FIN_MGR","2026-02-05","Z_FI_AR_CLERK"],["REQ002","U102","FIN_MGR","2026-01-30","Z_HR_DISPLAY"],["REQ003","U103","FIN_MGR","2026-02-16","Z_FI_AR_CLERK"],["REQ004","U104","FIN_MGR","2026-01-30","Z_FI_GL_VIEW"],["REQ005","U105","FIN_MGR","2026-02-06","Z_FI_AR_CLERK"],["REQ006","U106","FIN_MGR","2026-02-11","Z_FI_AP_CLERK"],["REQ007","U107","FIN_MGR","2026-02-13","Z_HR_DISPLAY"],["REQ008","U108","FIN_MGR","2026-02-05","Z_HR_DISPLAY"],["REQ009","U109","FIN_MGR","2026-02-16","Z_FI_AP_CLERK"],["REQ010","U110","FIN_MGR","2026-02-25","Z_FI_GL_POST"],["REQ011","U111","FIN_MGR","2026-02-20","Z_FI_GL_VIEW"],["REQ012","U112","FIN_MGR","2026-02-09","Z_PUR_BUYER"],["REQ013","U114","FIN_MGR","2026-02-04","Z_HR_DISPLAY"],["REQ014","U115","FIN_MGR","2026-02-20","Z_HR_DISPLAY"],["REQ015","U116","FIN_MGR","2026-01-30","Z_FI_GL_VIEW"],["REQ016","U117","FIN_MGR","2026-03-05","Z_FI_GL_VIEW"],["REQ017","U118","FIN_MGR","2026-02-06","Z_FI_AR_CLERK"],["REQ018","U119","FIN_MGR","2026-02-17","Z_FI_GL_VIEW"],["REQ019","U120","FIN_MGR","2026-02-23","Z_FI_AR_CLERK"],["REQ020","U121","FIN_MGR","2026-02-06","Z_FI_GL_VIEW"],["REQ021","U122","FIN_MGR","2026-02-10","Z_PUR_BUYER"],["REQ022","U123","FIN_MGR","2026-01-30","Z_FI_GL_VIEW"],["REQ023","U124","FIN_MGR","2026-02-23","Z_FI_AP_CLERK"],["REQ024","U125","FIN_MGR","2026-02-18","Z_FI_GL_VIEW"],["REQ025","U127","FIN_MGR","2026-02-20","Z_PUR_BUYER"],["REQ026","U128","FIN_MGR","2026-02-13","Z_FI_AR_CLERK"],["REQ027","U129","FIN_MGR","2026-02-11","Z_HR_DISPLAY"],["REQ028","U130","FIN_MGR","2026-02-13","Z_PUR_BUYER"]],true],["HR_Leavers",[["PERSON_ID","BNAME","TERMINATION_DATE"],["P201","L01","2026-03-03"],["P202","L02","2026-01-26"],["P203","L03","2026-01-30"],["P204","L04","2026-02-04"],["P205","L05","2026-02-23"],["P206","L06","2026-02-27"],["P207","L07","2026-02-26"],["P208","L08","2026-01-27"],["P209","L09","2026-03-06"],["P210","L10","2026-02-25"],["P211","L11","2026-02-09"],["P212","L12","2026-02-26"],["P213","L13","2026-02-23"],["P214","L14","2026-02-19"],["P215","L15","2026-02-05"],["P216","L16","2026-01-16"],["P217","L17","2026-02-06"],["P218","L18","2026-02-17"],["P219","L19","2026-02-06"],["P220","L20","2026-02-26"]],true],["SAP_Activity",[["PERSON_ID","BNAME","LOCK_DATE","LAST_LOGON_DATE"],["P201","L01","2026-03-06","2026-03-02"],["P202","L02","2026-01-29","2026-01-23"],["P203","L03","2026-02-03","2026-01-25"],["P204","L04","2026-02-13","2026-01-29"],["P205","L05","2026-02-24","2026-02-22"],["P206","L06","2026-02-27","2026-02-24"],["P208","L08","2026-01-29","2026-01-25"],["P209","L09","2026-03-06","2026-03-11"],["P210","L10","2026-02-27","2026-02-24"],["P211","L11","2026-02-16","2026-02-03"],["P212","L12","2026-03-02","2026-02-24"],["P213","L13","2026-02-25","2026-02-20"],["P214","L14","2026-02-19","2026-02-27"],["P215","L15","2026-02-09","2026-01-31"],["P217","L17","2026-02-11","2026-02-02"],["P218","L18","2026-03-02","2026-02-15"],["P219","L19","2026-02-06","2026-02-05"],["P220","L20","2026-03-02","2026-02-20"]],true],["Imports",[["REQUEST","IMPORTED_DATE","DEVELOPER","IMPORTER"],["TR001","2026-03-10","DEV01","BASIS01"],["TR002","2026-03-10","DEV01","BASIS01"],["TR003","2026-03-02","DEV01","BASIS01"],["TR004","2026-03-13","DEV01","BASIS01"],["TR005","2026-03-04","DEV01","BASIS01"],["TR006","2026-03-13","DEV01","BASIS01"],["TR007","2026-03-09","DEV01","BASIS01"],["TR008","2026-03-06","DEV01","BASIS01"],["TR009","2026-03-12","DEV01","BASIS01"],["TR010","2026-03-06","DEV01","BASIS01"],["TR011","2026-03-06","DEV01","BASIS01"],["TR012","2026-03-10","DEV01","DEV01"],["TR013","2026-03-11","DEV01","BASIS01"],["TR014","2026-03-04","DEV01","BASIS01"],["TR015","2026-03-02","DEV01","BASIS01"],["TR016","2026-03-02","DEV01","BASIS01"],["TR017","2026-03-11","DEV01","BASIS01"],["TR018","2026-03-05","DEV01","BASIS01"],["TR019","2026-03-09","DEV01","BASIS01"],["TR020","2026-03-04","DEV01","BASIS01"],["TR021","2026-03-02","DEV01","BASIS01"],["TR022","2026-03-13","DEV01","BASIS01"],["TR023","2026-03-03","DEV01","BASIS01"],["TR024","2026-03-03","DEV01","BASIS01"],["TR025","2026-03-10","DEV01","BASIS01"],["TR026","2026-03-03","DEV01","BASIS01"],["TR027","2026-03-02","DEV01","BASIS01"],["TR028","2026-03-06","DEV01","BASIS01"],["TR029","2026-03-10","DEV01","BASIS01"],["TR030","2026-03-12","DEV01","BASIS01"]],true],["Tickets",[["REQUEST","APPROVED_DATE","UAT_DATE"],["TR001","2026-03-06","2026-03-09"],["TR002","2026-03-06","2026-03-06"],["TR003","2026-02-27","2026-02-27"],["TR004","2026-03-11","2026-03-12"],["TR005","2026-02-27","2026-03-02"],["TR006","2026-03-16","2026-03-11"],["TR007","2026-03-06","2026-03-06"],["TR008","2026-03-03","2026-03-05"],["TR009","2026-03-10",""],["TR010","2026-03-02","2026-03-05"],["TR011","2026-03-04","2026-03-04"],["TR012","2026-03-06","2026-03-06"],["TR013","2026-03-06","2026-03-10"],["TR014","2026-02-27","2026-03-03"],["TR015","2026-02-27","2026-02-27"],["TR016","2026-02-26","2026-02-27"],["TR017","2026-03-06","2026-03-10"],["TR018","2026-02-27","2026-03-03"],["TR019","2026-03-06","2026-03-06"],["TR020","2026-03-02","2026-03-03"],["TR021","2026-02-26","2026-02-27"],["TR022","2026-03-10","2026-03-11"],["TR023","2026-03-04","2026-02-27"],["TR024","2026-02-27","2026-03-02"],["TR025","2026-03-06","2026-03-06"],["TR026","2026-02-27",""],["TR027","2026-02-26","2026-02-27"],["TR028","2026-03-04","2026-03-05"],["TR029","2026-03-06","2026-03-09"],["TR030","2026-03-09","2026-03-11"]],true]];const D=Object.fromEntries(SH.map(s=>[s[0],s[1].slice(1)]));
const iso=v=>v||'';
const T=s=>s?Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10)):null;
const wd=s=>{const d=new Date(T(s)).getUTCDay();return d>=1&&d<=5};
const NWD=(a,b)=>{let n=0;for(let t=T(a);t<=T(b);t+=864e5){const d=new Date(t).getUTCDay();if(d>=1&&d<=5)n++}return n};
const late=(a,b)=>b&&b>a?NWD(a,b)-1:0;
const DAYN=s=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(T(s)).getUTCDay()];
const acc=D.Accounts,req=D.Requests,lv=D.HR_Leavers,act=D.SAP_Activity,imp=D.Imports,tk=D.Tickets;
const reqBy={};req.forEach(r=>reqBy[r[1]]=r);
const actBy={};act.forEach(r=>actBy[r[1]]=r);
const tkBy={};tk.forEach(r=>tkBy[r[0]]=r);
/* answers, computed */
const noReq=acc.filter(a=>!reqBy[a[0]]).map(a=>a[0]);
const accRows=acc.map(a=>{const r=reqBy[a[0]];const appr=r?r[3]:'';const days=r?late(a[1],appr):'';return{b:a[0],e:a[1],role:a[2],has:!!r,appr,days,arole:r?r[4]:'',diff:r?r[4]!==a[2]:false}});
const lateAcc=accRows.filter(r=>r.has&&r.days>0);
const roleDiff=accRows.filter(r=>r.diff);
const roles={};acc.forEach(a=>roles[a[2]]=(roles[a[2]]||0)+1);
const lvRows=lv.map(l=>{const a=actBy[l[1]];return{pid:l[0],b:l[1],term:l[2],has:!!a,lock:a?a[2]:'',logon:a?a[3]:'',lockDays:a?late(l[2],a[2]):'',logDays:a?late(l[2],a[3]):''}});
const noSap=lvRows.filter(r=>!r.has).map(r=>r.b);
const lateLock=lvRows.filter(r=>r.has&&r.lockDays>3);
const afterTerm=lvRows.filter(r=>r.has&&r.logon>r.term);
const impRows=imp.map(i=>{const t=tkBy[i[0]];return{r:i[0],imp:i[1],dev:i[2],by:i[3],appr:t?t[1]:'',uat:t?t[2]:''}});
const apprAfter=impRows.filter(r=>r.appr>r.imp);
const sameDev=impRows.filter(r=>r.dev===r.by);
const noUat=impRows.filter(r=>!r.uat);

/* grid builders (Excel-like) */
function G(cap,head,rows,show,mark,note,cols){return{cap,rows:[head,...rows],show,mark:mark||{},note,cols,rowNums:false}}
const pick=(arr,pred,extra)=>{const idx=[];arr.forEach((x,i)=>{if(pred(x))idx.push(i+1)});return [0,...idx]};
function showSet(rows,want,ctx){ // header + chosen row indexes + ctx rows
  const s=new Set([0]);want.forEach(i=>s.add(i+1));(ctx||[]).forEach(i=>s.add(i+1));return [...s].sort((a,b)=>a-b)}
function markRows(show,rows,pred,col,cls){const m={};show.forEach(i=>{if(i>0&&pred(rows[i]))m[i+','+col]=cls});return m}

/* Tab sizes grid */
const gTabs={cap:'The six data tabs and their row counts (header row not counted)',rows:[['Tab','Data rows','What it holds'],['Accounts',acc.length,'New SAP accounts created in February'],['Requests',req.length,'Approved access requests'],['HR_Leavers',lv.length,'People who left'],['SAP_Activity',act.length,'Lock date and last logon for SAP accounts'],['Imports',imp.length,'Production imports'],['Tickets',tk.length,'Change tickets: approval and UAT dates']],rowNums:false,mark:{'1,1':'good','2,1':'good','3,1':'good','4,1':'good','5,1':'good','6,1':'good'}};

/* T2 */
const t2rows=accRows.map(r=>[r.b,r.e,r.role,r.has?'has request':'NO REQUEST']);
const t2show=showSet(t2rows.map(x=>x),accRows.map((r,i)=>r.has?-1:i).filter(i=>i>=0),[0,1,11,13]);
const gT2=G('Accounts: helper column D (formula filled down)',['BNAME','ERDAT','ROLE','REQUEST_CHECK'],t2rows,t2show,{},'Rows 3 to 12 and others are not shown. The two NO REQUEST rows are the exceptions.',['A','B','C','D']);
t2show.forEach(i=>{if(i>0&&t2rows[i-1][3]==='NO REQUEST')gT2.mark[i+',3']='bad'});

/* T3 */
const t3rows=accRows.map(r=>[r.b,r.e,r.has?r.appr:'',r.has?r.days:'',r.has?(r.days>0?'LATE':'OK'):'']);
const t3idx=[...lateAcc.map(r=>accRows.indexOf(r)),0,1,2];
const t3show=showSet(t3rows,t3idx);
const gT3=G('Accounts with approval date and business days late (columns E, F, G)',['BNAME','ERDAT','APPROVED_AT','DAYS_LATE','FLAG'],t3rows,t3show,{},'U102 and U104 were approved before the account was created, which is correct, so their days late are 0.',['A','B','D','E','F']);
t3show.forEach(i=>{if(i>0&&t3rows[i-1][4]==='LATE'){gT3.mark[i+',3']='bad';gT3.mark[i+',4']='bad'}else if(i>0)gT3.mark[i+',4']='good'});
const gMon={cap:'Why NETWORKDAYS counts one too many',rows:[['Start','End','NETWORKDAYS(start,end)','NETWORKDAYS(start,end)-1'],['Mon 2026-02-02','Tue 2026-02-03',2,1],['Wed 2026-02-04','Fri 2026-02-06',3,2]],rowNums:false,mark:{'1,2':'bad','1,3':'good','2,2':'bad','2,3':'good'},note:'Wed to Fri: the 4th, 5th and 6th are three working days counted, but only two days passed. Subtract 1.'};

/* T4 */
const t4rows=accRows.map(r=>[r.b,r.role,r.has?r.arole:'',r.has?(r.diff?'DIFFERENT':'match'):'']);
const t4show=showSet(t4rows,[...roleDiff.map(r=>accRows.indexOf(r)),0,1,2]);
const gT4=G('Assigned role versus approved role',['BNAME','ROLE (assigned)','APPROVED_ROLE','ROLE_CHECK'],t4rows,t4show,{},'',['A','C','G','H']);
t4show.forEach(i=>{if(i>0)gT4.mark[i+',3']=t4rows[i-1][3]==='DIFFERENT'?'bad':'good'});

/* T5 */
const rlist=Object.keys(roles).sort();
const gT5={cap:'PivotTable result: Rows = ROLE, Values = Count of BNAME',cols:['Row Labels','Count of BNAME'],rows:[['Row Labels','Count of BNAME'],...rlist.map(r=>[r,roles[r]]),['Grand Total',acc.length]],rowNums:false,mark:{[(rlist.length+1)+',1']:'good'}};

/* T6 */
const t6rows=lvRows.map(r=>[r.pid,r.b,r.term,r.has?'has SAP account':'NO SAP ACCOUNT']);
const t6show=showSet(t6rows,lvRows.map((r,i)=>r.has?-1:i).filter(i=>i>=0),[0,1]);
const gT6=G('HR_Leavers with helper column D',['PERSON_ID','BNAME','TERMINATION_DATE','SAP_CHECK'],t6rows,t6show,{},'',['A','B','C','D']);
t6show.forEach(i=>{if(i>0&&t6rows[i-1][3]==='NO SAP ACCOUNT')gT6.mark[i+',3']='bad'});

/* T7 */
const t7rows=lvRows.map(r=>[r.b,r.term,r.has?r.lock:'',r.has?r.lockDays:'',r.has?(r.lockDays>3?'LATE LOCK':'OK'):'no account']);
const t7show=showSet(t7rows,[...lateLock.map(r=>lvRows.indexOf(r)),0,11]);
const gT7=G('Leavers: lock date and business days after termination',['BNAME','TERMINATION_DATE','LOCK_DATE','LOCK_DAYS','FLAG'],t7rows,t7show,{},'L01 was locked exactly 3 business days after termination. The limit is 3, so it passes: only more than 3 is late.',['A','B','D','E','F']);
t7show.forEach(i=>{if(i>0){gT7.mark[i+',4']=t7rows[i-1][4]==='LATE LOCK'?'bad':(t7rows[i-1][4]==='OK'?'good':'')}});
const l01=lvRows[0];

/* T8 */
const t8rows=lvRows.map(r=>[r.b,r.term,r.has?r.logon:'',r.has?(r.logon>r.term?r.logDays:0):'',r.has?(r.logon>r.term?'LOGON AFTER TERMINATION':'OK'):'no account']);
const t8show=showSet(t8rows,[...afterTerm.map(r=>lvRows.indexOf(r)),0,1]);
const gT8=G('Leavers: last logon compared with termination date',['BNAME','TERMINATION_DATE','LAST_LOGON_DATE','DAYS_AFTER','FLAG'],t8rows,t8show,{},'',['A','B','E','F','G']);
t8show.forEach(i=>{if(i>0)gT8.mark[i+',4']=t8rows[i-1][4]==='LOGON AFTER TERMINATION'?'bad':'good'});

/* T9 */
const t9rows=impRows.map(r=>[r.r,r.imp,r.appr,r.appr>r.imp?'APPROVED AFTER IMPORT':'OK']);
const t9show=showSet(t9rows,[...apprAfter.map(r=>impRows.indexOf(r)),0,1]);
const gT9=G('Imports with the approval date pulled in from Tickets',['REQUEST','IMPORTED_DATE','APPROVED_DATE','FLAG'],t9rows,t9show,{},'',['A','B','E','F']);
t9show.forEach(i=>{if(i>0)gT9.mark[i+',3']=t9rows[i-1][3]==='OK'?'good':'bad'});

/* T10 */
const t10rows=impRows.map(r=>[r.r,r.dev,r.by,r.dev===r.by?'SAME PERSON':'OK']);
const t10show=showSet(t10rows,[...sameDev.map(r=>impRows.indexOf(r)),0,1,2]);
const gT10=G('Developer compared with importer',['REQUEST','DEVELOPER','IMPORTER','FLAG'],t10rows,t10show,{},'',['A','C','D','E']);
t10show.forEach(i=>{if(i>0)gT10.mark[i+',3']=t10rows[i-1][3]==='OK'?'good':'bad'});

/* T11 */
const t11rows=tk.map(r=>[r[0],r[1],r[2]||'(blank)']);
const t11show=showSet(t11rows,[...noUat.map(r=>tk.findIndex(x=>x[0]===r.r)),0,1,2]);
const gT11=G('Tickets: UAT_DATE blank',['REQUEST','APPROVED_DATE','UAT_DATE'],t11rows,t11show,{},'',['A','B','C']);
t11show.forEach(i=>{if(i>0&&t11rows[i-1][2]==='(blank)')gT11.mark[i+',2']='bad'});

/* reconciliation */
const nOK=(n,x)=>n-x;
const rec=[['Task','Items tested','Passes','Exceptions','Passes + exceptions'],
 ['T2 request exists',acc.length,acc.length-noReq.length,noReq.length,acc.length],
 ['T3 approved on time',req.length,req.length-lateAcc.length,lateAcc.length,req.length],
 ['T4 role matches',req.length,req.length-roleDiff.length,roleDiff.length,req.length],
 ['T6 leaver has account',lv.length,lv.length-noSap.length,noSap.length,lv.length],
 ['T7 locked in time',act.length,act.length-lateLock.length,lateLock.length,act.length],
 ['T8 no logon after term.',act.length,act.length-afterTerm.length,afterTerm.length,act.length],
 ['T9 approved before import',imp.length,imp.length-apprAfter.length,apprAfter.length,imp.length],
 ['T10 developer differs from importer',imp.length,imp.length-sameDev.length,sameDev.length,imp.length],
 ['T11 UAT date present',tk.length,tk.length-noUat.length,noUat.length,tk.length]];
const gRec={cap:'Reconciliation: passes plus exceptions must equal the items tested',rows:rec,rowNums:false,mark:Object.fromEntries(rec.slice(1).map((_,i)=>[(i+1)+',4','good'])),cols:['A','B','C','D','E']};

/* questions */
const setOf=s=>new Set((String(s).toUpperCase().match(/[A-Z]{1,3}\d{2,3}/g)||[]));
const sameSet=exp=>v=>{const g=setOf(v),e=new Set(exp);return g.size===e.size&&[...e].every(x=>g.has(x))};
const nums=v=>(String(v).match(/\d+/g)||[]).map(Number);
const names=a=>a.join(', ');
const Qs=[
 {id:'T1',q:'How many accounts and how many requests? Prove the row counts without scrolling. Type both numbers, for example "30 and 28".',kind:'text',ok:v=>{const n=nums(v);return n.includes(acc.length)&&n.includes(req.length)},show:acc.length+' accounts; '+req.length+' requests',formula:'=COUNTA(Accounts!A2:A500)  and  =COUNTA(Requests!A2:A500)',how:'COUNTA counts every filled cell. The range runs past the data so new rows are never missed. Row counts also appear in the status bar when you select a column.'},
 {id:'T2',q:'How many accounts have no request? Name them.',kind:'text',ok:sameSet(noReq),show:noReq.length+' accounts: '+names(noReq),formula:'=IF(COUNTIF(Requests!$B$2:$B$29,A2)=0,"NO REQUEST","has request")  then  =COUNTIF(D2:D31,"NO REQUEST")',how:'Reconcile: '+acc.length+' accounts less '+req.length+' requests is '+noReq.length+'. Type the two names.'},
 {id:'T3',q:'For each account with a request, how many business days after creation was it approved? Name the late approvals and give the days. How many are late?',kind:'text',ok:v=>{const s=setOf(v);const e=new Set(lateAcc.map(r=>r.b));return s.size===e.size&&[...e].every(x=>s.has(x))},hint:'Name the accounts approved after they were created. Use =IF(approved>ERDAT,NETWORKDAYS(ERDAT,approved)-1,0) and count the results above 0.',show:lateAcc.length+' late: '+lateAcc.map(r=>r.b+' ('+r.days+' business day'+(r.days>1?'s':'')+')').join(', '),formula:'=IF(E2="","",IF(E2>B2,NETWORKDAYS(B2,E2)-1,0))',how:'Anything approved on or before creation is 0 days and passes. Count with =COUNTIF(F2:F31,">0").'},
 {id:'T4',q:'Which user holds a role different from the approved role?',kind:'text',ok:sameSet(roleDiff.map(r=>r.b)),show:roleDiff.map(r=>r.b+': assigned '+r.role+', approved '+r.arole).join('; '),formula:'=IF(G2="","",IF(G2=C2,"match","DIFFERENT"))',how:'The user holds a role that nobody approved. That is a stronger exception than a late approval.'},
 {id:'T5',q:'Pivot table: how many accounts per role? Type the five counts.',kind:'text',ok:v=>{const n=nums(v).sort((a,b)=>a-b),e=Object.values(roles).sort((a,b)=>a-b);return n.length>=e.length&&e.every((x,i)=>n.includes(x))&&JSON.stringify(n.slice(0,e.length))===JSON.stringify(e)||JSON.stringify(n)===JSON.stringify(e)},show:rlist.map(r=>r+' '+roles[r]).join('; '),formula:'Insert > PivotTable: Rows = ROLE, Values = Count of BNAME',how:'Check the Grand Total equals '+acc.length+', your T1 count. Cross-check one role with =COUNTIF(C:C,"Z_FI_GL_VIEW").'},
 {id:'T6',q:'How many leavers have no SAP account? Name them.',kind:'text',ok:sameSet(noSap),show:noSap.length+' leavers: '+names(noSap)+' ('+lv.length+' leavers, '+(lv.length-noSap.length)+' matched)',formula:'=IF(COUNTIF(SAP_Activity!$B$2:$B$19,B2)=0,"NO SAP ACCOUNT","has account")',how:'A leaver with no account is a pass for the lock test, but report it so the population is explained.'},
 {id:'T7',q:'How many leavers were locked more than 3 business days after termination? Name them and give the days.',kind:'text',ok:sameSet(lateLock.map(r=>r.b)),hint:'The limit is 3. Only more than 3 business days is an exception. Use NETWORKDAYS(termination, lock)-1.',show:lateLock.length+' leavers: '+lateLock.map(r=>r.b+' ('+r.lockDays+' business days)').join(', '),formula:'=IF(D2="","",IF(D2>C2,NETWORKDAYS(C2,D2)-1,0))  then flag when >3',how:'L01 was locked at exactly 3 days, which is within the limit.'},
 {id:'T8',q:'Which leavers logged on after the termination date? Give the business days after.',kind:'text',ok:sameSet(afterTerm.map(r=>r.b)),show:afterTerm.map(r=>r.b+' ('+r.logDays+' business days after)').join(', '),formula:'=IF(LAST_LOGON>TERMINATION_DATE,NETWORKDAYS(TERMINATION_DATE,LAST_LOGON)-1,0)',how:'A logon after the person left means the account was used by someone, possibly not the leaver. This is the most serious leaver exception.'},
 {id:'T9',q:'How many imports were approved after the import date? Name them.',kind:'text',ok:sameSet(apprAfter.map(r=>r.r)),show:apprAfter.length+' imports: '+names(apprAfter.map(r=>r.r)),formula:'=IF(C2>B2,"APPROVED AFTER IMPORT","OK")  with C2 =INDEX(Tickets!$B$2:$B$31,MATCH(A2,Tickets!$A$2:$A$31,0))',how:'Approval must come before the import. An approval dated after the change went live is an exception.'},
 {id:'T10',q:'Is any developer also the importer? Name the request.',kind:'text',ok:sameSet(sameDev.map(r=>r.r)),show:sameDev.map(r=>r.r+' (developer and importer are both '+r.dev+')').join('; '),formula:'=IF(C2=D2,"SAME PERSON","OK")  and  =SUMPRODUCT(--(C2:C31=D2:D31))',how:'Segregation of duties: the person who builds a change must not be the person who puts it into production.'},
 {id:'T11',q:'Which imports have no primary UAT date?',kind:'text',ok:sameSet(noUat.map(r=>r.r)),show:names(noUat.map(r=>r.r)),formula:'=COUNTBLANK(Tickets!C2:C31)  and filter UAT_DATE on (Blanks)',how:'A blank is not a pass. No UAT date means there is no evidence that the change was tested.'}
];
DAYS.push({n:2,title:'Excel testing formulas',time:'3 hours',
 goal:'Use formulas to decide pass or fail across a whole population, and show your work. You will run three real controls the way a SOX tester does: new accounts need an approved request, leavers must be locked in time, and production changes must be approved, tested and imported by someone else.',
 file:'P2_Excel_Testing_Formulas_Drill.xlsx (fictional): tabs Tasks, Accounts, Requests, HR_Leavers, SAP_Activity, Imports, Tickets.',
 files:[{name:'P2_Excel_Testing_Formulas_Drill.xlsx',sheets:SH}],
 parts:[
  {t:'Part 0: Set up and the six tools',short:'0 Set up',steps:[
   {h:'Open the workbook and prove every tab before you start',why:'Your first move on any file is to prove how many rows it holds. A wrong population ruins every test after it.',
    do:['Download the practice workbook below and save it into <b>TIB_Prep\\02_Working</b> (keep your Day 1 habit: never work on the original).','Open it. Read the <b>Tasks</b> tab: it lists the 11 questions T1 to T11. You will type your answers in column E.',{t:'On each data tab, in an empty cell, count the rows. For example on Accounts:',f:'=COUNTA(A2:A500)'}],
    extra:'<p><button class="primary" data-dl="0">Download P2_Excel_Testing_Formulas_Drill.xlsx</button></p>',
    grids:[gTabs],see:'The counts above: '+acc.length+', '+req.length+', '+lv.length+', '+act.length+', '+imp.length+' and '+tk.length+'. Write them down.',
    slip:'Counting by eye and getting the population wrong. Count every tab, not just the two that T1 asks about.'},
   {h:'The six tools you will use all day',why:'Every test today is built from these six tools. Learn the pattern for each, then you will recognise it in every task.',
    grids:[{cap:'Tool and pattern',rows:[['Tool','Use it to','Pattern'],['COUNTA','Prove a row count','=COUNTA(A2:A500)'],['COUNTIF / COUNTIFS','Count records that meet a condition','=COUNTIF(B:B,"X")'],['INDEX / MATCH (or XLOOKUP)','Find the matching record in another table','=INDEX(Req!D:D,MATCH(A2,Req!B:B,0))'],['IFERROR','Turn "not found" into a word you can count','=IFERROR(INDEX(...),"NO REQUEST")'],['NETWORKDAYS minus 1','Count business days between two dates','=NETWORKDAYS(start,end)-1'],['PivotTable','Summarise a population by category','Insert > PivotTable']],rowNums:false}],
    intro:'Do not memorise this table. You will meet each tool in a task and the worked example will show you how it is built.'},
   {h:'How to work a population-wide check',why:'You are not checking rows one by one. You add one helper column, fill it down, and let Excel judge every row the same way.',
    do:['Next to the data, add a <b>helper column</b> with a clear heading, for example REQUEST_CHECK.','Write the formula in row 2, then double-click the fill handle to fill it down to the last row.','Count the exceptions with COUNTIF on the helper column.','Run a check: the count of exceptions must equal the number of names you list, and passes plus exceptions must equal the items tested.','Write the helper column name next to your answer on the Tasks tab.'],
    see:'A repeatable method. Every task below follows it.',slip:'Typing results by hand into a column. A formula can be reperformed by a reviewer; a typed result cannot.'}]},
  {t:'Part 1: Access provisioning (T1 to T5)',short:'1 Access',steps:[
   {h:'T1: How many accounts and how many requests?',why:'The control says every new account needs an approved request. Before testing, you must know how many accounts and how many requests exist.',
    do:[{t:'On the Accounts tab, in an empty cell:',f:'=COUNTA(Accounts!A2:A500)'},{t:'On the Requests tab, in an empty cell:',f:'=COUNTA(Requests!A2:A500)'}],
    see:'<b>'+acc.length+'</b> accounts and <b>'+req.length+'</b> requests. Two more accounts than requests: that is your first clue that some accounts may have no request.',
    slip:'Using COUNTA(A:A), which counts the header and any title row. Start at row 2 and subtract nothing.'},
   {h:'T2: Which accounts have no request?',why:'An account with no request was created without approval. It is the clearest exception in this control.',
    do:['On Accounts, add the heading <b>REQUEST_CHECK</b> in D1.',{t:'In D2 type:',f:'=IF(COUNTIF(Requests!$B$2:$B$29,A2)=0,"NO REQUEST","has request")',after:'<br>Fill it down to row 31. The <b>$</b> signs lock the Requests range so it does not move as you fill down.'},{t:'Count the exceptions:',f:'=COUNTIF(D2:D31,"NO REQUEST")'},'Filter column D on NO REQUEST to read the names.'],
    grids:[gT2],see:'<b>'+noReq.length+'</b> accounts: <b>'+names(noReq)+'</b>. Check: '+acc.length+' accounts less '+req.length+' requests = '+noReq.length+'.',
    slip:'A lookup that returns #N/A because of a hidden space or a number stored as text. If you see it, go back to Day 1 and trim the column.',
    extra:'<p><b>Other ways:</b> in Microsoft 365 you can use <code>=IF(ISNA(XLOOKUP(A2,Requests!B:B,Requests!B:B)),"NO REQUEST","has request")</code>. Both give the same answer.</p>'},
   {h:'T3: How many business days after creation was each account approved?',why:'The control says the request must be approved on or before the day the account is created. Any approval after creation is late, and we measure how late in business days.',
    intro:'First learn the date rule. <b>NETWORKDAYS counts both the start day and the end day.</b> So we subtract 1 to get the days that have passed.',
    grids:[gMon],
    do:['Pull the approval date next to each account. On Accounts, add <b>APPROVED_AT</b> in E1 and in E2:',{f:'=IFERROR(INDEX(Requests!$D$2:$D$29,MATCH(A2,Requests!$B$2:$B$29,0)),"")'},'Add <b>DAYS_LATE</b> in F1 and in F2:',{f:'=IF(E2="","",IF(E2>B2,NETWORKDAYS(B2,E2)-1,0))'},'Add <b>FLAG</b> in G1 and in G2:',{f:'=IF(E2="","",IF(F2>0,"LATE","OK"))'},{t:'Count the late approvals:',f:'=COUNTIF(F2:F31,">0")'}],
    see:'<b>'+lateAcc.length+'</b> late approvals: '+lateAcc.map(r=>r.b+' ('+r.days+')').join(', ')+'. The two accounts with no request show blank, not OK.',
    slip:'Using NETWORKDAYS without subtracting 1, or counting a blank as a pass. Blank means "no request", which T2 already reported.',
    extra:''},
   {h:'T3 (continued): read the result',intro:'This is what your three late approvals look like next to on-time ones. Notice that accounts approved <i>before</i> creation are fine: the days late are 0.',
    grids:[gT3],see:'Three LATE rows and the rest OK. Write the one-sentence explanation beside your formula: "Days between creation and approval, ignoring weekends, counted only when approval came after creation."'},
   {h:'T4: Which user holds a different role from the one approved?',why:'Approval is for a specific role. An account holding a different role has access nobody approved.',
    do:['On Accounts add <b>APPROVED_ROLE</b> in H1 and in H2:',{f:'=IFERROR(INDEX(Requests!$E$2:$E$29,MATCH(A2,Requests!$B$2:$B$29,0)),"")'},'Add <b>ROLE_CHECK</b> in I1 and in I2:',{f:'=IF(H2="","",IF(H2=C2,"match","DIFFERENT"))'},{t:'Count the differences:',f:'=COUNTIF(I2:I31,"DIFFERENT")'}],
    grids:[gT4],see:'<b>'+roleDiff.length+'</b> difference: <b>'+roleDiff[0].b+'</b> was assigned '+roleDiff[0].role+' but approved for '+roleDiff[0].arole+'.',
    slip:'Comparing role names with a hidden space or different capitals. Use the same lookup technique you used for T2.'},
   {h:'T5: How many accounts per role? (PivotTable)',why:'A PivotTable summarises a population by category in seconds, and it is a quick way to cross-check your own counts.',
    do:['Click any cell in the Accounts data.','Click <span class="menu">Insert &gt; PivotTable</span>, accept the default range, choose <b>New Worksheet</b>, then OK.','Drag <b>ROLE</b> into <b>Rows</b>.','Drag <b>BNAME</b> into <b>Values</b>. Make sure it says <b>Count of BNAME</b> (click it, Value Field Settings, choose Count).'],
    grids:[gT5],see:'Five roles with counts that add up to the Grand Total of <b>'+acc.length+'</b>, the same number as T1.',
    slip:'Dragging ERDAT into Values. Dates are summed or counted oddly. Always count a text field such as BNAME.'}]},
  {t:'Part 2: Leaver locking (T6 to T8)',short:'2 Leavers',steps:[
   {h:'T6: How many leavers have no SAP account?',why:'The control: a leaver\'s SAP account must be locked within 3 business days. If a leaver never had an account there is nothing to lock, but you must say so, so that the population is fully explained.',
    do:['On HR_Leavers add <b>SAP_CHECK</b> in D1 and in D2:',{f:'=IF(COUNTIF(SAP_Activity!$B$2:$B$19,B2)=0,"NO SAP ACCOUNT","has account")'},{t:'Count them:',f:'=COUNTIF(D2:D21,"NO SAP ACCOUNT")'}],
    grids:[gT6],see:'<b>'+noSap.length+'</b> leavers: <b>'+names(noSap)+'</b>. '+lv.length+' leavers, '+(lv.length-noSap.length)+' matched to a SAP account.'},
   {h:'T7: Which leavers were locked more than 3 business days after termination?',why:'The control allows 3 business days. Anything over 3 is an exception.',
    do:['On HR_Leavers add <b>LOCK_DATE</b> in E1 and in E2:',{f:'=IFERROR(INDEX(SAP_Activity!$C$2:$C$19,MATCH(B2,SAP_Activity!$B$2:$B$19,0)),"")'},'Add <b>LOCK_DAYS</b> in F1 and in F2:',{f:'=IF(E2="","",IF(E2>C2,NETWORKDAYS(C2,E2)-1,0))'},'Add <b>FLAG</b> in G1 and in G2:',{f:'=IF(F2="","no account",IF(F2>3,"LATE LOCK","OK"))'},{t:'Count the exceptions:',f:'=COUNTIF(G2:G21,"LATE LOCK")'}],
    grids:[gT7],see:'<b>'+lateLock.length+'</b> late locks: '+lateLock.map(r=>r.b+' ('+r.lockDays+' business days)').join(', ')+'.',
    slip:'Flagging L01 (locked on day 3). The limit is 3, so 3 passes. Write the test as greater than 3, not greater than or equal to 3.'},
   {h:'T8: Which leavers logged on after the termination date?',why:'This is the most serious leaver exception: someone used the account after the person had left.',
    do:['On HR_Leavers add <b>LOGON</b> in H1 and in H2:',{f:'=IFERROR(INDEX(SAP_Activity!$D$2:$D$19,MATCH(B2,SAP_Activity!$B$2:$B$19,0)),"")'},'Add <b>DAYS_AFTER</b> in I1 and in I2:',{f:'=IF(H2="","",IF(H2>C2,NETWORKDAYS(C2,H2)-1,0))'},{t:'Count them:',f:'=COUNTIF(I2:I21,">0")'}],
    grids:[gT8],see:'<b>'+afterTerm.length+'</b> leavers: '+afterTerm.map(r=>r.b+' ('+r.logDays+' business days after)').join(', ')+'.',
    slip:'Comparing the logon with the lock date instead of the termination date. The question is about the termination date.'}]},
  {t:'Part 3: Production changes (T9 to T11)',short:'3 Changes',steps:[
   {h:'T9: Which imports were approved after the import date?',why:'The control: a change must be approved before it goes into production. The approval date is on the Tickets tab, so you must look it up.',
    do:['On Imports add <b>APPROVED_DATE</b> in E1 and in E2:',{f:'=IFERROR(INDEX(Tickets!$B$2:$B$31,MATCH(A2,Tickets!$A$2:$A$31,0)),"")'},'Add <b>FLAG</b> in F1 and in F2:',{f:'=IF(E2="","no ticket",IF(E2>B2,"APPROVED AFTER IMPORT","OK"))'},{t:'Count them:',f:'=COUNTIF(F2:F31,"APPROVED AFTER IMPORT")'}],
    grids:[gT9],see:'<b>'+apprAfter.length+'</b> imports: <b>'+names(apprAfter.map(r=>r.r))+'</b>.'},
   {h:'T10: Is any developer also the importer?',why:'Segregation of duties: the person who builds a change must not be the person who imports it into production.',
    do:['On Imports add <b>SOD_CHECK</b> in G1 and in G2:',{f:'=IF(C2=D2,"SAME PERSON","OK")'},{t:'Count them:',f:'=COUNTIF(G2:G31,"SAME PERSON")'},{t:'Or count in one cell without a helper column:',f:'=SUMPRODUCT(--(C2:C31=D2:D31))'}],
    grids:[gT10],see:'<b>'+sameDev.length+'</b>: <b>'+sameDev[0].r+'</b>, where '+sameDev[0].dev+' is both developer and importer.'},
   {h:'T11: Which imports have no primary UAT date?',why:'UAT is the evidence that a change was tested before production. A blank date is not a pass. It is missing evidence.',
    do:[{t:'Count the blanks on Tickets:',f:'=COUNTBLANK(C2:C31)'},'To see them, filter UAT_DATE and tick <b>(Blanks)</b> only. Clear the filter before you save.'],
    grids:[gT11],see:'<b>'+noUat.length+'</b> tickets: <b>'+names(noUat.map(r=>r.r))+'</b>.',
    slip:'Treating a blank as a pass. A blank is an exception you must report.'}]},
  {t:'Part 4: Reconcile and explain',short:'4 Reconcile',steps:[
   {h:'Reconcile every result',why:'A test is not finished until passes plus exceptions equals the items tested. If it does not, a result is blank or an error.',
    intro:'Do this check for each control before you write down an answer. This is the table you should be able to rebuild from your own helper columns.',
    grids:[gRec],see:'Every row adds up. If one of yours does not, look for a blank cell or an error such as #N/A in the helper column.'},
   {h:'Explain each formula in one sentence',why:'If you cannot explain a formula to someone else, you cannot defend it to a reviewer or a client.',
    do:['Beside each formula on the Tasks tab, write one sentence in plain words.','Example for T3: "Counts the working days between the day the account was created and the day it was approved, only when approval came after creation."','Example for T7: "Counts working days from termination to lock; more than 3 is an exception."','Check the common mistakes: counting by eye, #N/A from a hidden space, NETWORKDAYS without the minus 1, text dates, and a blank counted as a pass.'],
    see:'You are ready for the questions.'}]}
 ],
 questions:Qs,
 qintro:'Type the answers from your own Excel work, with the names of any exceptions. Press Check, or Show me if you are stuck.',
 done:['All 11 tasks are answered with a visible formula.','Every list of names agrees with its count.','You can explain each formula to someone else in one sentence, and you wrote that sentence beside it.']
});
})();
