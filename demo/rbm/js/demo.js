var demo = {

  // Constants
  STROKE_SIZE: 1,
  LEARNING_RATE: 0.5,
  EPOCHS: 100,
  CDK: 1,

  // Attributes
  rbm: null,
  inputVector: [],
  rows: 0,
  colmns: 0,
  cellSize: 1,
  drawing: false,

  init: function() {
    var rows = parseInt($("#v-rows").val(), 10);
    var columns = parseInt($("#v-columns").val(), 10);

    if (rows && columns && rows * columns < 401) {
      console.log("init with " + rows + " x " + columns);

      this.rows = rows;
      this.columns = columns;
      this.clearInput();

      // Initialize the input canvas
      this.cellSize = Math.round(500.0 / Math.sqrt(this.inputVector.length)); // make it around 500 x 500
      console.log("cell size is " + this.cellSize)
      this.drawInput();

      // Initialize RBS
      this.rbm = new RBM({
        n_visible: rows * columns,
        n_hidden: rows * columns // Make Hidden units same number as visible units
      });

      $('#input').show();
    } else {
      alert("Rows and columns are either not entered or too big. Too many visible/hidden units will crash your computer!");
    }
  },

  // Draw the current inputVector to the input canvas
  drawInput: function() {
    console.log("drawInput with vector " + this.inputVector);
    var self = this;
    var canvas = document.getElementById('canvas-input');
    self.prepareCanvas(canvas);
    self.refreshCanvas(canvas, self.inputVector);

    // Events
    canvas.onmousedown = function(e) {
      var n = self.getVectorPositionFromCoord(e.offsetX, e.offsetY, self.columns);
      console.log("start drawing from n = " + n);
      self.drawing = true;
      self.inputVector[n] = (self.inputVector[n] == 0) ? 1 : 0;
      self.refreshInput();
    };

    canvas.onmousemove = function(e) {
      if (self.drawing) {
        var n = self.getVectorPositionFromCoord(e.offsetX, e.offsetY, self.columns);

        // Only turn them on. Erasing is only done by clicking
        if (self.inputVector[n] == 0) {
          self.inputVector[n] = 1;
          self.refreshInput();
        }
      }
    }

    canvas.onmouseup = function(e) {
      console.log("done drawing");
      self.drawing = false;
    };
  },

  clearInput: function() {
    this.inputVector = [];
    // Initialize with null vector
    for (var i = 0; i < this.rows * this.columns; i++) {
      this.inputVector.push(0);
    }
  },

  refreshInput: function() {
    var canvas = document.getElementById('canvas-input');
    this.refreshCanvas(canvas, this.inputVector);
  },

  prepareCanvas: function(canvas) {
    canvas.width = this.cellSize * this.columns;
    canvas.height = this.cellSize * this.rows;
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;
  },

  refreshCanvas: function(canvas, vector) {
    var ctx = canvas.getContext('2d');

    for(var i = 0; i < this.rows; i++) {
      for(var j = 0; j < this.columns; j++) {
        var y = i * this.cellSize, x = j * this.cellSize;

        // Begin by drawing a solid rectangle
        ctx.fillRect(x, y, this.cellSize, this.cellSize);

        // Clear the rectangle if the element representing this cell is 0
        if (this.getElementAt(i, j, vector, this.columns) == 0) {
          ctx.clearRect(
            x + this.STROKE_SIZE,
            y + this.STROKE_SIZE,
            this.cellSize - (this.STROKE_SIZE * 2), 
            this.cellSize - (this.STROKE_SIZE * 2)
          );
        }
      }
    }
  },

  reconstruct: function() {
    var reconstructedV = this.rbm.reconstruct([this.inputVector]);
    var reconstructedBinaryV = [];
    $.each(reconstructedV[0], function(i,v){
      reconstructedBinaryV.push(
        (v > Math.random()) ? 1 : 0
      );
    });
    $('#output-message').text("Reconstruction Complete! Cross Entropy = " + this.rbm.getReconstructionCrossEntropy());
    this.drawOutput(reconstructedBinaryV);
    this.clearInput();
    this.refreshInput();
  },

  train: function() {
    this.rbm.train({
      input: [this.inputVector],
      lr: this.LEARNING_RATE,
      epochs: this.EPOCHS,
      k: this.CDK
    });
    $('#output-message').text("Train completed!");
    this.clearInput();
    this.refreshInput();
  },

  drawOutput: function(vector) {
    var self = this;
    var canvas = document.getElementById('canvas-output');
    self.prepareCanvas(canvas);
    self.refreshCanvas(canvas, vector);
  },

  getVectorPositionFromCoord: function(x, y, columnNum) {
    var r = Math.floor(y / this.cellSize);
    var c = Math.floor(x / this.cellSize);
    return r * columnNum + c;
  },

  getElementAt: function(row, column, vector, columnNum) {
    return vector[row * columnNum + column];
  }
};
