/* Sidebar Opening and closing Script */

$(".sidebar-dropdown > a").click(function() {
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

$("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
});






/* Popup ...Asking for permission in update employee */


$(document).on('click', '#subscribe', function(e) {
    swal({
        title: 'Password is Required',
        input: 'password',
        inputPlaceholder: 'Password',
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (email === '12345') {
                        swal.showValidationError(
                            'Your Password is Wrong.'
                        )
                    }
                    resolve()
                }, 2000)
            })
        },
        allowOutsideClick: true
    }).then((result) => {
        if (result.value) {
            swal({
                type: 'success',
                title: 'Information has been updated  !',
                html: 'User Information: Updated'
            })
        }
    })
});








/* Getting and Setting Image in Add new Employee Option */

(function() {
    var uploader = document.createElement('input'),
        image = document.getElementById('img-result');

    uploader.type = 'file';
    uploader.accept = 'image/*';

    image.onclick = function() {
        uploader.click();
    }

    uploader.onchange = function() {
        var reader = new FileReader();
        reader.onload = function(evt) {
            image.classList.remove('no-image');
            image.style.backgroundImage = 'url(' + evt.target.result + ')';
            var request = {
                itemtype: 'test 1',
                brand: 'test 2',
                images: [{
                    data: evt.target.result
                }]
            };
        }
        reader.readAsDataURL(uploader.files[0]);
    }
})();









/* All Option Expander and hider */

var detailed = document.getElementById("detail")

function full_screen(id) {

    url = "/emp/" + id;
    fetch(url).
    then(function (response) {
        return response.json();
    })
    .then(function (received) {
        document.getElementById("update_profile").src = received.profile;
        document.getElementById("head_name").innerHTML = received.name;
        document.getElementById("head_designation").innerHTML = "Designation: " + received.designation;
        document.getElementById("update_id").value = received.id;
        document.getElementById("update_name").value = received.name;
        document.getElementById("update_fa_name").value = received.father_name;
        document.getElementById("update_cnic").value = received.cnic;
        document.getElementById("update_blood").value = received.blood;
        document.getElementById("update_religion").value = received.religion;
        document.getElementById("update_gender").value = received.gender;
        document.getElementById("update_address").value = received.address;
        document.getElementById("update_department").value = received.department;
        document.getElementById("update_designation").value = received.designation;
        document.getElementById("update_salary").value = received.salary;
        document.getElementById("update_salary_type").value = received.salary_type;
        document.getElementById("update_num").value = received.mobile;
        document.getElementById("update_other_num").value = received.other_mobile;
        document.getElementById("update_bank_num").value = received.account_num;
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

$(window).ready(function() {
    $(".boton").wrapInner('<div class=botontext></div>');

    $(".botontext").clone().appendTo($(".boton"));

    $(".boton").append('<span class="twist"></span><span class="twist"></span><span class="twist"></span><span class="twist"></span>');

    $(".twist").css("width", "50%").css("width", "+=3px");
});