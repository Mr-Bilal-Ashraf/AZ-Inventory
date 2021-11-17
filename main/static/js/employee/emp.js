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
    var mm =  mon[today.getMonth()]
    var yyyy = today.getFullYear();

    return (dd + '/' + mm + '/' + yyyy);
}

function absent_month() {
    var today = new Date();
    var mm =  mon[today.getMonth()]
    var yyyy = today.getFullYear();

    return (mm + '/' + yyyy);
}

function absent_day() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm =  mon[today.getMonth()];

    return (dd + '/' + mm );
}

function cal_leaves(id){
    var today = new Date();
    document.getElementById("leave"+id).innerHTML = daily_leaves[id].split(mon[today.getMonth()]).length - 1;
    swal({
        'title':'TODAY\'s ABSENT MARKED',
        'type': 'success'
    })
}

// console.table((daily_leaves[6].slice(0,daily_leaves[6].length-1)).split(" "))


function chckleave(id){

    form = new FormData()
    if(daily_leaves[id] == null || daily_leaves[id] == 'null'){

        today = absent_day() + " ";
        form.append("id",id);
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
            if(received.x){
                daily_leaves[id] = absent_day() + " ";
                cal_leaves(id);
            }
        })


    }else if(daily_leaves[id].indexOf(absent_day()) < 0 ){

        today = daily_leaves[id];
        today += absent_day() + " ";
        form.append("id",id);
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
            if(received.x){
                daily_leaves[id] += absent_day() + " ";
                cal_leaves(id);
            }

        })
    }else{
        swal({
            'title':'ABSENT ALREADY MARKED',
            'type': 'info'
        })
    }
}








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
                    if(daily_leaves[received["data"][i].id] != null && daily_leaves[received["data"][i].id] != "null")
                        absent = daily_leaves[received["data"][i].id].split(mon[today.getMonth()]).length - 1;
                    else
                        absent = 0;
                    td7 = document.createElement("td");
                    td7.innerHTML = `<div id="leave${received["data"][i].id}" class="leaves" onclick="chckleave(${received["data"][i].id})">${absent}</div>`

                    td8 = document.createElement("td");
                    td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received["data"][i].id}); everyone();"></i><i class="fas fa-trash" id="action_delete" onclick="deleting(${received["data"][i].id})"></i></span>`;
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

document.getElementById("addEmp").addEventListener('click', () => {

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
            headers: {"X-CSRFToken": getCookie("csrftoken")},
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
                td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received.id}); everyone();"></i><i class="fas fa-trash" id="action_delete" onclick="deleting(${received.id})"></i></span>`;
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
                    stop();
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
                    stop();
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

})


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
                    p_stop();
                } else {
                    var ring = document.getElementById("eror");
                    ring.autoplay = true;
                    ring.load();
                    swal(
                        'Sorry!',
                        'Server Error! Please Try Later!',
                        'error'
                    );
                    p_stop();
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

                    td7 = document.createElement("td");
                    div7 = document.createElement("div");
                    div7.classList.add("leaves");
                    div7.innerText = 0;
                    td7.append(div7);

                    td8 = document.createElement("td");
                    td8.innerHTML = `<span class="actions_border"><i class="far fa-edit" id="action_edit" onclick="full_screen(${received["data"][i].id}); everyone();"></i><i class="fas fa-trash" id="action_delete" onclick="deleting(${received["data"][i].id})"></i></span>`;
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


/* All Option Expander and hider */

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

    detailed.style.height = "100vh"
    stop()
    s_stop()

}

function p_stop() {
    detailed.style.height = "00vh"
}

var merjan;
var yes_no = 0;
box_height = document.getElementById("expanded").offsetHeight;
box_height = String(box_height + "px");
document.getElementById("expanded").style.height = "0px";
document.getElementById("inputer_baap").style.display = "none"




/* Running Function of Everyone */

function everyone() {
    if (merjan == "add_new_employee") {
        add_new_employee()
    } else if (merjan == "search_run") {
        search_run()
    } else if (merjan == "employeeLock") {
        add_new_employee()
        search_run()
    }
}

function run() {
    /* overview = document.getElementById("overview") */
    var headingDiv = document.getElementById("overview");
    headingDiv.innerHTML = "<H3>Adding New Employee</H3>";

    var main_btn = document.getElementById("add_employee");
    main_btn.innerHTML = "<H4>Stop Process</H4>";

    document.getElementById("jutta").style.transition = "1.5s ease"
    document.getElementById("jutta").style.marginTop = "30px"
    document.getElementById("inputer_baap").style.display = "block"
    document.getElementById("jutta").style.opacity = "0"

    setTimeout(() => {
        document.getElementById("jutta").style.opacity = "1"
        document.getElementById("jutta").style.marginTop = "0px"

    }, 1000);
    document.getElementById("expanded").style.height = box_height;
    var yes_no = 1;


    everyone()
    merjan = "add_new_employee"
    setTimeout(() => {
        document.getElementById("clicked").click()
    }, 500);



}

function stop() {
    document.getElementById("expanded").style.height = "0px";
    document.getElementById("inputer_baap").style.display = "none"
    var headingDiv = document.getElementById("overview");
    headingDiv.innerHTML = "<H3>Allah is Best</H3>";


    setTimeout(() => {
        document.getElementById("dv_dev").click()
    }, 200);




    var main_btn = document.getElementById("add_employee");
    main_btn.innerHTML = "<H4>ADD EMPLOYEE</H4>";

    merjan = ""
}

function add_new_employee() {
    document.getElementById("expanded").style.transition = ".4s ease"

    if (yes_no == 0) {
        run()
        yes_no = 1
    } else if (yes_no == 1) {
        stop()
        yes_no = 0
    }
}


/* Employee Update option */

var employee_update_lock = document.getElementById("employee_update_lock")
dlose()
emp = 0;

function employeeLock() {
    if (emp == 0) {
        topen()
    } else if (emp == 1) {
        dlose()
    }
}

function topen() {
    if (yes_no == 1) {
        stop()
        setTimeout(() => {
            employee_update_lock.style.display = "flex"
            setTimeout(() => {
                employee_update_lock.style.opacity = "1"
            }, 10);
        }, 300);


    } else if (yes_no == 0) {
        employee_update_lock.style.display = "flex"
        setTimeout(() => {
            employee_update_lock.style.opacity = "1"
        }, 10);
    }
    emp = 1
    merjan = "employeeLock  "
}

function dlose() {

    employee_update_lock.style.transition = ".7s ease"
    employee_update_lock.style.opacity = "0"

    setTimeout(() => {
        employee_update_lock.style.display = "none"
    }, 600);

    emp = 0
    merjan = ""
}


/* Search Expander */

search_html = 0;

function search_run() {
    if (search_html == 0) {
        s_run()
    } else if (search_html == 1) {
        s_stop()
    }
}


search_height = document.getElementById("search_expander").offsetHeight;
search_height = String(search_height + "px");
document.getElementById("search_expander").style.transition = ".3s ease";
document.getElementById("search_hider").style.transition = "1s ease";
document.getElementById("search_expander").style.height = "0px";
document.getElementById("search_hider").style.display = "none";

function s_run() {

    var search_employee = document.getElementById("search_employee");
    search_employee.innerHTML = "<H4>Stop Process</H4>";


    document.getElementById("search_expander").style.height = search_height;
    document.getElementById("search_hider").style.display = "none";
    document.getElementById("search_hider").style.display = "block"
    document.getElementById("search_hider").style.opacity = "0"
    var headingDiv = document.getElementById("overview");
    headingDiv.innerHTML = "<H3>Searching Employee</H3>";

    setTimeout(() => {
        document.getElementById("search_hider").style.opacity = "1"
        document.getElementById("search_hider").style.marginTop = "0px"

    }, 500);
    search_html = 1;



    everyone()
    merjan = "search_run"

    setTimeout(() => {
        document.getElementById("search_clicked").click()
    }, 500);

}

function s_stop() {

    var search_employee = document.getElementById("search_employee");
    search_employee.innerHTML = "<H4>SEARCH EMPLOYEE</H4>";

    document.getElementById("search_expander").style.height = "0px";
    document.getElementById("search_hider").style.display = "none"

    setTimeout(() => {
        document.getElementById("dv_dev").click()
    }, 200);



    var headingDiv = document.getElementById("overview");
    headingDiv.innerHTML = "<H3>Allah Can make you Anything</H3>";
    search_html = 0
    merjan = ""


}


/* Asking Permission for updating user */

function ask_permission() {
    var permissioning = document.getElementById("update_permission")
    permissioning.style.right = "0px"
}







/* Button of Add new Employee */

$(window).ready(function () {
    $(".boton").wrapInner('<div class=botontext></div>');

    $(".botontext").clone().appendTo($(".boton"));

    $(".boton").append('<span class="twist"></span><span class="twist"></span><span class="twist"></span><span class="twist"></span>');

    $(".twist").css("width", "50%").css("width", "+=3px");
});