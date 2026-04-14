


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


patientBT.addEventListener('click', function(e){
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
                table += `<tr><td class="tableFormat">${row.ID}</td>` +
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
                        '<select class="insertOption" id="family" style="margin-left:21%"></select>'+
                    '</tr>'+
                '</table>';
            document.getElementById("attribute").innerHTML = attributes;
            document.getElementById("newRow").innerHTML = insertion;
            document.getElementById("addData").style.visibility = 'visible';
        });
});
familyBT.addEventListener('click', function(e){
    // document.getElementById("tableView").innerText = "Family Table";//tableValues.getFacultyTable();
    document.getElementById("addData").style.visibility = 'visible';
});
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
        });
});

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
});

/*Faculty*/
facultyBT.addEventListener('click', function(e){
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
                        '<input class="insert"></input>'+
                        '<select class="insertOption" style="margin-left:5.5%"></select>'+
                    '</tr>'+
                '</table>';
            document.getElementById("attribute").innerHTML = attributes;
            document.getElementById("newRow").innerHTML = insertion;
            document.getElementById("addData").style.visibility = 'visible';
        })
});

/*Medications*/
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
                let attributes = '<th>Medication</th><th>Last Name</th>'
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
            });
});
paymentBT.addEventListener('click', function(e){
    // document.getElementById("tableView").innerText = "Payment Table";//tableValues.getFacultyTable();
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
patientMedsBT.addEventListener('click', function(e){
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
                            '<select class="insertOption"></select>'+
                            '<select class="insertOption" style="margin-left:5.5%"></select>'+
                        '</tr>'+
                    '</table>';
                document.getElementById("attribute").innerHTML = attributes;
                document.getElementById("newRow").innerHTML = insertion;
                document.getElementById("addData").style.visibility = 'visible';
            });
});

/*Add Button */
addBT.addEventListener('click', function(e){
    //add patient
    fetch('api/setPatientTable')
    .then(response => response.json)
        .then(data =>{

        });
});
