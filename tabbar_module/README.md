Custom Tab Bar
==============

Easily extend tabbar in Appcelerator Titanium mobile for iPhone app to allow any image to be used!

This class is everything short of just being able to drop it in and be done.

1) include the customTabBar with:

	Ti.include("/tabbar_module/customTabBar.js"); 
2) Change your existing:

	Ti.UI.createTabGroup();
Including any properties you might be passing to it. And change it to:

	createCustomTabGroup();
3) Add any of your new custom properties to your tabs.
The available properties are:

	tabHeight - an int value for the height of the tab (default is 49) *Note: tabWidth does not exist as image scales based on height when set*
	modal - a bool value if you want this tab to behave normally, or open in a modal window

4) Two new methods are added now as well, and they are as follows:
	
	hideTabBar() - Hides the tabBar
	showTabBar() - Shows the tabBar

Here is an example of the CustomTabBar in use:
--------
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
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Tab 1',
	    custom:true,
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
	    tabHeight:60,
	    tabWidth:190,
	    custom:true,
	    modal: true,
	    window:win2
	});
	
	var label2 = Titanium.UI.createLabel({
		color:'#fff',
		text:'I am Window 2',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		textAlign:'center',
		width:'auto'
	});

	
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
	//  add tabs
	//
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  
	tabGroup.addTab(tab3);  
	
	
	// open tab group
	tabGroup.open();

	tabGroup.hideTabBar();
	
	setTimeout(function(){
		tabGroup.showTabBar();
	}, 700);