function ResourceLoader(config) {
	
	this.errorType 		= config.errors 	|| true;
	this.resourcesToLoad	= config.resources 	|| [];
	this.loadOnReady	= config.onReady 	|| true;
	this.loadedResources 	= [];
  
	// For IE
	this.attachEventHandler = function() {
		if (document.readyState === "complete") {
			this.preload();      	
		}
	}
  
	// For standard implementation
	this.addEventListenerHandler = function(e) {
		this.preload();
	}
  
	// Determine preload timing and method
	this.bindLoad = function() {
		if (this.loadOnReady){
			if (document.addEventListener) {
  				document.addEventListener("DOMContentLoaded", this.addEventListenerHandler);
  			} else {
  				document.attachEvent("onreadystatechange", this.attachEventHandler);
  			}
		} else {
			window.onload = this.preload;
		}
  	}
  
  	// Preload resources from init
	this.preload = function() {
		if (this.resourcesToLoad.length) {
			for (var i = 0; i < this.resourcesToLoad.length; i++) {
				this.load(this.resourcesToLoad[i]);
			}
		}
  	}
  
	// Do the actual work
	this.load = function(resource) {
		
		var loadedResource;
		
		if (!resource.type || !resource.url) {
			
			if (this.errors) {
				
				throw new Error('resource.type and resource.url are both mandatory!');
				
			} else {
				
				console.log('Error: resource.type and resource.url are both mandatory!', resource);
			}
		}
  
		if (resource.type === "image") {
			loadedResource		= new Image();
			loadedResource.src	= resource.url;
		} 
		if (resource.type === "css") {
			loadedResource 		= document.createElement("style");
			loadedResource.type 	= "text/css";
			loadedResource.href 	= resource.url;
		}
		if (resource.type === "js") {
			loadedResource 		= document.createElement("script");
			loadedResource.type 	= "text/javascript";
			loadedResource.src 	= resource.url;
		}

		// Use Array.push because we don't know the lenght
		this.loadedResources.push(loadedResource);
		
		// Return resource preloaded as DOM element
		return loadedResource;
	}
	
	// Initialize loader by scheduling preload time
	this.bindLoad();
}
