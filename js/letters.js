var snap = Snap("#svg");

//var lilcircle = snap.circle(1000, 40, 20);

var lilsquare = snap.rect(1040, 60, 35, 35);
lilsquare.attr({fill: "#F00FFF"});

//var liltriangle = snap.polyline(915, 8, 902, 33, 928, 33);

//var bigcircle = snap.circle(940, 120, 35);

//var bigsquare = snap.rect(1100, 60, 60, 60);

//var bigtriangle = snap.polyline(810, 70, 780, 120, 840, 120);

var aOuter = snap.polyline(0, 30, 10, 0, 20, 0, 30, 30, 22, 30, 19, 21, 11, 21, 8, 30);

var aInner = snap.polyline(17, 14, 13, 14, 15, 8);

aInner.attr({fill: "#FFFFFF"});

var a = snap.g(lilsquare, aOuter, aInner);
a.addClass("streak");

/*var bUpper = snap.path("M100 104L108 104C118 104, 118 120, 108 120L100 120");
var bLower = snap.path("M100 116L108 116C122 116, 122 134, 108 134L100 134");
var bUpperInner = snap.path("M106 110C110 108, 110 116, 106 114");
var bLowerInner = snap.path("M106 122C112 120, 112 130, 106 128");
bUpperInner.attr({fill: "#FFFFFF"});
bLowerInner.attr({fill: "#FFFFFF"});*/

//var b = snap.g(lilsquare, bUpper, bLower, bUpperInner, bLowerInner);
//b.addClass("streak");

//var c = snap.path("M22 0L22 8C8 8, 8 22, 22 22L22 30C0 22, 0 0, 22 0");
//c = snap.g(lilsquare, c);

var d = 'd';

var e = snap.g(snap.rect(1040, 60, 35, 35), snap.polyline(0, 0, 22, 0, 22, 8, 8, 8, 8, 12, 16, 12, 16, 18, 8, 18, 8, 22, 23, 22, 23, 30, 0, 30));
e.addClass("streak");

var f = snap.polyline(0, 0, 22, 0, 22, 8, 8, 8, 8, 12, 16, 12, 16, 18, 8, 18, 8, 30, 0, 30);
f = snap.g(lilsquare, f);
f.addClass("streak");

var g = 'g';

var h = snap.polyline(0, 0, 8, 0, 8, 10, 18, 10, 18, 0, 26, 0, 26, 30, 18, 30, 18, 18, 8, 18, 8, 30, 0, 30);
h = snap.g(lilsquare, h);
h.addClass("streak");

var i = snap.polyline(0,0, 16,0, 16,8, 12,8, 12,22, 16,22, 16,30, 0,30, 0,22, 4,22, 4,8, 0,8);
i = snap.g(lilsquare, i);
i.addClass("streak");

var j = 'j';

var k = snap.polyline(0,0, 8,0, 8,12, 18,0, 28,0, 15,15, 28,30, 18,30, 8,20, 8,30, 0,30);
k = snap.g(lilsquare, k);
k.addClass("streak");

var l = snap.polyline(0, 0, 9, 0, 8, 22, 23, 22, 23, 30, 0, 30);
l = snap.g(lilsquare, l);
l.addClass("streak");

var m = snap.polyline(0,0, 8,0, 15,15, 22,0, 30,0, 30,30 ,22,30, 22,16, 15,28, 8,16, 8,30, 0,30);
m = snap.g(lilsquare, m);
m.addClass("streak");

var n = snap.polyline(0,0, 8,0, 20,17, 20,0, 28,0, 28,30, 20,30, 8,13, 8,30, 0,30);
n = snap.g(lilsquare, n);
n.addClass("streak");

var o = 'o';

var p = 'p';

var q = 'q';

var r = 'r';

var s = 's';

var t = snap.polyline(0, 0, 28, 0, 28, 8, 18, 8, 18, 30, 10, 30, 10, 8, 0, 8);
t = snap.g(lilsquare, t);
t.addClass("streak");

var u = 'u';

var v = snap.polyline(0, 0, 8, 0, 14, 18, 20, 0, 28, 0, 18, 28, 10, 28);
v = snap.g(lilsquare, v);
v.addClass("streak");

var w = snap.polyline(0,0, 8,0, 10,18, 12,6, 18,6, 20,18, 22,0, 30,0, 26,30, 18,30, 15,24, 12,30, 4,30);
w = snap.g(lilsquare, w);
w.addClass("streak");

var x = snap.polyline(0,0, 8,0, 14,10, 20,0, 28,0, 18,15, 28,30, 20,30, 14,20, 8,30, 0,30, 10,15);
x = snap.g(lilsquare, x);
x.addClass("streak");

var y = snap.polyline(10,17, 0,0, 8,0, 14,10, 20,0, 28,0, 18,17, 18,30, 10,30);
y = snap.g(lilsquare, y);
y.addClass("streak");

var z = snap.polyline(0, 0, 26, 0, 26, 8, 11, 22, 26, 22, 26, 30, 0, 30, 0, 22, 15, 8, 0, 8);
z = snap.g(lilsquare, z);
z.addClass("streak");

var block = snap.rect(0,0,50,50);
block.attr({fill: "#FFF"});