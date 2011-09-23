// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// include the new class
Ti.include("/tabbar_module/customTabBar.js");

// create tab group
var tabGroup = createCustomTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

//win1.orientationModes = [ Titanium.UI.LANDSCAPE_LEFT ];
 
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

var win3 = Titanium.UI.createWindow({  
    title:'Tab 3',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 3',
    window:win3
});

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 3',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win3.add(label3);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'red'
});
	close = Ti.UI.createButton({
		title:'Close'
	})
	close.addEventListener('click', function() {
		win2.close();
	});
	win2.setRightNavButton(close);
	
var tab2 = Titanium.UI.createTab({  
    icon:'new.png',
    imageHeight:60,
    imageWidth:80,
    custom:true,
    //modal: true,
    window:win2
});

var tab4 = Titanium.UI.createTab({  
    icon:'new.png',
    imageHeight:60,
    imageWidth:80,
    custom:true,
    window:win2
});

var tab5 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    //modal: true,
    window:win2
});

var tab6 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    tabHeight:60,
    tabWidth:190,
    //modal: true,
    window:win2
});

var tab7 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    tabHeight:60,
    tabWidth:190,
    custom:true,
    //modal: true,
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#fff',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

//
//  add tabs
//

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4); 
tabGroup.addTab(tab5);  
//tabGroup.addTab(tab6);  
//tabGroup.addTab(tab7);  


// open tab group
tabGroup.open();

/**
tabGroup.hideTabBar();

setTimeout(function(){
	tabGroup.showTabBar();
}, 700);
**/
