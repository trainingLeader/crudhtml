let myHeader = new Headers({ "Content-Type": "application/json; charset:utf8" });
let myform = document.querySelector("#frmDataCountry");
const dropdown = document.getElementById("miDropdown");

let ciudades =[
    { id: 1, nombre: "Bogotá" },
    { id: 2, nombre: "Medellín" },
    { id: 3, nombre: "Cali" },
    { id: 4, nombre: "Barranquilla" },
    { id: 5, nombre: "Cartagena" }
    // Otros objetos representando más ciudades
];
let ciudad ={
    name_country : 'Colombia'
}
document.addEventListener('DOMContentLoaded', (e) => {
    let myFrm = new FormData();
    Object.entries(ciudad).forEach(([key, value]) => myFrm.append(key, value));
    myFrm.forEach((value, key) => myform.elements[key].value=value);
    llenarCiudades();
    crearCheckboxes();
});
function VerSeleccionado(){
    const checkboxes = myform.querySelectorAll('input[type="checkbox"]:checked');
    console.log(checkboxes)
    let seleccionados = Array.from(checkboxes).map(checkbox => checkbox.value);
    console.log("Checkboxes seleccionados: ", seleccionados);    
}
function llenarCiudades(){
    ciudades.forEach(ciudad => {
        const opcion = new Option(ciudad.nombre, ciudad.id);
        dropdown.add(opcion);
      }); 
}

myform.addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    postData(data).then(r => {
        document.querySelector("pre").innerHTML = r;
    });
})
const postData = async (data) => {
    // let config = {
    //     method: "POST",
    //     headers: myHeader,
    //     body: JSON.stringify(data)
    // };
    // let res = await (await fetch("controllers/Country/insert_data.php", config)).json();
    return JSON.stringify(data);
}
function crearCheckboxes() {
    let checkboxGroup = document.getElementById("ciudadesCheckboxGroup");
  
    ciudades.forEach(ciudad => {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "ciudad";
      checkbox.value = ciudad.id;
      checkbox.id = "ciudad" + ciudad.id;
  
      var label = document.createElement("label");
      label.htmlFor = "ciudad" + ciudad.id;
      label.appendChild(document.createTextNode(ciudad.nombre));
  
      checkboxGroup.appendChild(checkbox);
      checkboxGroup.appendChild(label);
      checkboxGroup.appendChild(document.createElement("br"));
    });
  }