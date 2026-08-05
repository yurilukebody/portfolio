const _maxlevels = 4;
const _numSides = 6;
let pentagon;
let _strutFactor;
let _strutNoise;
function setup() {
    canvas = createCanvas(1920, 1080);
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');//canvasを後ろに移動する
    smooth();
    stroke(3,3, 245, 15);
    _strutNoise = random(10);
    _strutFactor = (noise(_strutNoise) * 2) - 1;
}
function draw() {
    background(13);
    _strutNoise += 0.01;
    _strutFactor = noise(_strutNoise) * 2;
    pentagon = new FractalRoot(frameCount);
    pentagon.drawShape();
}
class PointObj {
    constructor(ex, why) {
        this.x = ex;
        this.y = why;
    }
}
class FractalRoot {
    constructor(startAngle) {
        this.pointArr = [];
        this.centX = width / 3;
        this.centY = height / 1.9;
        let angleStep = 360 / _numSides;
        let count = 0;
        for (let i = 0; i < 1024; i += angleStep) {
            this.x = this.centX + (250 * cos(radians(startAngle + i)));
            this.y = this.centY + (250 * sin(radians(startAngle + i)));
            this.pointArr[count] = new PointObj(this.x, this.y);
            count++;
        }
        this.rootBranch = new Branch(0, 0, this.pointArr);
    }
    drawShape() {
        this.rootBranch.drawMe();
    }
}
class Branch {
    constructor(lev, n, points) {
        this.myBranches = [];
        this.newPoints = [];
        this.level = lev;
        this.num = n;
        this.outerPoints = points;
        this.midPoints = this.calcMidPoints();
        this.projPoints = this.calcStrutPoints();
        if ((this.level + 1) < _maxlevels) {
            this.childBranch = new Branch(this.level + 1, 0, this.projPoints);
            this.myBranches = append(this.myBranches, this.childBranch);
            for (let k = 0; k < this.outerPoints.length; k++) {
                let nextk = k - 1;
                if (nextk < 0) { nextk += this.outerPoints.length; }
                this.newPoints = [this.projPoints[k], this.midPoints[k], this.outerPoints[k], this.midPoints[nextk], this.projPoints[nextk]];
                this.childBranch = new Branch(this.level + 1, k + 1, this.newPoints);
                this.myBranches = append(this.myBranches, this.childBranch);
            }
        }
    }
    drawMe() {
        strokeWeight(1 - this.level);
        for (let i = 0; i < this.outerPoints.length; i++) {
            let nexti = i + 1;
            if (nexti == this.outerPoints.length) { nexti = 0; } {
                line(this.outerPoints[i].x, this.outerPoints[i].y, this.outerPoints[nexti].x, this.outerPoints[nexti].y);
            }
        }
        strokeWeight(0.3);
        fill(255, 150);
        for (let j = 0; j < this.midPoints.length; j++) {
            line(this.midPoints[j].x, this.midPoints[j].y, this.projPoints[j].x, this.projPoints[j].y);
        }
        for (let k = 0; k < this.myBranches.length; k++) {
            this.myBranches[k].drawMe();
        }
    }
    calcMidPoints() {
        this.mpArray = [];
        for (let i = 0; i < this.outerPoints.length; i++) {
            let nexti = i + 1;
            if (nexti == this.outerPoints.length) { nexti = 0; }
            let thisMP = this.calcMidPoint(this.outerPoints[i], this.outerPoints[nexti]);
            this.mpArray[i] = thisMP;
        }
        return this.mpArray;
    }
    calcMidPoint(end1, end2) {
        let mx, my;
        if (end1.x > end2.x) {
            mx = end2.x + ((end1.x - end2.x) / 2);
        } else {
            mx = end1.x + ((end2.x - end1.x) / 2);
        }
        if (end1.y > end2.y) {
            my = end2.y + ((end1.y - end2.y) / 2);
        } else {
            my = end1.y + ((end2.y - end1.y) / 2);
        }
        return new PointObj(mx, my);
    }
    calcStrutPoints() {
        this.strutArray = [];
        for (let i = 0; i < this.midPoints.length; i++) {
            let nexti = i + 3;
            if (nexti >= this.midPoints.length) {
                nexti -= this.midPoints.length;
            }
            let thisSP = this.calcProjPoint(this.midPoints[i], this.outerPoints[nexti]);
            this.strutArray[i] = thisSP;
        }
        return this.strutArray;
    }
    calcProjPoint(mp, op) {
        let px, py;
        let adj, opp;
        if (op.x > mp.x) {
            opp = op.x - mp.x;
        } else {
            opp = mp.x - op.x;
        }
        if (op.y > mp.y) {
            adj = op.y - mp.y;
        } else {
            adj = mp.y - op.y;
        }
        if (op.x > mp.x) {
            px = mp.x + (opp * _strutFactor);
        } else {
            px = mp.x - (opp * _strutFactor);
        }
        if (op.y > mp.y) {
            py = mp.y + (adj * _strutFactor);
        } else {
            py = mp.y - (adj * _strutFactor);
        }
        return new PointObj(px, py);
    }
}