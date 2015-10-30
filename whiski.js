$(document).ready(function() {


        
        $('#output').hide();
    
        //Submit all form data to server 
        //and retrieve all database rows for
        //the selected bottle for "submit" button
        $('#rating').on('submit', function(e) {
          var formData = $(this).serialize();

          //show results
          $('#rating').hide();
          $('#output').show();

          $.post("/PHP/whiskiDB.php", formData, processData);
     
          return false;

  });
  
        //Submit bottle name to server
        //to retrieve all database rows
        //for "view results" button.
        //Using GET to help differentiate
        //requests in PHP script because
        $('#resultsB').click(function() {
          var formData = ("bottle=" + document.getElementById("bottle").value);

          //show results
          $('#rating').hide();
          $('#output').show();

          //retrieve data
          $.get("/PHP/whiskiDB.php", formData, processData);
     
          return false;

  });
  



     function processData(data){
          var bottle = document.getElementById("bottle").value;
          var overallN = parseInt((document.getElementById("overall").value), 10);              
          var uniquenessN = parseInt((document.getElementById("uniqueness").value), 10);
          var smoothnessN = parseInt((document.getElementById("smoothness").value), 10);
          var tasteN = (document.getElementById("taste").value).toLowerCase().split(",");
          var aromaN = (document.getElementById("aroma").value).toLowerCase().split(",");


              var parsedData = JSON.parse(data);


              function pullNumber(obj, key){
                return Number(obj[key]);
              }

              function parseNum(array, sum, key, callback){
                results = [];
                if (array.length === 0 && (sum >= 0)) {
                  results.push(sum);
                } else if (array.length === 0 && (isNaN(sum))) {
                  return "No scores submitted for this whiskey.";
                } else if (array.length > 0 && (isNaN(sum))) {
                  for (i=0; i<array.length; i++) {
                    results.push(callback(array[i], key));
                  }
                }  else if (array.length > 0 && (sum >= 0)) {
                  results.push(sum);
                  for (i=0; i<array.length; i++) {
                    results.push(callback(array[i], key));
                  }
                } 
                  var total = results.reduce(function(a, b) {
                      return a + b;
                    });
                  return (total/(array.length + 1)).toFixed(1);
              }


              //displays which whiskey we rated and are viewing results for
              function namer(bottle){
                name = bottle.toString().split('_').join(' ');
                return name;
              }

            //scrubs inputs for obvious variations and creates an array of all tasting notes
             function parseNotes(object, input, key){
                var notes = [];
                if (input.length === 1) {notes.push(input.toString())}
                if (input.length > 1) {
                  var multiWordArray = input;
                      for (j=0; j<multiWordArray.length; j++){
                        var wordSplit = multiWordArray[j].split("");
                        if (wordSplit[0] === " ") {
                          multiWordArray[j] = wordSplit.slice(1).join("");
                        } else {
                          multiWordArray[j] = wordSplit.join("");
                        }
                        notes.push(multiWordArray[j]);
                    }  
                }
                for (i=0; i<object.length; i++){
                  var str = object[i][key];
                  if (str.length === 1){
                    notes.push(str);
                  } else {
                    var multiWordArray = str.toLowerCase().split(",");
                      for (j=0; j<multiWordArray.length; j++){
                        var wordSplit = multiWordArray[j].split("");
                        if (wordSplit[0] === " ") {
                          multiWordArray[j] = wordSplit.slice(1).join("");
                        } else {
                          multiWordArray[j] = wordSplit.join("");
                        }
                        notes.push(multiWordArray[j]);
                    }
                }
              }
                return notes;
              }



              // finds the top three most used words
              function checkForObject(array) {
                 var aoo = [];
                 if (array[0] == 0) {array = array.slice(1);}
                 if (array[0] == 0 && array.length == 1) {return "No notes submitted for this whiskey.";}
                 else if (array.length < 4) {
                  return array.join(", ");
                 } else {
                  for (i=0;i<array.length;i++){
                    value = array[i];
                    if (!(incrementOrFalse(aoo, value))) {
                      aoo.push({name: value, count: 1});
                    } 
                  }
                var sortedArray = aoo.sort(function(a,b){return b.count - a.count});
                var rawAnswers = [sortedArray[0].name, sortedArray[1].name, sortedArray[2].name];
                var formattedNotes = rawAnswers.join(", ");
                return formattedNotes;
              }               
            }

              function incrementOrFalse(array, value){
                  for (j=0;j<array.length;j++){
                    if (array[j].name === value) {
                      array[j].count++;
                      return true;
                    } 
                  }
                  return false;
                }


              $("#output").html(

                "<p>Thanks for submitting your rating!</p>" + 
                "<p>Results for <strong>" + namer(bottle) + "</strong>:</p>" + 
                "<p>Overall Score: " + parseNum(parsedData, overallN, "overall", pullNumber) + "</p>" +
                "<p>Uniqueness Score: " + parseNum(parsedData, uniquenessN, "uniqueness", pullNumber) + "</p>" +
                "<p>Smoothness Score: " + parseNum(parsedData, smoothnessN, "smoothness", pullNumber) + "</p>" +
                "<p>Top Reported Tasting Notes: " + checkForObject(parseNotes(parsedData, tasteN, "taste")) + "</p>" +
                "<p>Top Reported Aroma Notes: " + checkForObject(parseNotes(parsedData, aromaN, "aroma")) + "</p>"
                );
              
          }

});