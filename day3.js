(function(){
'use strict';
const CSV=`BNAME,ERDAT,ANAME,USTYP,UFLAG,TRDAT
TIBU001,11.01.2026,ADMIN02,A,0,22.02.2026
TIBU002,06.01.2026,ADMIN02,A,64,09.01.2026
TIBU003,24.01.2026,BASIS01,A,128,04.03.2026
TIBU004,11.01.2026,ADMIN02,A,0,15.02.2026
TIBU005,12.02.2026,ADMIN01,A,0,09.03.2026
TIBU006,18.02.2026,ADMIN01,C,0,
TIBU007,19.01.2026,BASIS01,A,0,13.02.2026
TIBU008,25.01.2026,BASIS01,A,0,02.02.2026
TIBU009,19.02.2026,BASIS01,A,0,28.03.2026
TIBU010,16.02.2026,ADMIN02,S,0,06.03.2026
TIBU011,19.01.2026,ADMIN01,A,0,30.01.2026
TIBU012,12.01.2026,ADMIN01,A,64,25.01.2026
TIBU013,27.01.2026,ADMIN01,A,0,
TIBU014,27.01.2026,ADMIN02,A,0,
TIBU015,08.01.2026,BASIS01,A,0,26.01.2026
TIBU016,17.01.2026,ADMIN01,A,64,
TIBU017,14.01.2026,ADMIN01,A,0,21.01.2026
TIBU018,24.02.2026,ADMIN02,A,0,08.04.2026
TIBU019,09.02.2026,ADMIN02,S,0,18.03.2026
TIBU020,23.02.2026,ADMIN01,A,0,
TIBU021,07.01.2026,ADMIN02,A,0,19.02.2026
TIBU022,05.01.2026,BASIS01,A,0,01.02.2026
TIBU023,01.02.2026,ADMIN02,A,0,18.02.2026
TIBU024,03.02.2026,ADMIN02,A,0,18.03.2026
TIBU025,05.02.2026,ADMIN01,A,0,24.02.2026
TIBU026,12.02.2026,ADMIN01,A,0,19.02.2026
TIBU027,10.01.2026,BASIS01,A,0,24.02.2026
TIBU028,23.02.2026,ADMIN02,A,0,17.03.2026
TIBU029,01.02.2026,ADMIN01,A,0,26.02.2026
TIBU030,20.02.2026,BASIS01,A,128,17.03.2026
TIBU031,25.01.2026,ADMIN01,A,128,02.02.2026
TIBU032,02.02.2026,ADMIN01,A,64,16.02.2026
TIBU033,21.02.2026,BASIS01,S,0,16.03.2026
TIBU034,23.02.2026,ADMIN02,A,0,04.03.2026
TIBU035,21.01.2026,ADMIN01,A,0,
TIBU036,06.02.2026,ADMIN02,A,0,10.03.2026
TIBU037,11.01.2026,ADMIN01,A,0,24.02.2026
TIBU038,23.02.2026,ADMIN02,S,0,
TIBU039,30.01.2026,BASIS01,A,0,02.02.2026
TIBU040,05.02.2026,BASIS01,B,0,15.03.2026
TIBU041,08.02.2026,ADMIN01,A,0,19.02.2026
TIBU042,19.02.2026,ADMIN01,B,0,
TIBU043,16.01.2026,ADMIN01,C,0,14.02.2026
TIBU044,12.01.2026,ADMIN01,A,0,25.01.2026
TIBU045,18.02.2026,ADMIN01,A,0,25.02.2026
`;
const L=CSV.replace(/\n$/,'').split('\n').map(l=>l.split(','));
const HEAD=L[0],REC=L.slice(1);
const n=REC.length;
const dialog=REC.filter(r=>r[3]==='A').length,locked=REC.filter(r=>r[4]!=='0').length,never=REC.filter(r=>r[5]==='').length;
const byU=Object.fromEntries(REC.map(r=>[r[0],r]));
const U1='TIBU005',U2='TIBU012',U3='TIBU021';
const RUN='2026-11-22';
const lockName=f=>f==='0'?'not locked':f==='64'?'locked by administrator':f==='128'?'locked (incorrect logons)':'locked ('+f+')';
const sc=(t)=>`<pre class="scr">${t}</pre>`;
const pad=(s,w)=>String(s).padEnd(w);
/* grids */
const logHead=['Evidence no.','System','Client','Transaction','Table or report','Parameters','Date and time run','Record count','Run by','File names'];
const logRows=[
 ['EV-001','TIBSBX','100','System > Status','System status screen','none','2026-11-22 09:02','n/a','Your name','EV-001_System_Status.png'],
 ['EV-002','TIBSBX','100','SE16N','T000 (client list)','Max hits blank','2026-11-22 09:06','3','Your name','EV-002_T000.png, T000_2026-11-22.xlsx'],
 ['EV-003','TIBSBX','100','SUIM','Users by complex selection criteria','All users, any user type','2026-11-22 09:10',String(n),'Your name','EV-003_SUIM_sel.png, EV-003_SUIM_count.png'],
 ['EV-004','TIBSBX','100','SE16N','USR02','All users; fields BNAME, ERDAT, ANAME, USTYP, UFLAG, TRDAT; Max hits blank','2026-11-22 09:15',String(n),'Your name','EV-004_USR02_sel.png, EV-004_USR02_count.png, USR02_2026-11-22.xlsx'],
 ['EV-005','TIBSBX','100','SU01D','Display user '+U1,'User '+U1,'2026-11-22 14:30','1','Your name','EV-005_SU01D_'+U1+'.png'],
 ['EV-006','TIBSBX','100','SU01D / change documents','Who changed or locked '+U1,'User '+U1,'2026-11-22 14:34','sample','Your name','EV-006_Changes_'+U1+'.png'],
 ['EV-007','TIBSBX','100','Firefighter log (PRQ-01 B-10)','Firefighter log','2026-11-01 to 2026-11-21','2026-11-22 14:41','sample','Your name','EV-007_FF_log.png, FF_log_2026-11-22.xlsx']];
const gLog={cap:'Sample extraction log: seven rows (your own log needs at least six)',rows:[logHead,...logRows],cols:['A','B','C','D','E','F','G','H','I','J'],rowNums:false,mark:{'4,7':'good','3,7':'good'}};
const gSample={cap:'The sample extract (P3_Sample_USR02_Extract.csv): first rows',rows:[HEAD,...REC.slice(0,6)],cols:['A','B','C','D','E','F'],rowNums:false,note:'Total: '+n+' data records. Blank TRDAT means the user has never logged on.'};
const gTypes={cap:'What the field values mean in this sample',rows:[['Field','Meaning'],['BNAME','User name'],['ERDAT','Creation date (dd.mm.yyyy)'],['ANAME','Who created the user'],['USTYP','User type: A dialog, B system, C communication, S service'],['UFLAG','Lock status: 0 not locked, 64 locked by administrator, 128 locked after wrong logons'],['TRDAT','Last logon date; blank means never logged on']],cols:['A','B'],rowNums:false};
const gMax={cap:'The Maximum No. of Hits trap (illustration)',rows:[['Setting','Population in SAP','Rows you receive','What you lose'],['Left at the default (500)','1,240','500','740 rows, silently'],['Left blank','1,240','1,240','nothing']],cols:['A','B','C','D'],rowNums:false,mark:{'1,2':'bad','1,3':'bad','2,2':'good','2,3':'good'}};
const gTrace={cap:'The completeness trace for the sample',rows:[['Count','Where it comes from','Value'],['Records on the SAP screen','Screenshot of the result, EV-004',n],['Rows in the export','=COUNTA(A2:A'+(n+1)+') on USR02_2026-11-22.xlsx',n],['Independent count','SUIM screenshot, EV-003',n],['Difference','All three equal',0]],cols:['A','B','C'],rowNums:false,mark:{'4,2':'good'}};
const acc=[[U1,'ERDAT '+byU[U1][1],'UFLAG '+byU[U1][4],'SU01D: '+lockName(byU[U1][4])+', created '+byU[U1][1],'Agrees'],[U2,'ERDAT '+byU[U2][1],'UFLAG '+byU[U2][4],'SU01D: '+lockName(byU[U2][4])+', created '+byU[U2][1],'Agrees'],[U3,'ERDAT '+byU[U3][1],'UFLAG '+byU[U3][4],'SU01D: locked by administrator at 14:20, created '+byU[U3][1],'DIFFERENT: explain']];
const gAcc={cap:'Accuracy trace: three users from the export checked against their SU01D screen',rows:[['User','Export value (date)','Export value (lock)','SU01D value','Result'],...acc],cols:['A','B','C','D','E'],rowNums:false,mark:{'1,4':'good','2,4':'good','3,4':'bad'}};
/* simulated screens */
const sStatus=sc(
'System: Status                                      14:02  22.11.2026\n'+
'-----------------------------------------------------------------\n'+
'Repository data      System:  TIBSBX   Client:  100\n'+
'                     Logon user:  YOURNAME   Display only\n'+
'-----------------------------------------------------------------\n'+
'Screenshot must show: system ID, client, user and the clock');
const sSel=sc(
'Data Browser: Table USR02 : Selection Screen\n'+
'-----------------------------------------------------------------\n'+
'Table                USR02\n'+
'Maximum No. of Hits  [        ]      <- leave BLANK\n'+
'Fields:  BNAME  ERDAT  ANAME  USTYP  UFLAG  TRDAT\n'+
'Selection:  (none, all users in client 100)\n'+
'-----------------------------------------------------------------\n'+
'Screenshot BEFORE you run it. Clock visible.');
const sRes=sc(
'Data Browser: Table USR02 : Result              '+n+' Entries\n'+
'-----------------------------------------------------------------\n'+
pad('BNAME',9)+pad('ERDAT',12)+pad('ANAME',9)+pad('USTYP',6)+pad('UFLAG',6)+'TRDAT\n'+
REC.slice(0,4).map(r=>pad(r[0],9)+pad(r[1],12)+pad(r[2],9)+pad(r[3],6)+pad(r[4],6)+r[5]).join('\n')+'\n'+
'  ...\n'+
'-----------------------------------------------------------------\n'+
'Screenshot must show the COUNT ('+n+' Entries) and the clock');
const su=(u,extra)=>{const r=byU[u];return sc('Display User: '+u+'                                  14:'+(u===U1?'30':u===U2?'31':'35')+'  22.11.2026\n-----------------------------------------------------------------\nUser type         '+(r[3]==='A'?'Dialog':r[3])+'\nValid from        '+r[1]+'\nLock status       '+(extra||lockName(r[4]))+'\nCreated on        '+r[1]+'\n-----------------------------------------------------------------\nTIBSBX / 100 / display only')};
/* questions */
const nm=v=>String(v).replace(/[^0-9]/g,'');
const eq=x=>v=>nm(v)===String(x);
const Q=[
 {id:'C1',q:'How many data records are in the sample extract (P3_Sample_USR02_Extract.csv)? This is your completeness control total.',kind:'num',ok:eq(n),show:n+' records',formula:'=COUNTA(A2:A200)',how:'Count the filled cells in column A below the header. It must equal the count on the SAP screen and in SUIM.'},
 {id:'C2',q:'How many users are dialog users (USTYP = A)?',kind:'num',ok:eq(dialog),show:dialog+' dialog users',formula:'=COUNTIF(D2:D'+(n+1)+',"A")',how:'Dialog users are real people logging on. They are the main population for most access tests.'},
 {id:'C3',q:'How many users are locked (UFLAG is not 0)?',kind:'num',ok:eq(locked),show:locked+' locked users',formula:'=COUNTIFS(E2:E'+(n+1)+',"<>0")',how:'In this sample, 64 means locked by an administrator and 128 means locked after wrong logons.'},
 {id:'C4',q:'How many users have never logged on (TRDAT blank)?',kind:'num',ok:eq(never),show:never+' users',formula:'=COUNTBLANK(F2:F'+(n+1)+')',how:'A blank last-logon date is a fact to report. Do not fill it in.'},
 {id:'C5',q:'The export of USR02 was run on 22 November 2026. What should the file be called? Use the naming pattern from the guide.',kind:'text',ok:v=>/usr02_2026-11-22/i.test(v),hint:'Pattern: transaction or table, an underscore, the date as yyyy-mm-dd, then the extension.',show:'USR02_2026-11-22.xlsx',formula:'table_date.extension',how:'The name tells a reviewer what it is and when it was run, without opening it. Never edit the export: copy it and work on the copy.'},
 {id:'C6',q:'In one short sentence, why do you leave Maximum No. of Hits blank?',kind:'text',ok:v=>/(blank|all|full|every|complete|whole|population|500|default|lose|lost|miss|cut|truncat|limit)/i.test(v),hint:'Think about what happens to a big population when a limit is left in place.',show:'So you receive the full population. A default limit such as 500 silently drops every row beyond it.',formula:'Maximum No. of Hits = blank',how:'You would not know rows were missing unless you compared the count with an independent count.'},
 {id:'C7',q:'Three users were checked against SU01D. Which one shows a difference from the export?',kind:'text',ok:v=>String(v).toUpperCase().includes(U3)&&!String(v).toUpperCase().includes(U1)&&!String(v).toUpperCase().includes(U2),show:U3+': the export says not locked, SU01D shows locked by administrator',formula:'Compare each export value with the screen value',how:'The lock was set at 14:20, after the extract ran at 09:15, so it is a timing difference and not an error in the extract. Record both times to prove it.'},
 {id:'C8',q:'Do the screen count, the export row count and the SUIM count agree? Is the extract complete? Answer Yes or No and give the three numbers.',kind:'text',ok:v=>/yes|complete|agree|equal/i.test(v)&&String(v).includes(String(n)),show:'Yes. '+n+' on screen, '+n+' in the export, '+n+' in SUIM. The extract is complete.',formula:'screen count = export rows = independent count',how:'Completeness means nothing is missing. Three matching counts from two independent sources is the proof.'},
 {id:'C9',q:'What is the minimum number of rows your extraction log must have to finish Day 3?',kind:'num',ok:eq(6),show:'6 or more',formula:'six rows, each with a screenshot pair and an export',how:'Your guide asks for at least six rows. The sample log above has seven.'}
];
DAYS.push({n:3,title:'Route 1: the evidence habit',time:'3 hours',
 goal:'Learn to pull reliable evidence yourself, prove it came from the right system, and show that it is complete. In a real engagement you do this in SAP. Here you learn the habit on a sample extract and sample screens, so you can do it correctly the first time in the sandbox.',
 file:'P3_Sample_USR02_Extract.csv and the Extraction Log template (both fictional, with the sample values filled in).',
 files:[{name:'P3_Sample_USR02_Extract.csv',data:CSV,type:'text/csv'},{name:'P3_Extraction_Log_Template.xlsx',sheets:[['Sample_Log',[logHead,...logRows],false],['My_Log',[logHead],false]]}],
 parts:[
  {t:'Part 0: Before you start',short:'0 Before',steps:[
   {h:'What Route 1 is, and the one rule that protects you',why:'On some engagements you pull the data yourself. Then you, not the client, must prove that the data is the right data and all of it.',
    intro:'On <b>Route 1</b> you extract the data from SAP yourself. The tests are the same as on Route 2; what changes is the proof. The evidence habit below is how you prove it.',
    do:['<b>Display only.</b> In SAP never use change mode, never post, never schedule, never execute an import. This is the PRQ-01 safety rule.','Use <b>fictional data only</b> in anything you save for this course. Never copy real client data into course files.'],
    see:'You are ready to learn the habit.',slip:'Clicking Save, Change or Execute "just to see". A tester who changes the system can no longer be independent.'},
   {h:'Why the sandbox cannot match the case dates',why:'You must not try to match answers from other courses against the sandbox.',
    intro:'The sandbox has its own dates and its own users. It cannot reproduce the dates of the case studies. You are not learning answers here. You are learning the habit: <b>parameters, count, screenshot, log</b>.',
    do:['Check you can log on to your sandbox user before you do the SAP exercises (your sandbox user and password are issued by Basis).','For this self-study you will work on the sample extract and sample screens below, so you can practise the whole habit without SAP.'],
    extra:'<p><button class="primary" data-dl="0">Download P3_Sample_USR02_Extract.csv</button> <button data-dl="1">Download the Extraction Log template</button></p>',
    grids:[gSample,gTypes]}]},
  {t:'Part 1: The evidence habit, step by step',short:'1 Habit',steps:[
   {h:'Step 1: Prove the system and the client',why:'A screenshot with no system and no client proves nothing. You must be able to show which system you took the evidence from.',
    do:['Log on to the sandbox.','Open the status screen: <b>System &gt; Status</b>.','Take a screenshot that shows the system ID, the client, your user and the clock.','Save it as <b>EV-001_System_Status.png</b> in <b>TIB_Prep\\03_Evidence</b>.'],
    extra:sStatus,see:'A clear screenshot of the status screen with system TIBSBX, client 100 and the time.',slip:'Cropping the screenshot so the clock or the client is missing.'},
   {h:'Step 2: Enter the selection, then screenshot it before you run',why:'If you do not capture the selection, you cannot later say what you filtered on.',
    do:['Open the table in the data browser (transaction SE16N, table USR02).','Enter the fields and selection. Leave <b>Maximum No. of Hits</b> blank so you get the full population.','Take a screenshot of the selection screen before you press Execute.'],
    extra:sSel+'<div class="gcap">Why the blank matters</div>',grids:[gMax],see:'A screenshot of the filled selection screen with the Maximum No. of Hits box empty.',slip:'Leaving the default Maximum No. of Hits (500) and silently losing rows.'},
   {h:'Step 3: Run it and screenshot the result with the count',why:'The count on the screen is the first number you check. Everything else is measured against it.',
    do:['Execute the selection.','Find the record count on the screen (for example "'+n+' Entries").','Take a screenshot showing the data, the count and the clock.'],
    extra:sRes,see:'The count <b>'+n+'</b> visible on the result screen.',slip:'Taking the screenshot but scrolling so the count is off the screen.'},
   {h:'Step 4: Export, and name the file properly',why:'A good file name says what it is and when it was run. An edited export is no longer evidence.',
    do:['Export the result to Excel.','Name it with the table or transaction and the date, for example <b>USR02_2026-11-22.xlsx</b>.','Save it in <b>TIB_Prep\\03_Evidence</b>. Never edit it. Copy it to 02_Working and work on the copy.'],
    see:'A file in 03_Evidence with the table and date in its name.',slip:'Renaming the file to something like "users final v2".'},
   {h:'Step 5: Add a row to the extraction log',why:'The log is the index of your evidence. A reviewer uses it to find every screenshot and file without asking you.',
    do:['Open the Extraction Log template (or any sheet with the ten columns in the next step).','Add one row for this extract: evidence number, system, client, transaction, table or report, parameters, date and time run, record count, run by, and file names.','Save the log in <b>TIB_Prep\\03_Evidence</b>.'],
    see:'One complete row in your log for the USR02 extract.',slip:'Writing the log at the end of the day from memory. Write it as you go, while the details are fresh.'}]},
  {t:'Part 2: The extraction log',short:'2 Log',steps:[
   {h:'The ten columns, with a full sample',why:'Every row must answer the same ten questions, the same way, so any reviewer can follow it.',
    intro:'Below is a sample log for a day of work. Read it row by row. Notice that every row has an evidence number, a date and time, a count and the file names.',
    grids:[gLog],see:'Seven rows, each with a screenshot pair and an export. The count of '+n+' on EV-003 and EV-004 is the starting point of the completeness trace.',
    slip:'A row with no count, or a count with no screenshot to prove it.'},
   {h:'Build your own log',why:'You learn the habit by repeating it.',
    do:['Open the Extraction Log template. It has the sample rows on one sheet and an empty <b>My_Log</b> sheet.','On My_Log, type the ten headings in row 1.','Add one row for each screen or extract that you capture in the sandbox exercises E1 to E8 (system status, T000, SUIM count, USR02, one user in SU01D, change documents, firefighter log).','Your log needs <b>at least six rows</b>, each with a screenshot pair and an export.'],
    see:'A log you can hand to a reviewer.'}]},
  {t:'Part 3: Prove it is complete (IPE)',short:'3 Complete',steps:[
   {h:'What IPE means and what you must show',why:'IPE is information produced by the entity. Before you rely on any list, you must show it is complete (nothing missing) and accurate (values correct).',
    intro:'<b>Completeness:</b> the record count on screen equals the number of rows in your export, and agrees to an independent count from a second source. <b>Accuracy:</b> pick a few users from the export and confirm each against the system itself.',
    see:'The two questions you must answer for every list you rely on.'},
   {h:'Completeness trace for the sample',why:'Three numbers from two independent sources must agree. If they do not, you must find out why before you test.',
    do:['Open the sample extract and in an empty cell type:',{f:'=COUNTA(A2:A200)'},'Compare with the count on the SAP result screenshot (EV-004) and with the independent count from SUIM (EV-003).','Write down the three numbers and the difference.'],
    grids:[gTrace],see:'<b>'+n+'</b> in all three places. Difference 0. The list is complete.',
    slip:'Comparing the export only with itself. The independent count must come from a different route, such as SUIM.'},
   {h:'If the counts do not agree',why:'A difference is not a failure of the test. It is a question you must answer before relying on the list.',
    intro:'Suppose SUIM showed 41 and your export had '+n+'. Do not average them and do not pick one. Work through it in order:',
    do:['<b>Compare the selections.</b> Were both runs made with the same filters, such as user type? Most differences come from this.','<b>Name the missing users.</b> Look up each user of the larger list in the smaller one, using the same lookup you used on Day 2, and list the ones not found.','<b>Explain each one</b> in writing, for example "locked users are excluded from the SUIM selection".','If you cannot explain a difference, <b>do not rely on the list</b>. Re-run both and ask your lead.'],
    see:'A written explanation for every difference, or a decision not to rely on the list.'}]},
  {t:'Part 4: Prove it is accurate',short:'4 Accurate',steps:[
   {h:'Check three users against the system itself',why:'Completeness does not prove that the values are correct. You prove accuracy by taking a few records and checking each field against its source.',
    do:['Pick three users from the export. Do not pick only the easy ones.','For each user, open <b>SU01D</b> (display only) and take a screenshot with the clock.','Write the user, the field, and both values: export and screen.'],
    extra:'<div class="gcap">Sample SU01D screens</div>'+su(U1)+su(U2),see:'Both users agree with the export: '+U1+' '+lockName(byU[U1][4])+', created '+byU[U1][1]+'; '+U2+' '+lockName(byU[U2][4])+', created '+byU[U2][1]+'.',
    slip:'Checking only the user name. Check the fields the test will depend on, such as lock status and dates.'},
   {h:'A difference: what to do',why:'A mismatch is either a real error or a timing difference. Your job is to find out which and to prove it.',
    extra:'<div class="gcap">The third user</div>'+su(U3,'locked by administrator (set 22.11.2026 14:20)'),
    intro:'The export says <b>'+U3+'</b> was not locked (UFLAG 0). The screen, taken later that day, shows locked.',
    do:['Compare the times. The extract ran at <b>09:15</b>. The SU01D screenshot was taken at <b>14:35</b>, and the lock was set at <b>14:20</b>, after the extract.','Conclude: the extract was accurate at the time it ran. The difference is timing, not an error.','Write down both times and the conclusion. If the lock had been set <i>before</i> 09:15, the extract would be inaccurate and you would not rely on it.'],
    grids:[gAcc],see:'A written conclusion with both times. That is the difference between a tester and someone who just ticks.'},
   {h:'Make it easier for the next person',why:'You must be able to explain, without notes, why the count on the screen is the first thing you check.',
    intro:'If the count on the screen is wrong or missing, every later number rests on nothing. So the first thing you read, every time, is the count, and the first thing you write in the log is the count.',
    see:'You are ready to answer the questions.'}]}
 ],
 questions:Q,
 qintro:'Answer from the sample extract and the sample screens. Type your answers and press Check, or Show me if you are stuck.',
 done:['Your log has at least six rows, each with a screenshot pair and an export.','You have written a one-paragraph completeness trace: the three counts, the difference, and your conclusion.','You can explain, without notes, why the count on the screen is the first thing you check.']
});
})();
