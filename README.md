# resource-loader

This lightweight JavaScript resource loader aims to be as unobtrusive and straightforward as possible both in its goal and use. It can handle loading all types of resources during or after the page has loaded and can preload resources on the fly if needed.

## How it works
**TLDR: it's magic and just works.**

Resources are considered "loaded" when they are stored in the browser's memory. Resources are referenced by URLs. To load a resource by URL, the browser will first attempt to load it from its cache and will only download the URL's content if it fails to find it. Cached resources are loaded from disk instead of over the network, so they appear to be loaded near-instantly. This resource loader works by silently forcing the browser to download external resources in the background and caching them, allowing you to benefit from the speed of cache loading when you reference them by the same URL.

## Installation
Simply include `resource-loader.js` in your document and create an instance of `ResourceLoader` with your preferred configuration. If you keep a reference to this object, you will be able to reuse it later on without having to instantialize a new one.

#### Config options

- **resources**: An array of objects, each with a `type` property with a value of `image`, `css` or `js` and an URL to reference the resource by. Possible values: `Array`, `undefined`. 
- **onReady**: A boolean indicating if the resources need to be loaded as soon as the DOM is ready or after content has loaded. Possible values: `true`, `false`, `undefined`.

## Full example
```html
<html>
  <head>
    <title>ResourceLoader Example</title>
  </head>
  <body>
    <div id="yourPageContent">
      ...
    </div>
    <script type="text/javascript" src="resource-loader.js"></script>
    <script type="text/javascript">
      var resources = [
                        {
                          "type": "image",  
                          "url": "path/to/image"           },
                        },
                        {
                          "type": "css",
                          "url": "path/to/stylesheet"
                        }
                      ],
          config = {
            "resources" : resources,
            "onReady"   : false // Load resources after window has finished loading.
          },
          
          // Keep reference to object and automatically preload selected resources.
          loader = new ResourceLoader(config);
          
          // Use the same instance to load new resources on the go.
          var newResource = {
                              "type": "js",
                              "url": "path/to/js"
                            };
          loader.load(newResource);
    </script>
  </body>
  
</html>
```

## Roadmap
This project is planned to introduce more features such as DOM element returns and AJAX loading in the future.
