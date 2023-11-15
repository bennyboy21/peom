function getAverageColor(imageUrl, callback) {
    var img = new Image();
    img.crossOrigin = "Anonymous"; // Enable cross-origin resource sharing (CORS)
    
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
  
    img.src = imageUrl;
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

    setTimeout(function() {
        document.getElementById("create-Poem-Container").style.transition = "0s"
        document.getElementById("background-Shadown").style.transition = "0s"
        setTimeout(function() {        
            document.getElementById("background-Shadown").style.zIndex = "-1"
        }, 200)
    })
}

showCreateOption()
  
// Example usage:
var imageUrl = 'https://media.istockphoto.com/id/1305916856/vector/abstract-yellow-dot-pattern-background.jpg?s=612x612&w=0&k=20&c=DugZ-FNxvbaxu9QTB3o4JK7UGE6TjZCmkK6yxlGVjok=';

getAverageColor(imageUrl, function (avgColor) {
    var brighter = isBrighter(avgColor);
    if (brighter) {
        document.querySelector(".peom-Title").style.color = "rgb(20, 20, 20)"
        document.querySelector(".poem-First-Little-Text").style.color = "rgb(50, 50, 50)"
        console.log("brighter")
    } else {
        document.querySelector(".peom-Title").style.color = "rgb(250, 250, 250)"
        document.querySelector(".poem-First-Little-Text").style.color = "rgb(220, 220, 220)"
        console.log("darker")
    }
});

// poem-First-Little-Text

getAverageColor(imageUrl, function (avgColor) {
    console.log('Average Color:', avgColor);
    document.querySelector(".writing-Img").setAttribute("src", imageUrl)
    
    document.querySelector(".writing-Container").style.background = "linear-gradient(to right, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ") 70%, rgb(230, 230, 230) 100%)"
});


const apiKey = 'pTFdtB7nkvUbpcUtForgIX9NaX7YNgFYFM2QZ2eHbkmLox4u1P6mF5Zk';
var searchQuery = 'Poem Background Images'; // Replace with your search query

const style = document.createElement('style');

var imageIndex = 10

function changeImage() {
    // searchQuery = document.getElementById("poem-Title-Change").value
    
    document.getElementById("camera-Icon").style.transition = ".5s"
    document.getElementById("camera-Icon").style.opacity = "0"

    setTimeout(function() {
        document.querySelector(".loader-5").style.transition = ".5s"
        document.querySelector(".loader-5").style.opacity = "1"
        setTimeout(function() {
            document.getElementById("poem-Img").style.transition = ".5s"
            document.getElementById("poem-Img").style.opacity = "0"

           setTimeout(function() {
                imageIndex += 1
                var apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=` + imageIndex;

                fetch(String(apiUrl), {
                    headers: {
                        Authorization: apiKey,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    // Extract the URL of the random photo
                    const photoUrl = data.photos[0].src.large;

                    document.getElementById("poem-Img").setAttribute("src", photoUrl)
                    getAverageColor(photoUrl, function (avgColor) {
                        if(!isBrighter(avgColor)) {
                            document.getElementById("poem-Title-Change").style.transition = ".5s"
                            document.getElementById("poem-Title-Change").style.color = "white"
                            
                            style.innerHTML = `#poem-Title-Change::placeholder {
                                color: rgb(255, 255, 255, 0.75);
                                font-style: italic;
                            }`;
                
                            // Append the style rule to the document head
                            document.head.appendChild(style);
                            document.getElementById("poem-Title-Change").style.border = "2px solid rgb(255, 255, 255, 0.25)"
                        } else {
                            document.getElementById("poem-Title-Change").style.transition = ".5s"
                            document.getElementById("poem-Title-Change").style.color = "rgb(25, 25, 25)"
                
                            style.innerHTML = `#poem-Title-Change::placeholder {
                                color: rgb(20, 20, 20, 0.75);
                                font-style: italic;
                            }`;
                
                            document.head.appendChild(style);
                            document.getElementById("poem-Title-Change").style.border = "2px solid rgb(0, 0, 0, 0.2)"
                        }
                        document.getElementById("poem-Img-Container").style.border = "7px solid " + "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")"
                        document.getElementById("poem-Img-Container").style.transition = ".5s"
                        document.getElementById("poem-Img-Container").style.background = "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")"
                        document.querySelector(".loader-5").style.transition = ".5s"
                        document.querySelector(".loader-5").style.opacity = "0"
                        setTimeout(function() {
                            document.getElementById("camera-Icon").style.transition = ".5s"
                            document.getElementById("camera-Icon").style.opacity = "0.5"
                            document.getElementById("poem-Img-Container").style.transition = "0s"
                            document.getElementById("poem-Img").style.transition = ".5s"
                            document.getElementById("poem-Img").style.opacity = "0.7"
                            setTimeout(function() {
                                document.getElementById("poem-Img").style.transition = "0s"
                            }, 500)
                        }, 500);
                        document.getElementById("poem-Title-Change").style.background = "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")"
                        // document.getElementById("top-Gradient").style.background = "radial-gradient(rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ") 10%, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ", 0.5) 15%, white 100%)"
                    });
                    
                })
                .catch(error => {
                    // console.error('Error fetching data from Pexels API:', error);
                });
           }, 500)
        }, 1000)
    }, 500)
}

// changeImage()

const poemWords = [
    "Serene", "Whisper", "Enchant", "Meadow", "Melody",
    "Tranquil", "Cascade", "Ephemeral", "Celestial", "Luminous",
    "Ethereal", "Twilight", "Echo", "Sorrow", "Bliss",
    "Solitude", "Embrace", "Radiant", "Mirage", "Illuminate",
    "Quiver", "Resonate", "Awe", "Surrender", "Velvet",
    "Tranquility", "Essence", "Cradle", "Cascade", "Harmony",
    "Blossom", "Mystical", "Serenade", "Silhouette", "Ponder",
    "Whimsical", "Journey", "Echoes", "Reverie", "Cascade",
    "Velvet", "Ethereal", "Silken", "Gossamer", "Glisten",
    "Enigma", "Nebula", "Quixotic", "Soothe", "Enrapture"
];

const emotions = [
    "Joy",
    "Serenity",
    "Gratitude",
    "Contentment",
    "Amazement",
    "Compassion",
    "Elation",
    "Sympathy",
    "Jubilation",
    "Tenderness",
    "Bliss",
    "Adoration",
    "Empathy",
    "Wonder",
    "Delight",
    "Affection",
    "Ecstasy",
    "Inspiration",
    "Satisfaction",
    "Radiance",
    "Tranquility",
    "Awe",
    "Fondness",
    "Amusement",
    "Reverence",
    "Calm",
    "Glee",
    "Zeal",
    "Warmth",
    "Rapture",
    "Gaiety",
    "Hope",
    "Astonishment",
    "Love",
    "Jubilance",
    "Pity",
    "Felicity",
    "Nostalgia",
    "Euphoria",
    "Excitement",
    "Altruism",
    "Comfort",
    "Jubilee",
    "Melancholy",
    "Regret",
    "Yearning",
    "Solace",
    "Inspiration",
    "Sorrow",
    "Optimism"
];
  

for(var i=0;i<poemWords.length;i++) {
    if(i == 0) {
        document.getElementById("search-Prompts").innerHTML += "<div class='word selected'>" + poemWords[i] + "</div>"
    } else {
        document.getElementById("search-Prompts").innerHTML += "<div class='word'>" + poemWords[i] + "</div>"
    }
}

// var apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=` + imageIndex;

// fetch(String(apiUrl), {
//     headers: {
//         Authorization: apiKey,
//     },
// })
// .then(response => response.json())
// .then(data => {
//     // Extract the URL of the random photo
//     const photoUrl = data.photos[0].src.large;

//     // Display the photo or do something else with it
//     // console.log('Random Photo URL:', photoUrl);
//     document.getElementById("poem-Img").setAttribute("src", photoUrl)
//     getAverageColor(photoUrl, function (avgColor) {
//         if(!isBrighter(avgColor)) {
//             document.getElementById("poem-Title-Change").style.transition = ".5s"
//             document.getElementById("poem-Title-Change").style.color = "white"
//             const style = document.createElement('style');
//             style.innerHTML = `#poem-Title-Change::placeholder {
//                 color: #rgb(255, 255, 255, 0.75);
//                 font-style: italic;
//             }`;

//             // Append the style rule to the document head
//             document.head.appendChild(style);
//             document.getElementById("poem-Title-Change").style.border = "2px solid rgb(255, 255, 255, 0.25)"
//         } else {
//             console.log("darker")
//             document.getElementById("poem-Title-Change").style.transition = ".5s"
//             document.getElementById("poem-Title-Change").style.color = "black"

//             const style = document.createElement('style');
//             style.innerHTML = `#poem-Title-Change::placeholder {
//                 color: #rgb(0, 0, 0, 0.75);
//                 font-style: italic;
//             }`;

//             document.getElementById("poem-Title-Change").style.border = "2px solid rgb(0, 0, 0, 0.2)"
//         }
//         document.getElementById("poem-Img-Container").style.border = "7px solid " + "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")"
//         document.getElementById("poem-Title-Change").style.background = "rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ")"
//         // document.getElementById("top-Gradient").style.background = "radial-gradient(rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ") 10%, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + ", 0.5) 15%, white 100%)"
//     });
// })
// .catch(error => {
//     console.error('Error fetching data from Pexels API:', error);
// });

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverlapping(element, otherElements) {
    const rect1 = element.getBoundingClientRect();

    for (const otherElement of otherElements) {
        const rect2 = otherElement.getBoundingClientRect();

        if (
            rect1.right >= rect2.left &&
            rect1.left <= rect2.right &&
            rect1.bottom >= rect2.top &&
            rect1.top <= rect2.bottom
        ) {
            return true; // Elements overlap
        }
    }

    return false; // No overlap
}

function createRandomPoemWords(containerId, numWords) {
    const container = document.getElementById(containerId);
    const existingWords = [];

    for (let i = 0; i < numWords; i++) {
        const word = poemWords[getRandomInt(0, poemWords.length - 1)];

        const wordElement = document.createElement("div");
        wordElement.innerText = word;
        wordElement.className = "poemWord";
        
        wordElement.style.fontSize = `${getRandomInt(12, 24)}px`;
        wordElement.style.fontWeight = getRandomInt(400, 900);

        let xPos, yPos;
        if(!isOverlapping(wordElement, existingWords)) {
            xPos = getRandomInt(0, container.clientWidth - wordElement.clientWidth);
            yPos = getRandomInt(0, container.clientHeight - wordElement.clientHeight);
        }

        wordElement.style.left = `${xPos}px`;
        wordElement.style.top = `${yPos}px`;

        container.appendChild(wordElement);
        existingWords.push(wordElement);
    }
}

createRandomPoemWords("create-Poem-Container", 25);