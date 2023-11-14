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
    // document.getElementById("create-Poem-Container").style.transition = ".5s"
    document.getElementById("create-Poem-Container").style.bottom = "0px"
    document.getElementById("background-Shadown").style.zIndex = "10"
    // document.getElementById("background-Shadown").style.transition = ".5s"
    document.getElementById("background-Shadown").style.opacity = "1"

    setTimeout(function() {
        document.getElementById("create-Poem-Container").style.transition = "0s"
        document.getElementById("background-Shadown").style.transition = "0s"
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
const searchQuery = 'Dark Couple Images'; // Replace with your search query

const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=3`;

fetch(apiUrl, {
    headers: {
        Authorization: apiKey,
    },
})
.then(response => response.json())
.then(data => {
    // Extract the URL of the random photo
    const photoUrl = data.photos[0].src.large;

    // Display the photo or do something else with it
    console.log('Random Photo URL:', photoUrl);
    document.getElementById("poem-Img").setAttribute("src", photoUrl)
    getAverageColor(photoUrl, function (avgColor) {
        document.getElementById("top-Gradient").style.background = "linear-gradient(to bottom, rgb(" + avgColor.r + "," + avgColor.g + "," + avgColor.b + "), white)"
    });

    // getAverageColor(photoUrl, function (avgColor) {
    //     var brighter = isBrighter(avgColor);
    //     if (brighter) {
    //         document.querySelector(".peom-Title").style.color = "rgb(20, 20, 20)"
    //         document.querySelector(".poem-First-Little-Text").style.color = "rgb(50, 50, 50)"
    //         console.log("brighter")
    //     } else {
    //         document.querySelector(".peom-Title").style.color = "rgb(250, 250, 250)"
    //         document.querySelector(".poem-First-Little-Text").style.color = "rgb(220, 220, 220)"
    //         console.log("darker")
    //     }
    // });
    
})
.catch(error => {
    console.error('Error fetching data from Pexels API:', error);
});