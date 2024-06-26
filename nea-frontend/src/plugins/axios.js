import axios from "axios";
import {useCookies} from "vue3-cookies";
import router from "@/router/index.js";
import {useUserStore} from "@/store/index.js";


const PublicationType = {
    ARTICLE: 1,
    NEWS: 2,
    PROJECT: 3,
    EVENT: 4,
}

const baseURL = '/api'

const api = axios.create({
    baseURL: baseURL,
    timeout: 120000,
});

api.interceptors.request.use((config) => {
    const {cookies} = useCookies()

    const accessToken = cookies.get('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
})


export async function getPublications() {
    return await api.get('/publication/all')
        .then(value => value.data.content);
}

export async function searchPublications(text) {
    return await api.get('/publication/search?text=' + text)
        .then(resp => resp.data.content)
}

export async function getNews() {
    return await api.get(`/publication/all?type=${PublicationType.NEWS}`)
        .then(value => value.data.content)
}

export async function getArticles() {
    return await api.get(`/publication/all?type=${PublicationType.ARTICLE}`)
        .then(value => value.data.content)
}

export async function createPublication(
    title,
    content,
    typeId,
    callback
) {
    const store = useUserStore();

    await api.post('/publication/create', {
        title,
        content,
        typeId
    })
    .then(() => store.updateMessage('Пост успешно создан!', callback))
    .catch(ex => alert(ex.response.data.message));
}

export async function updatePublication(
    id,
    title,
    content,
    typeId,
    callback
) {
    const store = useUserStore();

    await api.put('/publication/update', {
        id,
        title,
        content,
        typeId
    }).then(() => {
        store.updateMessage('Пост успешно изменён!', callback)
    })
        .catch(ex => alert(ex.response.data.message))
}

export async function deletePublication(id) {
    const store = useUserStore();

    await api.delete(`/publication/delete/${id}`)
        .then(() => {
            store.updateMessage('Публикация успешно удалена!', null)

        })
        .catch(ex => alert(ex.response.data.message))
}

export async function createDump(
    formData,
    callback
){
    const store = useUserStore();

    await api.post('/dump/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(() => {
            store.updateMessage('Спасибо за уведомление!', callback)
        })
}

export async function login(email, password) {
    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert('Введённый email не корректный')
        return;
    }

    const { cookies } = useCookies();
    const store = useUserStore();

    await api.post('/auth/login', {
        email,
        password
    })
        .then(({data}) => {
            const date = new Date();
            date.setDate(date.getDate() + 1);

            cookies.set("accessToken", data.token, date, "/", "nsk-ecoacademy.ru", true, "None");

            store.updateMessage('Успешная авторизация!', async () => {
                await router.push({name: 'account'})
            })
        })
        .catch((ex) => alert(ex.response.data.message));
}

export async function registration(email, password) {
    const store = useUserStore();

    await api.post('/auth/register', {
        email,
        password,
    })
    .then(() => {
        store.updateMessage('Успешная регистрация!', () => {
            router.push('/login')
        })
    })
    .catch((ex) => {
        store.updateMessage(ex.response.data.message, () => {})
    });
}

export async function createNewEmployee(email, password) {
    const store = useUserStore();

    await api.post('/user/create', {
        email,
        password
    }).then(() => {
        store.updateMessage('Зарегистрирован новый сотрудник!', null)
    })
}

export async function getDumps() {
    const store = useUserStore();

    return await api.get('/dump/all')
        .then(resp => resp.data.content)
        .catch(ex => {
            store.updateMessage(ex.response.data.message, null)
        })
}

export function generatePicture(name) {
    return `${baseURL}/img/${name}`;
}

export async function getUsers() {
    const store = useUserStore()
    return await api.get('/user/all')
        .then(resp => resp.data.content)
        .then(users =>  users.filter(i => i.login !== store.getUserEmail))
        .catch(ex => alert(ex.response.data.message))
}

export async function updatePassword(old, newPassword) {
    const store = useUserStore();

    await api.put('/user/update/password', {
        oldPassword: old,
        newPassword: newPassword
    })
        .then(() => store.updateMessage('Пароль успешно изменён', null))
        .catch(ex => store.updateMessage(ex.response.data.message, null));
}

export async function deleteUser(userId, callback) {
    const store = useUserStore();

    await api.delete(`/user/delete/${userId}`)
        .then(() => store.updateMessage('Пользователь удалён!', callback))
        .catch(ex => alert(ex.response.data.message));
}

export async function loadPublicationById(publicationId) {
    return await api.get(`/publication/${publicationId}`)
        .then(resp => resp.data)
}

export async function getProjects() {
    return await api.get('/publication/all?type=' + PublicationType.PROJECT)
        .then(value => value.data.content);
}

export async function connect() {
    const store = useUserStore();

    await api.post('/request/connect')
        .then(() => store.updateMessage('Мы свяжемся с вами в ближайшее время', null))
        .catch(ex => store.updateMessage(ex.response.data.message, null))
}

export async function getConnectRequest() {
    const resp = await api.get('/request/all')
        .catch(ex => alert(ex.response.data.message));

    return resp.data;
}

export async function approveUserRequest(id, callback) {
    await api.post('/request/approve?id=' + id)
        .then(callback())
        .catch(ex => alert(ex.response.data.message))
}

export async function disapproveUserRequest(id, callback) {
    await api.post('/request/disapprove?id=' + id)
        .then(callback())
        .catch(ex => alert(ex.response.data.message))
}

export async function subscribeToMail() {
    const store = useUserStore();

    await api.post('/mail/subscribe')
        .then(() => store.updateMessage('Спасибо что подписались', null))
        .catch(ex => store.updateMessage(ex.response.data.message, null))
}

export async function changeUserType(id, typeId, callback) {
    const store = useUserStore();

    await api.put('/user/update', {
        id: id,
        userTypeId: typeId
    })
        .then(callback())
        .catch(ex => store.updateMessage(ex.response.data.message, null))
}

export async function boundMail(payload) {
    const store = useUserStore();

    await api.post('/mail/bound', payload)
        .then(() => store.updateMessage('Спасибо за обратную связь!', null))
        .catch(ex => store.updateMessage(ex.response.data.message, null))
}
