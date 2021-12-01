$('html, body').animate({
    scrollTop: 0
}, 'fast');

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var preloader = document.getElementById("loading");

function myFunction() {
    var today = new Date();
    calculate_leaves = Object.keys(daily_leaves);
    for (i = 0; i < calculate_leaves.length; i++) {
        id = calculate_leaves[i];
        if (daily_leaves[id] == null || daily_leaves[id] == "null") {
            document.getElementById("leave" + id).innerHTML = 0;
        } else {
            document.getElementById("leave" + id).innerHTML = daily_leaves[id].split(mon[today.getMonth()]).length - 1;
        }
    }
    preloader.style.display = 'none';
};

document.addEventListener("keydown", e => {
    if (e.altKey && e.key === 'q') {
        logOut()
    }
})

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        closer();
    }
})

blocks = {
    "show_adding": 0,
    "show_search": 0
}
blocks_heights = {
    "show_adding": 0,
    "show_search": 0
}
blocks_txt = {
    "show_adding": "Add Employee",
    "show_search": "Search Employee"
}

for (key in blocks_heights) {
    blocks_heights[key] = document.getElementById(key).offsetHeight;
}

function closer() {
    document.getElementById("fa-times-circle").style.display = "none";
    document.getElementById("typer").innerText = "Allah Is Great!";
    for (key in blocks) {
        document.getElementById(key).style.height = "0px";
        blocks[key] = 0;
    }
    document.querySelector('body').scrollIntoView();
    close_sidebar();
}

function opener(id) {
    if (blocks[id] == 1) {
        closer();
    } else {
        closer();
        document.getElementById("typer").innerText = blocks_txt[id];
        document.getElementById(id).style.height = `${blocks_heights[id]}px`;
        blocks[id] = 1;
        document.getElementById("fa-times-circle").style.display = "block";
        document.getElementById("typer").scrollIntoView();
    }
    close_sidebar();
}
closer();


function open_report() {
    document.getElementById("report_issue").style.display = "block";
    setTimeout(() => {
        document.getElementById("report_issue").style.opacity = "1";
    }, 1);
    document.querySelector("body").style.overflow = "hidden";
}


function close_report() {
    document.getElementById("report_issue").style.opacity = "0"
    setTimeout(() => {
        document.getElementById("report_issue").style.display = "none";
    }, 900);
    document.querySelector("body").style.overflow = "auto";
}


/* Sidebar Opening and closing Script */

$(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if (
        $(this)
        .parent()
        .hasClass("active")
    ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .parent()
            .removeClass("active");
    } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
        $(this)
            .parent()
            .addClass("active");
    }
});
/* Auto click for Closing Sidebar */
$(".page-wrapper").removeClass("toggled").click();

/* Auto click for Closing Sidebar */

$("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
});

$("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
});

function close_sidebar() {
    $(".page-wrapper").removeClass("toggled");
}

function haa() {
    document.getElementById("taking_image").click();
}


// features not available right now

function features() {
    var ring = document.getElementById("feature");
    ring.autoplay = true;
    ring.load();
    swal(
        'Version 1.0.0',
        'This Feature Will Be Available In Next Version !',
        'info'
    )
}

function logOut() {
    swal({
        title: 'Logout',
        text: "Are You Sure ?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Log Out',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            fetch('/emp/logout/')
                .then(function (response) {
                    return response.json();
                }).then(function (received) {
                    if (received.x) {
                        window.location.href = "/acc"
                    } else {
                        var ring = document.getElementById("eror");
                        ring.autoplay = true;
                        ring.load();
                        swal(
                            'Sorry!',
                            'Server Error! Please Try Later!',
                            'error'
                        );
                    }
                })
        },
        allowOutsideClick: true
    })
}


mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/// get today date

function today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = mon[today.getMonth()]
    var yyyy = today.getFullYear();

    return (dd + '/' + mm + '/' + yyyy);
}

function absent_month() {
    var today = new Date();
    var mm = mon[today.getMonth()]
    var yyyy = today.getFullYear();

    return (mm + '/' + yyyy);
}

function absent_day() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = mon[today.getMonth()];

    return (dd + '/' + mm);
}

function cal_leaves(id) {
    var today = new Date();
    document.getElementById("leave" + id).innerHTML = daily_leaves[id].split(mon[today.getMonth()]).length - 1;
    swal({
        'title': 'TODAY\'s ABSENT MARKED',
        'type': 'success'
    })
}

// console.table((daily_leaves[6].slice(0,daily_leaves[6].length-1)).split(" "))


function chckleave(id) {

    form = new FormData()
    if (daily_leaves[id] == null || daily_leaves[id] == 'null') {

        today = absent_day() + " ";
        form.append("id", id);
        form.append("leaves", today);

        fetch('/emp/leave/', {
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            method: 'POST',
            body: form
        }).then(function (response) {
            return response.json();
        }).then(function (received) {
            if (received.x) {
                daily_leaves[id] = absent_day() + " ";
                cal_leaves(id);
            }
        })


    } else if (daily_leaves[id].indexOf(absent_day()) < 0) {

        today = daily_leaves[id];
        today += absent_day() + " ";
        form.append("id", id);
        form.append("leaves", today);

        fetch('/emp/leave/', {
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            method: 'POST',
            body: form
        }).then(function (response) {
            return response.json();
        }).then(function (received) {
            if (received.x) {
                daily_leaves[id] += absent_day() + " ";
                cal_leaves(id);
            }

        })
    } else {
        swal({
            'title': 'ABSENT ALREADY MARKED',
            'type': 'info'
        })
    }
}

function show_attendance(text_to_show) {

    document.getElementById("mon_attendance").innerHTML = `<tr class="text_center">
    <th width="auto">Index</th>
    <td width="2%"> </td>
    <th width="30%">Date</th>
    <th width="auto">Index</th>
    <td width="2%"> </td>
    <th width="30%">Date</th>
    </tr>`;
    tr = document.createElement("tr");
    th = document.createElement("th");
    th.colSpan = 6;
    th.className = "text_center";
    th.innerText = text_to_show;
    tr.append(th);
    document.getElementById("mon_attendance").append(tr);
    document.getElementById("pr_attendance").innerHTML = `<tr style="text-align: center;">
    <th width="auto">Month</th>
    <td width="2%"> </td>
    <th width="30%">Absents</th>
    <th width="auto">Month</th>
    <td width="2%"> </td>
    <th width="30%">Absents</th>
    </tr>`;
    tr1 = document.createElement("tr");
    th1 = document.createElement("th");
    th1.colSpan = 6;
    th1.className = "text_center";
    th1.innerText = text_to_show;
    tr1.append(th1);
    document.getElementById("pr_attendance").append(tr1);

    document.getElementById("attendance").style.height = "100vh";
    document.querySelector("body").style.overflow = "hidden";
}

function att_color(id) {
    var p = document.getElementById("att_emp_names").children[0].children;
    for (i = 0; i < p.length; i++) {
        p[i].className = "";
    }
    document.getElementById(`att_emp_${id}`).className = "att_color";
}

function cal_attendance(id) {

    // add first line to show monthly attendance
    document.getElementById("mon_attendance").innerHTML = `<tr class="text_center"> 
    <th width="auto">Index</th>
    <td width="2%"> </td>
    <th width="30%">Date</th>
    <th width="auto">Index</th>
    <td width="2%"> </td>
    <th width="30%">Date</th>
    </tr>`;
    att_color(id);
    document.getElementById("qwerty").value = id;

    num = 0; //    to get attendance of employees 

    if (daily_leaves[id] != null) {
        a = (daily_leaves[id].slice(0, daily_leaves[id].length - 1)).split(" "); // getting attendance of a specified employee

        var today = new Date();
        mon_to_show = a[0].slice(a[0].indexOf('/') + 1); //    getting first month from employee attendance to show that month list

        if (mon_to_show == mon[today.getMonth()] || daily_leaves[id].length == 0) { //  disable clear button if the current month is same as mon_to_show
            document.getElementById("clear_attendance").disabled = true;
        } else {
            document.getElementById("clear_attendance").disabled = false;
        }

        // add employee attendance to the table
        for (i = 0; i < (a.length) / 2; i++) {
            tr = document.createElement("tr")

            th1 = document.createElement("th");
            th1.style.width = "auto";
            th1.className = "text_center";
            th1.innerText = num + 1;

            td2 = document.createElement("td");
            td2.style.width = "2%";
            td2.innerText = ":";

            td3 = document.createElement("td");
            td3.style.width = "30%";
            if (a[num].indexOf(mon_to_show) > 0) { // this will show the attendance of only first month from employee attendance
                td3.innerText = " " + a[num++] + " ";
            } else {
                num++;
            }

            th4 = document.createElement("th");
            th4.style.width = "auto";
            th4.className = "text_center";
            aw = (a[num] == undefined) ? " " : num + 1; // checking if the last index is empty
            th4.innerText = aw;

            td5 = document.createElement("td");
            td5.style.width = "2%";
            td5.innerText = ":";

            td6 = document.createElement("td");
            td6.style.width = "30%";

            if (aw != " ") {
                if (a[num].indexOf(mon_to_show) > 0) { // this will show the attendance of only first month from employee attendance
                    td6.innerText = " " + a[num++] + " ";
                    tr.append(th1, td2, td3, th4, td5, td6);
                } else {
                    num++;
                    if (td3.innerText.length > 1)
                        tr.append(th1, td2, td3);
                }
            } else {
                tr.append(th1, td2, td3);
            }

            document.getElementById("mon_attendance").append(tr); // adding attendance to the table
        }
    } else { // the employee which have no leaves this month;
        show_attendance("This Employee Has No Leaves");
    }

    if (monthly_leaves[id] != null) {
        document.getElementById("pr_attendance").innerHTML = `<tr style="text-align: center;">
        <th width="auto">Month</th>
        <td width="2%"> </td>
        <th width="30%">Absents</th>
        <th width="auto">Month</th>
        <td width="2%"> </td>
        <th width="30%">Absents</th>
        </tr>`;
        numb = 0;
        a = (monthly_leaves[id].slice(0, monthly_leaves[id].length - 1)).split(" ");
        for (i = 0; i < (a.length) / 2; i++) {
            tr = document.createElement("tr")

            th1 = document.createElement("th");
            th1.style.width = "auto";
            th1.className = "text_center";
            th1.innerText = a[numb].slice(0, a[numb].indexOf("="));

            td2 = document.createElement("td");
            td2.style.width = "2%";
            td2.innerText = ":";

            td3 = document.createElement("td");
            td3.style.width = "30%";
            td3.innerText = " " + a[numb].slice(a[numb].indexOf("=") + 1) + " ";
            numb++;

            th4 = document.createElement("th");
            th4.style.width = "auto";
            th4.className = "text_center";
            if (a[numb] != undefined)
                th4.innerText = a[numb].slice(0, a[numb].indexOf("="));;

            td5 = document.createElement("td");
            td5.style.width = "2%";
            td5.innerText = ":";

            td6 = document.createElement("td");
            td6.style.width = "30%";
            if (a[numb] != undefined)
                td6.innerText = " " + a[numb].slice(a[numb].indexOf("=") + 1) + " ";
            numb++;
            tr.append(th1, td2, td3, th4, td5, td6);
            document.getElementById("pr_attendance").append(tr);
        }
    } else {
        document.getElementById("pr_attendance").innerHTML = `<tr style="text-align: center;">
    <th width="auto">Month</th>
    <td width="2%"> </td>
    <th width="30%">Absents</th>
    <th width="auto">Month</th>
    <td width="2%"> </td>
    <th width="30%">Absents</th>
</tr><tr style="text-align: center;"><th colspan="6">This Employee Has No Previous Record...!</th></tr>`;
    }
}


function close_attendance() {

    var p = document.getElementById("att_emp_names").children[0].children;
    for (i = 0; i < p.length; i++) {
        p[i].className = "";
    }
    document.getElementById("attendance").style.height = "0vh";
    document.querySelector("body").style.overflow = "auto";
    document.getElementById("qwerty").value = 0;

}


document.getElementById("clear_attendance").addEventListener("click", () => {
    var today = new Date();
    var id = document.getElementById("qwerty").value;
    var a = (daily_leaves[id].slice(0, daily_leaves[id].length - 1)).split(" ");
    var mon_to_show = a[0].slice(a[0].indexOf('/') + 1);
    if (mon_to_show == mon[today.getMonth()] || daily_leaves[id].length == 0) { //  disable clear button if the current month is same as mon_to_show
        swal({
            'title': 'Wait For The Next Month To Start!',
            'type': 'info'
        })
    } else {
        var at = absent_month() + "=";
        var num = 0;
        for (i = 0; i < a.length; i++) {
            if (a[i].indexOf(mon_to_show) > 0)
                num++;
        }
        at += num + " ";
        form = new FormData()
        if (monthly_leaves[id] == null || monthly_leaves[id] == 'null') {
            today = at;
            let daily__leaves = daily_leaves[id].slice(daily_leaves[id].lastIndexOf(mon_to_show) + 4);
            form.append("id", id);
            form.append("leaves", today);
            form.append("daily_le", daily__leaves);

            fetch('/emp/mon/', {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                },
                method: 'POST',
                body: form
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    monthly_leaves[id] = at;
                    daily_leaves[id] = daily__leaves;
                    swal({
                        'title': 'Attendance Cleared!',
                        'type': 'success'
                    })
                    cal_attendance(id);
                } else {
                    swal({
                        'title': 'There is a Server Error!',
                        'type': 'error'
                    })
                }

            })
        } else if (monthly_leaves[id].indexOf(at) < 0) {
            let daily__leaves = daily_leaves[id].slice(daily_leaves[id].lastIndexOf(mon_to_show) + 4);
            today = monthly_leaves[id];
            today += at;
            form.append("id", id);
            form.append("leaves", today);
            form.append("daily_le", daily__leaves);

            fetch('/emp/mon/', {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                },
                method: 'POST',
                body: form
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    monthly_leaves[id] += at;
                    daily_leaves[id] = daily__leaves;
                    swal({
                        'title': 'Attendance Cleared!',
                        'type': 'success'
                    })
                    cal_attendance(id);
                } else {
                    swal({
                        'title': 'There is a Server Error!',
                        'type': 'error'
                    })
                }

            })
            console.log(today);
        }
    }
})


// Refresh data after serach


function data_after_srch(a) {
    if (a == 0) {
        var ring = document.getElementById("refreshing");
        ring.autoplay = true;
        ring.load();
    }
    document.getElementById("fetching_data").className += " fetching_data";
    fetch('/emp/get/extra/')
        .then(function (response) {
            return response.json();
        }).then(function (received) {
            if (received.x) {
                document.getElementById("fetching_data").className = "fas fa-sync-alt";
                document.getElementById("order_table").innerHTML = `<tr class="table_head">
        <th id="th_1">
            <p class="just_chk_12">Name</p>
        </th>
        <th id="th_2">
            <p class="just_chk_12">Designation</p>
        </th>
        <th id="th_3">
            <p class="just_chk_150 extra">Salary</p>
        </th>
        <th id="th_4">
            <p class="just_chk_456">Salary Paid</p>
        </th>
        <th id="th_5">
            <p class="just_chk_456">Salary Left</p>
        </th>
        <th id="th_6">
            <p class="just_chk_456">Salary Type</p>
        </th>
        <th id="th_7">
            <p class="just_chk">Leaves</p>
        </th>
        <th id="th_8">
            <p class="just_chk">Actions</p>
        </th>
    </tr>`;
                for (i = 0; i < received["data"].length; i++) {

                    tr = document.createElement("tr");
                    tr.id = "d" + received["data"][i].id;
                    tr.classList.add("table_properties");

                    td1 = document.createElement("td");
                    td1.className = "capi";
                    td1.id = "name" + received["data"][i].id;
                    td1.innerText = received["data"][i].name;
                    td2 = document.createElement("td");
                    td2.className = "capi";
                    td2.id = "desi" + received["data"][i].id;
                    td2.innerText = received["data"][i].designation;
                    td3 = document.createElement("td");
                    td3.innerText = received["data"][i].salary;
                    td4 = document.createElement("td");
                    td4.innerText = received["data"][i].salary_paid;
                    td5 = document.createElement("td");
                    td5.innerText = received["data"][i].salary_left;

                    td6 = document.createElement("td");
                    div6 = document.createElement("div");
                    div6.classList.add("monthly");
                    div6.innerText = received["data"][i].salary_type;
                    td6.append(div6);
                    var today = new Date();
                    if (daily_leaves[received["data"][i].id] != null && daily_leaves[received["data"][i].id] != "null")
                        absent = daily_leaves[received["data"][i].id].split(mon[today.getMonth()]).length - 1;
                    else
                        absent = 0;
                    td7 = document.createElement("td");
                    td7.innerHTML = `<div id="leave${received["data"][i].id}" class="leaves" onclick="chckleave(${received["data"][i].id})">${absent}</div>`

                    td8 = document.createElement("td");
                    td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received["data"][i].id});"></i> <i class="fas fa-trash" id="action_delete" onclick="deleting(${received["data"][i].id})"></i></span>`;
                    tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
                    document.getElementById("order_table").append(tr);
                }
            } else {
                var ring = document.getElementById("eror");
                ring.autoplay = true;
                ring.load();
            }
        })
}


// Adding new employee

function add_employee() {

    let formdata = new FormData();
    add_profile = document.getElementById("taking_image").files[0] ? document.getElementById("taking_image").files[0] : null;
    add_name = document.getElementById("add_name").value ? document.getElementById("add_name").value.toLowerCase() : null;
    add_father = document.getElementById("add_father").value ? document.getElementById("add_father").value : null;
    add_cnic = document.getElementById("add_cnic").value ? document.getElementById("add_cnic").value : null;
    add_blood = document.getElementById("add_blood").value ? document.getElementById("add_blood").value : null;
    add_religion = document.getElementById("add_religion").value ? document.getElementById("add_religion").value : null;
    add_gender = document.getElementById("add_gender").value ? document.getElementById("add_gender").value : null;
    add_address = document.getElementById("add_address").value ? document.getElementById("add_address").value : null;
    add_department = document.getElementById("add_department").value ? document.getElementById("add_department").value.toLowerCase() : null;
    add_designation = document.getElementById("add_designation").value ? document.getElementById("add_designation").value.toLowerCase() : null;
    add_salary = document.getElementById("add_salary").value ? document.getElementById("add_salary").value : 0;
    add_salary_type = document.getElementById("add_salary_type").value ? document.getElementById("add_salary_type").value : "Monthly";
    add_number = document.getElementById("add_number").value ? document.getElementById("add_number").value : null;
    add_other_number = document.getElementById("add_other_number").value ? document.getElementById("add_other_number").value : null;
    add_acc_no = document.getElementById("add_acc_no").value ? document.getElementById("add_acc_no").value : null;

    formdata.append('profile', add_profile);
    formdata.append('name', add_name);
    formdata.append('father_name', add_father);
    formdata.append('cnic', add_cnic);
    formdata.append('blood', add_blood);
    formdata.append('religion', add_religion);
    formdata.append('gender', add_gender);
    formdata.append('employee_of', usua);
    formdata.append('email', null);
    formdata.append('commission', 0);
    formdata.append('address', add_address);
    formdata.append('department', add_department);
    formdata.append('designation', add_designation);
    formdata.append('salary', add_salary);
    formdata.append('salary_left', add_salary);
    formdata.append('salary_paid', 0);
    formdata.append('salary_type', add_salary_type);
    formdata.append('mobile', add_number);
    formdata.append('other_mobile', add_other_number);
    formdata.append('account_num', add_acc_no);
    formdata.append('reg_date', today());

    if (add_name != null && add_father != null && add_religion != null && add_gender != null && add_address != null && add_number != null) {
        var ring = document.getElementById("add_emp");
        ring.autoplay = true;
        ring.load();

        fetch('/emp/', {
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            method: 'POST',
            body: formdata
        }).then(function (response) {
            return response.json();
        }).then(function (received) {
            if (received.x) {

                tr = document.createElement("tr");
                tr.id = "d" + received.id;
                tr.classList.add("table_properties");

                td1 = document.createElement("td");
                td1.className = "capi";
                td1.innerText = add_name;
                td1.id = "name" + received.id;
                td2 = document.createElement("td");
                td2.className = "capi";
                td2.innerText = add_designation;
                td2.id = "desi" + received.id;
                td3 = document.createElement("td");
                td3.innerText = add_salary;
                td3.id = "sala" + received.id;
                td4 = document.createElement("td");
                td4.innerText = 0;
                td4.id = "sa_pa" + received.id;
                td5 = document.createElement("td");
                td5.innerText = add_salary;
                td5.id = "sa_la" + received.id;

                td6 = document.createElement("td");
                div6 = document.createElement("div");
                div6.classList.add("monthly");
                div6.id = "sa_ty" + received.id;
                div6.innerText = add_salary_type;
                td6.append(div6);

                td7 = document.createElement("td");
                td7.innerHTML = `<div id="leave${received.id}" class="leaves" onclick="chckleave(${received.id})">0</div>`

                td8 = document.createElement("td");
                td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received.id});"></i><i class="fas fa-trash" id="action_delete" onclick="deleting(${received.id})"></i></span>`;
                tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
                document.getElementById("order_table").append(tr);
                setTimeout(() => {
                    var ring = document.getElementById("add_suc");
                    ring.autoplay = true;
                    ring.load();
                    swal(
                        'Employee Added!',
                        'New Employee Has Been Added !',
                        'success'
                    )
                    closer();
                }, 700);

                document.getElementById("taking_image").value = null;
                document.getElementById("add_profile").src = "/static/images/male.jpg";
                document.getElementById("add_name").value = null;
                document.getElementById("add_father").value = null;
                document.getElementById("add_cnic").value = null;
                document.getElementById("add_blood").value = null;
                document.getElementById("add_religion").value = null;
                document.getElementById("add_gender").value = null;
                document.getElementById("add_address").value = null;
                document.getElementById("add_department").value = null;
                document.getElementById("add_designation").value = null;
                document.getElementById("add_salary").value = null;
                document.getElementById("add_salary_type").value = null;
                document.getElementById("add_number").value = null;
                document.getElementById("add_other_number").value = null;
                document.getElementById("add_acc_no").value = null;

            } else {
                setTimeout(() => {
                    var ring = document.getElementById("eror");
                    ring.autoplay = true;
                    ring.load();

                    swal(
                        'Sorry!',
                        'Server Error! Please Try Later!',
                        'error'
                    )
                    closer();
                }, 700);

            }
        })
        document.getElementById("add_name").className = "design_input";
        document.getElementById("add_father").className = "design_input";
        document.getElementById("add_religion").className = "design_input";
        document.getElementById("add_gender").className = "design_input";
        document.getElementById("add_address").className = "design_input";
        document.getElementById("add_number").className = "design_input";

    } else {
        var ring = document.getElementById("require");
        ring.autoplay = true;
        ring.load();
        document.getElementById("add_name").className = "design_input req";
        document.getElementById("add_father").className = "design_input req";
        document.getElementById("add_religion").className = "design_input req";
        document.getElementById("add_gender").className = "design_input req";
        document.getElementById("add_address").className = "design_input req";
        document.getElementById("add_number").className = "design_input req";
        swal({
            text: 'Please Specify Required Fields!',
            type: 'warning'
        });
    }

}


/* Popup ...Asking for permission to update employee */


document.getElementById("subscribe").addEventListener('click', () => {
    up_id = document.getElementById("update_id").innerHTML;
    url = `/emp/${up_id}/`

    d_to_u = {}
    d_to_u.name = document.getElementById("update_name").value[0] == "-" ? null : document.getElementById("update_name").value.toLowerCase();
    d_to_u.father_name = document.getElementById("update_fa_name").value[0] == "-" ? null : document.getElementById("update_fa_name").value;
    d_to_u.cnic = document.getElementById("update_cnic").value[0] == "-" ? null : document.getElementById("update_cnic").value;
    d_to_u.email = document.getElementById("update_email").value[0] == "-" ? null : document.getElementById("update_email").value;
    d_to_u.blood = document.getElementById("update_blood").value[0] == "-" ? null : document.getElementById("update_blood").value;
    d_to_u.religion = document.getElementById("update_religion").value[0] == "-" ? null : document.getElementById("update_religion").value;
    d_to_u.gender = document.getElementById("update_gender").value[0] == "-" ? null : document.getElementById("update_gender").value;
    d_to_u.address = document.getElementById("update_address").value[0] == "-" ? null : document.getElementById("update_address").value;
    d_to_u.department = document.getElementById("update_department").value[0] == "-" ? null : document.getElementById("update_department").value.toLowerCase();
    d_to_u.designation = document.getElementById("update_designation").value[0] == "-" ? null : document.getElementById("update_designation").value.toLowerCase();
    d_to_u.commission = document.getElementById("update_commission").value[0] == "-" ? null : parseFloat(document.getElementById("update_commission").value);
    d_to_u.mobile = document.getElementById("update_num").value[0] == "-" ? null : document.getElementById("update_num").value;
    d_to_u.other_mobile = document.getElementById("update_other_num").value[0] == "-" ? null : document.getElementById("update_other_num").value;
    d_to_u.account_num = document.getElementById("update_bank_num").value[0] == "-" ? null : document.getElementById("update_bank_num").value;


    swal({
        title: 'Confirm',
        text: "Confirm To Update Employee Data !",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: (pwd) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie("csrftoken")
                },
                method: 'PATCH',
                body: JSON.stringify(d_to_u)
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    var ring = document.getElementById("up_suc");
                    ring.autoplay = true;
                    ring.load();
                    swal(
                        'Updated!',
                        'Information has been updated!',
                        'success'
                    );
                    document.getElementById("name" + up_id).innerHTML = received.name ? `${received.name}` : `None`;
                    document.getElementById("desi" + up_id).innerHTML = received.designation ? `${received.designation}` : `None`;
                    close_profile_detail();
                } else {
                    var ring = document.getElementById("eror");
                    ring.autoplay = true;
                    ring.load();
                    swal(
                        'Sorry!',
                        'Server Error! Please Try Later!',
                        'error'
                    );
                    close_profile_detail();
                }
            })
        },
        allowOutsideClick: true
    })
});


/* Popup ...Asking for permission to delete employee */


function deleting(del_id) {

    url = `/emp/${del_id}/`
    del_id = "d" + del_id;
    // url = "/emp/17/"
    swal({
        title: 'Are you sure?',
        text: "It will permanently deleted !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: true,
        preConfirm: () => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie("csrftoken")
                },
                method: 'DELETE',
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    var ring = document.getElementById("emp_rem");
                    ring.autoplay = true;
                    ring.load();
                    document.getElementById(del_id).remove();
                    swal(
                        'Deleted!',
                        'Employee Removed',
                        'success'
                    );
                } else {
                    var ring = document.getElementById("eror");
                    ring.autoplay = true;
                    ring.load();
                    swal(
                        'Sorry!',
                        'Server Error! Please Try Later!',
                        'error'
                    );
                }
            })
        }
    })
}



/* Getting and Setting Image in Add new Employee Option */


function change_profile(event, element, img_id) {

    var ele_id = element.id;

    prf_pic = document.getElementById(img_id);
    var file = document.getElementById(ele_id).files;
    if (file.length > 0) {
        var filereader = new FileReader()
        filereader.onload = function (event) {
            prf_pic.setAttribute("src", event.target.result);
        }
        filereader.readAsDataURL(file[0]);
    }
}


// Search and present data to the screen

function searcher() {

    s_name = document.getElementById("s_name").value;
    s_department = document.getElementById("s_department").value;
    s_designation = document.getElementById("s_designation").value;

    s_dict = {}
    s_dict.name = s_name ? s_name.toLowerCase() : null;
    s_dict.department = s_department ? s_department.toLowerCase() : null;
    s_dict.designation = s_designation ? s_designation.toLowerCase() : null;

    if (s_dict.name != null || s_dict.department != null || s_dict.designation != null) {
        var ring = document.getElementById("sr_emp");
        ring.autoplay = true;
        ring.load();
        fetch('/emp/srch/', {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken")
            },
            method: 'POST',
            body: JSON.stringify(s_dict)
        }).then(function (response) {
            return response.json();
        }).then(function (received) {
            if (received.x) {
                document.getElementById("order_status").scrollIntoView();
                document.getElementById("order_table").innerHTML = `<tr class="table_head">
            <th id="th_1">
                <p class="just_chk_12">Name</p>
            </th>
            <th id="th_2">
                <p class="just_chk_12">Designation</p>
            </th>
            <th id="th_3">
                <p class="just_chk_150 extra">Salary</p>
            </th>
            <th id="th_4">
                <p class="just_chk_456">Salary Paid</p>
            </th>
            <th id="th_5">
                <p class="just_chk_456">Salary Left</p>
            </th>
            <th id="th_6">
                <p class="just_chk_456">Salary Type</p>
            </th>
            <th id="th_7">
                <p class="just_chk">Leaves</p>
            </th>
            <th id="th_8">
                <p class="just_chk">Actions</p>
            </th>
        </tr>`;
                if (received["data"].length == 0) {
                    var ring = document.getElementById("no_match");
                    ring.autoplay = true;
                    setTimeout(() => {
                        ring.load();
                        swal(
                            'Sorry!',
                            'No Matching Result Found!',
                            'error'
                        );
                    }, 700);

                }

                for (i = 0; i < received["data"].length; i++) {

                    tr = document.createElement("tr");
                    tr.id = "d" + received["data"][i].id;
                    tr.classList.add("table_properties");

                    td1 = document.createElement("td");
                    td1.className = "capi";
                    td1.id = "name" + received["data"][i].id;
                    td1.innerText = received["data"][i].name;
                    td2 = document.createElement("td");
                    td2.className = "capi";
                    td2.id = "desi" + received["data"][i].id;
                    td2.innerText = received["data"][i].designation;
                    td3 = document.createElement("td");
                    td3.innerText = received["data"][i].salary;
                    td4 = document.createElement("td");
                    td4.innerText = received["data"][i].salary_paid;
                    td5 = document.createElement("td");
                    td5.innerText = received["data"][i].salary_left;

                    td6 = document.createElement("td");
                    div6 = document.createElement("div");
                    div6.classList.add("monthly");
                    div6.innerText = received["data"][i].salary_type;
                    td6.append(div6);

                    var today = new Date();
                    if (daily_leaves[received["data"][i].id] != null && daily_leaves[received["data"][i].id] != "null")
                        absent = daily_leaves[received["data"][i].id].split(mon[today.getMonth()]).length - 1;
                    else
                        absent = 0;
                    td7 = document.createElement("td");
                    td7.innerHTML = `<div id="leave${received["data"][i].id}" class="leaves" onclick="chckleave(${received["data"][i].id})">${absent}</div>`

                    td8 = document.createElement("td");
                    td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received["data"][i].id});"></i><i class="fas fa-trash" id="action_delete" onclick="deleting(${received["data"][i].id})"></i></span>`;
                    tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
                    document.getElementById("order_table").append(tr);
                }
            } else {
                var ring = document.getElementById("eror");
                ring.autoplay = true;
                ring.load();
                swal(
                    'Sorry!',
                    'Server Error! Please Try Later!',
                    'error'
                );
            }
        })
    } else {
        var ring = document.getElementById("specify");
        ring.autoplay = true;
        ring.load();
        swal({
            text: 'Please Specify A Field!',
            type: 'warning'
        });
    }
}



var detailed = document.getElementById("detail");

function full_screen(id) {

    fetch(`/emp/${id}`).
    then(function (response) {
            return response.json();
        })
        .then(function (received) {
            document.getElementById("update_profile").src = received.profile ? `${received.profile}` : `/static/images/male.jpg`;
            document.getElementById("head_name").innerHTML = received.name ? `${received.name}` : `---------`;
            document.getElementById("head_designation").innerHTML = received.designation ? `<strong class="pr-1">Designation:</strong> ${received.designation}` : `---------`;
            document.getElementById("update_id").innerHTML = received.id ? `${received.id}` : `---------`;
            document.getElementById("update_name").value = received.name ? `${received.name}` : `---------`;
            document.getElementById("update_fa_name").value = received.father_name ? `${received.father_name}` : `---------`;
            document.getElementById("update_cnic").value = received.cnic ? `${received.cnic}` : `---------`;
            document.getElementById("update_blood").value = received.blood ? `${received.blood}` : `---------`;
            document.getElementById("update_religion").value = received.religion ? `${received.religion}` : `---------`;
            document.getElementById("update_gender").value = received.gender ? `${received.gender}` : `---------`;
            document.getElementById("update_address").value = received.address ? `${received.address}` : `---------`;
            document.getElementById("update_department").value = received.department ? `${received.department}` : `---------`;
            document.getElementById("update_designation").value = received.designation ? `${received.designation}` : `---------`;
            document.getElementById("update_salary").innerHTML = received.salary ? `${received.salary}` : `---------`;
            document.getElementById("update_salary_type").innerHTML = received.salary_type ? `${received.salary_type}` : `---------`;
            document.getElementById("update_num").value = received.mobile ? `${received.mobile}` : `---------`;
            document.getElementById("update_other_num").value = received.other_mobile ? `${received.other_mobile}` : `---------`;
            document.getElementById("update_bank_num").value = received.account_num ? `${received.account_num}` : `---------`;
            document.getElementById("update_reg_date").innerHTML = received.reg_date ? `${received.reg_date}` : `---------`;
            document.getElementById("update_email").value = received.email ? `${received.email}` : `---------`;
            document.getElementById("update_commission").value = received.commission ? `${received.commission}` : `---------`;
        })

    detailed.style.height = "100vh";
    document.querySelector("body").style.overflow = "hidden";
    closer();
}


//  send issue to the server

function submit_report() {
    form = new FormData();

    id = usua;
    com_name = document.getElementById("complain_name").value;
    complain_issue = document.getElementById("complain_issue").value;
    complain_password = document.getElementById("complain_password").value;
    complain_page = document.getElementById("complain_page").value;



    form.append("user_id", id);
    form.append("name", com_name);
    form.append("complain", complain_issue);
    form.append("page", complain_page);
    form.append("complain_password", complain_password);

    fetch('/emp/complain/', {
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        },
        method: 'POST',
        body: form
    }).then(function (response) {
        return response.json();
    }).then(function (received) {
        if (received.x == true) {
            swal({
                text: "Complain Sent!",
                type: 'success',
            })
            close_report();
        } else if (received.x == '2') {
            swal({
                text: "Wrong Password!",
                type: 'error',
            })
        } else {
            swal({
                text: "Server Error!",
                type: 'error',
            })
            close_report();
        }
        document.getElementById("complain_name").value = "";
        document.getElementById("complain_issue").value = "";
        document.getElementById("complain_password").value = "";
    })
}


function close_profile_detail() {
    detailed.style.height = "00vh";
    document.querySelector("body").style.overflow = "auto";
}


/* Button of Add new Employee */

$(window).ready(function () {
    $(".boton").wrapInner('<div class=botontext></div>');

    $(".botontext").clone().appendTo($(".boton"));

    $(".boton").append('<span class="twist"></span><span class="twist"></span><span class="twist"></span><span class="twist"></span>');

    $(".twist").css("width", "50%").css("width", "+=3px");
});