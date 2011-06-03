var createCustomTabGroup = function(settings) {
    
    if (Titanium.Platform.name == 'android') {
    	throw "CustomTabGroup error: This is only supported by iPhone!";
    }
    
    var tabbar =  Ti.UI.createTabGroup(settings);
        
    var fakeTabBgs = [];
    
    var fakeTabs = [];
    
    var tallest_tab = 50;
    
    function addTab(object) {
    	tabbar.addTab(object);
    	
    	if(object.tabBarHidden == true) {
    		Ti.API.info('tabBarHidden is not supported by CustomTabBar and will be ignored');
    		
    		delete object.tabBarHidden;
    	}
	
		object.hideTabBar = function() {
			alert('test');	
		}
		
    	if(object.custom == true) {
	    	fakeTab = Ti.UI.createView({
	    		height: 49,
	    		index: tabbar.tabs.length - 1,
	    		bottom:0,
	    		backgroundImage:'/tabbar_module/images/tabbar.png',
	    		borderRadius:8
	    	});
	    	
	    	tabImage = Ti.UI.createImageView({
    			image: tabbar.tabs[ tabbar.tabs.length - 1 ].icon,
    			bottom:0,
    			index: tabbar.tabs.length - 1,
    			width:'auto',
    			touchEnabled: false,
    			preventDefaultImage: true
    		});
    		
	    	if(object.title != undefined) {
	    		tabTitle = Ti.UI.createLabel({
	    			text: object.title,
	    			bottom:0,
	    			height:'auto',
	    			width:'auto',
	    			font: { fontSize:10, fontWeight:'bold' },
	    			color:'#fff',
	    			touchEnabled: false
	    		});
	    		
	    		tabImage.bottom = 3;
	    		
	    		fakeTab.add(tabTitle);
	    	}
	    	
	    	if(object.badge != undefined ) {
	    		throw "CustomTabGroup error: badges can not be set on custom tabs";
	    	}
	    	
	    	if(object.modal == true && tabbar.tabs.length == 1) {
	    		throw "CustomTabGroup error: The first window can not be a modal window";
	    	}
	    	
	    	if(object.modal == true) {
				fakeTab.addEventListener('click', function(e) {
					object.window.open({
						modal:true
					});
			    });
	    	} else {
	    		fakeTab.touchEnabled = false;
	    	}
	    	
	    	/**
    		 * We add the tab images seperate if they are larger then the normal tab space allows
    		 * however this CAN hit the limit of items that can be added to a tabgroup bar (5 items)
    		 */
    		if(object.tabHeight != undefined) {
    			fakeTabs.push(tabImage);
    			
    			if(object.tabHeight > tallest_tab){
    				tallest_tab = object.tabHeight;
    			}
	    	} else {
	    		fakeTabs.push({index:tabbar.tabs.length - 1});
	    		fakeTab.add(tabImage);
	    		if(object.badge != undefined) {
	    			fakeTab.add(tabBadge);
	    		}
	    	}
	    	
	    	fakeTabBgs.push(fakeTab);
	    }
	    
	    return;
    }
    
    function open() {
    	for(i=0; i<fakeTabBgs.length; i++) {
    		
    		// calculate tab bg width and position
    		width = (320 / tabbar.tabs.length);
    		left = (width * fakeTabBgs[i].index) == 0 ? 1 : (width * fakeTabBgs[i].index);

    		fakeTabBgs[i].width = width;
    		fakeTabBgs[i].left = left;
    		
    		// we always add the bg
    		tabbar.add(fakeTabBgs[i]);
    		
    		/**
    		 * We add the tab images seperate if they are larger then the normal tab space allows
    		 * however this CAN hit the limit of items that can be added to a tabgroup bar (5 items)
    		 */
    		if(tabbar.tabs[ fakeTabBgs[i].index ].tabHeight != undefined) {
    		
    			fakeTabs[i].height = tabbar.tabs[ fakeTabs[i].index ].tabHeight != undefined ? tabbar.tabs[ fakeTabs[i].index ].tabHeight : 47;

	    		if(fakeTabs[i].width <= width) {
	    			
	    			image_offset = (width - fakeTabs[i].width) / 2;
	    			
	    			fakeTabs[i].left = left + image_offset;
	    			
	    		} else {
	    			
	    			image_offset = (fakeTabs[i].width - width) / 2;
	    			
	    			fakeTabs[i].left = left - image_offset;
	    			
	    		}
    		
    			tabbar.add(fakeTabs[i]);
    		}
    	}
    	
    	
    	tabbar.addEventListener('focus', function(e) {
			if(e.previousIndex != undefined && e.previousIndex >= 0 && fakeTabBgs[e.previousIndex] != undefined) {
				fakeTabBgs[e.previousIndex].backgroundImage = '/tabbar_module/images/tabbar.png';
			}
    		if(e.index != undefined && e.index >= 0 && fakeTabBgs[e.index] != undefined) {
				fakeTabBgs[e.index].backgroundImage = '/tabbar_module/images/tabbar_h.png';
			}
		});
    	    	
    	tabbar.open();
    	return;
    }
    
    function removeTab(object) {
    	if(object.custom == true) {
    		// This causes issues with too much digging threw arrays...
    		throw "CustomTabGroup error: Custom tabs can not be removed...";
    	}
    	
    	tabbar.removeTab(object);
    	
    	return;
    }
    
    function setActiveTab(index_object) {
    	
    	if(typeof(index_object) == 'number') {
    		
    		index_object = tabbar.tabs[index_object];
    		
    	}
    	
    	if(index_object.modal == true) {
    		
    		index_object.window.open({
				modal:true
			});
    		
    	} else {
    		
    		tabbar.setActiveTab(index_object);
    		
    	}
    	
    	return;
    }
    
    function hideTabBar() {
    	down = tallest_tab + 2;
    	tabbar.animate({bottom:-down,duration:0});
    }
    
    function showTabBar() {
    	tabbar.animate({bottom:0,duration:0});
    }
    
    

	return {
		
		/**
		 * We create our own versions of these
		 */
		open: function() { open() },
		
		addTab: function(object) { addTab(object) },
		
		removeTab: function(object) { removeTab(object) },
		
		setActiveTab: function(index_object) { setActiveTab(index_object) },
		
		hideTabBar: function() { hideTabBar(); },
		
		showTabBar: function() { showTabBar(); },
		
		/**
		 * Pass directly to the native tabgroup
		 */
		remove: function(object) { tabbar.remove(object) },
		addEventListener: function(type, fun) { tabbar.addEventListener(type, fun) },
		animate: function(object) { tabbar.animate(object) },
		close: function() { tabbar.close() },
		fireEvent: function(type) { tabbar.fireEvent(type) },
		removeEventListener: function(name, callback) { tabbar.removeEventListener(name, callback) },
		add: function(object) { tabbar.add(object); },
		hide: function() { tabbar.hide(); },
		show: function() { tabbar.show(); },
		toImage : function() { tabbar.toImage() },
		
		/**
		 * Access to the tabs from the outside
		 */
		tabs: tabbar.tabs
	};
};