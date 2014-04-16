window.blknamespc = {};

class MouseswarmMainView extends KDView
  counter = 0
  remcount = 0
  colorarr = ["red","green","blue","yellow","purple", "orange"]
  blockarr = []
  bg = 0
  #rad = 100
  #halfcirc = 50
  bc = 0
  x = 0
  y = 0
  randnumx = 0
  randnumy = 0
  
  
  
  constructor:(options = {}, data)->
    options.cssClass = 'mouseswarm main-view'
    super options, data

  decideColor  =  () -> colorarr[counter%6]
    
  makeBlock = (color) ->
    #bg = document.getElementsByClassName("backg")[0]
    if color[0] == 'r'
      blkTitle="Ace"
    else if color[0] == 'g'
      blkTitle="Terminal"
    else if color[0] == 'b'
      blkTitle="Activity"
    else if color[0] == 'y'
      blkTitle="Teamwork"
    else if color[0] == 'p'
      blkTitle="Apps"
    else
      blkTitle="DevTools"
    @newBlk = new KDCustomHTMLView
      
      partial: "<span style='position:absolute; margin: -10px 0 0 0 !important; color:#ddd;'>" + blkTitle + "</span/>"
      cssClass: "msw-"+color + " " + color+"block"+counter
      size: {width:50,height:50}
      domId: counter + "Blk"
      position:  {top:randnumy,left:randnumx}
      attributes : {onmouseup:"var temp = this.className[4]; var loca = 0; if(temp == 'r'){loca = '/Ace';}else if(temp == 'b'){loca = '/Activity';}else if(temp=='g'){loca='/Terminal';}else if(temp=='p'){loca='/Apps';}else if(temp=='y'){loca='/Teamwork';}else{loca='/DevTools';} window.open(loca);"} 
    #newBlk = document.createElement("div")
    #newBlk.id = color + "block" + counter
    #newBlk.className = color
    #newBlk.style.width = "50px"
    #newBlk.style.height = "50px"
    #newBlk.style.position = "absolute"
    #newBlk.style.top = "0px"
    #newBlk.style.left = "0px"
    bg.addSubView @newBlk
    #bg.appendChild(newBlk)
    addBlock(@newBlk)
    counter++
    return
  
  removeAll = () ->
    bgr = document.getElementsByClassName("backg")[0]
    while bgr.hasChildNodes()
      bgr.removeChild(bgr.lastChild);
    blockarr = [] 
    counter = 0
    remcount = 0
  
  removeSome = (blkarr) ->
    i = 0
    tind = Math.floor((Math.random()*10)+1) + 1
    tcount =  Math.floor((Math.random()*10)+1) + 1
    
    if blkarr.length == 0
        remcount = "You didn't make any blocks ! No "
    else if blkarr.length == 1
        remBlks = blkarr.splice(0,1)
        remcount = remBlks.length
        tempBlk =  document.getElementById(remBlks[0])
        if tempBlk == undefined
          remcount = "INDESTRUCTABLE BLOCK! Oh No :("
        tempBlk.parentNode.removeChild(tempBlk)
    else 
        remBlks = blkarr.splice(tind,tcount) #for dish, i in courses
        remcount = remBlks.length
        while i < remBlks.length
          tempBlk =  document.getElementById(remBlks[i])
          tempBlk.parentNode.removeChild(tempBlk)
          i++ 
        
    blockarr = blkarr
    counter = 0
    
  
  addBlock = (curblock) ->
    blockarr.push(curblock.domId)
    return
  """
  changePos = (blk) ->
    blk.style.top = "500px"
    blk.style.left = "500px"
    #console.log(blk.options.position)
    #blk.options.position.top = 500
    #blk.options.position.left = 500
    #console.log(blk.options.position.top)
    #console.log(blk.options.position.left)
   # console.log(blk)
    return
  """
  aniBlocks = () ->
    i = 0
    blength = blockarr.length
    #mult = 1
    #time = 0
    #omega = Math.PI / 2000
    #console.log(counter)
    #while counter >= 1
    """
    while i < barray.length
      #console.log(barray[i])
      #i = i%barray.length
      #console.log(document.getElementById(barray[i]))
      temp = document.getElementById(barray[0])
      temp.style.marginTop = 20*(Math.cos(omega*time)) + "px"
      temp.style.marginLeft = 20*(Math.sin(omega*time)) + "px"
      i++
      mult++
      #i = i % barray.length """
    #document.getElementById(barray[counter - 1]).style.animation = "swarm 3s infinite linear;"
    #document.getElementById(barray[0]).style.marginLeft = 20*(Math.sin(omega*time)) + "px"
    #document.getElementById(barray[0]).style.marginTop = 20*(Math.cos(omega*time)) + "px"
    #time += 35
    #console.log(blockarr)
    return
  
  viewAppended:->
    #@backGround =  new KDCustomHTMLView
    @notifyMes = new KDNotificationView
      title: "Use the Enter Key"
      content: "You can use the Enter key after you clicked a button to repeatedly do stuff !"
      duration: 9000
    
    @backGround = new KDView
      partial  : "<script>function myFunction(e){x=e.clientX;y=e.clientY;}function clearCoor(){document.getElementById('demo').innerHTML='';}</script>"
      cssClass : "backg"
      attributes : {onmousemove: "//console.log(window.blknamespc.blkarray())"} 
   
    @resetButton = new KDButtonView
      partial  : "Reset"
      cssClass : "rbutton"
      title      : "reset"
      callback   : -> 
          removeAll()
          new KDNotificationView
            title : "All Removed !"
            type: "tray"
      
    @killButton = new KDButtonView
      partial  : "Destroy Some"
      cssClass : "kbutton"
      title      : "kill"
      callback   : -> 
          removeSome(blockarr)
          if remcount == 0
            remcount = "Not Working! Try clicking faster."
          else
            remcount = remcount+" blocks removed..."
            
          new KDNotificationView
            title : remcount
            type: "tray"
      
    @swarmButton = new KDButtonView
      partial  : "SWARM !!!"
      cssClass : "sbutton"
      title      : "swarm"
      style      : "cupid-green"
      callback   : -> 
          x = bc.clientWidth
          y = bc.clientHeight
          maxX = x -  10
          maxY = y - (y/2.4)
          minX = x - (x/1.025)
          minY = y - (y/1.09)
          randnumx = Math.floor(Math.random() * (maxX -  minX + 1)) +  minX
          randnumy = Math.floor(Math.random() * (maxY -  minY + 1)) +  minY
          makeBlock(decideColor())
          window.blknamespc.blkarray = -> blockarr
          #setInterval aniBlocks(blockarr), 50 if counter >= 1
          #setInterval(aniBlocks(blockarr),25)
          aniBlocks(blockarr)
          new KDNotificationView
              title : 
                if counter == 1 
                  "Block Created!" 
                else if counter == 2 
                  "Double Trouble!" 
                else if counter == 10
                   "Ten blocks! Really?"
                else if counter == 20
                    "Twenty blocks... pushing the limit, huh?"
                else if counter == 40
                     "You just doubled the amount of blocks..."
                else if counter == 50
                      "Half of a century"
                else if counter == 100
                    "I have no words."
                else 
                  "Block " + counter + " Created!" 
               type: "sticky"  
    bg  = @backGround
    @addSubView @backGround
    @addSubView @swarmButton
    @addSubView @killButton
    @addSubView @resetButton
   # @backGround.addSubView @swarmButton
    bc =  document.getElementsByClassName("backg")[0]
   # document.getElementById('target').innertHTML = "<script> alert(1); <\/script>";
    #while counter >= 1
    #   aniBlocks(blockarr)
     #bg = document.getElementsByClassName("backg")[0]          
     #bg.appendChild(document.getElementsByClassName("sbutton")[0])
  

class MouseswarmController extends AppController

  constructor:(options = {}, data)->
    options.view    = new MouseswarmMainView
    options.appInfo =
      name : "Mouseswarm"
      type : "application"

    super options, data

do ->

  # In live mode you can add your App view to window's appView
  if appView?

    view = new MouseswarmMainView
    appView.addSubView view

  else

    KD.registerAppClass MouseswarmController,
      name     : "Mouseswarm"
      routes   :
        "/:name?/Mouseswarm" : null
        "/:name?/rsonbie/Apps/Mouseswarm" : null
      dockPath : "/rsonbie/Apps/Mouseswarm"
      behavior : "application"