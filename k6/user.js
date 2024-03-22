import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    scenarios: {
        growing_scenario: {
            executor: "ramping-vus",
            startVUs: 100,
            stages: [
                { duration: '20s', target: 1000 },
                { duration: '20s', target: 10000 },
                { duration: '20s', target: 20000 },
            ],
        }
    },
    thresholds: {
        http_req_failed: ['rate<0.005'],
        http_req_duration: ['p(95)<500'],
    },
};
export default function () {
    http.get('http://127.0.0.1:3000/user');
    //sleep(1);
}
