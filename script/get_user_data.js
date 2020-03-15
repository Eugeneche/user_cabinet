/* getting cookie to identificate user by e-mail */

let userEmail = getCookie('email');

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

/* getting user data from server to show only */

ajax('core/get_user_data.php', undefined, showUserData, { 'email': userEmail });

function showUserData(result) {
    result = JSON.parse(result);

    document.querySelector('#signup-email').outerHTML = `${userEmail}`;
    document.querySelector('#signup-name').value = result.name;
    document.querySelector('#signup-pass').value = result.password;
    document.querySelector('#signup-birthday').value = result.birthday;
    M.updateTextFields();

    /* setting inputs in disabled */

    let t = document.querySelectorAll('input[type="text"]');

    for (let i = 0; i < t.length; i++) {
        t[i].disabled = true;
    }

    /* output to the modsl window previously selected radio button */
    document.querySelector(`.sex[value="${result.sex}"]`).outerHTML = `<input type="radio" value="${result.sex}" name="sex" checked class="sex">`;

    /* setting radio buttons in disabled */

    let s = document.querySelectorAll('.sex');

    for (let i = 0; i < s.length; i++) {
        s[i].disabled = true;
    }

    /* hiding Sign Up button */
    document.querySelector('#signup-submit').style.cssText = 'display: none';
}

/* getting user data from server to change */

document.querySelector('#signup-start-update').onclick = function(event) {
    event.preventDefault();
    ajax('core/get_user_data.php', undefined, getUserData, { 'email': userEmail });
}

/* setting inputs in anabled */

function getUserData(result) {
    result = JSON.parse(result);

    document.querySelector('#signup-name').value = result.name;
    document.querySelector('#signup-pass').value = result.password;
    document.querySelector('#signup-birthday').value = result.birthday;
    M.updateTextFields();

    let t = document.querySelectorAll('input[type="text"]');

    for (let i = 0; i < t.length; i++) {
        t[i].disabled = false;
    }

    /* output to the modsl window previously selected radio button */
    document.querySelector(`.sex[value="${result.sex}"]`).outerHTML = `<input type="radio" value="${result.sex}" name="sex" checked class="sex">`;

    /* setting radio buttons in anabled */

    let s = document.querySelectorAll('.sex');

    for (let i = 0; i < s.length; i++) {
        s[i].disabled = false;
    }

    /* output 'Update' button, hiding 'I Want To Update' button */
    document.querySelector('#signup-submit').style.cssText = 'display: block';
    document.querySelector('#signup-start-update').style.cssText = 'display: none';
}

/* getting new user data and updating them on the server */

document.querySelector('#signup-submit').onclick = function(event) {
    event.preventDefault();
    let name = document.querySelector('#signup-name').value;
    let pass = document.querySelector('#signup-pass').value;
    let birthday = document.querySelector('#signup-birthday').value;
    let sex = document.querySelectorAll('.sex');
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }

    let updatedData = {
        'email': userEmail,
        'name': name,
        'pass': pass,
        'birthday': birthday,
        'sex': sex,
    }

    /* AJAX request to update user data */

    ajax('core/update_user_data.php', undefined, updateUserData, updatedData);

    function updateUserData(result) {
        if (result == 1) {
            createChips('Your data has been updated successfully!', 'LightGreen', 5000);
        } else {
            createChips('An update error has occurred, please try again later.', 'red', 5000);
        }
    }
}

/* logout function */

document.querySelector('#logout').onclick = function () {
    var c = document.cookie;
    var d = new Date();

    /* set cookie expires time minus 10 min from current time */
    d.setTime(d.getTime() - (10 * 60 * 1000));
    var expires = d.toUTCString();
    document.cookie = `${c}; expires=${expires}; path=/`;
    location.reload();
}