let token = get_tokenWithExpiry('token'); //calls get_token.. fun to validate expiry of token and return it 
var bookId;

if (token != null) {
    bookId=localStorage.getItem('bookId');
    document.getElementById('bh2').innerHTML=`(${bookId})`;
    getBookById();
}
else {
    //if token not present or expired it will throw alert and navigate to login pages
    alert('Please Login first!!');
    window.location.href = 'http://127.0.0.1:5501/Pages/User/LoginAndSignup.html';
}

var Bookdata;

function getBookById(){
    $.ajax({
        url: `https://localhost:44358/Book/GetBookById/${bookId}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            Bookdata = result.data;
            console.log(result);
            displayBookInfo(Bookdata);
            getAllFeedback(bookId);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//function to display all info of a specific Book
function displayBookInfo(bookdata){
    document.getElementById('Book').innerHTML = (
    `
        <div class="leftContainer">
          <div class="bookcover">
                <img id="bookImg" src="${bookdata.bookImg}">
          </div>
          <div class="btns">
            <div class="addToCart" onclick="AddTOCart(${bookdata.bookId})">
                <span id="ltxt">ADD TO BAG</span>
            </div>
            <div class="addToWishList" onclick="AddTOWishlist(${bookdata.bookId})">
                <img id="wishIcon" src="../../Assets/Book/wishlist.png" alt="">
                <span id="ltxt">WISHLIST</span>
            </div>
          </div>  
        </div>
        <div class="rightContainer">
            <div  id="Bookfields" >
                <p class="p1" >${bookdata.bookName}</p>
                <P class="p2" >${bookdata.author}</P>
                <div class=rating>
                    <div class=totalrating>
                        <P class="p3" >${bookdata.totalRating}</P>
                        <img id="ratingstar" src="../../Assets/Book/ratingStar.png" alt="">
                    </div>
                    <P class="p4" >(${bookdata.ratingCount})</P>
                </div>
                <div class="price">
                    <P class="p5" >Rs. ${bookdata.price}</P>
                    <P class="p6" >Rs. ${bookdata.discountPrice}</P>
                </div>
            </div>
            <hr id="rhr1">
            <div class="bookDesc">
                <span id="desc">Description</span>
                <p id="p7">${bookdata.description}</p>
                <hr id="rhr2">
            </div>
            <div class="CustmFeed">
                <span id="feedh1">Customer Feedback</span>
                <div class="feedContainer">
                    <div class="ratingfeed">
                        <span id="feedh2">Overall rating</span> 
                        <ul class="stars">
                           <li class="star" ><i class="fa fa-star"></i></li>
                           <li class="star" ><i class="fa fa-star"></i></li>
                           <li class="star" ><i class="fa fa-star"></i></li>
                           <li class="star" ><i class="fa fa-star"></i></li>
                           <li class="star" ><i class="fa fa-star"></i></li>
                        </ul>
                    </div>
                    <div class="comment">
                        <textarea type="text" class="t2" id="feedback" ></textarea>
                    </div>
                    <div class="CustmFeedBtns">
                        <span id="btn3" onclick="ResetFeedFields()">Cancel</span>
                        <span id="btn4" onclick="AddFeedback(${bookdata.bookId})">Submit</span>
                    </div>    
                </div>
            </div>
            <div class="reivews">
                <span id="btn5" onclick="getFeedbackCards()">All Reviews &nbsp▿</span>
                <div class="showReviews" id="viewfeed"> </div>
            </div>
        </div>
    `
    );
    
    const star= document.querySelectorAll('.star');

    for(i=0;i<star.length;i++){
    star[i].starvalue = (i+1);
       
    ['click','mouseover','mouseout'].forEach(function(e){
        star[i].addEventListener(e,showrating);
    })
    }

    function showrating(e){
        let type = e.type;
        let starvalue = this.starvalue;
        console.log(starvalue);
        if(type==='click')
        {
            setrating(starvalue);
            console.log('thisis value in show rating:'+Rating );
        }
        star.forEach(function(elem,index){
            if(type === 'click')
            {   
                if(index < starvalue)
                {   
                    elem.classList.add("golden")
                }
                else
                {  
                    elem.classList.remove("golden");
                }
            }

            if(type === 'mouseover')
            {
                if(index < starvalue)
                { 
                    elem.classList.add("yellow")
                }
                else
                { 
                    elem.classList.remove("yellow");
                }            
            }

            if(type === 'mouseout')
            {   
                elem.classList.remove("yellow");
            }
        })
    }
}

function AddTOCart(bookId){
    data={
        bookId:bookId,
        bookQuantity:1
    }
    $.ajax({
        url: 'https://localhost:44358/Cart/AddBookTOCart',
        type: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            Bookdata = result.data;
            console.log(result);
            alert('Book added to Cart successfully...');
        },
        error: function (error) {
            console.log(error);
            alert('Something went wring while adding book to Cart!!');
        }
    });
}


function AddTOWishlist(bookId){
    $.ajax({
        url: `https://localhost:44358/WishList/AddTOWishList/${bookId}`,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            Bookdata = result.data;
            console.log(result);
            alert('Book added to Wishlist successfully...');
        },
        error: function (error) {
            console.log(error);
            alert('Check weather is already in wishlist OR Book already in Cart!!');
        }
    })
}



var Rating=0;

function setrating(rating){
  Rating=rating;
  console.log(Rating);
}

function ResetFeedFields(){
    location.reload();
}

function AddFeedback(bookId){
    console.log(bookId);
    let feedback = document.getElementById('feedback');
    if(Rating>0 && feedback.value!=null)
    {
        let feedbackdata={
            bookId:bookId,
            rating:Rating,
            comment:feedback.value
        }
        $.ajax({
            url: "https://localhost:44358/Feedback/AddFeedback",
            type: 'POST',
            data: JSON.stringify(feedbackdata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                Bookdata = result.data;
                console.log(result);
                alert('Feedback sumitted successfully...');
                ResetFeedFields();
                getAllFeedback();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    else{
        alert('Please provide valid feedback!!');
    }
}

var Feedbackdata;
function getAllFeedback(){
    $.ajax({
        url: `https://localhost:44358/Feedback/GetAllFeedbacks/${bookId}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            Feedbackdata = result.data;
            console.log(Feedbackdata);
        },
        error: function (error) {
            console.log(error);
            alert('No Feedbacks available for this book!!');
        }
    })
}


function getFeedbackCards(){
    getAllFeedback();
    let viewfeed = document.getElementById('viewfeed');
    if(!viewfeed.classList.contains('show'))
    {
        viewfeed.classList.add('show');
        viewFeedbackCards(Feedbackdata);
    }
    else
    {
        viewfeed.classList.remove('show');
    }   

}


function viewFeedbackCards(feedbackdata){
    document.getElementById('viewfeed').innerHTML = feedbackdata.map((feedback)=>
        `
         <div class="feedbackCard">
            <div id="feedheader">
                <img id="fCIcon" src="../../Assets/Book/person.png" alt="">
                <p class="fC1" >${feedback.fullName}</p>
            </div>
            <div id="fCRating">
                <ul class="fstars">
                    <li class="fstar" ><i class="fa fa-star"></i></li>
                    <li class="fstar" ><i class="fa fa-star"></i></li>
                    <li class="fstar" ><i class="fa fa-star"></i></li>
                    <li class="fstar" ><i class="fa fa-star"></i></li>
                    <li class="fstar" ><i class="fa fa-star"></i></li>
                </ul>
            </div>
            <div id="fCComment">
                <p class="fC2" >${feedback.comment}</p>
            </div>
         </div> 

        `
    ).join(' ');   
}



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

