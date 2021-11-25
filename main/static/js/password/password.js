//  get cookie

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


//  save passwords

function save_pass() {

    data = {
        'email': document.getElementById("save_email").value,
        'used_for': document.getElementById("save_for").value,
        'code': document.getElementById("save_password").value
    }

    fetch('/pass/', {
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (received) {
        if (received.x) {
            tr = document.createElement("tr");
            tr.id = "pass_tr_" + received.id;
            tr.classList.add("tr");

            td1 = document.createElement("td");
            td1.className = "for_td";
            td1.innerText = document.getElementById("save_for").value;

            td2 = document.createElement("td");
            td2.className = "mail_td";
            td2.innerText = document.getElementById("save_email").value;

            td3 = document.createElement("td");
            td3.className = "password_td"
            td3.innerHTML = `<input type="password" id="pass_${received.id}" class="pass_style" value="1234567890"> <i class="fas fa-low-vision" onclick="see_pass(${received.id})"></i> <i class="fas fa-trash" onclick="delete_pass(${received.id})"></i> <i class="fas fa-pen-square" onclick="update_pass(${received.id})"></i>`

            tr.append(td1, td2, td3);
            document.getElementById("password_li").append(tr);
            swal({
                text: 'Password Saved Successfully!',
                type: 'success'
            })
            blocks_heights["password_shower"] = blocks_heights["password_shower"] + 42;
            opener("password_shower");
            setTimeout(() => {
                document.getElementById("save_email").value = "";
                document.getElementById("save_for").value = "";
                document.getElementById("save_password").value = "";
            }, 2000);

        } else {
            swal({
                text: 'Please Fill All Fields!',
                type: 'error'
            })
        }
    })
}


//  delete password


function delete_pass(del_id) {

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

            fetch(`/pass/${del_id}`, {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    blocks_heights["password_shower"] = blocks_heights["password_shower"] - 42;
                    closer();
                    opener("password_shower");
                    document.getElementById("pass_tr_" + del_id).remove();
                    swal(
                        'Deleted!',
                        'Password Removed',
                        'success'
                    );
                } else {
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


ids = []

//  Show password

function see_pass(id) {
    if (proceed_to_process) {
        swal({
            title: 'Password is Required',
            input: 'password',
            inputPlaceholder: 'Password',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            showLoaderOnConfirm: true,

            preConfirm: (email) => {
                return new Promise((resolve) => {
                    fetch('/pass/rpass/', {
                        headers: {
                            "X-CSRFToken": getCookie("csrftoken"),
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            "check": proceed_to_process,
                            "code": email,
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (received) {
                        if (received.x) {
                            for (i = 0; i < received.data.length; i++) {
                                document.getElementById(`pass_${received.data[i].id}`).value = received.data[i].encrypt;
                                ids.push(received.data[i].id)
                            }
                            document.getElementById(`pass_${id}`).type = "text";
                            proceed_process()
                            resolve();
                        } else {
                            swal.showValidationError(
                                'Your Password is Wrong.'
                            )
                            resolve();
                        }
                    })
                })
            },
            allowOutsideClick: true
        }).then((result) => {
            if (result.value) {
                swal({
                    type: 'success',
                    title: 'Password Correct !',
                })
            }
        })
    } else {
        if (document.getElementById(`pass_${id}`).type == "text") {
            document.getElementById(`pass_${id}`).type = "password";
        } else {
            document.getElementById(`pass_${id}`).type = "text";
        }
    }
}


//  update password

function update_pass(id) {

    swal({
        title: 'Password is Required',
        input: 'password',
        inputPlaceholder: 'Password',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        showLoaderOnConfirm: true,

        preConfirm: (email) => {
            return new Promise((resolve) => {
                fetch(`/pass/${id}/`, {
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                        'Content-Type': 'application/json',
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                        "check": document.getElementById(`pass_${id}`).value,
                        "code": email,
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (received) {
                    if (received.x) {
                        if (proceed_to_process) {
                            document.getElementById(`pass_${id}`).value = "1234567890";
                        } else {
                            document.getElementById(`pass_${id}`).type = "password";
                        }
                        resolve();
                    } else {
                        swal.showValidationError(
                            'Your Password is Wrong.'
                        )
                        resolve();
                    }
                })
            })
        },
        allowOutsideClick: true
    }).then((result) => {
        if (result.value) {
            swal({
                type: 'success',
                title: 'Password update !',
            })
        }
    })

}


//  save contact

function save_con() {
    gender = "male"

    if (document.getElementById("dot-1").checked) {
        gender = "Male";
    } else if (document.getElementById("dot-2").checked) {
        gender = "Female";
    } else if (document.getElementById("dot-3").checked) {
        gender = "Other";
    }

    data = {
        'user_id': usua,
        'name': document.getElementById("con_name").value,
        'number': document.getElementById("con_number").value,
        'email': document.getElementById("con_email").value,
        'company': document.getElementById("con_company").value,
        'department': document.getElementById("con_department").value,
        'designation': document.getElementById("con_designation").value,
        'address': document.getElementById("con_address").value,
        'relationship': document.getElementById("con_relationship").value,
        'gender': gender
    }


    swal({
        title: 'Create Contact?',
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Create',
        allowOutsideClick: true,
        preConfirm: () => {
            fetch(`/pass/con/`, {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    tr = document.createElement("tr");
                    tr.id = "con_tr_" + received.id;
                    tr.classList.add("tr");

                    td1 = document.createElement("td");
                    td1.className = "for_td";
                    td1.id = `cont_name${received.id}`;
                    td1.innerText = document.getElementById("con_name").value;

                    td2 = document.createElement("td");
                    td2.className = "mail_td";
                    td2.id = `cont_relationship${received.id}`;
                    td2.innerText = document.getElementById("con_relationship").value;

                    td3 = document.createElement("td");
                    td3.id = `cont_company${received.id}`;
                    td3.innerText = document.getElementById("con_company").value;

                    td4 = document.createElement("td");
                    td4.className = "password_td";
                    td4.innerHTML = `<input type="text" id="cont_number${received.id}" class="pass_style" value="${data.number}"> <i class="fas fa-pen-square" onclick="update_con(${received.id})"></i> <i class="fas fa-trash" onclick="delete_con(${received.id})"></i>`

                    tr.append(td1, td2, td3, td4);
                    document.getElementById("contacts_li").append(tr);
                    swal({
                        title: "Contact Created Successfully!",
                        type: 'success'
                    });
                    blocks_heights["contact_shower"] = blocks_heights["contact_shower"] + 42;
                    opener("contact_shower");
                    setTimeout(() => {
                        document.getElementById("con_name").value = "";
                        document.getElementById("con_number").value = "";
                        document.getElementById("con_email").value = "";
                        document.getElementById("con_company").value = "";
                        document.getElementById("con_department").value = "";
                        document.getElementById("con_designation").value = "";
                        document.getElementById("con_address").value = "";
                        document.getElementById("con_relationship").value = "";
                    }, 2000);
                } else {
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



//  delete contact

function delete_con(del_id) {
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

            fetch(`/pass/con/${del_id}`, {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }).then(function (response) {
                return response.json();
            }).then(function (received) {
                if (received.x) {
                    document.getElementById("con_tr_" + del_id).remove();
                    blocks_heights["contact_shower"] = blocks_heights["contact_shower"] - 42;
                    closer();
                    opener("contact_shower");
                    swal(
                        'Deleted!',
                        'Contact Removed',
                        'success'
                    );
                } else {
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



//  see contact full detail

yamla = 0;

function see_con(id) {
    fetch(`/pass/con/${id}/`)
        .then(function (response) {
            return response.json();
        }).then(function (received) {
            yamla = id;
            document.getElementById("show_name").value = received.name;
            document.getElementById("show_number").value = received.number;
            document.getElementById("show_mail").value = received.email;
            document.getElementById("show_company").value = received.company;
            document.getElementById("show_department").value = received.department;
            document.getElementById("show_designation").value = received.designation;
            document.getElementById("show_gender").value = received.gender;
            document.getElementById("show_relationship").value = received.relationship;
            document.getElementById("show_address").value = received.address;
        })

    document.getElementById("detail").style.height = "100vh";
    document.querySelector("body").style.overflow = "hidden";
}


function close_con() {
    yamla = 0;
    document.getElementById("detail").style.height = "00vh";
    document.querySelector("body").style.overflow = "auto";
}


//  update contact

function update_con() {

    swal({
        title: 'Password is Required',
        input: 'password',
        inputPlaceholder: 'Password',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        showLoaderOnConfirm: true,

        preConfirm: (email) => {
            return new Promise((resolve) => {
                fetch(`/pass/con/${yamla}/`, {
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                        'Content-Type': 'application/json',
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                        'code': email,
                        'user_id': usua,
                        'name': document.getElementById("show_name").value,
                        'number': document.getElementById("show_number").value,
                        'email': document.getElementById("show_mail").value,
                        'company': document.getElementById("show_company").value,
                        'department': document.getElementById("show_department").value,
                        'designation': document.getElementById("show_designation").value,
                        'address': document.getElementById("show_address").value,
                        'relationship': document.getElementById("show_relationship").value,
                        'gender': document.getElementById("show_gender").value
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (received) {
                    if (received.x) {
                        document.getElementById(`cont_name${yamla}`).innerHTML = document.getElementById("show_name").value;
                        document.getElementById(`cont_relatioship${yamla}`).innerHTML = document.getElementById("show_relationship").value;
                        document.getElementById(`cont_company${yamla}`).innerHTML = document.getElementById("show_company").value;
                        document.getElementById(`cont_number${yamla}`).value = document.getElementById("show_number").value;
                        close_con();
                        resolve();
                    } else {
                        swal.showValidationError(
                            'Your Password is Wrong.'
                        )
                        resolve();
                    }
                })
            })
        },
        allowOutsideClick: true
    }).then((result) => {
        if (result.value) {
            swal({
                type: 'success',
                title: 'Contact Updated Successfully !',
            })
        }
    })
}

//  logout

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
    "create_password": 0,
    "password_shower": 0,
    "contact_shower": 0,
    "create_contact": 0,
    "save_password_block": 0
}
blocks_heights = {
    "create_password": 0,
    "password_shower": 0,
    "contact_shower": 0,
    "create_contact": 0,
    "save_password_block": 0
}
blocks_txt = {
    "create_password": "Generate Password",
    "password_shower": "Password List",
    "contact_shower": "Contact List",
    "create_contact": "Create Contact",
    "save_password_block": "Save Password"
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
    }
}
closer();



//  password generator javascript starts from here

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    swal({
        'text':'Password Copied!',
        'type': 'success'
    })
});

document.getElementById("length").addEventListener("click", () => {
    document.getElementById("length").value = "";
})

generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);

    // Doesn't have a selected type
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += 1) {
        randomTypeObject = typesArr[Math.floor(Math.random() * typesCount)]
        let randomType = "";
        for (var j in randomTypeObject) {
            randomType = j;
        }
        console.log("type : " + randomType);

        generatedPassword += randomFunc[randomType]();
    }
    console.log("generatedPassword : " + generatedPassword);

    return generatedPassword;
}

proceed_to_process = true;

function proceed_process() {
    proceed_to_process = false;
    setTimeout(() => {
        for (i = 0; i < ids.length; i++) {
            document.getElementById(`pass_${ids[i]}`).type = "password";
            document.getElementById(`pass_${ids[i]}`).value = "1234567890";
        }
        ids = []
        proceed_to_process = true;
    }, 120000);
}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}


function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}