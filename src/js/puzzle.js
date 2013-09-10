function Puzzle() {
  this.rows = 0; // number of rows in the puzzle
  this.columns = 0; // number of columns in the puzzle
  this.puzzle = new Array(); // the puzzle
  this.words = new Array(); // words need to be found
  
  // harcoded, this could be solved with the CSS class
  this.foundCharacterColor = '#00FF00';
};

Puzzle.prototype = {
  doCreatePuzzle: function() {
    var i, j = 0; // indexes
    var rebuild = false; // rebuild puzzle (new columnds, rows..)
    
    // hide input form
    $("div#step1").slideUp();
    
    // read words
    if (this.words.length != $("#words").val().split('\n').length) {
      this.words = $("#words").val().split('\n');
      $("span#wTotal").html(this.words.length);
      rebuild = true;
    }
    
    if (this.puzzle.length != $("#puzzleText").val().split('\n').length) {
      this.puzzle = $("#puzzleText").val().split('\'\n');
      rebuild = true;
      this.rows = this.puzzle.length;
      this.columns = (this.puzzle[0].length-1);
    }
    
    // TODO: check words length

    // create table
    if (true == rebuild) {
      $("table#puzzle").html("");
      for (i=0; i < this.rows; ++i) {
        $("table#puzzle").append("<tr id=\"r"+i+"\"></tr>");
        for (j=0; j < this.columns; ++j) {
          $("table#puzzle tr#r"+i).append("<td id=\"c"+(j+1)+"\" rel=\"E\">"+this.puzzle[i].charAt(j+1)+"</td>");
        }
      }
    }
    
    // show form
    $("div#step2").slideDown();
  },
  goBack: function() {
    // hide input form
    $("div#step1").slideDown();
    $("div#step2").slideUp();
  },
  solveThePuzzle: function() {
    var wFound = new Array(); // list of words that were found
    var res = false; // was word found in any direction
    var wL = this.words.length;
    var i=0; // index for the words
    var j=0; // index for the puzzle rows
    var k=0; // index for the puzzle columns
    var fChar = ''; // first character
    
    for (i=0; i < wL; ++i) {
      // search all words
      fChar = this.words[i].charAt(0); // get first char and find beginning
      
      wordFound:
      for (j=0; j < this.rows; ++j) {
        for (k=0; k < this.columns; ++k) {
          if (fChar == this.puzzle[j].charAt(k+1)) {
            // first character found
            
            // check left
            res = this.findWordLeft(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            } 
            
            // check right
            res = this.findWordRight(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check top
            res = this.findWordUp(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check bottom
            res = this.findWordDown(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check up-left
            res = this.findWordUpLeft(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check up-right
            res = this.findWordUpRight(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check down-left
            res = this.findWordDownLeft(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
            
            // check down-right
            res = this.findWordDownRight(this.words[i], 1, this.words[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              break wordFound; // word found, break loops
            }
          }
        }
      }
      
      ++wFound;
    }
    $("input#wFound").val(wFound);
    
    $("#pSolution").html(this.getSolution());
  },
  getSolution: function() {
    var result = '';
    $("#puzzle td[rel='E']").each(function(i) {
      result += $(this).html();
    });
    return result;
  },
  findWordLeft: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (0 < k && word.charAt(posW) == this.puzzle[j].charAt(k-1)) {
      result = this.findWordLeft(word, posW+1, wordL, j, k-1);
      if (result !== false) {
        $("table#puzzle tr#r"+j+" td#c"+(k-1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j, k-1);
      }
    }
    return result;
  },
  findWordRight: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (this.columns > k && word.charAt(posW) == this.puzzle[j].charAt(k+1)) {
      result = this.findWordRight(word, posW+1, wordL, j, k+1);
      if (result !== false) {
        $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j, k+1);
      }
    }
    return result;
  },
  findWordUp: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (0 <= (j-1) && word.charAt(posW) == this.puzzle[j-1].charAt(k)) {
      result = this.findWordUp(word, posW+1, wordL, j-1, k);
      if (result !== false) {
        $("table#puzzle tr#r"+(j-1)+" td#c"+k).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j-1, k);
      }
    }
    return result;
  },
  findWordDown: function (word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (this.rows > (j+1) && word.charAt(posW) == this.puzzle[j+1].charAt(k)) {
      result = this.findWordDown(word, posW+1, wordL, j+1, k);
      if (result !== false) {
        $("table#puzzle tr#r"+(j+1)+" td#c"+k).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j+1, k);
      }
    }
    return result;
  },
  findWordUpLeft: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (0 < k && 0 < j && word.charAt(posW) == this.puzzle[j-1].charAt(k-1)) {
      result = this.findWordUpLeft(word, posW+1, wordL, j-1, k-1);
      if (result !== false) {
        $("table#puzzle tr#r"+(j-1)+" td#c"+(k-1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j-1, k-1);
      }
    }
    return result;
  },
  findWordUpRight: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (this.columns > k && 0 < j && word.charAt(posW) == this.puzzle[j-1].charAt(k+1)) {
      result = this.findWordUpRight(word, posW+1, wordL, j-1, k+1);
      if (result !== false) {
        $("table#puzzle tr#r"+(j-1)+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j-1, k+1);
      }
    }
    return result;
  },
  findWordDownLeft: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found

    if (this.rows > (j+1) && 0 < k  && word.charAt(posW) == this.puzzle[j+1].charAt(k-1)) {
      result = this.findWordDownLeft(word, posW+1, wordL, j+1, k-1);
      if (result !== false) {
        $("table#puzzle tr#r"+(j+1)+" td#c"+(k-1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j+1, k-1);
      }
    }
    return result;
  },
  findWordDownRight: function(word, posW, wordL, j, k) {
    var result = false;
    if (posW == wordL) { return true; } // check if all characters were found
    
    if (this.rows > (j+1) && this.columns > k   && word.charAt(posW) == this.puzzle[j+1].charAt(k+1)) {
      result = this.findWordDownRight(word, posW+1, wordL, j+1, k+1);
      if (result !== false) {
        $("table#puzzle tr#r"+(j+1)+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
        return new Array(j+1, k+1);
      }
    }
    return result;
  }
};
