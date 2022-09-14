prediction_1 = ""
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dXrPaRpVm/model.json", model_loaded);
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);


//create your model and store it in var classifier 

//define function modelLoaded

function model_loaded(){
    console.log("Loaded");
}

//define function check() 
function check(){
    image = document.getElementById("captured_image");
    classifier.classify(image, got_results);
}

//define function gotResult(error, results)

function got_results(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        if(results[0].label == "not safe" || results[0].label == "not really safe"){
            document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        }
        else if(results[0].label == "safe"){
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
        }
    }
}

