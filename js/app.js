// let storage = firebase.storage();
let auth = firebase.auth();
// let db = firebase.firestore();






let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let radio = '';
let resname = document.getElementById("Resname");
let country = document.getElementById("country");
let city = document.getElementById("city")

let register = () => {

    if (!username.value || !email.value || !password.value) {
        alert("All fields are required!")
    } else if (password.value.length < 6) {
        alert('Password must be atleast 6 characters')
    } else if (radio == "seller") {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((res) => {
                let user = {
                    uid: res.user.uid,
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    radio,
                    resname: resname.value,
                    country: country.value,
                    city: city.value

                }
                firebase.database().ref(`admin/${res.user.uid}` + `type/${radio}`).set(user)
                    .then(() => {
                        alert("Registered Successfully");
                        window.location = "login.html"
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            })
            .catch((err) => {
                alert(err.message)
            });
    } else {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((res) => {
                let user = {
                    uid: res.user.uid,
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    radio,
                    resname: Resname.value,
                    country: country.value,
                    city: city.value

                }
                firebase.database().ref(`users/${res.user.uid}` + `type/${radio}`).set(user)
                    .then(() => {
                        alert("Registered Successfully");
                        window.location = "login.html"
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            })
            .catch((err) => {
                alert(err.message)
            });
    }
}

let login = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`admin/${res.user.uid}type/seller`).once('value').then((snapshot) => {
                let admin = snapshot.val()
                console.log(snapshot.val())
                if (admin) {
                    console.log("adminn")
                    window.location = 'dashboard.html'
                } else {
                    firebase.database().ref(`users/${res.user.uid}type/Customer`).once('value').then((snapshot) => {
                        let user = snapshot.val()
                        if (user)
                        console.log("user")
                            window.location = 'customer.html'
                    })
                }
            })
        })
        .catch((err) => {
            alert(err.message)
        })

}


function radioValue(element) {
    radio = element.value;
    resturantname()
    console.log(element.value)


}

function resturantname() {
    if (radio == "seller") {
        document.getElementById("hidden").setAttribute("class", "")

    }
    else {
        document.getElementById("hidden").setAttribute("class", "inputhidden")
    }
}

 function signout() {
     auth.signOut();
    window.location = "login.html"
}
