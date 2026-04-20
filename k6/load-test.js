import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // ramp up to 10 users over 30s
    { duration: '1m',  target: 10 },  // stay at 10 users for 1 minute
    { duration: '30s', target: 0 },   // ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests must complete within 500ms
    http_req_failed: ['rate<0.01'],    // less than 1% of requests can fail
  },
};

export default function () {
  // Test vote app
  const voteRes = http.get('http://localhost:8080');
  check(voteRes, {
    'vote app status 200': (r) => r.status === 200,
    'vote app response < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);

  // Test result app
  const resultRes = http.get('http://localhost:8081');
  check(resultRes, {
    'result app status 200': (r) => r.status === 200,
    'result app response < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

