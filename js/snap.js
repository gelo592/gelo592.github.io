var snap = Snap("#svg");

//var lilcircle = snap.circle(1000, 40, 20);

//var lilsquare = snap.rect(1040, 60, 30, 30);

//var liltriangle = snap.polyline(915, 8, 902, 33, 928, 33);

//var bigcircle = snap.circle(940, 120, 35);

//var bigsquare = snap.rect(1100, 60, 60, 60);

//var bigtriangle = snap.polyline(810, 70, 780, 120, 840, 120);

var aOuter = snap.polyline(0, 30, 10, 0, 20, 0, 30, 30, 22, 30, 19, 21, 11, 21, 8, 30);

var aInner = snap.polyline(17, 14, 13, 14, 15, 8);

aInner.attr({fill: "#FFFFFF"});

var a = snap.g(aOuter, aInner);
a.addClass("streak");

var e = snap.polyline(0, 0, 22, 0, 22, 8, 8, 8, 8, 12, 16, 12, 16, 18, 8, 18, 8, 22, 23, 22, 23, 30, 0, 30);
e.addClass("streak");

var f = snap.polyline(0, 0, 22, 0, 22, 8, 8, 8, 8, 12, 16, 12, 16, 18, 8, 18, 8, 30, 0, 30);
f.addClass("streak");

var h = snap.polyline(0, 0, 8, 0, 8, 10, 18, 10, 18, 0, 26, 0, 26, 30, 18, 30, 18, 18, 8, 18, 8, 30, 0, 30);
h.addClass("streak");

var i = snap.polyline(0,0, 16,0, 16,8, 12,8, 12,22, 16,22, 16,30, 0,30, 0,22, 4,22, 4,8, 0,8);
i.addClass("streak");

var k = snap.polyline(0,0, 8,0, 8,12, 18,0, 28,0, 15,15, 28,30, 18,30, 8,20, 8,30, 0,30);
k.addClass("streak");

var l = snap.polyline(0, 0, 9, 0, 8, 22, 23, 22, 23, 30, 0, 30);
l.addClass("streak");

var m = snap.polyline(0,0, 8,0, 15,15, 22,0, 30,0, 30,30 ,22,30, 22,16, 15,28, 8,16, 8,30, 0,30);
m.addClass("streak");

var n = snap.polyline(0,0, 8,0, 20,17, 20,0, 28,0, 28,30, 20,30, 8,13, 8,30, 0,30);
n.addClass("streak");

var t = snap.polyline(0, 0, 28, 0, 28, 8, 18, 8, 18, 30, 10, 30, 10, 8, 0, 8);
t.addClass("streak");

var v = snap.polyline(0, 0, 8, 0, 14, 18, 20, 0, 28, 0, 18, 28, 10, 28);
v.addClass("streak");

var w = snap.polyline(0,0, 8,0, 10,18, 12,6, 18,6, 20,18, 22,0, 30,0, 26,30, 18,30, 15,24, 12,30, 4,30);
w.addClass("streak");

var x = snap.polyline(0,0, 8,0, 14,10, 20,0, 28,0, 18,15, 28,30, 20,30, 14,20, 8,30, 0,30, 10,15);
x.addClass("streak");

var y = snap.polyline(10,17, 0,0, 8,0, 14,10, 20,0, 28,0, 18,17, 18,30, 10,30);
y.addClass("streak");

var z = snap.polyline(0, 0, 26, 0, 26, 8, 11, 22, 26, 22, 26, 30, 0, 30, 0, 22, 15, 8, 0, 8);
z.addClass("streak");

