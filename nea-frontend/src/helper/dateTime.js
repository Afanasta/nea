/** 05.12.2020 */
export function formatSimpleDate (date) {
    return zeroPrepend(date.getDate()) + '.' + zeroPrepend(date.getMonth() + 1) + '.' + date.getFullYear();
}

/** Добавляет 0 ко дню недели или номеру месяца */
function zeroPrepend (n) {
    return `${n}`.padStart(2, '0');
}

export function convertRole(role) {
    switch (role) {
        case 'ROLE_ADMIN': return 'Админ'
        case 'ROLE_USER': return 'Пользователь'
    }
}


