fetch("https://sbh-market.ru/api/brands/all/?page=1&limit=20", {
  method: "GET",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log("----------------------------------");
  })
  .catch((error) => {
    console.error("Проблемы с запросом:", error);
  });
