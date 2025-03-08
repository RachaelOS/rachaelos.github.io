// This reads the contents of the "book reviews" Google Sheet and displays them on the "Book Reviews" page.
// Each row of the Google Sheet is converted into an array and each of these is printed into the correct HTML element.
// The HTML elements are created using JavaScript and appended to the "review-rows" div.
// For each book, the script creates a series of elements to create a book card on the Library page. After creating 3 of them a new row is created

//"book reviews" Google Sheet url
//change "edit..." part of url to "export?format=csv" to convert to csv
const url = "https://docs.google.com/spreadsheets/d/1xYgVq7ZZNNZI8jY-uVnxGCfuosG3fH4GlPqqOXBIMf4/export?format=csv";
//tag to write each row into
const tag = document.getElementById("review-rows");

//text to show until function is complete
tag.innerHTML = "<p>Loading...</p>";

//read csv file, convert to text, then convert each row into an array using function
fetch(url).then(result=>result.text()).then(function(csvtext) {
    return csv().fromString(csvtext);
}).then(function(csv) {
        //remove loading text
        tag.innerHTML="";

        //counter to keep track of how many books have been written - refreshed for each row
        counter = 0;
        //x to keep track of how many rows have been written - used as row id
        x = 0;

        //create a new row, container, and section for each 3 books
        let divRow = document.createElement("div");
        divRow.className = "row";
        divRow.id = `row-${x}`;

        let divContainer = document.createElement("div");
        divContainer.className = "container";
        divContainer.id = `container-${x}`;

        let sectionBook = document.createElement("section");
        sectionBook.id = `section-${x}`;

        //creates the elements for each book. After 3 books, appends book to current row and creates a new row, refreshing counter
        //unique id for each element is created using the index of the array
        csv.forEach(function(row, index) {

            //update book counter
            counter++;

            //if 3 books have been written, append to current row and create a new row
            if (counter == 4) {
                //appends 3 books to current row
                tag.appendChild(sectionBook);

                //new row number
                x++;
                //reset book counter
                counter = 1;

                //create new row with container and section
                divRow = document.createElement("div");
                divRow.className = "row";
                divRow.id = `row-${x}`;

                divContainer = document.createElement("div");
                divContainer.className = "container";
                divContainer.id = `container-${x}`;

                sectionBook = document.createElement("section");
                sectionBook.id = `section-${x}`;
            };

            //create elements for each book

            //create div for each book
            const div1 = document.createElement("div");
            div1.className = "col-lg-4 col-md-6 mb-4";
            div1.id = `${index}`;

            //creates div for each book card
            const div2 = document.createElement("div");
            div2.className = "training-card position-relative";
            div2.id = `review-card-${index}`;

            //creates div for image
            const divCard = document.createElement("div");
            divCard.className = "card-img";
            divCard.id = `review-card-img-${index}`;

            const img = document.createElement("img");
            img.src = "images/book.png";
            img.className = "img-fluid";
            img.id = `review-img-${index}`;
            divCard.appendChild(img);
            div2.appendChild(divCard);

            //create next div for details on book image
            const divDetail = document.createElement("div");
            divDetail.className = "card-detail position-absolute aos-init aos-animate";
            divDetail.setAttribute("data-aos", "zoom-in-up");
            divDetail.setAttribute("data-aos-duration", "2000");
            divDetail.id = `review-card-detail-${index}`;

            //creates elements to print contents for each book card and popup elements
            const h3 = document.createElement("h3");
            h3.className = "display-6 fw-bold text-uppercase text-light";
            h3.id = `review-h3-${index}`;
            h3.innerHTML = `${row.Title}`;
            divDetail.appendChild(h3);

            const p = document.createElement("p");
            p.className = "text-light";
            p.id = `review-p-${index}`;
            p.textContent = row.Author;
            divDetail.appendChild(p);

            const openButton = document.createElement("button");
            openButton.className = "btn btn-primary btn-small text-uppercase mt-3 btn-pill openPopup";
            openButton.id = `openPopup-${index}`;
            openButton.setAttribute("data-popup-id", `popup-${index}`);
            openButton.textContent = "Open";
            divDetail.appendChild(openButton);

            //popup contents
            const divPopup = document.createElement("div");
            divPopup.className = "popup";
            divPopup.id = `popup-${index}`;

            const divPopupContent = document.createElement("div");
            divPopupContent.className = "popup-content";
            divPopupContent.id = `popup-content`;

            const title = document.createElement("h2");
            title.className = "review-title";
            title.id = `review-title-${index}`;
            title.textContent = row.Title;
            divPopupContent.appendChild(title);
    
            const author = document.createElement("h2");
            author.className = "review-author";
            author.id = `review-author-${index}`;
            author.textContent = row.Author;
            divPopupContent.appendChild(author);
    
            const rating = document.createElement("h3");
            rating.className = "review-rating";
            rating.id = `review-rating-${index}`;
            rating.textContent = row.Rating + "/5";
            divPopupContent.appendChild(rating);

            const Status = document.createElement("h4");
            Status.style.fontStyle = "italic";
            Status.className = "review-status";
            Status.id = `review-status-${index}`;
            Status.textContent = "Status: " + row.Status;
            divPopupContent.appendChild(Status);
    
            const review = document.createElement("p");
            review.className = "review-text";
            review.id = `review-text-${index}`;
            review.textContent = row.Review;
            divPopupContent.appendChild(review);

            const close = document.createElement("button");
            close.id = "closePopup";  
            close.style = "margin-top: 10px; padding: 5px 10px; background-color: #dc3545; color: #fff; border: none; border-radius: 3px;";
            close.textContent = "Close";
            close.className = "closePopup";
            divPopupContent.appendChild(close);

            //the elements are now appended to the correct divs - this is like closing the divs in html
            divPopup.appendChild(divPopupContent);
            divDetail.appendChild(divPopup);
            div2.appendChild(divDetail);
            div1.appendChild(div2);

            //the div for each book is appended to the row
            divRow.appendChild(div1);
            divContainer.appendChild(divRow);
            sectionBook.appendChild(divContainer);
            
        });

        //this appends the last row to the tag once loop is finished
        sectionBook.appendChild(divContainer);
        tag.appendChild(sectionBook);

})

///////////////////////////////////////////////////////////
//BELOW SHOWS WHAT THIS SCRIPT IS DOING

//for each row the following 3 elements are created
{/* 
<section>
    <div class="container">
        <div class="row"></div> */}

//the forEach loop creates the below html elements for each book (reads the data from the csv file)
{/*         <div class="col-lg-4 col-md-6 mb-4">
                <div class="training-card position-relative">
                    <div class="card-img">
                        <img src="images/book.png" class="img-fluid">
                    </div>
                    <div class="card-detail position-absolute aos-init aos-animate" data-aos="zoom-in-up" data-aos-duration="2000">
                        <h3 class="display-6 fw-bold text-uppercase text-light"><a href="#">Title</a></h3>
                        <p class="text-light">Author</p>
                        <button id="openPopup" class="btn btn-primary btn-small text-uppercase mt-3 btn-pill">Open</button>
                        <!-- pop up -->
                        <div id="popup" class="popup">
                            <div class="popup-content">
                                <!--contents of reviews in popup added below-->
                                <div id="review">
                                    <h2 class="review-title">Title</h2>
                                    <h2 class="review-author">Author</h2>
                                    <h3 class="review-rating">Rating</h3>
                                    <p class="review-text">Review</p>
                                </div>
                                <button id="closePopup" style="margin-top: 10px; padding:
                                                                5px 10px; background-color: #dc3545; color: #fff; 
                                                                border: none; border-radius: 3px;">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            
        </div> 
    </div>
<section
*/}

        

//after 3 books, the above is appended to the "review-rows" div and a new row is created, this is looped until all books are added