const firebaseConfig = {
    apiKey: "AIzaSyD05IcVDfMqI4jpCaAgr8dRBKykEtPpojc",
    authDomain: "superchat-d6246.firebaseapp.com",
    databaseURL: "https://superchat-d6246-default-rtdb.firebaseio.com",
    projectId: "superchat-d6246",
    storageBucket: "superchat-d6246.appspot.com",
    messagingSenderId: "306638710041",
    appId: "1:306638710041:web:ddf5fbf0be912cb60a5188",
    measurementId: "G-PXTT6E6J3S"
};

firebase.initializeApp(firebaseConfig);
var img = new Image();

function getAverageColor(imageUrl, callback) {
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
    
        var imageData = ctx.getImageData(0, 0, img.width, img.height);
        var data = imageData.data;
    
        var totalR = 0, totalG = 0, totalB = 0;
    
        for (var i = 0; i < data.length; i += 4) {
            totalR += data[i];
            totalG += data[i + 1];
            totalB += data[i + 2];
        }
    
        var pixelCount = data.length / 4;
    
        var avgR = Math.round(totalR / pixelCount);
        var avgG = Math.round(totalG / pixelCount);
        var avgB = Math.round(totalB / pixelCount);
    
        var avgColor = {
            r: avgR,
            g: avgG,
            b: avgB
        };
    
        callback(avgColor);
    };
}

function isBrighter(avgColor) {
    // Calculate luminance using the formula: Y = 0.299 * R + 0.587 * G + 0.114 * B
    var luminance = 0.299 * avgColor.r + 0.587 * avgColor.g + 0.114 * avgColor.b;
  
    // You can adjust the threshold value based on your preference
    var threshold = 128;
  
    return luminance > threshold;
}

function showCreateOption() {
    document.getElementById("create-Poem-Container").style.transition = ".5s"
    document.getElementById("create-Poem-Container").style.bottom = "0px"
    document.getElementById("create-Poem-Container").style.top = "0px"
    document.getElementById("background-Shadown").style.zIndex = "10"
    document.getElementById("background-Shadown").style.transition = ".5s"
    document.getElementById("background-Shadown").style.opacity = "1"

    setTimeout(function() {
        document.getElementById("create-Poem-Container").style.transition = "0s"
        document.getElementById("background-Shadown").style.transition = "0s"
    })
}

function closeCreateOption() {
    document.getElementById("create-Poem-Container").style.transition = ".5s"
    document.getElementById("create-Poem-Container").style.bottom = "-100vh"
    document.getElementById("create-Poem-Container").style.top = "100vh"
    document.getElementById("background-Shadown").style.transition = ".5s"
    document.getElementById("background-Shadown").style.opacity = "0"
    // document.querySelector("body").style.background = "var(--otherCurrent-Color)"

    setTimeout(function() {
        document.getElementById("create-Poem-Container").style.transition = "0s"
        document.getElementById("background-Shadown").style.transition = "0s"
        setTimeout(function() {        
            document.getElementById("background-Shadown").style.zIndex = "-1"
        }, 200)
    })
}

// showCreateOption()
  
// Example usage:
function getAverageColorFromFirebaseStorage(imagePath, callback) {
    // Get a reference to the storage service
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // Create a reference to the image
    var imageRef = storageRef.child(imagePath);

    // Get the download URL of the image
    imageRef.getDownloadURL().then(function (imageUrl) {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = function () {
            getAverageColor(img.src, function (avgColor) {
                callback(avgColor);
            });
        };
    }).catch(function (error) {
        console.error('Error getting download URL:', error);
    });
}

// Example usage:
var imagePath = 'images/bjcwvjspvhtvoiuuidgv'; // replace with your image path
getAverageColorFromFirebaseStorage(imagePath, function (avgColor) {
    console.log('Average Color:', avgColor);
    var brighter = isBrighter(avgColor);
    if (brighter) {
        document.querySelector(".peom-Title").style.color = "rgb(20, 20, 20)"
        document.querySelector(".poem-First-Little-Text").style.color = "rgb(40, 40, 40)"
        console.log("brighter")
    } else {
        document.querySelector(".peom-Title").style.color = "rgb(250, 250, 250)"
        document.querySelector(".poem-First-Little-Text").style.color = "rgb(220, 220, 220)"
        console.log("darker")
    }

    console.log('Average Color:', avgColor);
    
    document.querySelector(".writing-Container").style.background = "linear-gradient(to right, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ") 65%, rgb(20, 20, 20) 100%)"
});

// var imageUrl = 'https://firebasestorage.googleapis.com/v0/b/superchat-d6246.appspot.com/o/images%2Fbjcwvjspvhtvoiuuidgv?alt=media&token=d7c7940d-0f20-4288-91c9-488898131e46';

// var img = new Image();
// img.crossOrigin = "anonymous"; // Use lowercase "anonymous"
// img.src = imageUrl;

// document.querySelector(".writing-Img").setAttribute("src", imageUrl);

// img.onload = function() {
//     getAverageColor(img.src, function (avgColor) {
//         var brighter = isBrighter(avgColor);
//         if (brighter) {
//             document.querySelector(".peom-Title").style.color = "rgb(20, 20, 20)"
//             document.querySelector(".poem-First-Little-Text").style.color = "rgb(40, 40, 40)"
//             console.log("brighter")
//         } else {
//             document.querySelector(".peom-Title").style.color = "rgb(250, 250, 250)"
//             document.querySelector(".poem-First-Little-Text").style.color = "rgb(220, 220, 220)"
//             console.log("darker")
//         }

//         console.log('Average Color:', avgColor);
        
//         document.querySelector(".writing-Container").style.background = "linear-gradient(to right, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ") 65%, rgb(20, 20, 20) 100%)"
//     });
// };

// // You can also add this line to set the mode to 'cors' for the fetch request
// fetch(imageUrl, { mode: 'cors' })
// .then(response => response.blob())
// .then(blob => {
//     // Handle the blob data if needed
//     console.log(blob)
// })
// .catch(error => console.error('Error fetching image:', error));

// poem-First-Little-Text


const apiKey = 'pTFdtB7nkvUbpcUtForgIX9NaX7YNgFYFM2QZ2eHbkmLox4u1P6mF5Zk';
var searchQuery = 'Poem Background Images'; // Replace with your search query

const style = document.createElement('style');
var r = document.querySelector(':root');
var words = document.querySelectorAll(".word");

var imageIndex = 10

// function changeImage() {
//     document.querySelector("body").style.background = "var(--actualCurrent-Color)"
//     // searchQuery = document.getElementById("poem-Title-Change").value
//     document.getElementById("create-Poem-Container").style.transition = ".5s"
    
//     document.getElementById("camera-Icon").style.transition = ".5s"
//     document.getElementById("camera-Icon").style.opacity = "0"

//     setTimeout(function() {
//         document.querySelector(".loader-5").style.transition = ".5s"
//         document.querySelector(".loader-5").style.opacity = "1"
//         setTimeout(function() {
//             document.getElementById("poem-Img").style.transition = ".5s"
//             document.getElementById("poem-Img").style.opacity = "0"

//            setTimeout(function() {
//                 imageIndex += 1
//                 var apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=` + imageIndex;

//                 fetch(String(apiUrl), {
//                     headers: {
//                         Authorization: apiKey,
//                     },
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     // Extract the URL of the random photo
//                     const photoUrl = data.photos[0].src.large;

//                     document.getElementById("poem-Img").setAttribute("src", photoUrl)
//                     getAverageColor(photoUrl, function (avgColor) {
//                         if(!isBrighter(avgColor)) {
//                             document.getElementById("poem-Title-Change").style.transition = ".5s"
//                             document.getElementById("poem-Title-Change").style.color = "white"
                            
//                             style.innerHTML = `#poem-Title-Change::placeholder {
//                                 color: rgb(255, 255, 255, 0.75);
//                                 font-style: italic;
//                             }`;
                
//                             // Append the style rule to the document head
//                             document.head.appendChild(style);
                            
//                             r.style.setProperty('--actualCurrent-Color', "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")");
//                             r.style.setProperty('--current-Color', "rgb(0, 0, 0, 0.25)");
//                             r.style.setProperty('--otherCurrent-Color', 'rgb(255, 255, 255, 0.75)');
//                         } else {
//                             document.getElementById("poem-Title-Change").style.transition = ".5s"
//                             document.getElementById("poem-Title-Change").style.color = "rgb(25, 25, 25)"
                
//                             style.innerHTML = `#poem-Title-Change::placeholder {
//                                 color: rgb(20, 20, 20, 0.75);
//                                 font-style: italic;
//                             }`;
                
//                             document.head.appendChild(style);

//                             r.style.setProperty('--actualCurrent-Color', "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")");
//                             r.style.setProperty('--current-Color', "rgb(255, 255, 255, 0.25)");
//                             r.style.setProperty('--otherCurrent-Color', 'rgb(20, 20, 20, 0.75)');
//                         }
                        
//                         document.getElementById("poem-Img-Container").style.transition = ".5s"
//                         document.querySelector(".loader-5").style.transition = ".5s"
//                         document.querySelector(".loader-5").style.opacity = "0"
//                         setTimeout(function() {
//                             document.getElementById("camera-Icon").style.transition = ".5s"
//                             document.getElementById("camera-Icon").style.opacity = "0.5"
//                             document.getElementById("poem-Img-Container").style.transition = "0s"
//                             document.getElementById("poem-Img").style.transition = ".5s"
//                             document.getElementById("poem-Img").style.opacity = "0.7"
//                             setTimeout(function() {
//                                 document.getElementById("create-Poem-Container").style.transition = "0s"
//                                 document.getElementById("poem-Img").style.transition = "0s"
//                             }, 500)
//                         }, 500);
//                     });
                    
//                 })
//                 .catch(error => {
//                     // console.error('Error fetching data from Pexels API:', error);
//                 });
//            }, 500)
//         }, 1000)
//     }, 500)
// }

// changeImage()

function generateRandomLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < 20; i++) {
        // Get a random index from the alphabet string
        const randomIndex = Math.floor(Math.random() * alphabet.length);

        // Append the random letter to the string
        randomString += alphabet.charAt(randomIndex);
    }

    return randomString;
}

function checkImage() {
    var input = document.getElementById('imageInput');
    
    if (input.files.length > 0) {
        // User has selected an image
        console.log('Image selected:', input.files[0].name);
        uploadImage()
    } else {
        // No image selected
        console.log('No image selected');
    }
}

function uploadImage() {
    var input = document.getElementById('imageInput');

    document.getElementById("poem-Img").style.transition = ".5s"
    document.getElementById("poem-Img").style.opacity = "0"

    if (input.files.length > 0) {
        var file = input.files[0];

        // Create a storage reference
        var storageRef = firebase.storage().ref();

        // Create a reference to the file you want to upload
        var imageRef = storageRef.child('images/' + generateRandomLetters());

        // Upload the file
        imageRef.put(file).then(function(snapshot) {
            console.log('Image uploaded successfully!');
            
            // You can get the download URL of the uploaded image
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                document.getElementById("poem-Img").setAttribute("src", downloadURL)

                setTimeout(function() {
                    document.getElementById("poem-Img").style.transition = ".5s"
                    document.getElementById("poem-Img").style.opacity = "0.7"
                }, 500)
            });
        }).catch(function(error) {
            console.error('Error uploading image:', error);
        });
    } else {
        alert('Please select an image first.');
    }
}