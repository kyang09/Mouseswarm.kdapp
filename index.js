/* Compiled by kdc on Fri Apr 04 2014 00:54:20 GMT+0000 (UTC) */
(function() {
/* KDAPP STARTS */
/* BLOCK STARTS: /home/rsonbie/Applications/Mouseswarm.kdapp/index.coffee */
var MouseswarmController, MouseswarmMainView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.blknamespc = {};

MouseswarmMainView = (function(_super) {
  var addBlock, aniBlocks, bc, bg, blockarr, colorarr, counter, decideColor, makeBlock, randnumx, randnumy, remcount, removeAll, removeSome, x, y;

  __extends(MouseswarmMainView, _super);

  counter = 0;

  remcount = 0;

  colorarr = ["red", "green", "blue", "yellow", "purple", "orange"];

  blockarr = [];

  bg = 0;

  bc = 0;

  x = 0;

  y = 0;

  randnumx = 0;

  randnumy = 0;

  function MouseswarmMainView(options, data) {
    if (options == null) {
      options = {};
    }
    options.cssClass = 'mouseswarm main-view';
    MouseswarmMainView.__super__.constructor.call(this, options, data);
  }

  decideColor = function() {
    return colorarr[counter % 6];
  };

  makeBlock = function(color) {
    var blkTitle;
    if (color[0] === 'r') {
      blkTitle = "Ace";
    } else if (color[0] === 'g') {
      blkTitle = "Terminal";
    } else if (color[0] === 'b') {
      blkTitle = "Activity";
    } else if (color[0] === 'y') {
      blkTitle = "Teamwork";
    } else if (color[0] === 'p') {
      blkTitle = "Apps";
    } else {
      blkTitle = "DevTools";
    }
    this.newBlk = new KDCustomHTMLView({
      partial: "<span style='position:absolute; margin: -10px 0 0 0 !important; color:#ddd;'>" + blkTitle + "</span/>",
      cssClass: color + " " + color + "block" + counter,
      size: {
        width: 50,
        height: 50
      },
      domId: counter + "Blk",
      position: {
        top: randnumy,
        left: randnumx
      },
      attributes: {
        onmouseup: "var temp = this.className[0]; var loca = 0; if(temp == 'r'){loca = '/Ace';}else if(temp == 'b'){loca = '/Activity';}else if(temp=='g'){loca='/Terminal';}else if(temp=='p'){loca='/Apps';}else if(temp=='y'){loca='/Teamwork';}else{loca='/DevTools';} window.open(loca);"
      }
    });
    bg.addSubView(this.newBlk);
    addBlock(this.newBlk);
    counter++;
  };

  removeAll = function() {
    var bgr;
    bgr = document.getElementsByClassName("backg")[0];
    while (bgr.hasChildNodes()) {
      bgr.removeChild(bgr.lastChild);
    }
    blockarr = [];
    counter = 0;
    return remcount = 0;
  };

  removeSome = function(blkarr) {
    var i, remBlks, tcount, tempBlk, tind;
    i = 0;
    tind = Math.floor((Math.random() * 10) + 1) + 1;
    tcount = Math.floor((Math.random() * 10) + 1) + 1;
    if (blkarr.length === 0) {
      remcount = "You didn't make any blocks ! No ";
    } else if (blkarr.length === 1) {
      remBlks = blkarr.splice(0, 1);
      remcount = remBlks.length;
      tempBlk = document.getElementById(remBlks[0]);
      if (tempBlk === void 0) {
        remcount = "INDESTRUCTABLE BLOCK! Oh No :(";
      }
      tempBlk.parentNode.removeChild(tempBlk);
    } else {
      remBlks = blkarr.splice(tind, tcount);
      remcount = remBlks.length;
      while (i < remBlks.length) {
        tempBlk = document.getElementById(remBlks[i]);
        tempBlk.parentNode.removeChild(tempBlk);
        i++;
      }
    }
    blockarr = blkarr;
    return counter = 0;
  };

  addBlock = function(curblock) {
    blockarr.push(curblock.domId);
  };

  "changePos = (blk) ->\n  blk.style.top = \"500px\"\n  blk.style.left = \"500px\"\n  #console.log(blk.options.position)\n  #blk.options.position.top = 500\n  #blk.options.position.left = 500\n  #console.log(blk.options.position.top)\n  #console.log(blk.options.position.left)\n # console.log(blk)\n  return";

  aniBlocks = function() {
    var blength, i;
    i = 0;
    blength = blockarr.length;
    "while i < barray.length\n  #console.log(barray[i])\n  #i = i%barray.length\n  #console.log(document.getElementById(barray[i]))\n  temp = document.getElementById(barray[0])\n  temp.style.marginTop = 20*(Math.cos(omega*time)) + \"px\"\n  temp.style.marginLeft = 20*(Math.sin(omega*time)) + \"px\"\n  i++\n  mult++\n  #i = i % barray.length ";
  };

  MouseswarmMainView.prototype.viewAppended = function() {
    this.notifyMes = new KDNotificationView({
      title: "Use the Enter Key",
      content: "You can use the Enter key after you clicked a button to repeatedly do stuff !",
      duration: 9000
    });
    this.backGround = new KDView({
      partial: "<script>function myFunction(e){x=e.clientX;y=e.clientY;}function clearCoor(){document.getElementById('demo').innerHTML='';}</script>",
      cssClass: "backg",
      attributes: {
        onmousemove: "//console.log(window.blknamespc.blkarray())"
      }
    });
    this.resetButton = new KDButtonView({
      partial: "Reset",
      cssClass: "rbutton",
      title: "reset",
      callback: function() {
        removeAll();
        return new KDNotificationView({
          title: "All Removed !",
          type: "tray"
        });
      }
    });
    this.killButton = new KDButtonView({
      partial: "Destroy Some",
      cssClass: "kbutton",
      title: "kill",
      callback: function() {
        removeSome(blockarr);
        if (remcount === 0) {
          remcount = "Not Working! Try clicking faster.";
        } else {
          remcount = remcount + " blocks removed...";
        }
        return new KDNotificationView({
          title: remcount,
          type: "tray"
        });
      }
    });
    this.swarmButton = new KDButtonView({
      partial: "SWARM !!!",
      cssClass: "sbutton",
      title: "swarm",
      style: "cupid-green",
      callback: function() {
        var maxX, maxY, minX, minY;
        x = bc.clientWidth;
        y = bc.clientHeight;
        maxX = x - 10;
        maxY = y - (y / 2.4);
        minX = x - (x / 1.025);
        minY = y - (y / 1.09);
        randnumx = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        randnumy = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        makeBlock(decideColor());
        window.blknamespc.blkarray = function() {
          return blockarr;
        };
        aniBlocks(blockarr);
        return new KDNotificationView({
          title: counter === 1 ? "Block Created!" : counter === 2 ? "Double Trouble!" : counter === 10 ? "Ten blocks! Really?" : counter === 20 ? "Twenty blocks... pushing the limit, huh?" : counter === 40 ? "You just doubled the amount of blocks..." : counter === 50 ? "Half of a century" : counter === 100 ? "I have no words." : "Block " + counter + " Created!",
          type: "sticky"
        });
      }
    });
    bg = this.backGround;
    this.addSubView(this.backGround);
    this.addSubView(this.swarmButton);
    this.addSubView(this.killButton);
    this.addSubView(this.resetButton);
    return bc = document.getElementsByClassName("backg")[0];
  };

  return MouseswarmMainView;

})(KDView);

MouseswarmController = (function(_super) {
  __extends(MouseswarmController, _super);

  function MouseswarmController(options, data) {
    if (options == null) {
      options = {};
    }
    options.view = new MouseswarmMainView;
    options.appInfo = {
      name: "Mouseswarm",
      type: "application"
    };
    MouseswarmController.__super__.constructor.call(this, options, data);
  }

  return MouseswarmController;

})(AppController);

(function() {
  var view;
  if (typeof appView !== "undefined" && appView !== null) {
    view = new MouseswarmMainView;
    return appView.addSubView(view);
  } else {
    return KD.registerAppClass(MouseswarmController, {
      name: "Mouseswarm",
      routes: {
        "/:name?/Mouseswarm": null,
        "/:name?/rsonbie/Apps/Mouseswarm": null
      },
      dockPath: "/rsonbie/Apps/Mouseswarm",
      behavior: "application"
    });
  }
})();

/* KDAPP ENDS */
}).call();