const fmt = n => new Intl.NumberFormat("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const fmtShort = n => new Intl.NumberFormat("id-ID",{notation:"compact",maximumFractionDigits:2}).format(n);
const labels = historicalData.map(d=>d.year);
const baseline = historicalData.map((d,i)=>historicalData.slice(0,i+1).reduce((s,x)=>s+x.loss,0));
const makeScenario = rate => historicalData.map((d,i)=>historicalData.slice(0,i+1).reduce((s,x)=>s+x.loss*(1-rate/100),0));
const s10=makeScenario(10), s20=makeScenario(20);
const finalBase=baseline.at(-1);
const chartDefaults={responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},plugins:{legend:{labels:{usePointStyle:true,boxWidth:7,font:{family:"DM Sans",size:10},color:"#718078"}},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${fmt(c.raw)} ha`}}},scales:{x:{grid:{display:false},ticks:{color:"#89968e",font:{size:9},maxTicksLimit:12}},y:{grid:{color:"#edf0ed"},ticks:{color:"#89968e",font:{size:9},callback:v=>fmtShort(v)}}}};
function lineChart(id,datasets){const el=document.getElementById(id);if(!el)return;return new Chart(el,{type:"line",data:{labels,datasets:datasets.map(d=>({ ...d,fill:false,tension:.28,pointRadius:0,pointHoverRadius:4,borderWidth:2}))},options:chartDefaults});}
const green="#397653",gold="#d2a45a",blue="#7894b2",gray="#aab5ad";
function accum(rate){return makeScenario(rate).at(-1)}
function renderTable(){document.getElementById("dataTable").innerHTML=historicalData.map(d=>`<tr><td>${d.year}</td><td>${fmt(d.loss)}</td></tr>`).join("");document.getElementById("tableCount").textContent=`${historicalData.length} observasi`;}
function renderComparison(){document.getElementById("compareBase").textContent=fmt(finalBase);document.getElementById("compare10").textContent=fmt(accum(10));document.getElementById("compare20").textContent=fmt(accum(20));document.getElementById("comparisonTable").innerHTML=[["Baseline",finalBase],["Pengurangan 10%",accum(10)],["Pengurangan 20%",accum(20)]].map(([name,val])=>`<tr><td>${name}</td><td>${fmt(val)}</td><td>${fmt(finalBase-val)}</td></tr>`).join("");}
let simChart;
function updateSimulation(rate){document.getElementById("rangeValue").textContent=rate+"%";document.getElementById("simPercent").textContent=rate+"%";const result=accum(rate),diff=finalBase-result;document.getElementById("simResult").textContent=fmt(result);document.getElementById("simBaseline").textContent=fmt(finalBase);document.getElementById("simDifference").textContent=fmt(diff)+" ha";if(simChart)simChart.destroy();simChart=lineChart("simulationChart",[{label:"Baseline",data:baseline,borderColor:gray},{label:`Pengurangan ${rate}%`,data:makeScenario(rate),borderColor:green}]);document.querySelectorAll(".preset").forEach(b=>b.classList.toggle("selected",Number(b.dataset.value)===rate));}
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${name}`));document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===name));const titles={dashboard:"Dashboard",data:"Data Historis",simulator:"Simulasi",comparison:"Perbandingan Skenario",model:"Tentang Model"};document.getElementById("pageTitle").textContent=titles[name];document.getElementById("sidebar").classList.remove("open");setTimeout(()=>Object.values(Chart.instances||{}).forEach(c=>c.resize()),50);}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("reductionRange").addEventListener("input",e=>updateSimulation(Number(e.target.value)));
document.querySelectorAll(".preset").forEach(b=>b.addEventListener("click",()=>{const v=Number(b.dataset.value);document.getElementById("reductionRange").value=v;updateSimulation(v);}));
document.getElementById("runSimulation").addEventListener("click",()=>updateSimulation(Number(document.getElementById("reductionRange").value)));
document.getElementById("downloadData").addEventListener("click",()=>{const csv="Year,Tree_Cover_Loss_Hectares\n"+historicalData.map(d=>`${d.year},${d.loss}`).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="indonesia_tree_cover_loss_2001_2024.csv";a.click();URL.revokeObjectURL(a.href);});
document.getElementById("statTotal").textContent=fmt(finalBase);
document.getElementById("statAverage").textContent=fmt(finalBase/historicalData.length);
const maxItem=historicalData.reduce((a,b)=>a.loss>b.loss?a:b);
document.getElementById("statMax").textContent=fmt(maxItem.loss);document.getElementById("statMaxYear").textContent=`Tahun ${maxItem.year}`;
renderTable();renderComparison();
lineChart("historicalChart",[{label:"Kehilangan tahunan",data:historicalData.map(d=>d.loss),borderColor:green,backgroundColor:"rgba(57,118,83,.08)",fill:true}]);
lineChart("dataChart",[{label:"Kehilangan tahunan",data:historicalData.map(d=>d.loss),borderColor:green,backgroundColor:"rgba(57,118,83,.08)",fill:true}]);
lineChart("comparisonChart",[{label:"Baseline",data:baseline,borderColor:gray},{label:"Pengurangan 10%",data:s10,borderColor:gold},{label:"Pengurangan 20%",data:s20,borderColor:blue}]);
updateSimulation(10);
