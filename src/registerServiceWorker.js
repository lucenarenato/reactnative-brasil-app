// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

/* const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // This is running on localhost. Lets check if a service worker still exists or not.
          checkValidServiceWorker(swUrl);
  
          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://goo.gl/SC7cgQ'
            );
          });
        } else {
          // Is not local host. Just register service worker
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
           // available; please refresh." message in your web app.
                console.log('New content is available; please refresh.');
              } else {
                
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
      .then(response => {
        // Ensure service worker exists, and that we really are getting a JS file.
        if (
          response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
        ) {
          // No service worker found. Probably a different app. Reload the page.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found. Proceed as normal.
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }*/
  

  /*___________________________________________________*/




/* ____________________________ok ____________*/
// Set a name for the current cache
let cacheName = 'v2'; 

// Default files to always cache
let cacheFiles = [
	'',
'/',
'public/index.html',
'./App.js',
'./Menu.js',
'./Footer.js',
'./Header.js',
'./index.js',
'./MapContainer.js',
'./app.css',
'./menu.css',

];



global.addEventListener('install', function(e) {
    console.log('ServiceWorker Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('ServiceWorker Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});


global.addEventListener('activate', function(e) {
    console.log('ServiceWorker Activated');

    e.waitUntil(

    	// Get all the cache keys
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('ServiceWorker Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});


global.addEventListener('fetch', function(e) {
	console.log('ServiceWorker Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("ServiceWorker Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				let clonedRequests = e.request.clone();
				return fetch(clonedRequests)
					.then(function(response) {

						if ( !response ) {
							console.log("ServiceWorker No response from fetch ")
							return response;
						}

						let clonedResponses = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, clonedResponses);
							console.log('ServiceWorker New Data Cached', e.request.url);

							// Return the response
							return response;
			
				        });

					})
					


			}) 
	);
});