import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 100,
    duration: '30s',
};
export default function () {
    http.get('http://127.0.0.1:3000/user/918a6240-8c91-46ba-ae5a-83864c3b69c0');
    sleep(1);
}
