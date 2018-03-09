
  // Initialize Firebase - copied from firebase website
  var config = {
    apiKey: "AIzaSyAzVKBPM5u_WuKnc0LYDiyTiGBDulFabmA",
    authDomain: "train-dc009.firebaseapp.com",
    databaseURL: "https://train-dc009.firebaseio.com",
    projectId: "train-dc009",
    storageBucket: "",
    messagingSenderId: "874465766051"
  };
  firebase.initializeApp(config);

//   begin code
  var database = firebase.database();
  
//  Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
    
    // Creates local "temporary" object for holding train info
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFreq
    };
    
    // Uploads train data to the database
    database.ref().push(newTrain);
    
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    
    // Alert new train
    alert("Train successfully added");
    
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);
  
    //Reformat train start time
    var trainStartPretty = moment.unix(trainStart).format("HH:mm A");
    
    // Calculate the time to the next train using Moments
      // create a variable for current time
      var now = moment();

    // To calculate the time until next train
    var trainTime = now.diff(moment.unix(trainStart));
    console.log(trainTime);
    var trainTimePretty = moment.unix(trainTime).format("HH:mm A")
    // Calculate time til
    var nextTrain = trainTime * trainFreq;
    console.log(nextTrain);


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStartPretty + "</td><td>" + trainTimePretty + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td></tr>");
  });
  