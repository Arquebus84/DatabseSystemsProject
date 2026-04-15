// const table = document.getElementById("tableView");
const patientBT = document.getElementById("patientBT");
const familyBT = document.getElementById("familyBT");
const roomBT = document.getElementById("roomBT");
const paySumBT = document.getElementById("paySumBT");

const facultyBT = document.getElementById('facultyBT');
const assignBT = document.getElementById('assignBT');

const medicationBT = document.getElementById('medicationBT');
const paymentBT = document.getElementById("paymentBT");
const patientMedsBT = document.getElementById("patientMedsBT");

const addBT = document.getElementById('addData');

let currentTable = "";

/* Patient */
patientBT.addEventListener('click', function(e){
    updatePatientTable();
    currentTable = "patient";
});

// Draws the patient table
function updatePatientTable() {
    // Fetch result from patient controller
    fetch('/api/getPatientTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="tableFormat table-bordered">'+
                '<tr><th class="tableFormat">ID</th><th class="tableFormat">First Name</th><th class="tableFormat">Last Name</th>'+
                '<th class="tableFormat">Priority</th><th class="tableFormat">Condition</th><th class="tableFormat">Family</th></tr>';

            // console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat" id="patientTable">${row.ID}</td>` +
                    `<td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>` +
                    `<td class="tableFormat">${row.priority}</td>` +
                    `<td class="tableFormat">${row.conditionDesc}</td>` +
                    `<td class="tableFormat">${row.familyContact}</td></tr>`;
            });

            // Add table closing
            table += '</table>';
            // Insert table into html
            document.getElementById("table").innerHTML = table;

            //Display the insert table and show add button
            let attributes = '<th>First Name</th><th>Last Name</th><th>Priority</th><th>Condition</th><th>Trusted Family</th>'
            let insertion =
                '<table class="insertTable">'+
                '<tr>'+
                '<input class="insert" id="firstName"></input>'+
                '<input class="insert" id="lastName" style="margin-left:5.5%"></input>'+
                '<input class="insert" id="priority" style="margin-left:10.5%"></input>'+
                '<input class="insert" id="condition" style="margin-left:15.5%"></input>'+
                '<select class="insertOption" id="family" style="margin-left:21%"></select>' +
                '</tr>'+
                '</table>';
            //Populate the family selection option
            const dropdown = document.getElementById("family");
            const tableCells = document.querySelectorAll('#familyTable td');
            const dataArray = Array.from(tableCells).map(cell => cell.textContent);
            dataArray.forEach(function(item){
                let option=document.createElement('option');
                option.value=item;
                option.text =item;
                dropdown.appendChild(option);
            });

            document.getElementById("attribute").innerHTML = attributes;
            document.getElementById("newRow").innerHTML = insertion;
            document.getElementById("addData").style.visibility = 'visible';
        });
}

/* Family */
familyBT.addEventListener('click', function(e){
    updateFamilyTable();
    currentTable = "family";
});
function updateFamilyTable(){
    fetch('/api/getFamilyTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="tableFormat table-bordered">'+
                '<tr><th class="tableFormat">ID</th><th class="tableFormat">Last Name</th><th class="tableFormat">Phone Number</th></tr>';

            // console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat" id="familyTable">${row.FamilyID}</td>` +
                    `<td class="tableFormat">${row.FamilyLastName}</td>` +
                    `<td class="tableFormat">${row.PhoneNumber}</td></tr>`;
            });

            // Add table closing
            table += '</table>';
            // Insert table into html
            document.getElementById("table").innerHTML = table;

            //Display the insert table and show add button
            let attributes = '<th>Last Name</th><th>Phone Number</th>'
            let insertion =
                '<table class="insertTable">'+
                '<tr>'+
                '<input class="insert" id="familyLastName"></input>'+
                '<select class="insertOption" id="phoneNumber" style="margin-left:5.5%"></select>' +
                '</tr>'+
                '</table>';

            document.getElementById("attribute").innerHTML = attributes;
            document.getElementById("newRow").innerHTML = insertion;
            document.getElementById("addData").style.visibility = 'visible';
        });
}

/* Room */
roomBT.addEventListener('click', function(e){
    fetch('/api/getRoomTable')
        .then(response => response.json())
        .then(data => {

            let table = '<table class="tableFormat table-bordered"><tr>' +
                '<th>Room Number</th><th>Patient First Name</th><th>Patient Last Name</th>';

            Object.values(data).forEach(row=>{
                table += `<tr><td class="tableFormat">${row.roomNumber}</td>`+
                    `<td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td></tr>`;
            });

            table += '</table>';

            document.getElementById("table").innerHTML = table;

            //Display the insert table and show add button
            document.getElementById("addData").style.visibility = 'visible';
            currentTable = "room";
        });
});

/* Pay Sum */
paySumBT.addEventListener('click', function(e){
    fetch('/api/getPaySumTable')
        .then(response => response.json())
            .then(data =>{
                // Create table header
                let table = '<table class="tableFormat table-bordered"><tr>' +
                    '<th>Net Payment</th><th>Patient Last Name</th>';

                Object.values(data).forEach(row =>{
                    table += `<tr><td class="tableFormat">${row.netPayment}</td>`+
                        `<td class="tableFormat">${row.patientName}</td></tr>`
                });

                table += '</table>';

                document.getElementById("table").innerHTML = table;

                //Display the insert table and don't show add button
                document.getElementById("attribute").innerHTML = "";
                document.getElementById("newRow").innerHTML = "";
                document.getElementById("addData").style.visibility = 'hidden';
            });

    currentTable = "payment";
});

/* Faculty */
facultyBT.addEventListener('click', function(e){
    updateFacultyTable();
});

// Draws the faculty table
function updateFacultyTable(){
    // Fetch result from faculty controller
    fetch('/api/getFacultyTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="tableFormat table-bordered"><tr>' +
                '<th class="tableFormat">ID</th><th class="tableFormat">Last Name</th><th class="tableFormat">Type</th></tr>';

            //console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat">${row.facultyID}</td>` +
                    `<td class="tableFormat">${row.facultyLastName}</td>` +
                    `<td class="tableFormat">${row.facultyType}</td></tr>`;
            });

            // Add table closing
            table += '</table>';

            // Insert table into html
            document.getElementById("table").innerHTML = table;

            //Display the insert table and show add button
            let attributes = '<th>Last Name</th><th>Faculty Type</th>'
            let insertion =
                '<table class="insertTable">'+
                '<tr>'+
                '<input class="insert" id="lastName"></input>'+
                '<select name="facultyType" class="insertOption" id="facultyType" style="margin-left:5.5%">';


            fetch('/api/getFacultyTypes')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertion = insertion + `<option value="${row.facultyTypeID}">${row.facultyType}</option>`;
                    })
                    insertion = insertion +
                        '</select>'+
                        '</tr>'+
                        '</table>';
                    document.getElementById("attribute").innerHTML = attributes;
                    document.getElementById("newRow").innerHTML = insertion;
                    document.getElementById("addData").style.visibility = 'visible';
                    currentTable = "faculty";
                })
        })
}

/* Medications */
medicationBT.addEventListener('click', function(e){
    fetch('/api/getMedicationTable')
        .then(response => response.json())
            .then(data =>{
                // Create table header
                let table = '<table class="tableFormat table-bordered">'+
                    '<tr><th class="tableFormat">Medication</th><th class="tableFormat">Price</th>'+
                    '<th class="tableFormat">Tax</th></tr>';

                // console.log("Data is " + typeof(data));
                // Fill rows by row
                Object.values(data).forEach(row => {
                    table += `<tr><td class="tableFormat">${row.Medication}</td>` +
                        `<td class="tableFormat">${row.Price}</td>` +
                        `<td class="tableFormat">${row.Tax}</td></tr>`;
                });

                // Add table closing
                table += '</table>';
                // Insert table into html
                document.getElementById("table").innerHTML = table;

                //Display the insert table and show add button
                let attributes = '<th>Medication</th><th>Name</th>'
                let insertion = 
                    '<table class="insertTable">'+
                        '<tr>'+
                            '<input class="insert"></input>'+
                            '<select class="insertOption" style="margin-left:5.5%"></select>'+
                        '</tr>'+
                    '</table>';
                document.getElementById("attribute").innerHTML = attributes;
                document.getElementById("newRow").innerHTML = insertion;
                document.getElementById("addData").style.visibility = 'visible';
                currentTable = "medication";
            });
});

/* Payment */
paymentBT.addEventListener('click', function(e){
    fetch('/api/getPaymentTable')
        .then(response => response.json())
            .then(data =>{
                // Create table header
                let table = '<table class="tableFormat table-bordered">'+
                    '<tr><th class="tableFormat">ID</th><th class="tableFormat">Price</th><th class="tableFormat">Tax</th><tr>';

                Object.values(data).forEach(row =>{
                    table += `<tr><td class="tableFormat">${row.paymentID}</td>`+
                        `<td class="tableFormat">${row.price}</td>` +
                        `<td class="tableFormat">${row.tax}</td></tr>`;
                });

                table += '</table>';

                document.getElementById("table").innerHTML = table;

                //Display the insert table and show add button
                let attributes = '<th style="width:5vw">Price</th><th style="width:5vw">Tax</th>'
                let insertion = 
                    '<table class="insertTable">'+
                        '<tr>'+
                            '<input class="insert"></input>'+
                            '<input class="insert" style="margin-left:5.5%"></input>'+
                        '</tr>'+
                    '</table>';
                document.getElementById("attribute").innerHTML = attributes;
                document.getElementById("newRow").innerHTML = insertion;
                document.getElementById("addData").style.visibility = 'visible';
            });
});

/* Patient Meds */
patientMedsBT.addEventListener('click', function(e){
    updatePatientMedsTable();
});

// Draws the patient meds table
function updatePatientMedsTable() {
    fetch('/api/getPatientMedsTable')
        .then(response => response.json())
        .then(data =>{
            // Create table header
            let table = '<table class="tableFormat table-bordered">'+
                '<tr><th class="tableFormat">First Name</th><th class="tableFormat">Last Name</th><th class="tableFormat">Medication</th><tr>';

            Object.values(data).forEach(row =>{
                table += `<tr><td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>`+
                    `<td class="tableFormat">${row.medication}</td></tr>`;
            });

            table += '</table>';

            document.getElementById("table").innerHTML = table;

            //Display the insert table and show add button
            let attributes = '<th style="width:5vw">Patient</th><th style="width:5vw">Medication</th>'

            let insertion =
                '<table class="insertTable">'+
                '<tr>'+
                '<td>' +
                '<select name="patients" class="insertOption" id="patientMedPatients" style="margin-left:5.5% width:100%">';

            // Get patients and fill the patient drop down
            fetch('/api/getPatientTable')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertion = insertion + `<option value="${row.ID}">${row.firstName} ${row.lastName}</option>`;
                    })
                    insertion = insertion +
                        '</select>'+
                        '</td>' +
                        '<td>' +
                        '<select name="medication" class="insertOption" id="patientMedMeds" style="margin-left:5.5%">';

                    // Get medications and fill medication drop down
                    fetch('/api/getMeds')
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(row => {
                                insertion = insertion + `<option value="${row.medicationID}">${row.medicationType}</option>`;
                            })
                            insertion = insertion +
                                '</select>' +
                                '</td>' +
                                '</tr>' +
                                '</table>';

                            document.getElementById("attribute").innerHTML = attributes;
                            document.getElementById("newRow").innerHTML = insertion;
                            document.getElementById("addData").style.visibility = 'visible';
                            currentTable = "patientMeds";
                        })
                })
        });
}

/*Add Button */
addBT.addEventListener('click', function(e){
    if (currentTable === "patient") {
        addPatient();
    } else if (currentTable === "faculty") {
        addFaculty();
    } else if (currentTable === "patientMeds") {
        addPatientMeds();
    } else if (currentTable === "family"){
        
    }
});

// Below are add button helpers
function addPatient() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let patientPriority = document.getElementById("priority").value;
    let conditionDesc = document.getElementById("condition").value;
    let familyID = document.getElementById("family").value;

    // add patient
    fetch('/api/setPatientTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            firstName: firstName,
            lastName: lastName,
            patientPriority: patientPriority,
            conditionDesc: conditionDesc,
            familyID: familyID
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            updatePatientTable(); // Update the patient table
        })
        .catch((error) => console.error('Error:', error));
}

function addPhoneNumber(){

}
function addFamily(){
    
}
function addRoom(){
    
}

function addFaculty() {
    let lastName = document.getElementById("lastName").value;
    let facultyType = document.getElementById("facultyType").value;

    // add faculty
    fetch('/api/setFacultyTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            facultyLastName: lastName,
            facultyTypeID: facultyType
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            updateFacultyTable(); // Update the faculty table
        })
        .catch((error) => console.error('Error:', error));
}
function addAssignRoom(){

}

function addPatientMeds() {
    let patientID = document.getElementById("patientMedPatients").value;
    let medicationID = document.getElementById("patientMedMeds").value;

    // add faculty
    fetch('/api/setPatientMedsTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            patientID: parseInt(patientID),
            medicationID: parseInt(medicationID)
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            updatePatientMedsTable(); // Update the patient meds table
        })
        .catch((error) => console.error('Error:', error));

}
function addMedications(){
    
}
function addPaymentCost(){
    
}
