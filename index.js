//utils
function drawTable(people) {
    // Prepare table HTML
    var tableHTML = '<thead><tr><th>ID</th><th>Title</th><th>Description</th><th>Price</th></tr></thead><tbody>';
    // Loop thru all products to generate rows of the table
    people.forEach(function (p) {
        tableHTML += "<tr><td>".concat(p.name, "</td><td>").concat(p.brith_year, "</td><td>").concat(p.description, "</td><td>").concat(p.price, "</td></tr>");
    });
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement').innerHTML = tableHTML;
}
//handlers
function paginateProducts(page) {
    fetch('https://swapi.dev/api/people/?page=${page}')
        .then(function (res) { return res.json(); })
        .then(function (data) {
        //we invoke a draw table function with the 10 initials characters
        drawTable(data.results);
    });
}
fetch('https://swapi.dev/api/people')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    var pages = Math.ceil(data.count / 10);
    var paginationElement = document.querySelector('#paginationElement');
    var pagesHTML = '';
    for (var index = 0; index < pages; index++) {
        var currentIndex = index + 1;
        pagesHTML += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\" onclick=\"paginateProducts(".concat(currentIndex, ")\" > ").concat(currentIndex, " </a></li>");
    }
    paginationElement.innerHTML = pagesHTML;
    // Hide spinner
    var spinnerElement = document.querySelector('#spinnerContainer');
    spinnerElement.style.display = 'none';
});
