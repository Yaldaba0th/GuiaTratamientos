function tableCreate(gamet) {
  let rownames=["Patología","Medicamentos","Observaciones","Acciones"]
  let rowfields=["Patología","Medicamentos","Observaciones","Acciones"]
  let rows=gamet.length;
  const body = document.body,
        tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.border = '1px solid rgb(6, 182, 44)';
  
  //headers
  const tr = tbl.insertRow();
  for (let j = 0; j < 3; j++){
    const td = tr.insertCell(j);
    td.appendChild(document.createTextNode([rownames[j]]));
    td.style.border = '1px solid rgb(6, 182, 44)';
    td.style.color='rgb(6, 182, 44)';
    td.style.fontSize='15px';
    td.style.fontWeight='bold';
    if (j===0){
      td.style.width = '10%';
    }
    
    else{
      td.style.width = '45%';
    }
  
  }
  
  for (let i = 0; i < rows; i++) {
    const tr = tbl.insertRow();   
    for (let j = 0; j < 3; j++){
      const td = tr.insertCell(j);
      td.appendChild(document.createTextNode(gamet[i][rowfields[j]]));
      td.style.border = '1px solid rgb(6, 182, 44)';
      td.style.color='rgb(6, 182, 44)';
      td.style.fontSize='15px';
    }
  }
  body.appendChild(tbl);
  body.appendChild(document.createElement('p'));

}

let CSV;
let CSVtext;


let enflist;
async function makeCSV() {
  try {
    const response = await fetch('./tabla/TABLACSV.csv');
    const data = await response.text();
    //console.log(data);
    const CSV = $.csv.toObjects(data);
    enflist = CSV;
    //console.log(CSV);
  } catch (err) {
    console.error(err);
  }

}

makeCSV();

const f = document.getElementById('form');
const q = document.getElementById('query');

function submitted(event) {
  //console.log("hola");
  //console.log(enflist);
  event.preventDefault();
  //Acciones
  //Medicamentos
  //Observaciones
  //Patología

  var tables= document.getElementsByTagName('table');
  while (tables.length>0){
    tables[0].parentNode.removeChild(tables[0]);
  }
  const text=q.value;
  let results=[];
  for (var i = 0; i < enflist.length; i++){
    let name=enflist[i]["Patología"].toLowerCase();
    if (name.includes(text.toLowerCase())){
      results.push(enflist[i]);
    }
  }
  //console.log(results);
  tableCreate(results);
}

f.addEventListener('submit', submitted);
