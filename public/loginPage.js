"use strict";

//const { response } = require("express");

const userform = new UserForm();
userform.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        //console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userform.setLoginErrorMessage('Пользователь не найден');
        }
    });
};

userform.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userform.setRegisterErrorMessage('Ошибка');
        }
    })
};

