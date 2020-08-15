/**
 * Created by joonkukang on 2014. 1. 12..
 */
var math = {};

math.randn = function() {
    // generate random guassian distribution number. (mean : 0, standard deviation : 1)
    var v1, v2, s;

    do {
        v1 = 2 * Math.random() - 1;   // -1.0 ~ 1.0 까지의 값
        v2 = 2 * Math.random() - 1;   // -1.0 ~ 1.0 까지의 값
        s = v1 * v1 + v2 * v2;
    } while (s >= 1 || s == 0);

    s = Math.sqrt( (-2 * Math.log(s)) / s );
    return v1 * s;
}

math.shape = function(mat) {
    var row = mat.length;
    var col = mat[0].length;
    return [row,col];
};

math.addVec = function(vec1, vec2) {
    if(vec1.length === vec2.length) {
        var result = [];
        var i;
        for(i=0;i<vec1.length;i++)
            result.push(vec1[i]+vec2[i]);
        return result;
    } else {
        throw new Error("Length Error : not same.")
    }
}

math.minusVec = function(vec1,vec2) {
    if(vec1.length === vec2.length) {
        var result = [];
        var i;
        for(i=0;i<vec1.length;i++)
            result.push(vec1[i]-vec2[i]);
        return result;
    } else {
        throw new Error("Length Error : not same.")
    }
};

math.addMatScalar = function(mat,scalar) {
    var row = math.shape(mat)[0];
    var col = math.shape(mat)[1];
    var i , j,result = [];
    for(i=0 ; i<row ; i++) {
        var rowVec = [];
        for(j=0 ; j<col ; j++) {
            rowVec.push(mat[i][j] + scalar);
        }
        result.push(rowVec);
    }
    return result;
}

math.addMatVec = function(mat,vec) {
    if(mat[0].length === vec.length) {
        var result = [];
        var i;
        for(i=0;i<mat.length;i++)
            result.push(math.addVec(mat[i],vec));
        return result;
    } else {
        throw new Error("Length Error : not same.")
    }
}

math.minusMatVec = function(mat,vec) {
    if(mat[0].length === vec.length) {
        var result = [];
        var i;
        for(i=0;i<mat.length;i++)
            result.push(math.minusVec(mat[i],vec));
        return result;
    } else {
        throw new Error("Length Error : not same.")
    }
}

math.addMat = function (mat1, mat2) {
    if ((mat1.length === mat2.length) && (mat1[0].length === mat2[0].length)) {
        var result = new Array(mat1.length);
        for (var i = 0; i < mat1.length; i++) {
            result[i] = new Array(mat1[i].length);
            for (var j = 0; j < mat1[i].length; j++) {
                result[i][j] = mat1[i][j] + mat2[i][j];
            }
        }
        return result;
    } else {
        throw new Error('Matrix mismatch.');
    }
};

math.minusMat = function(mat1, mat2) {
    if ((mat1.length === mat2.length) && (mat1[0].length === mat2[0].length)) {
        var result = new Array(mat1.length);
        for (var i = 0; i < mat1.length; i++) {
            result[i] = new Array(mat1[i].length);
            for (var j = 0; j < mat1[i].length; j++) {
                result[i][j] = mat1[i][j] - mat2[i][j];
            }
        }
        return result;
    } else {
        throw new Error('Matrix mismatch.');
    }
}

math.transpose = function (mat) {
    var result = new Array(mat[0].length);
    for (var i = 0; i < mat[0].length; i++) {
        result[i] = new Array(mat.length);
        for (var j = 0; j < mat.length; j++) {
            result[i][j] = mat[j][i];
        }
    }
    return result;
};

math.dotVec = function (vec1, vec2) {
    if (vec1.length === vec2.length) {
        var result = 0;
        for (var i = 0; i < vec1.length; i++) {
            result += vec1[i] * vec2[i];
        }
        return result;
    } else {
        throw new Error("Vector mismatch");
    }
};

math.outerVec = function (vec1,vec2) {
    var mat1 = math.transpose([vec1]);
    var mat2 = [vec2];
    return math.mulMat(mat1,mat2);
};

math.mulVecScalar = function(vec,scalar) {
    var i, result = [];
    for(i=0;i<vec.length;i++)
        result.push(vec[i]*scalar);
    return result;
};

math.mulMatScalar = function(mat,scalar) {
    var row = math.shape(mat)[0];
    var col = math.shape(mat)[1];
    var i , j,result = [];
    for(i=0 ; i<row ; i++) {
        var rowVec = [];
        for(j=0 ; j<col ; j++) {
            rowVec.push(mat[i][j] * scalar);
        }
        result.push(rowVec);
    }
    return result;
};

math.mulMatElementWise = function(mat1, mat2) {
    if (mat1.length === mat2.length && mat1[0].length === mat2[0].length) {
        var result = new Array(mat1.length);

        for (var x = 0; x < mat1.length; x++) {
            result[x] = new Array(mat1[0].length);
        }

        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result[i].length; j++) {
                result[i][j] = mat1[i][j] * mat2[i][j]
            }
        }
        return result;
    } else {
        throw new Error("Matrix shape error : not same");
    }
};

math.mulMat = function (mat1, mat2) {
    if (mat1[0].length === mat2.length) {
        var result = new Array(mat1.length);

        for (var x = 0; x < mat1.length; x++) {
            result[x] = new Array(mat2[0].length);
        }


        var mat2_T = math.transpose(mat2);
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result[i].length; j++) {
                result[i][j] = math.dotVec(mat1[i],mat2_T[j]);
            }
        }
        return result;
    } else {
        throw new Error("Array mismatch");
    }
};

math.sumVec = function(vec) {
    var sum = 0;
    var i = vec.length;
    while (i--) {
        sum += vec[i];
    }
    return sum;
};

math.sumMat = function(mat) {
    var sum = 0;
    var i = mat.length;
    while (i--) {
        for(var j=0;j<mat[0].length;j++)
          sum += mat[i][j];
    }
    return sum;
};

math.sumMatAxis = function(mat,axis) {
    // default axis 0;
    // axis 0 : mean of col vector . axis 1 : mean of row vector
    if(axis === 1) {
        var row = math.shape(mat)[0];
        var i ;
        var result = [];
        for(i=0 ; i<row; i++)
            result.push(math.sumVec(mat[i]));
        return result;
    } else {
        mat_T = math.transpose(mat);
        return math.sumMatAxis(mat_T,1);
    }
};

math.meanVec = function(vec) {
    return 1. * math.sumVec(vec) / vec.length;
};

math.meanMat = function(mat) {
    var row = mat.length;
    var col = mat[0].length;
    return 1. * math.sumMat(mat) / (row * col);
};

math.meanMatAxis = function(mat,axis) {
    // default axis 0;
    // axis 0 : mean of col vector . axis 1 : mean of row vector
    if(axis === 1) {
        var row = math.shape(mat)[0];
        var i ;
        var result = [];
        for(i=0 ; i<row; i++)
            result.push(math.meanVec(mat[i]));
        return result;
    } else {
        mat_T = math.transpose(mat);
        return math.meanMatAxis(mat_T,1);
    }
};

math.squareVec = function(vec) {
    var squareVec = [];
    var i;
    for(i=0;i<vec.length;i++) {
        squareVec.push(vec[i]*vec[i]);
    }
    return squareVec;
};

math.squareMat = function(mat) {
    var squareMat = [];
    var i;
    for(i=0;i<mat.length;i++) {
        squareMat.push(math.squareVec(mat[i]));
    }
    return squareMat;
};

math.minVec = function(vec) {
    var min = vec[0];
    var i = vec.length;
    while (i--) {
        if (vec[i] < min)
            min = vec[i];
    }
    return min;
};

math.maxVec = function(vec) {
    var max = vec[0];
    var i = vec.length;
    while (i--) {
        if (vec[i] > max)
            max = vec[i];
    }
    return max;
}

math.minMat = function(mat) {
    var min = mat[0][0];
    var i = mat.length;
    while (i--) {
        for(var j=0;j<mat[0].length;j++) {
            if(mat[i][j] < min)
                min = mat[i][j];
        }
    }
    return min;
};

math.maxMat = function(mat) {
    var max = mat[0][0];
    var i = mat.length;
    while (i--) {
        for(var j=0;j<mat[0].length;j++) {
            if(mat[i][j] < max)
                max = mat[i][j];
        }
    }
    return max;
};

math.zeroVec = function(n) {
    var vec = [];
    while(vec.length < n)
        vec.push(0);
    return vec;
};

math.zeroMat = function(row,col) {
    var mat = [];
    while(mat.length < row)
        mat.push(math.zeroVec(col));
    return mat;
};

math.oneVec = function(n) {
    var vec = [];
    while(vec.length < n)
        vec.push(1);
    return vec;
};

math.oneMat = function(row,col) {
    var mat = [];
    while(mat.length < row)
        mat.push(math.oneVec(col));
    return mat;
};

math.randVec = function(n,lower,upper) {
    lower = (typeof lower !== 'undefined') ? lower : 0;
    upper = (typeof upper !== 'undefined') ? upper : 1;
    var vec = [];
    while(vec.length < n)
        vec.push(lower + (upper-lower) * Math.random());
    return vec;
};

math.randMat = function(row,col,lower,upper) {
    lower = (typeof lower !== 'undefined') ? lower : 0;
    upper = (typeof upper !== 'undefined') ? upper : 1;
    var mat = [];
    while(mat.length < row)
        mat.push(math.randVec(col,lower,upper));
    return mat;
};

math.randnVec = function(n,mean,sigma) {
    var vec = [];
    while(vec.length < n)
        vec.push(mean+sigma* math.randn());
    return vec;
};

math.randnMat = function(row,col,mean,sigma) {
    var mat = [];
    while(mat.length < row)
        mat.push(math.randnVec(col,mean,sigma));
    return mat;
};

math.identity = function (n) {
    var result = new Array(n);

    for (var i = 0; i < n ; i++) {
        result[i] = new Array(n);
        for (var j = 0; j < n; j++) {
            result[i][j] = (i === j) ? 1 : 0;
        }
    }

    return result;
};

math.sigmoid = function(x) {
    var sigmoid = (1.0 / (1 + Math.exp(-x)))
    if(sigmoid ==1) {
     //   console.warn("Something Wrong!! Sigmoid Function returns 1. Probably javascript float precision problem?\nSlightly Controlled value to 1 - 1e-14")
        sigmoid = 0.99999999999999; // Javascript Float Precision Problemath.. This is a limit of javascript.
    } else if(sigmoid ==0) {
      //  console.warn("Something Wrong!! Sigmoid Function returns 0. Probably javascript float precision problem?\nSlightly Controlled value to 1e-14")
        sigmoid = 1e-14;
    }
    return sigmoid; // sigmoid cannot be 0 or 1;;
};

math.dSigmoid = function(x){
    a = math.sigmoid(x);
    return a * (1. - a);
};

math.probToBinaryMat = function(mat) {
    var row = math.shape(mat)[0];
    var col = math.shape(mat)[1];
    var i,j;
    var result = [];

    for(i=0;i<row;i++) {
        var rowVec = [];
        for(j=0;j<col;j++) {
            if(Math.random() < mat[i][j])
                rowVec.push(1);
            else
                rowVec.push(0);
        }
        result.push(rowVec);
    }
    return result;
};

math.activateVec = function(vec,activation) {
    var i, result = [];
    for(i=0;i<vec.length;i++)
        result.push(activation(vec[i]));
    return result;
};

math.activateMat = function(mat,activation) {
    var row = math.shape(mat)[0];
    var col = math.shape(mat)[1];
    var i, j,result = [];
    for(i=0;i<row;i++) {
        var rowVec = [];
        for(j=0;j<col;j++)
            rowVec.push(activation(mat[i][j]));
        result.push(rowVec);
    }
    return result;
};

math.activateTwoVec = function(vec1, vec2,activation) {
    if (vec1.length === vec2.length) {
        var result = new Array(vec1.length);
        for (var i = 0; i < result.length; i++) {
            result[i] = activation(vec1[i],vec2[i]);
        }
        return result;
    } else {
        throw new Error("Matrix shape error : not same");
    }
};

math.activateTwoMat = function(mat1, mat2,activation) {
    if (mat1.length === mat2.length && mat1[0].length === mat2[0].length) {
        var result = new Array(mat1.length);

        for (var x = 0; x < mat1.length; x++) {
            result[x] = new Array(mat1[0].length);
        }

        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result[i].length; j++) {
                result[i][j] = activation(mat1[i][j],mat2[i][j]);
            }
        }
        return result;
    } else {
        throw new Error("Matrix shape error : not same");
    }
};

math.fillVec = function(n,value) {
    var vec = [];
    while(vec.length < n)
        vec.push(value);
    return vec;
};

math.fillMat = function(row,col,value) {
    var mat = [];
    while(mat.length < row) {
        var rowVec = [];
        while(rowVec.length < col)
            rowVec.push(value);
        mat.push(rowVec);
    }
    return mat;
};

math.softmaxVec = function(vec) {
    var max = math.maxVec(vec);
    var preSoftmaxVec = math.activateVec(vec,function(x) {return Math.exp(x - max);})
    return math.activateVec(preSoftmaxVec,function(x) {return x/ math.sumVec(preSoftmaxVec)})
};

math.softmaxMat = function(mat) {
    var result=[], i;
    for(i=0 ; i<mat.length ; i++)
        result.push(math.softmaxVec(mat[i]));
    return result;
};
