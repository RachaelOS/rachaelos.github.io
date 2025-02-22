//change edit... part of url to export?format=csv to convert to csv
const url = "https://docs.google.com/spreadsheets/d/1Q7vS5GgJFSLEL1eJ4tjh99xZ-K6R6Q5uPRLeGSD6tCA/export?format=csv";
//tag to write into
const tag = document.getElementById("review");
//text to show until function is complete
tag.innerHTML = "<p>Loading...</p>";

//read csv file, convert to text, then convert each row into an array using function
fetch(url).then(result=>result.text()).then(function(csvtext) {
    return csv().fromString(csvtext);
}).then(function(csv) {
    //iterate through each row to print each column in array
    /* csv.forEach(function(row) {
        tag.innerHTML = "<h2>" + row.Title + "</h2>";
        tag.innerHTML += "<h2>" + row.Author + "</h2>";
        tag.innerHTML += "<h3>" + row.Rating + "</h3>";
        tag.innerHTML += "<p>" + row.Review + "</p";
        //tag.innerHTML += "<button id=\"closePopup\" style=\"margin-top: 10px; padding: 5px 10px; background-color: #dc3545; color: #fff; border: none; border-radius: 3px;\">Close</button>"
    }) */
        tag.innerHTML="";
        csv.forEach(function(row, index) {
            const title = document.createElement("h2");
            title.className = "review-title";
            title.id = `review-title-${index}`;
            title.textContent = row.Title;
            tag.appendChild(title);
    
            const author = document.createElement("h2");
            author.className = "review-author";
            author.id = `review-author-${index}`;
            author.textContent = row.Author;
            tag.appendChild(author);
    
            const rating = document.createElement("h3");
            rating.className = "review-rating";
            rating.id = `review-rating-${index}`;
            rating.textContent = row.Rating;
            tag.appendChild(rating);
    
            const review = document.createElement("p");
            review.className = "review-text";
            review.id = `review-text-${index}`;
            review.textContent = row.Review;
            tag.appendChild(review);

            const close = document.createElement("button");
            close.id = "closePopup";  
            close.style = "margin-top: 10px; padding: 5px 10px; background-color: #dc3545; color: #fff; border: none; border-radius: 3px;";
            close.textContent = "Close";
            tag.appendChild(close);
        });
})

