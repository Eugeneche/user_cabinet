<?php
    //var_dump($_COOKIE);
    if ( !isset($_COOKIE['email']) OR trim($_COOKIE['email']) ==''){
        header("Location: index.html");
        exit; 
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    </head>
    </head>
    <title>User cabinet</title>
</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col s6 right-align">
                <h1 class="user-cabinet-header">User cabinet</h1>
            </div>
            <div class="col s6 right-align">
                <button id="logout" class="waves-effect waves-light btn #f44336 red">
                <i class="material-icons right">cancel</i></a>Logout</button>
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <form>
                    <div class="row">
                        <div class="col s12">
                            <label class="active" for="signup-email">e-mail: </label>
                            <input id="signup-email" type="text" class="validate">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="signup-name" type="text" class="validate">
                            <label class="active" for="signup-name">Name: </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="signup-pass" type="text" class="validate">
                            <label class="active" for="signup-pass">Password: </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="signup-birthday" type="text" class="datepicker">
                            <label class="active" for="signup-birthday">Birthday: </label>
                        </div>
                        <div class="col s12">
                            <label class="active">Sex: </label>
                            <p>
                                <label>
                                <input class="sex" name="sex" type="radio" value="male" checked />
                                <span>Male</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input class="sex" name="sex" type="radio" value="female" />
                                <span>Female</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input class="sex" name="sex" type="radio" value="other" />
                                <span>It doesn’t matter</span>
                                </label>
                            </p>
                        </div>
                            <button id="signup-start-update" class="waves-effect waves-light btn #ffd600 yellow accent-4"><i class="material-icons right">arrow_forward</i>I want to update</button>
                            <button id="signup-submit" class="waves-effect waves-light btn #00e676 green accent-3"><i class="material-icons right">sync</i>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  


    <script src="script/materialize.min.js"></script>
    <script src="script/ajax.js"></script>
    <script src="script/get_user_data.js"></script>
    <script src="script/chips.js"></script>
</body>

</html>