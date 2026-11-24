(function(){
'use strict';
const CSV=`PERSNO,BNAME,ERDAT,LOCKED,LAST_LOGON,DEPT
00104500,USR001,02.02.2026,,09.02.2026,FIN
00104501,USR002,03.02.2026,,11.02.2026,HR
00104502,USR003,04.02.2026,,11.02.2026,SALES
00104503,USR004,05.02.2026,X,,IT
00104504,USR005   ,06.02.2026,,13.02.2026,FIN
00104505,USR006,09.02.2026,,17.02.2026,HR
00104506,USR007,10.02.2026,,19.02.2026,SALES
00104507,USR008,11.02.2026,,14.02.2026,IT
00104508,USR009,12.02.2026,,14.02.2026,FIN
00104509,USR010,13.02.2026,X,21.02.2026,HR
00104510,USR011,16.02.2026,,,SALES
00104511,USR012,17.02.2026,,24.02.2026,IT
00104512,USR013,18.02.2026,,27.02.2026,FIN
00104513,USR014,19.02.2026,,21.02.2026,HR
00104514,USR015,20.02.2026,,21.02.2026,SALES
00104515,USR016,23.02.2026,X,02.03.2026,IT
00104516,USR017,24.02.2026,,28.02.2026,FIN
00104517,USR018   ,25.02.2026,,,HR
00104518,USR019,26.02.2026,,28.02.2026,SALES
00104519,USR020,27.02.2026,,28.02.2026,IT
00104520,USR021,07.02.2026,,15.02.2026,FIN
00104521,USR022,08.02.2026,,08.02.2026,HR
00104522,USR023,14.02.2026,X,23.02.2026,SALES
00104523,USR024,21.02.2026,,27.02.2026,IT
00104524,USR025,20.02.2026,,,FIN
00104525,USR026,07.02.2026,,16.02.2026,HR
00104526,USR027,07.02.2026,,09.02.2026,SALES
00104527,USR028,27.02.2026,,27.02.2026,IT
00104528,USR029,24.02.2026,,25.02.2026,FIN
00104529,USR030   ,03.02.2026,,03.02.2026,HR
00104530,USR031,10.02.2026,,13.02.2026,SALES
00104531,USR032,27.02.2026,X,,IT
00104532,USR033,02.02.2026,,09.02.2026,FIN
00104533,USR034,16.02.2026,,23.02.2026,HR
00104534,USR035,26.02.2026,,01.03.2026,SALES
00104535,USR036,24.02.2026,,27.02.2026,IT
00104536,USR037,07.02.2026,,11.02.2026,FIN
00104537,USR038,23.02.2026,,23.02.2026,HR
00104506,USR007,10.02.2026,,19.02.2026,SALES
00104521,USR022,08.02.2026,,08.02.2026,HR
`;
/* ---- data, computed from the file so every number shown is real ---- */
const lines=CSV.replace(/\n$/,'').split('\n').map(l=>l.split(','));
const HEAD=lines[0],REC=lines.slice(1);          // REC: 40 records
const ISO=s=>{const p=s.split('.');return p[2]+'-'+p[1]+'-'+p[0]};
const DT=s=>{const p=s.split('.');return new Date(Date.UTC(+p[2],+p[1]-1,+p[0]))};
const seen=new Set(),DUPIDX=[],DIST=[];
REC.forEach((r,i)=>{const k=r.join('|');if(seen.has(k))DUPIDX.push(i);else{seen.add(k);DIST.push(r)}});
const SP=REC.filter(r=>r[1]!==r[1].trim());
const isos=REC.map(r=>ISO(r[2])).sort();
const ans={n:REC.length,dist:DIST.length,dups:DUPIDX.length,sp:SP.length,first:REC[0][0],min:isos[0],max:isos[isos.length-1],
  locked:DIST.filter(r=>r[3]==='X').length,never:DIST.filter(r=>r[4]==='').length,wk:DIST.filter(r=>{const d=DT(r[2]).getUTCDay();return d===0||d===6}).length};
const sheetRow=i=>i+2;                           // record index -> Excel row number
const rowCells=r=>r.slice();
const SHOWN=[0,1,2,3,4,5,6,40];                  // header + a few records (index into allRows)
const allRows=[HEAD,...REC];

/* ---- grids ---- */
const gRaw={cap:'Sheet "Raw" after a safe import (every column is text, so the zeros survive)',rows:allRows,show:[0,1,2,3,4,40],mark:{'1,0':'good','2,0':'good'},note:'Rows 7 to 40 are not shown. Row 41 is the last record.'};
const gGuess={cap:'What Excel can do to the same file if you just double-click it',rows:[
  HEAD,
  ['104500','USR001','02.02.2026','','2026-09-02','FIN'],
  ['104501','USR002','03.02.2026','','2026-11-02','HR'],
  ['104513','USR014','19.02.2026','','21.02.2026','HR']],
  mark:{'1,0':'bad','2,0':'bad','1,4':'bad','2,4':'bad','3,4':'bad'},
  note:'PERSNO lost its zeros. With a month-first regional setting (for example US), 09.02.2026 is read as 2 September and 11.02.2026 as 2 November, while 21.02.2026 stays as text because there is no month 21. One column now mixes real dates, wrong dates and text, and nothing warns you.'};
const cntRows=allRows.map((r,i)=>{const c=r.slice();while(c.length<8)c.push('');c[8]=i===0?ans.n:'';return c});
const gCount={cap:'Where the control total goes: cell I1 on sheet Raw',rows:cntRows,cols:['A','B','C','D','E','F','G','H','I'],show:[0,1,2,39,40],mark:{'0,8':'good','40,0':'hl'},
  note:'Column A has 41 filled cells: the header plus 40 records. COUNTA counts all 41, so we subtract 1 for the header row.'};
const txt=[...DIST].sort((a,b)=>a[4]<b[4]?-1:a[4]>b[4]?1:0).filter(r=>r[4]!=='').slice(0,6);
const gTextSort={cap:'LAST_LOGON sorted as text, A to Z (wrong)',cols:['A','B'],rows:[['BNAME','LAST_LOGON (text)'],...txt.map(r=>[r[1].trim(),r[4]])],mark:{'1,1':'bad','2,1':'bad'},
  note:'01.03.2026 and 02.03.2026 are in March, yet they sort ahead of every February date, because text sorts by the first characters (the day). A real date would sort them last.'};
const p=REC[0][2].split('.');
const gPieces={cap:'The formula taken apart, for the first record (C2 = 02.02.2026)',cols:['A','B','C'],rows:[['Part','Formula','Result'],['Day','LEFT(C2,2)',p[0]],['Month','MID(C2,4,2)',p[1]],['Year','RIGHT(C2,4)',p[2]],['Real date','DATE(year, month, day)',ISO(REC[0][2])]],mark:{'4,2':'good'}};
const cv=allRows.map((r,i)=>i===0?[...r,'ERDAT_DATE']:[...r,ISO(r[2])]);
const gConv={cap:'Sheet "Work": the converted date in column G',cols:['A','B','C','D','E','F','G'],rows:cv,show:[0,1,2,3,40],mark:{'0,6':'hl','1,6':'good','2,6':'good','3,6':'good','40,6':'good'},note:'Column C still holds the original text. Column G is the new, real date. Never overwrite the original.'};
const gTrim={cap:'The three names with trailing spaces',cols:['A','B','C','D','E'],rows:[['BNAME as received','LEN','TRIM result','LEN after TRIM','Flag'],...SP.map(r=>['['+r[1]+']',r[1].length,r[1].trim(),r[1].trim().length,'trailing spaces'])],mark:{'1,1':'bad','2,1':'bad','3,1':'bad','1,3':'good','2,3':'good','3,3':'good'},header:true,note:'The square brackets are only here to show you where the name ends. In Excel you cannot see the spaces, which is why the formula matters.'};
const dupRows=DUPIDX.flatMap(i=>{const orig=REC.findIndex((r,j)=>j<i&&r.join('|')===REC[i].join('|'));return[[sheetRow(orig),...REC[orig],'first copy: kept'],[sheetRow(i),...REC[i],'exact duplicate: removed']]});
const gDup={cap:'The duplicate records, side by side with their first copy',cols:['A','B','C','D','E','F','G','H'],rows:[['Sheet row',...HEAD,'Result'],...dupRows],mark:Object.fromEntries([...Array(dupRows.length).keys()].filter(k=>k%2===1).map(k=>[(k+1)+',7','bad']).concat([...Array(dupRows.length).keys()].filter(k=>k%2===0).map(k=>[(k+1)+',7','good'])))};
const sorted=[...DIST].sort((a,b)=>ISO(a[2])<ISO(b[2])?-1:ISO(a[2])>ISO(b[2])?1:0);
const gSort={cap:'After sorting by the converted date (oldest first): first rows',cols:['A','B','C','D','E','F','G'],rows:[[...HEAD,'ERDAT_DATE'],...sorted.slice(0,5).map(r=>[...r,ISO(r[2])]),...sorted.slice(-1).map(r=>[...r,ISO(r[2])])],show:[0,1,2,3,4,5,6],note:'Rows with the same date may appear in either order. That is normal. What matters is that the record count is still 38.'};
const lk=DIST.filter(r=>r[3]==='X');
const gLocked={cap:'Filter on LOCKED = X: the rows that remain',cols:['A','B','C','D','E','F'],rows:[HEAD,...lk],mark:Object.fromEntries(lk.map((_,i)=>[(i+1)+',3','hl']))};
const nl=DIST.filter(r=>r[4]==='');
const gNever={cap:'LAST_LOGON blank: users who never logged on',cols:['A','B','C','D','E','F'],rows:[HEAD,...nl.map(r=>[r[0],r[1],r[2],r[3],'(blank)',r[5]])],mark:Object.fromEntries(nl.map((_,i)=>[(i+1)+',4','hl']))};
const wk=DIST.filter(r=>{const d=DT(r[2]).getUTCDay();return d===0||d===6});
const gWeek={cap:'Distinct users created on a weekend (WEEKDAY(date,2) is 6 or 7)',cols:['A','B','C','D'],rows:[['BNAME','ERDAT','Day','WEEKDAY(,2)'],...wk.map(r=>{const d=DT(r[2]).getUTCDay();return[r[1].trim(),ISO(r[2]),d===6?'Saturday':'Sunday',d===0?7:d]})]};

/* ---- questions ---- */
const num=n=>v=>String(v).replace(/[^0-9]/g,'')===String(n);
const hasDates=(a,b)=>v=>{const t=String(v).toLowerCase();const A=a.split('-'),B=b.split('-');
  const iso=t.includes(a)&&t.includes(b);const dot=t.includes(A[2]+'.'+A[1]+'.'+A[0])&&t.includes(B[2]+'.'+B[1]+'.'+B[0]);const sl=t.includes(+A[2]+'/'+ +A[1]+'/'+A[0])&&t.includes(+B[2]+'/'+ +B[1]+'/'+B[0]);const nm=/\b0?2\b.*feb/.test(t)&&/\b27\b.*feb/.test(t);return iso||dot||sl||nm};
const Q=[
 {id:'Q1',q:'How many data records did the file contain when loaded (before any cleaning)?',kind:'num',ok:num(ans.n),show:ans.n+' records',formula:'=COUNTA(Raw!A:A)-1',how:'COUNTA counts the 41 filled cells in column A and the -1 removes the header. This is your control total for the whole day.'},
 {id:'Q2',q:'What is the PERSNO of the first record? Does it still show its leading zeros?',kind:'text',ok:v=>String(v).includes(ans.first),show:ans.first+' (yes, the zeros are kept)',formula:'=Raw!A2',how:'It reads 00104500 only because Data Type Detection was switched off. If you see 104500, repeat the import (Part 2).'},
 {id:'Q3',q:'After converting, what are the earliest and latest ERDAT (creation) dates? Give both.',kind:'text',ok:hasDates(ans.min,ans.max),show:'Earliest '+ans.min+', latest '+ans.max,formula:'=TEXT(MIN(Work!G2:G41),"yyyy-mm-dd")  and  =TEXT(MAX(Work!G2:G41),"yyyy-mm-dd")',how:'MIN and MAX only work on real dates, which is why Part 4 comes first. Type both dates, for example "2026-02-02 and 2026-02-27".'},
 {id:'Q4',q:'How many BNAME values had trailing spaces? Use a formula, not your eyes.',kind:'num',ok:num(ans.sp),show:ans.sp+' names (USR005, USR018, USR030)',formula:'=SUMPRODUCT(--(LEN(Work!B2:B41)<>LEN(TRIM(Work!B2:B41))))',how:'The formula compares the length of each name with its length after TRIM. Any difference means hidden spaces.'},
 {id:'Q5',q:'How many duplicate records were there, and how many distinct users remain? Type both numbers, for example "2 and 38".',kind:'text',ok:v=>{const n=String(v).match(/\d+/g)||[];return n.includes(String(ans.dups))&&n.includes(String(ans.dist))},show:ans.dups+' duplicate records; '+ans.dist+' distinct users remain',formula:'Data > Remove Duplicates (all columns ticked), and =SUMPRODUCT(1/COUNTIF(A2:A41,A2:A41)) for the distinct count',how:'Excel reports "2 duplicate values found and removed; 38 unique values remain". The two removed rows are the second copies of USR007 and USR022. Reconcile: 40 - 2 = 38.'},
 {id:'Q6',q:'Among the distinct users, how many are locked (LOCKED = X)?',kind:'num',ok:num(ans.locked),show:ans.locked+' locked users',formula:'=COUNTIF(D2:D39,"X")',how:'The filter and the formula must agree. The status bar showed 5 of 38 records found.'},
 {id:'Q7',q:'Among the distinct users, how many have never logged on (LAST_LOGON blank)?',kind:'num',ok:num(ans.never),show:ans.never+' users',formula:'=COUNTBLANK(E2:E39)',how:'These are USR004, USR011, USR018, USR025 and USR032. A blank LAST_LOGON is a fact you must report, not an error to fix.'},
 {id:'Q8',q:'Among the distinct users, how many were created on a weekend? Hint: WEEKDAY(date,2) returns 6 or 7.',kind:'num',ok:num(ans.wk),show:ans.wk+' users',formula:'=SUMPRODUCT(--(WEEKDAY(G2:G39,2)>5))',how:'Needs the real dates from Part 4. Counting the distinct list matters: a weekend duplicate would be counted twice if you forgot to remove it first.'},
 {id:'Q9',q:'After sorting by ERDAT, what is the record count? Prove it did not change.',kind:'num',ok:v=>{const n=String(v).replace(/[^0-9]/g,'');return n==='38'||n==='40'},hint:'Count the rows again after the sort. It must equal the count you had just before sorting.',show:'38 (or 40 if you sorted before removing duplicates). The same as before the sort.',formula:'=COUNTA(A2:A39)',how:'A sort that changes the count means rows were lost or the sort did not include every column. Always recount after you sort.'}
];

[gTextSort,gPieces,gTrim,gDup,gSort,gLocked,gNever,gWeek].forEach(g=>g.rowNums=false);
DAYS.push({n:1,title:'Excel handling',time:'3 hours',
 goal:'Load an extract without damaging it, make it fit for testing, and prove nothing was lost. You will keep the original untouched, import it safely, count it, turn text into real dates, clean it, sort and filter it, and answer nine questions.',
 file:'P1_Employee_Extract.csv (fictional, 40 records, a user list like the ones you will test).',
 files:[{name:'P1_Employee_Extract.csv',data:CSV,type:'text/csv'}],
 parts:[
  {t:'Part 1: Keep the original untouched',short:'1 Original',steps:[
   {h:'Make your three working folders',why:'In testing, the file you received is evidence. If you change it, you can no longer prove what the client gave you. So we separate the three kinds of file before we touch anything.',
    do:['Open File Explorer and create a folder named <b>TIB_Prep</b> (for example inside Documents).','Inside it create three folders named exactly <b>01_Original</b>, <b>02_Working</b> and <b>03_Evidence</b>.'],
    grids:[{cap:'Your folders',cols:['Folder','What goes in it'],header:true,rows:[['Folder','What goes in it'],['TIB_Prep\\01_Original','The file exactly as received. Read-only. Never edited.'],['TIB_Prep\\02_Working','Every workbook you build. All changes happen here.'],['TIB_Prep\\03_Evidence','Screenshots and extraction logs (used from Day 3).']],rowNums:['','1','2','3']}],
    see:'Three empty folders inside TIB_Prep.'},
   {h:'Save the file into 01_Original and lock it',why:'A read-only copy is your proof of what you started with.',
    do:['Download the practice file with the button below and save it into <b>TIB_Prep\\01_Original</b>.','<b>Do not open it by double-clicking.</b> Double-clicking lets Excel guess, and you will see why in Part 2.','Right-click the file, choose <b>Properties</b>, tick <b>Read-only</b>, then OK.'],
    extra:'<p><button class="primary" data-dl="0">Download P1_Employee_Extract.csv</button></p>',
    see:'The file sits in 01_Original and its Properties show Read-only ticked.',
    slip:'Saving the file straight onto the Desktop or into Downloads. Then you have no clean original to fall back on.'},
   {h:'The rule for the rest of the day',why:'This one habit protects you on every engagement.',
    intro:'From now on <b>every change happens in a workbook in 02_Working, never in the CSV</b>. If you ever cannot explain a number, you can return to 01_Original and start again from the evidence.',
    see:'Nothing to do in Excel yet. Press Next.'}]},
  {t:'Part 2: Import it the safe way',short:'2 Import',steps:[
   {h:'See what goes wrong with a double-click',why:'You need to recognise the damage so you can spot it on a real engagement.',
    intro:'This is a look-only step: do not try it on your evidence copy. Excel guesses the type of every column. Here is what it can do to this very file.',
    grids:[gGuess],slip:'Trusting the screen. The dates look like dates and the numbers look like numbers, so nothing tells you they are wrong.'},
   {h:'Start the import from inside Excel',why:'Importing through Get Data lets you control how each column is read.',
    do:['Open a <b>new blank workbook</b> in Excel.','Click <span class="menu">Data &gt; Get Data &gt; From File &gt; From Text/CSV</span>.','Browse to <b>TIB_Prep\\01_Original</b> and choose <b>P1_Employee_Extract.csv</b>, then click <b>Import</b>.'],
    see:'A preview window opens showing the six columns and the first rows of data.',
    slip:'Using File &gt; Open on the CSV. That is the double-click route again.'},
   {h:'Switch off type detection, then load',why:'With detection off, every column stays as text. Text is safe: leading zeros survive and dates are not misread.',
    do:['In the preview window, find <b>Data Type Detection</b> (near the top, it usually says "Based on first 200 rows").','Change it to <b>Do not detect data types</b>.','Click <b>Load</b>.','Right-click the sheet tab and choose <b>Rename</b>. Name it <b>Raw</b>.','Click <span class="menu">File &gt; Save As</span> and save as <b>P1_Work.xlsx</b> in <b>TIB_Prep\\02_Working</b>.'],
    grids:[gRaw],see:'Forty data rows below a header row, with PERSNO shown as 00104500, 00104501 and so on, all left-aligned (text).'},
   {h:'Check yourself: did the zeros survive?',why:'A one-second check now saves a failed lookup later.',
    do:['Click cell <b>A2</b> on the Raw sheet.','Read the first PERSNO.'],
    see:'<b>00104500</b>, with its leading zeros. If you see 104500, the zeros were lost: delete the sheet and repeat the previous step, making sure Data Type Detection says <b>Do not detect data types</b>.'}]},
  {t:'Part 3: Count before you change anything',short:'3 Count',steps:[
   {h:'Set your control total',why:'The count before cleaning is the number every later step is measured against. A wrong count here ruins every test after it.',
    do:[{t:'Click cell <b>I1</b> on the Raw sheet and type:',f:'=COUNTA(A:A)-1'},'Press Enter.','Write the result down on paper and in a cell label (for example H1: "Control total"). It is your control total for the whole day.'],
    grids:[gCount],see:'The number <b>'+ans.n+'</b> in cell I1.',
    slip:'Counting by scrolling and guessing, or forgetting the -1 and reporting 41. COUNTA counts the header too.'}]},
  {t:'Part 4: Make the dates real',short:'4 Dates',steps:[
   {h:'Why a text date cannot be used',why:'You cannot calculate with text. You cannot find the earliest, the latest or the days between two dates, and sorting gives the wrong order.',
    intro:'SAP writes dates as <b>dd.mm.yyyy</b>. Excel keeps them as text, so it sorts them letter by letter. Look at what happens to the LAST_LOGON column:',
    grids:[gTextSort],note:''},
   {h:'Copy the sheet so Raw stays untouched',why:'Raw is your as-loaded record. All changes go on a copy.',
    do:['Right-click the <b>Raw</b> tab and choose <b>Move or Copy</b>.','Tick <b>Create a copy</b>, choose "(move to end)", then OK.','Rename the new tab <b>Work</b>.'],
    see:'Two tabs, Raw and Work, with identical data. From here, work only on Work.'},
   {h:'Convert the text into a real date',why:'The formula rebuilds the date from its three pieces, in the order Excel needs: year, month, day.',
    do:['Click cell <b>G1</b> on Work and type the heading <b>ERDAT_DATE</b>.',{t:'Click <b>G2</b> and type:',f:'=DATE(RIGHT(C2,4),MID(C2,4,2),LEFT(C2,2))'},'Press Enter. Then double-click the small square at the bottom-right corner of G2 to fill the formula down to the last record (row 41).'],
    grids:[gPieces,gConv],see:'Dates in column G, such as '+ISO(REC[0][2])+', ready to calculate with.',
    slip:'Typing the formula as =DATE(LEFT(...),...). The order of DATE is year, month, day. Using the wrong pieces gives a wrong date or an error.'},
   {h:'Format the dates and prove the conversion',why:'Formatting makes the dates readable the same way everywhere. The count proves none failed.',
    do:['Select column G, press <b>Ctrl+1</b> (Format Cells), choose <b>Custom</b>, and type <b>yyyy-mm-dd</b> in the Type box. Click OK.',{t:'In an empty cell, such as J1, type:',f:'=COUNT(G2:G41)'},'Compare the result with your control total in Raw!I1.'],
    see:'<b>'+ans.n+'</b>, equal to the control total. COUNT only counts real numbers and dates, so a lower number means some dates did not convert. If it is lower, look for a cell showing #VALUE! in column G.'}]},
  {t:'Part 5: Clean, and log every change',short:'5 Clean',steps:[
   {h:'Find and fix hidden spaces',why:'A name with a trailing space will not match the same name in another file, so lookups fail without any warning.',
    do:['Click <b>H1</b> on Work and type the heading <b>BNAME_CLEAN</b>.',{t:'Click <b>H2</b> and type:',f:'=TRIM(B2)',after:'<br>Fill it down to row 41.'},{t:'Count the names that had hidden spaces. In an empty cell type:',f:'=SUMPRODUCT(--(LEN(B2:B41)<>LEN(TRIM(B2:B41))))'},'To keep the clean names: select H2:H41, copy, then <b>Paste Special &gt; Values</b> over the same cells.'],
    grids:[gTrim],see:'The formula returns <b>'+ans.sp+'</b>: USR005, USR018 and USR030.',
    slip:'Counting by eye. Trailing spaces are invisible, so only a formula can find them.'},
   {h:'Find and remove the duplicates',why:'Duplicate records inflate your population and make a count wrong. Remove them only after you have noted the count, and say what you removed.',
    do:['First note the count before removing anything: <b>'+ans.n+'</b>.','Click any cell inside the data on Work.','Click <span class="menu">Data &gt; Remove Duplicates</span>. Make sure <b>My data has headers</b> is ticked and <b>all columns</b> are ticked, then OK.','Read the message Excel shows.'],
    grids:[gDup],see:'A message: <b>'+ans.dups+' duplicate values found and removed; '+ans.dist+' unique values remain.</b>',
    slip:'Removing duplicates before cleaning the spaces. "USR005" and "USR005 " look different to Excel, so a true duplicate could be missed. Clean first, then remove duplicates.'},
   {h:'Write down what you did',why:'A cleaning step with no note is an undocumented change. A reviewer must be able to see what changed and why.',
    do:['In an empty cell on Work, type a note such as:','<b>'+ans.dups+' exact duplicate records removed (second copies of USR007 and USR022); '+ans.dist+' distinct users remain.</b>','Add one more line: <b>3 BNAME values trimmed (trailing spaces).</b>'],
    see:'A short log beside your data. The reconciliation is '+ans.n+' - '+ans.dups+' = '+ans.dist+'.'}]},
  {t:'Part 6: Sort and filter without losing rows',short:'6 Sort & filter',steps:[
   {h:'Turn the data into a Table and freeze the header',why:'A Table keeps every row together when you sort, so a sort cannot scramble rows or leave a column behind.',
    do:['Click any cell in the data, then press <b>Ctrl+T</b>.','Tick <b>My table has headers</b> and click OK.','Click <span class="menu">View &gt; Freeze Panes &gt; Freeze Top Row</span>.'],
    see:'The data has banded rows with filter arrows in the header, and the header row stays visible when you scroll.'},
   {h:'Sort by the converted date and recount',why:'Sorting is where rows get lost. The count after the sort must equal the count before it.',
    do:['Click the filter arrow on <b>ERDAT_DATE</b> and choose <b>Sort Oldest to Newest</b>.',{t:'Recount in an empty cell:',f:'=COUNTA(A2:A39)'},'Compare with the count you had before sorting.'],
    grids:[gSort],see:'<b>'+ans.dist+'</b>, unchanged. That proves the sort kept every row.'},
   {h:'Filter LOCKED = X and read the count',why:'Filtering shows you part of the population. Reading the count from the status bar proves how many rows match.',
    do:['Click the filter arrow on <b>LOCKED</b>. Untick <b>Select All</b>, tick <b>X</b>, then OK.','Look at the bottom-left of the Excel window (the status bar).','<b>Clear the filter</b> before you save: click the arrow again and choose <b>Clear Filter</b>.'],
    grids:[gLocked],see:'The status bar shows <b>'+ans.locked+' of '+ans.dist+' records found</b>.',
    slip:'Saving with a filter still on. The next person sees a partial list and does not know it.'},
   {h:'Two more counts you will be asked for',why:'These use the same real dates and the clean list.',
    do:[{t:'Users who never logged on:',f:'=COUNTBLANK(E2:E39)'},{t:'Users created on a weekend (6 = Saturday, 7 = Sunday):',f:'=SUMPRODUCT(--(WEEKDAY(G2:G39,2)>5))'}],
    grids:[gNever,gWeek],see:'<b>'+ans.never+'</b> never logged on and <b>'+ans.wk+'</b> created on a weekend.'}]}
 ],
 questions:Q,
 qintro:'Answer in a sheet named <b>Answers</b> in your own workbook, with the formula or filter next to each answer. Then type each answer here and press Check. If you are stuck, press Show me. You learn most by trying first.',
 done:['Every answer has a formula or a screenshot beside it.','Your control total agrees at the start and, after cleaning, you can explain every difference (40 - 2 = 38).','You can explain, in one sentence, why you work on a copy and never on the original.']
});
})();
