export const doSomething = (body: any) => {
  return fetch("/api/endpoint", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
};