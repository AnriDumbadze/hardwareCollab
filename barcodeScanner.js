// Ensure that the page has loaded before accessing the DOM elements
document.getElementById('barCodeOn').addEventListener("click", function(event) {
    // Get video element
    var video = document.getElementById('video');
    var scannerChoice = document.getElementById('choiceContainer');
    scannerChoice.classList.remove('active')
    video.style.display = "block";
    // Check if user's browser supports camera access
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            // Set the video source to the user's camera stream
            video.srcObject = stream;
            video.play();
        });
    }

    // Initialize barcode scanner library
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: video
        },
        decoder : {
            readers : ["ean_reader", "ean_8_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Listen for barcode detection events
    Quagga.onDetected(function(data) {
        var code = data.codeResult.code;
        var outputElement = document.getElementById('output');
        
        // Check if the detected barcode matches the specific barcode
        if (code === "9789941116933") {
            outputElement.innerHTML = 'Coca Cola';
            outputElement.style.color = 'green';
            scannerChoice.classList.add('active')
            fetch0(code);
            return; 
            
        }


    
        // If the barcode doesn't match, display the detected code in red
        outputElement.style.color = `red`;
        outputElement.innerHTML = 'Barcode detected: ' + code;
    });
    
    
});

function fetch0(data) {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(function(res) {
        console.log(res);
    })
    .catch(function(err) {
        console.error('Error during fetch:', err);
    });
}

