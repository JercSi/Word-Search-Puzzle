$rows = 0; // number of rows in the puzzle
$columns = 0; // number of columns in the puzzle
$puzzle = new Array(); // saved puzzle from the text area
$words = new Array(); // saved words from the text area
$charsLeft = new Array(); // chars left in each row
$charFoundColor = '#00FF00'; // found character color

$("input#toStep2").click(function() {
    // indexes
  var i, j = 0;
  var rebuild = false; // did puzzle change from the previous onClick event
  
  // hide input form
  $("div#step1").slideUp();
  
  // read variables
  if ($words.length != $("#words").val().split('\n').length) {
    $words = $("#words").val().split('\n');
    $("span#wTotal").html($words.length);
    rebuild = true;
  }
  
  if ($puzzle.length != $("#puzzleText").val().split('\n').length) {
    $puzzle = $("#puzzleText").val().split('\'\n');
    $charsLeft = $puzzle;
    rebuild = true;
    $rows = $puzzle.length;
    $columns = ($puzzle[0].length-1);
  }
  
  // check words length
  var maxLength = ($rows > $columns) ? $rows : $columns;
  for (i=0; i < $words.length; ++i) {
    if ($words[i].length > maxLength) {
      console.log('Word "'+$words[i]+'" is too long!');
    }
  }

  // create table
  if (true == rebuild) {
    $("table#puzzle").html("");
    for (i=0; i < $rows; ++i) {
      $("table#puzzle").append("<tr id=\"r"+i+"\"></tr>");
      for (j=0; j < $columns; ++j) {
        $("table#puzzle tr#r"+i).append("<td id=\"c"+(j+1)+"\" rel=\"E\">"+$puzzle[i].charAt(j+1)+"</td>");
      }
    }
  }
  
  // show form
  $("div#step2").slideDown();
});

$("input#back").click(function() {
  ; // TODO
});

$("input#check").click(function() {
  ; // TODO
});
