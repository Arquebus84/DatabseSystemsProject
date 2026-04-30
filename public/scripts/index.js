// const table = document.getElementById("tableView");
const patientBT = document.getElementById("patientBT");
const familyBT = document.getElementById("familyBT");
const roomBT = document.getElementById("roomBT");
const paySumBT = document.getElementById("paySumBT");

const facultyBT = document.getElementById('facultyBT');
const assignBT = document.getElementById('assignBT');

const medicationBT = document.getElementById('medicationBT');
const patientMedsBT = document.getElementById("patientMedsBT");

const addBT = document.getElementById('addData');
const updateBT = document.getElementById('submitButton');
const updateOverlay = document.getElementById('popupOverlay');

let currentTable = "";

// Open updater utility
function openUpdater(id) {
    updateOverlay.style.display = 'block';
    document.getElementById('updateID').value = id;
    document.getElementById('infoInput').innerHTML = document.getElementById('insertContainer').innerHTML;
    document.getElementById('insertContainer').innerHTML = '';
}

// Closes the updater utility
function closeUpdater() {
    updateOverlay.style.display = 'none';
    document.getElementById('insertContainer').innerHTML = document.getElementById('infoInput').innerHTML;
    document.getElementById('infoInput').innerHTML = '';
}

// Close updater if user clicks outside of window
window.addEventListener('click', (event) => {
    if (event.target === updateOverlay) {
        closeUpdater();
    }
});

/* Patient */
patientBT.addEventListener('click', function(e){
    updatePatientTable();
});

// Draws the patient table
function updatePatientTable() {
    // Fetch result from patient controller
    fetch('/api/getPatientTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '';

            // console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table +=
                    `<td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>` +
                    `<td class="tableFormat">${row.priority}</td>` +
                    `<td class="tableFormat">${row.conditionDesc}</td>` +
                    `<td class="tableFormat">${row.familyContact}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="patientDelete${row.ID}" onclick="patientDelete(${row.ID})">Delete</button>` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="openUpdater${row.ID}" onclick="openUpdater(${row.ID})">Update</button>` +
                    `</td></tr>`;
            });

            // Insert table into html
            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">'+
                    '<tr>' +
                        '<th class="tableFormat">First Name</th><th class="tableFormat">Last Name</th><th class="tableFormat">Priority</th><th class="tableFormat">Condition</th><th class="tableFormat">Family</th>' +
                    '</tr>' +
                    table +
                '</table>'
            ;

            //Display the insert table and show add button
            let insertion = '';

                fetch('/api/getFamilies')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(row => {
                            insertion = insertion + `<option value="${row.familyID}">${row.familyName}</option>`;
                        })

                        document.getElementById("insertContainer").innerHTML =

                            '<table class="insertTable">'+
                                '<tr>' +
                                    '<th>First Name</th><th>Last Name</th><th>Priority</th><th>Condition</th><th>Trusted Family</th>' +
                                '</tr>' +
                                '<tr>'+
                                    '<td><input class="insert" id="firstName"></input></td>'+
                                    '<td><input class="insert" id="lastName"></input></td>'+
                                    '<td><input class="insert" id="priority"></input></td>'+
                                    '<td><input class="insert" id="condition"></input></td>'+
                                    '<td><select class="insertOption" id="family">'+
                                        insertion +
                                    '</select></td>' +
                                '</tr>'+
                            '</table>'
                        ;
                        document.getElementById("addData").style.visibility = 'visible';

                        currentTable = "patient";
                    });
        });
}

/* Family */
familyBT.addEventListener('click', function(e){
    updateFamilyTable();
});

// Draws the family table
function updateFamilyTable() {
    // Fetch result from family controller
    fetch('/api/getFamilyTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '';

            // Fill rows by row
            Object.values(data).forEach(row => {
                table +=
                    `<tr><td class="tableFormat">${row.familyName}</td>` +
                    `<td class="tableFormat">${row.phoneNumber}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="familyDelete${row.ID}" onclick="familyDelete(${row.ID})">Delete</button>` +
                        `<button class="systemButton btn btn-primary mt-2" id="openUpdater${row.ID}" onclick="openUpdater('${row.ID}, ${row.phoneID}')">Update</button>` +
                    `</td></tr>`
            });

            // Insert table into HTML
            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">'+
                    '<tr>' +
                        '<th class="tableFormat">Family Name</th><th class="tableFormat">Phone Number</th>' +
                    '</tr>' +
                    table +
                '</table>'
            ;

            //Display the insert table and show add button
            document.getElementById("insertContainer").innerHTML =
                '<table class="insertTable">'+
                    '<tr>' +
                        '<th>Family Name</th><th>Phone Number</th>' +
                    '</tr>' +
                    '<tr>'+
                        '<td><input class="insert" id="familyName"></input></td>'+
                        '<td><input class="insert" id="phoneNumber"></input></td>' +
                    '</tr>' +
                '</table>'
            ;
            document.getElementById("addData").style.visibility = 'visible';

            currentTable = "family";
        });
}

/* Room */
roomBT.addEventListener('click', function(e){
    updateRoomTable();
});

// Draws the room table
function updateRoomTable() {
    fetch('/api/getRoomTable')
        .then(response => response.json())
        .then(data => {

            let table = '';

            Object.values(data).forEach(row=>{
                table += `<tr><td class="tableFormat">${row.roomNumber}</td>`+
                    `<td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="roomDelete${row.ID}" onclick="roomDelete(${row.ID})">Delete</button>` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="openUpdater${row.ID}" onclick="openUpdater(${row.ID})">Update</button>` +
                    `</td></tr>`;
            });

            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">' +
                    '<tr>' +
                        '<th>Room Number</th><th>Patient First Name</th><th>Patient Last Name</th>' +
                    '</tr>' +
                    table +
                '</table>'
            ;

            //Display the insert table and show add button
            let insertion = '';

            fetch('/api/getPatientTable')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertion = insertion + `<option value="${row.ID}">${row.firstName} ${row.lastName}</option>`;
                    })

                    document.getElementById("insertContainer").innerHTML =
                        '<table class="insertTable">'+
                            '<tr>' +
                                '<th>Room</th><th>Name</th>' +
                            '</tr>' +
                            '<tr>'+
                                '<td><input class="insert" id="roomNum"></input></td>'+
                                '<td><select class="insertOption" id="patientID">'+
                                insertion +
                                '</select></td>' +
                            '</tr>' +
                        '</table>'
                    ;
                    document.getElementById("addData").style.visibility = 'visible';

                    currentTable = "room";
                });
        });
}

/* Pay Sum */
paySumBT.addEventListener('click', function(e){
    updatePaySumTable();
});

// Draws the payment summary table
function updatePaySumTable() {
    fetch('/api/getPaySumTable')
        .then(response => response.json())
        .then(data =>{
            // Create table header
            let table = '';

            Object.values(data).forEach(row =>{
                table += `<tr><td class="tableFormat">${row.netPayment}</td>`+
                    `<td class="tableFormat">${row.patientName}</td></tr>`
            });

            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">' +
                    '<tr>' +
                        '<th>Net Payment</th><th>Patient Last Name</th>' +
                    '</tr>' +
                    table +
                '</table>'
            ;

            //Display the insert table and don't show add button
            document.getElementById("insertContainer").innerHTML = "";
            document.getElementById("addData").style.visibility = 'hidden';
        });

    currentTable = "payment";
}

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
            let table = '';

            //console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table +=
                    `<tr><td class="tableFormat">${row.facultyLastName}</td>` +
                    `<td class="tableFormat">${row.facultyType}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="facultyDelete${row.facultyID}" onclick="facultyDelete(${row.facultyID})">Delete</button>` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="openUpdater${row.facultyID}" onclick="openUpdater(${row.facultyID})">Update</button>` +
                    `</td></tr>`;
            });

            // Insert table into html
            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">' +
                    '<tr>' +
                        '<th class="tableFormat">Last Name</th><th class="tableFormat">Type</th>' +
                    '</tr>'
                    + table +
                '</table>';

            //Display the insert table and show add button
            let insertion = '';

            fetch('/api/getFacultyTypes')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertion = insertion + `<option value="${row.facultyTypeID}">${row.facultyType}</option>`;
                    })

                    document.getElementById("insertContainer").innerHTML =
                        '<table class="insertTable">'+
                            '<tr><th>Last Name</th><th>Faculty Type</th></tr>'+
                            '<tr>'+
                                '<td><input class="insert" id="lastName"></input></td>'+
                                '<td>' +
                                    '<select name="facultyType" class="insertOption" id="facultyType" style="margin-left:5.5%">' +
                                        insertion +
                                    '</select>' +
                                '</td>'+
                            '</tr>'+
                        '</table>'
                    ;
                    document.getElementById("addData").style.visibility = 'visible';

                    currentTable = "faculty";
                })
        })
}

/* Facult assignment */
assignBT.addEventListener('click', function(e){
    updateAssignmentTable();
})

// Draws the assignment table
function updateAssignmentTable(){
    fetch('/api/getAssignmentTable')
        .then(response => response.json())
        .then(data =>{
            // Create table header
            let table = '';

            Object.values(data).forEach(row =>{
                table += `<tr><td class="tableFormat">${row.roomNum}</td>` +
                    `<td class="tableFormat">${row.firstName} ${row.lastName}</td>`+
                    `<td class="tableFormat">${row.facultyName}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="assignmentDelete${row.patientRoomID}${row.facultyID}" onclick="assignmentDelete(${row.patientRoomID}, ${row.facultyID})">Delete</button>` +
                    `</td></tr>`;
            });

            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">' +
                    '<tr><th>Room Num</th><th>Patient Name</th><th>Faculty Assigned</th></tr>' +
                    table +
                '</table>'
            ;


            // Display the insert table and show add button
            let insertionPatient = '';
            let insertionFaculty = '';

            // Get patients and fill the patient drop down
            fetch('/api/getPatientTable')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertionPatient = insertionPatient + `<option value="${row.ID}">${row.firstName} ${row.lastName}</option>`;
                    })

                    // Get faculty and fill faculty drop down
                    fetch('/api/getFacultyTable')
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(row => {
                                insertionFaculty = insertionFaculty + `<option value="${row.facultyID}">${row.facultyLastName}</option>`;
                            })

                            document.getElementById("insertContainer").innerHTML =
                                '<table class="insertTable">'+
                                    '<tr><th>Patient</th><th>Room</th></tr>' +
                                    '<tr>' +
                                        '<td><select name="patients" class="insertOption" id="assignmentPatients">' +
                                                insertionPatient +
                                            '</select>'+
                                        '</td>' +
                                        '<td>' +
                                            '<select name="faculty" class="insertOption" id="assignmentFaculty">' +
                                                insertionFaculty +
                                            '</select>' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>'
                            ;
                            document.getElementById("addData").style.visibility = 'visible';

                            currentTable = "assignment";
                        })
                })
        });
}

/* Medications */
medicationBT.addEventListener('click', function(e){
    updateMedicationTable();
});

// Draws the medication table
function updateMedicationTable() {
    fetch('/api/getMedicationTable')
        .then(response => response.json())
        .then(data =>{
            // Create table header
            let table = '';

            // console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat">${row.Medication}</td>` +
                    `<td class="tableFormat">${row.Price}</td>` +
                    `<td class="tableFormat">${row.Tax}</td>` +
                    `<td class="tableFormat">` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="medDelete${row.ID}" onclick="medDelete(${row.ID})">Delete</button>` +
                        `<button class="systemButton btn btn btn-primary mt-2" id="openUpdater${row.ID}" onclick="openUpdater('${row.ID}, ${row.payID}')" style="font-family: Arial">Update</button>` +
                    `</td></tr>`;
            });

            // Insert table into html
            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">'+
                    '<tr><th class="tableFormat">Medication</th><th class="tableFormat">Price</th><th class="tableFormat">Tax</th></tr>' +
                    table +
                '</table>';

            //Display the insert table and show add button
            document.getElementById("insertContainer").innerHTML =
                '<table class="insertTable">'+
                    '<tr>'+
                        '<th>Medication</th><th>Price</th><th>Tax</th>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><input class="insert" id="medicationName"></input></td>' +
                        '<td><input class="insert" id="medicationPrice"></input></td>' +
                        '<td><input class="insert" id="medicationTax"></input></td>' +
                    '</tr>'+
                '</table>';
            document.getElementById("addData").style.visibility = 'visible';

            currentTable = "medication";
        });
}

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
            let table = '';

            Object.values(data).forEach(row =>{
                table += `<tr><td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>`+
                    `<td class="tableFormat">${row.medication}</td>` +
                    `<td class="tableFormat"><button class="systemButton btn btn btn-primary mt-2" id="patientMedDelete${row.patientID}${row.medicationID}" onclick="patientMedDelete(${row.patientID}, ${row.medicationID})">Delete</button></td></tr>`;
            });

            document.getElementById("table").innerHTML =
                '<table class="tableFormat table-bordered">'+
                    '<tr><th class="tableFormat">First Name</th><th class="tableFormat">Last Name</th><th class="tableFormat">Medication</th><tr>' +
                    table +
                '</table>'
            ;

            //Display the insert table and show add button
            let attributes = '<th>Patient</th><th>Medication</th>'

            let insertionPatients = '';
            let insertionMedication = '';

            // Get patients and fill the patient drop down
            fetch('/api/getPatientTable')
                .then(response => response.json())
                .then(data => {
                    data.forEach(row => {
                        insertionPatients = insertionPatients + `<option value="${row.ID}">${row.firstName} ${row.lastName}</option>`;
                    })

                    // Get medications and fill medication drop down
                    fetch('/api/getMeds')
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(row => {
                                insertionMedication = insertionMedication + `<option value="${row.medicationID}">${row.medicationType}</option>`;
                            })

                            document.getElementById("insertContainer").innerHTML =
                                '<table class="insertTable">'+
                                    '<tr><th>Patient</th><th>Medication</th></tr><tr>'+
                                        '<td>' +
                                            '<select name="patients" class="insertOption" id="patientMedPatients">' +
                                            insertionPatients +
                                            '</select>'+
                                            '</td>' +
                                            '<td>' +
                                            '<select name="medication" class="insertOption" id="patientMedMeds">' +
                                            insertionMedication +
                                            '</select>' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>'
                            ;
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
    } else if (currentTable === "medication") {
        addMedication();
    } else if (currentTable === "family") {
        addFamily();
    } else if (currentTable === "room") {
        addRoom();
    } else if (currentTable === "assignment") {
        addAssignment();
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
function addPatientMeds() {
    let patientID = document.getElementById("patientMedPatients").value;
    let medicationID = document.getElementById("patientMedMeds").value;

    // add patient/med
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
function addMedication() {
    let medication = document.getElementById("medicationName").value;
    let price = document.getElementById("medicationPrice").value;
    let tax = document.getElementById("medicationTax").value;

    // add medication
    fetch('/api/setMedicationTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            medicationName: medication,
            medicationPrice: price,
            medicationTax: tax
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            updateMedicationTable(); // Update the med table
        })
        .catch((error) => console.error('Error:', error));
}
function addFamily() {
    let familyName = document.getElementById("familyName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    // add family
    fetch('/api/setFamilyTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            familyName: familyName,
            phoneNumber: phoneNumber,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            updateFamilyTable(); // Update the family table
        })
        .catch((error) => console.error('Error:', error));
}
function addRoom() {
    let roomNum = document.getElementById("roomNum").value;
    let patientID = document.getElementById("patientID").value;

    // add family
    fetch('/api/setRoomTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            roomNum: roomNum,
            patientID: patientID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("", data.message);
            updateRoomTable(); // Update the room table
        })
        .catch((error) => console.error('Error:', error));
}
function addAssignment() {
    let patientID = document.getElementById("assignmentPatients").value;
    let facultyID = document.getElementById("assignmentFaculty").value;

    // add family
    fetch('/api/setAssignmentTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            patientID: patientID,
            facultyID: facultyID,
            floorNumber: 1
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("", data.message);
            updateAssignmentTable(); // Update the assignment table
        })
        .catch((error) => console.error('Error:', error));
}

// Deletion Handlers
function patientDelete(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete patient
        fetch(`/api/deletePatientTable/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updatePatientTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function familyDelete(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete family
        fetch(`/api/deleteFamilyTable/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updateFamilyTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function roomDelete(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete room
        fetch(`/api/deleteRoomTable/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updateRoomTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function facultyDelete(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete faculty
        fetch(`/api/deleteFacultyTable/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updateFacultyTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function assignmentDelete(patientRoomID, facultyID) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete assignment
        fetch(`/api/deleteAssignmentTable/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // Fill out JSON request for controller
                patientRoomID: patientRoomID,
                facultyID: facultyID,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updateAssignmentTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function patientMedDelete(patientID, medicationID) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete patient med relations
        fetch(`/api/deletePatientMedTable/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // Fill out JSON request for controller
                patientID: patientID,
                medicationID: medicationID,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updatePatientMedsTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

function medDelete(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // delete medication
        fetch(`/api/deleteMedTable/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("", data.message);
                updateMedicationTable(); // Update the table
            })
            .catch((error) => console.error('Error:', error));
    }
}

/* Update Button */
updateBT.addEventListener('click', function(e){
    if (currentTable === "patient") {
        updatePatient();
    } else if (currentTable === "faculty") {
        updateFaculty();
    } else if (currentTable === "medication") {
        updateMedication();
    } else if (currentTable === "family") {
        updateFamily();
    } else if (currentTable === "room") {
        updateRoom();
    }
});

// Update helpers
function updatePatient() {
    let updateID = document.getElementById('updateID').value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let patientPriority = document.getElementById("priority").value;
    let conditionDesc = document.getElementById("condition").value;
    let familyID = document.getElementById("family").value;

    // update patient
    fetch('/api/updatePatientTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            patientID: updateID,
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
            closeUpdater();
            updatePatientTable();
        })
        .catch((error) => console.error('Error:', error));
}

function updateFaculty() {
    let updateID = document.getElementById('updateID').value;
    let lastName = document.getElementById("lastName").value;
    let facultyType = document.getElementById("facultyType").value;

    // update faculty
    fetch('/api/updateFacultyTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            facultyID: updateID,
            facultyLastName: lastName,
            facultyTypeID: facultyType
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            closeUpdater();
            updateFacultyTable();
        })
        .catch((error) => console.error('Error:', error));
}

function updateMedication() {
    let updateID = document.getElementById('updateID').value.split(', ');
    let medication = document.getElementById("medicationName").value;
    let price = document.getElementById("medicationPrice").value;
    let tax = document.getElementById("medicationTax").value;

    // add medication
    fetch('/api/updateMedicationTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            medicationID: updateID[0],
            paymentID : updateID[1],
            medicationName: medication,
            medicationPrice: price,
            medicationTax: tax
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            closeUpdater();
            updateMedicationTable(); // Update the med table
        })
        .catch((error) => console.error('Error:', error));
}

function updateFamily() {
    let updateID = document.getElementById('updateID').value.split(', ');
    let familyName = document.getElementById("familyName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    // add medication
    fetch('/api/updateFamilyTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            familyID: updateID[0],
            phoneID : updateID[1],
            familyName: familyName,
            phoneNumber: phoneNumber
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data.message);
            closeUpdater();
            updateFamilyTable(); // Update the med table
        })
        .catch((error) => console.error('Error:', error));
}

function updateRoom() {
    let updateID = document.getElementById('updateID').value;
    let roomNum = document.getElementById("roomNum").value;
    let patientID = document.getElementById("patientID").value;

    // add family
    fetch('/api/updateRoomTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Fill out JSON request for controller
            roomID: updateID,
            roomNum: roomNum,
            patientID: patientID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("", data.message);
            closeUpdater();
            updateRoomTable(); // Update the room table
        })
        .catch((error) => console.error('Error:', error));
}