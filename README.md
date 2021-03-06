# resource-loader

This lightweight JavaScript resource loader aims to be as unobtrusive and straightforward as possible both in its goal and use. It can handle loading all types of resources during or after the page has loaded and can preload resources on the fly if needed.

>###Important
>Most browsers don't cache resources by default unless instructed to. Unfortunately this cannot be done on the client side, so to get
>the most out of this library, you need to implement sending cache headers along with your assets. This can be done by configuring your 
>server appropriately or sending the headers through your server-side language of choice.

## How it works
**TLDR: it's magic and just works.**

Resources are considered "loaded" when they are stored in the browser's memory. Resources are referenced by URLs. To load a resource by URL, the browser will first attempt to load it from its cache and will only download the URL's content if it fails to find it. Cached resources are loaded from disk instead of over the network, so they appear to be loaded near-instantly. This resource loader works by silently forcing the browser to download external resources in the background and caching them, allowing you to benefit from the speed of cache loading when you reference them by the same URL.

## Resource types

This library supports the following resource types: **script**, **style**, **image**, **audio**, **video**. Although general support for these types of assets is provided across browsers, individual MIME type support is subject to browser implementation differences. **Audio** and **video** types require a HTML5 compliant browser and a `DOCTYPE` in order to function as expected.

>###Note for preloading HTML5 Video
>This library uses the HTML5 Video API to preload videos, but cannot guarantee that the video format provided is supported by the
>current browser. This means you need to take care of determining which video formats are supported and select your assets to preload 
>accordingly. If you supply an unsupported video format, the loader will not complain, but the browser will.

## Installation
Simply include `resource-loader.js` in your document and create an instance of `ResourceLoader` with your preferred configuration. If you keep a reference to this object, you will be able to reuse it later on without having to instantialize a new one.

#### Config options

- **resources**: An array of objects, each with a `type` property with a value of `image`, `css` or `js` and an URL to reference the resource by. Possible values: `Array`, `undefined`. Default: `[]`.
- **onReady**: A boolean indicating if the resources need to be loaded as soon as the DOM is ready or after content has loaded. Possible values: `true`, `false`, `undefined`. Default: `true`.
- **errors**: A boolean indicating whether the loader should throw hard errors or simply log them to the console while ignoring them. Possible values: `true`, `false`, `undefined`. Default: `true`.

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
                          "url": "path/to/image"
                        },
                        {
                          "type": "css",
                          "url": "path/to/stylesheet"
                        }
                      ],
          config = {
            "resources" : resources,
            "onReady"   : false, // Load resources after window has finished loading.
            "errors"    : false // Disable hard errors
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
