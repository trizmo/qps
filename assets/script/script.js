



$(document).ready(function () {
  console.log("QPS GAME RUNNING")

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCH2G5WThavAwQHYer2DliCWWeLs8JcJLo",
    authDomain: "qps-game.firebaseapp.com",
    databaseURL: "https://qps-game.firebaseio.com",
    projectId: "qps-game",
    storageBucket: "",
    messagingSenderId: "197621093014"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


  var playerOneName = "";
  var playerTwoName = "";
  var playerOne = false;
  var playerTwo = false;
  var playerOneNameEntered = false;
  var playerTwoNameEntered = false;
  var gameReady = false;
  var round = 1;

  $("#next").hide();
  $("#playerOneNameDisp").hide();
  $("#playerTwoNameDisp").hide();
  $("#QPSgameDisp").hide();

  localStorage.clear()


  function gameMenuStatusChecker() {
    if (playerOne === true && playerTwo === true && playerOneNameEntered === true && playerTwoNameEntered === true) {
      $("#next").show();
      gameReady = true;
      console.log("WE ARE GOOD TO GO!");
      database.ref().update({
        gameInfo: {
          playerOneName: playerOneName,
          playerTwoName: playerTwoName,
          gameReadyState: gameReady,
          round: round
        }
      })
    }
  };

  $("#playerOneNameSubmit").click(function () {
    playerOneName = $("#playerOneName").val()
    playerOneNameEntered = true;
    console.log("Player One Name: " + playerOneName)
    gameMenuStatusChecker()
  })

  $("#playerTwoNameSubmit").click(function () {
    playerTwoName = $("#playerTwoName").val()
    playerTwoNameEntered = true;
    console.log("Player Two Name: " + playerTwoName)
    gameMenuStatusChecker()
  })

  $("#playerOneSelector").click(function () {
    if (localStorage.getItem("player") === "playerTwo") {
      console.log("TESTINGyou can't be two players!")
    } else {
      localStorage.setItem("player", "playerOne");
      playerOne = true;
      $("#playerOneSelector").addClass("playerSelected");
      console.log("Player 1 has joined the match!: " + playerOne)
      gameMenuStatusChecker()
      $("#playerOneNameDisp").show();
    }

  })

  $("#playerTwoSelector").click(function () {
    if (localStorage.getItem("player") === "playerOne") {
      console.log("TESTINGyou can't be two players!")
    } else {
      localStorage.setItem("player", "playerTwo");
      playerTwo = true;
      $("#playerTwoSelector").addClass("playerSelected");
      console.log("Player 2 has joined the match!: " + playerTwo)
      gameMenuStatusChecker()
      $("#playerTwoNameDisp").show();
    }

  })

  $("#next").click(function () {
    $("#gameMenuDisp").hide();
    console.log("take me to the next page!");
    $("#QPSgameDisp").show();
    gameStart()
  });




  //### GAME STARTS

  function gameStart() {
    console.log(localStorage.getItem("player"))
    database.ref().on("value", function (snapshot) {
      if (snapshot.child("gameInfo").exists()) {
        dbRound = snapshot.val().gameInfo.round;

        $("#roundDisp").text(dbRound);
        // if(localStorage.getItem() === ){

        // }
      }


    })

  }






});