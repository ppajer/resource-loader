function ResourceLoader(config) {
	
  this.resourcesToLoad	= config.resources || [];
  this.loadOnReady 			= !!config.onReady;
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
    this.load(this.resourcesToLoad);
  }
  
  // Do the actual work
  this.load = function(resources) {
  	for (var i = 0; i < resources; i++) {
    	var resource 	= resources[i],
      		type 			= resource.type,
          url				= resource.url,
          loadedResource;
          
    	if (type === "image") {
      	loadedResource 			= new Image();
        loadedResource.src 	= url;
      } 
      if (type === "css") {
      	loadedResource 			= document.createElement("style");
        loadedResource.type = "text/css";
        loadedResource.href = url;
      }
      if (type === "js") {
      	loadedResource 			= document.createElement("script");
        loadedResource.type = "text/javascript";
        loadedResource.src 	= url;
      }
      
      // Use Array.push because we don't know the lenght
      this.loadedResources.push(loadedResource);
    }
  }
}
