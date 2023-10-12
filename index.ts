type Rating = {
  count: number;
  rate: number;
};

type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

//utils
function drawTable(people){
   // Prepare table HTML
   let tableHTML: string = '<thead><tr><th>ID</th><th>Title</th><th>Description</th><th>Price</th></tr></thead><tbody>';
   // Loop thru all products to generate rows of the table
   people.forEach((p: any) => {
     tableHTML += `<tr><td>${p.name}</td><td>${p.brith_year}</td><td>${p.description}</td><td>${p.price}</td></tr>`;
   });
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement')!.innerHTML = tableHTML;
}

//handlers
function paginateProducts(page: number){
  fetch('https://swapi.dev/api/people/?page=${page}')
    .then(res => res.json())
    .then(( data: any ) => {
    //we invoke a draw table function with the 10 initials characters
    drawTable(data.results);
  });
}

fetch('https://swapi.dev/api/people')
  .then(res => res.json())
  .then(( data: any ) => {

    const pages = Math.ceil(data.count / 10);

    const paginationElement = document.querySelector('#paginationElement');

    let pagesHTML = '';

    for (let index = 0; index < pages; index++) {
      const currentIndex = index + 1;
      pagesHTML += `<li class="page-item"><a class="page-link" href="#" onclick="paginateProducts(${currentIndex})" > ${currentIndex} </a></li>`

    }

    paginationElement.innerHTML = pagesHTML;

    // Hide spinner
    const spinnerElement: HTMLElement = document.querySelector('#spinnerContainer')!;
    spinnerElement.style.display = 'none';
  });