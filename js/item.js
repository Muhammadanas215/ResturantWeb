// console.log("Dasdas")
let auth = firebase.auth();
var storage = firebase.storage()
let itemName = document.getElementById('name');
let price = document.getElementById('price')
let foodCat = document.getElementById('foodCat')
let deliveryType = document.getElementById('deliveryType')
let image = null;
let id = 0
let imgName, imgUrl;
let files = [];

console.log(storage)
function Selectfood(e) {
    foodCat = e.value
}

function selectImage(e) {
    image = e.value
    console.warn(image);
}

function selectDeliveryType(e) {
    deliveryType = e.value

}

function addItem() {
    let uid = firebase.auth().currentUser.uid;
    let foodItem = {
        id: id++,
        foodName: itemName.value,
        foodPrice: price.value,
        foodType: foodCat,
        deliveryType: deliveryType,
        foodImage: image
    }
    firebase.database().ref(`items/${uid}` + `id/${id}`).set(foodItem).then((result) => {
        alert("Item added successfully!")
        window.location = 'dashboard.html'
        // files = [image]
        // let reader = new FileReader();
        // reader.onload() = function (params) {
        //     document.getElementById('foodImg').src = reader.result;
        // }
        // reader.readAsDataURL(files[0])
    }).catch((err) => {
        console.log(err)
    });
}
