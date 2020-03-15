/* Get user data from fields in sign up window.
event.preventDefault() - prevent default reload page */
document.querySelector('#signup-submit').onclick = function(event) {
    event.preventDefault();
    let name = document.querySelector('#signup-name').value;
    let pass = document.querySelector('#signup-pass').value;
    let email = document.querySelector('#signup-email').value;
    let birthday = document.querySelector('#signup-birthday').value;
    let sex = document.querySelectorAll('.sex');
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    let data = {
        "name": name,
        "pass": pass,
        "email": email,
        "birthday": birthday,
        "sex": sex,
    }

    /* call function with AJAX request to user signup */
    ajax('core/signup.php', undefined, signup, data);

    /* notification chips */
    function signup(result) {
        if (result == 2) {
            createChips('Fill in all fields!', 'yellow', 3000);
            document.querySelector('.chips-field').style.zIndex = '99999';
        } else if (result == 1) {
            createChips('Success!', 'LightGreen', 3000);
            closeModal();
        } else {
            createChips('Error! Try again later', 'red', 5000);
            document.querySelector('.chips-field').style.zIndex = '99999';
        }
    }
}

/* login function: check e-mail and pass */
document.querySelector('#login-submit').onclick = function(event) {
    event.preventDefault();
    let pass = document.querySelector('#login-pass').value;
    let email = document.querySelector('#login-email').value;

    let data = {
        "pass": pass,
        "email": email
    }

    /* AJAX request to server */
    ajax('core/login.php', undefined, login, data);

    /* notification chips. Result - from login.php */
    function login(result) {
        if (result == 2) {
            createChips('Fill in all fields!', 'yellow', 3000);
            document.querySelector('.chips-field').style.zIndex = '99999';
        } else if (result == 0) {
            createChips('User not found!', 'red', 3000);
            document.querySelector('.chips-field').style.zIndex = '99999';
        } else {
            result = JSON.parse(result);

            /* setting cookie */
            var d = new Date();
            d.setTime(d.getTime() + (10 * 60 * 1000)); //expires time cookie 10 min
            var expires = d.toUTCString();
            /* store user e-mail and expires time in cookie */
            document.cookie = `email=${result.email}; expires=${expires}; path=/`;
            location.href = "cabinet.php";
        }
    }
}

/* calendar from Materialize */
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, {
        'format': 'dd-mm-yyyy',
    });
});

/* showing modal window function */
document.querySelectorAll('.modal-show').forEach(function(element) {
    element.onclick = showModal;
});

document.querySelectorAll('.modal-project-close').forEach(function(element) {
    /* closing window by Close button */
    element.onclick = closeModal;
});

document.querySelectorAll('.modal-wrap').forEach(function(element) {
    /* closing window by click in grey area */
    element.onclick = closeModal;
});

function showModal() {
    let modalId = this.dataset.modal;
    document.querySelector(modalId).classList.remove('hide');
    document.onkeydown = function(event) {
        /* closing window by Esc button */
        if (event.keyCode == 27) closeModal();
    }
}

function closeModal() {
    document.querySelectorAll('.modal-wrap').forEach(function(element) {
        element.classList.add('hide');
    });
    document.onkeydown = null;
}

/* stopping event bubbling - prevent closing modal window in case click inside one */
document.querySelector('#log-in .modal-project').onclick = function(event) {
    event.stopPropagation();
}

document.querySelector('#sign-up .modal-project').onclick = function(event) {
    event.stopPropagation();
}

/* slider with rules */
document.querySelector('.read-rules').onclick = function() {
    document.querySelector('.form-slider').style.marginLeft = '-345px';
}

document.querySelector('.read-rules-back').onclick = function() {
    document.querySelector('.form-slider').style.marginLeft = '0';
}

/* submit check and set 'Signup' button in anabled / disabled */
document.querySelector('#agree-rules').onchange = function() {
    if (this.checked) {
        document.querySelector('#signup-submit').classList.remove('disabled');
    } else {
        document.querySelector('#signup-submit').classList.add('disabled');
    }
}