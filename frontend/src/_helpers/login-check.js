export default function loginCheck(res, data, path) {
    if (res.status === 200) {
        return data;
    } else if (res.status === 401) {
        const params = new URLSearchParams();
        params.set('redirect', path);
        this.redirect(302, `/login?${params.toString()}`);
    } else {
        this.error(res.status, data.message);
    }
}