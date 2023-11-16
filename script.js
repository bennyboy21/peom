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
            
            // You can get the download URL of the uploaded image
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                document.getElementById("poem-Img").setAttribute("src", downloadURL)

                var img = new Image()

                img.src = downloadURL

                img.onload = function() {
                    setTimeout(function() {
                        document.getElementById("poem-Img").style.transition = ".5s"
                        document.getElementById("poem-Img").style.opacity = "0.7"

                        var imgSRC = document.getElementById("poem-Img").src
                        var title = document.getElementById("poem-Title-Change").value
                    
                        if(title != "" && imgSRC != "") {
                            document.getElementById("create-Poem").style.opacity = "1"
                        } else {
                            document.getElementById("create-Poem").style.opacity = "0.5"
                        }
                    }, 1500)
                }
            });
        }).catch(function(error) {
            console.error('Error uploading image:', error);
        });
    } else {
        alert('Please select an image first.');
    }
}

function categorizeDates(dateArray) {
    const currentDate = new Date();  // Current date and time

    const result = dateArray.map((dateString) => {
        const date = new Date(dateString);
        const timeDifference = currentDate.getTime() - date.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return "Current day";
        } else if (daysDifference === 1) {
            return "Previous day";
        } else if (daysDifference <= 7) {
            return "Last 7 days";
        } else if (daysDifference <= 30) {
            return "Last 30 days";
        } else {
            return "Over a month ago";
        }
    });

    return result;
}

// Example usage:
const dateArray = ["2023-11-01T12:00:00", "2023-11-05T08:00:00", "2023-11-15T18:30:00"];
const result = categorizeDates(dateArray);
console.log(result);

function checkCompletion() {
    var imgSRC = document.getElementById("poem-Img").src
    var title = document.getElementById("poem-Title-Change").value

    if(title != "" && imgSRC != "") {
        document.getElementById("create-Poem").style.opacity = "1"
    } else {
        document.getElementById("create-Poem").style.opacity = "0.5"
    }
}

function createPoem() {
    var imgSRC = document.getElementById("poem-Img").src
    var title = document.getElementById("poem-Title-Change").value

    if(title != "" && imgSRC != "") {
        sec = new Date().getSeconds()
        min = new Date().getMinutes()
        hour = new Date().getHours()
        day = new Date().getDate()
        month = new Date().getMonth()
        year = new Date().getFullYear()

        if(sec < 10) {
            sec = 0 + String(sec)
        }

        if(min < 10) {
            min = 0 + String(min)
        }

        if(hour < 10) {
            hour = 0 + String(hour)
        }

        if(day < 10) {
            day = 0 + String(day)
        }

        if(month < 10) {
            month = 0 + String(month)
        }

        dateInfo = String(year) + String(month) + String(day) + String(hour) + String(min) + String(sec)
        firebase.database().ref("Poems/" + dateInfo).set({
            "last_Updated":String(new Date()),
            "poem_Text": "",
            "poem_Title": title,
            "poem_Img": imgSRC
        })
    } else if(title != "" && imgSRC == "") {
        alert("Add Poem Cover Image")
    } else if(title == "" && imgSRC != "") {
        alert("Add Title To Poem")
    } else {
        alert("Add Title & Poem Cover Image")
    }
}

function formatTimeAgo(lastEditedDate, currentDate) {
    const timeDifference = currentDate.getTime() - lastEditedDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds}s ago`;
    } else if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days < 7) {
        return `${days}d ago`;
    } else if (weeks < 4) {
        return `${weeks}w ago`;
    } else if (months < 12) {
        return `${months}mo ago`;
    } else {
        return `${years}y ago`;
    }
}

var index = 0

firebase.database().ref("Poems/").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
        console.log(child.val())
        const lastEditedDate = new Date(child.val().last_Updated);
        const currentDate = new Date();
        const formattedTimeAgo = formatTimeAgo(lastEditedDate, currentDate);
        console.log(formattedTimeAgo);
        var element = document.createElement("div")

        element.classList.add("writing-Container")

        element.setAttribute("onclick", "openPoem(" + index + ")")

        element.innerHTML = '<div id="img-Glow"></div><div class="text-Container"><div class="peom-Title">' + child.val().poem_Title + '</div><div class="poem-First-Little-Text">' + child.val().poem_Text + '</div></div><div class="date">' + formattedTimeAgo + '</div>'
        document.getElementById("writing-Container").prepend(element)
        index += 1
    })
})

function openPoem(currentIndex) {
    currentIndex = (index - currentIndex) - 1
    console.log(currentIndex)
}