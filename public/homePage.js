
const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        } 
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesboard = new RatesBoard();
function ratesShower() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesboard.clearTable();
            ratesboard.fillTable(response.data);
        }
    });
}
ratesShower();
setInterval(ratesShower, 60000);

const moneymanager = new MoneyManager();
moneymanager.addMoneyCallback = response1 => {
    ApiConnector.addMoney(response1, response2 => {
        if (response2.success) {
            ProfileWidget.showProfile(response2.data);
        }

        if (response2.success) {
            moneymanager.setMessage(response2.success, 'Удачное добавление баланса');
        } else {
            moneymanager.setMessage(response2.success, 'Неудачное добавление баланса');
        }
    });  
};

moneymanager.conversionMoneyCallback = response1 => {
    ApiConnector.convertMoney(response1, response2 => {
        if (response2.success) {
            ProfileWidget.showProfile(response2.data);
        }

        if (response2.success) {
            moneymanager.setMessage(response2.success, 'Удачное конвертирование');
        } else {
            moneymanager.setMessage(response2.success, 'Неудачное конвертирование');
        }
    });
};

moneymanager.sendMoneyCallback = response1 => {
    ApiConnector.transferMoney(response1, response2 => {
        if (response2.success) {
            ProfileWidget.showProfile(response2.data);
        }

        if (response2.success) {
            moneymanager.setMessage(response2.success, 'Удачная передача');
        } else {
            moneymanager.setMessage(response2.success, 'Неудачная передача');
        }
    });
};

const favoriteswidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoriteswidget.clearTable();
        favoriteswidget.fillTable(response.data);
        moneymanager.updateUsersList(response.data);
    }
});

favoriteswidget.addUserCallback = response1 => {
    ApiConnector.addUserToFavorites(response1, response2 => {
        if (response2.success) {
            favoriteswidget.clearTable();
            favoriteswidget.fillTable(response2.data);
            moneymanager.updateUsersList(response2.data);
        }

        if (response2.success) {
            favoriteswidget.setMessage(response2.success, 'Удачное добавление в избранное');
        } else {
            favoriteswidget.setMessage(response2.success, 'Неудачное добавление в избранное');
        }
    });
};

favoriteswidget.removeUserCallback = response1 => {
    ApiConnector.removeUserFromFavorites(response1, response2 => {
        if (response2.success) {
            favoriteswidget.clearTable();
            favoriteswidget.fillTable(response2.data);
            moneymanager.updateUsersList(response2.data);
        }

        if (response2.success) {
            favoriteswidget.setMessage(response2.success, 'Удачное удаление из избранного');
        } else {
            favoriteswidget.setMessage(response2.success, 'Неудачное удаление из избранного');
        }
    });
};