let token = get_tokenWithExpiry('token'); //calls get_token.. fun to validate expiry of token and return it 
var bookId;

if (token != null) {
    getWishList();
}
else {
    //if token not present or expired it will throw alert and navigate to login pages
    alert('Please Login first!!');
    window.location.href = 'http://127.0.0.1:5501/Pages/User/LoginAndSignup.html';
}

var wishlistdata;

function getWishList(){
    $.ajax({
        url: "https://localhost:44358/WishList/GetAllWishList",
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            wishlistdata = result.data;
            wishlistdata.reverse();
            console.log(wishlistdata);
            displayWishlist(wishlistdata);
        },
        error: function (error) {
            console.log(error);
            alert('Something went wrong while fetching wishlist!!');
        }
    })
}


function displayWishlist(wishlistdata){
    let counter = 0;
    for (let i = 0; i < wishlistdata.length; i++) {
      counter++;
    }
    document.getElementById('wh2').innerHTML=`&nbsp&nbsp(${counter})`;
    document.getElementById('wishlist').innerHTML = wishlistdata.map((wishitem) =>
    `<div class="displaybook">
        <div class="Img">
            <img class="bookimg" src="${wishitem.bookImg}" alt="">    
        </div>
        <div  id="Bookfields" >
            <p class="p1" >${wishitem.bookName}</p>
            <P class="p2" >${wishitem.author}</P>
            <div class="price">
                <P class="p5" >Rs. ${wishitem.price}</P>
                <P class="p6" >Rs. ${wishitem.discountPrice}</P>
            </div>
        </div>
        <div id="deleteWishitem" >
        <img id="i3" src="../../Assets/Book/delete.png" alt="" onclick="deleteWishItem(${wishitem.wishListId})" >   
        </div> 
    </div>
    `     
).join(' ');

}

function deleteWishItem(wishListId){
    console.log(wishListId);
    $.ajax({
        url: `https://localhost:44358/WishList/DeleteWishListItem/${wishListId}`,
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            alert('Book Removed from Wishlist successfully...');
            getWishList();s
        },
        error: function (error) {
            console.log(error);
            alert('Something went wring while removing book to wishlist!!');
        }
    })
}


function quickView(bookId){
   console.log('inside quickview');
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