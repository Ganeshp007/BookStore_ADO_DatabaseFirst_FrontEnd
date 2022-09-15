let token = get_tokenWithExpiry('token'); //calls get_token.. fun to validate expiry of token and return it 
if (token != null) {
    getAllBooks();
}
else {
    //if token not present or expired it will throw alert and navigate to login pages
    alert('Please Login first!!');
    window.location.href = 'http://127.0.0.1:5501/Pages/User/LoginAndSignup.html';
}

var BooksArray ;

// Function for calling getAllnote API and storing bookdata into bookArray
function getAllBooks() {
    $.ajax({
        url: 'https://localhost:44358/Book/GetAllBooks',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            BooksArray = result.data;
            console.log(result);
            displayAllBooks(BooksArray);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

// function displays the filtered notearray from respective event listener using template literals to pass code dynamically
function displayAllBooks(Booksdata) {
    let counter = 0;
    for (let i = 0; i < Booksdata.length; i++) {
      counter++;
    }
    document.getElementById('bh2').innerHTML=`(${counter} items)`;
    document.getElementById('Books').innerHTML = Booksdata.map((Book) =>
    `<div class="displaybook">
        <div class="Img">
            <img class="bookimg" src="${Book.bookImg}" alt="">    
        </div>
        <div  id="Bookfields" >
            <p class="p1" >${Book.bookName}</p>
            <P class="p2" >${Book.author}</P>
            <div class=rating>
               <div class=totalrating>
                <P class="p3" >${Book.totalRating}</P>
                <img id="ratingstar" src="../../../Assets/Book/ratingStar.png" alt="">
                </div>
               <P class="p4" >(${Book.ratingCount})</P>
            </div>
            <div class="price">
                <P class="p5" >Rs. ${Book.price}</P>
                <P class="p6" >Rs. ${Book.discountPrice}</P>
            </div>
        </div>
    </div>
    `     
).join(' ');
};

//function to get token if not expired or else it will return
function get_tokenWithExpiry(key) {
    let tokendata = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (tokendata == null) {
        return null;
    }

    let item = JSON.parse(tokendata);
    let now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null;
    }
    return item.value;
}
