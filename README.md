# node-socketio-photo

### run server
```
$ npm run server
```

### connect to browser
http://localhost:9002/screen/

### post json base64 with curl

This is a .gif 128px x 128px gif image encoded in base64. The command post the json to the server.
```
$ curl -H "Content-Type: application/json" -X POST -d '{"dataUri":"data:image/gif;base64,R0lGODlhIAAgAFUAACH5BAEAADIALAAAAAAgACAAhf7//wtAmhJGnSxcqRJBlAg/mT5or3GQxAQ7mFl8uPAALRhLnwFDnx5RpI+o0A5AlfEZI50mTszc7u/v9QE4lWYzZj43f7HE4ZkzZsVkffTN0ihEkwo+lhs/k8wzZswzM//MzJlmmax7m0w3dwlIosyZmWZmmcyswP9mmf+ZmZmZzPqtsZlmZmaZzDNmmcxmmcxmZv8zMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb/QJlwSCwaj8ikcslsOp/QqFRGeDwIVcKUSAh4Cw2vIPCYdgOIQmDRWBgG6oD2eeYM3INGY+z1locKCkhnAQcHCQ4GFAsCfH0FQoFJfQ0HDQYGhwiNfQEMHYGCg2MFBgkCBgsICQdxDJ8VEBCiSJ2VFGlomQgMGxiyEB9KXQUUBQIHAsW8qyERwBARHRxJBAKIA4iYDgkWFRkgKR4RHyUNDH9HDwgOAA4Oh+0aEDEAFxcmERoABxQBSesOAJgggcWHFRMAhHAxAQQKESYkEAxADQkDBAdKAADgAcOEfRcEZIABQsIFiQASUECioEKFEyJUTEjQQoIDCRo8ZDh5QIIBhQcTHKQjEqiChTwCBiit9CLC0TuFML2ZYxFBGlwMLETI4OBinANvEkAaFkAPiQAYnC5wMABNAGQLygpg8naALwwbGBQ4ltRUgmxzmTzoFaHCAjgL4iYd8CYp1SUjnJJIdewRgrcUnygYwSCAAUedEg9dIolKHDF9HpshhGWL69ewY8s2EgQAOw=="}' http://localhost:9002/api/photos
```
You shout see in the browser the logo of nasa.
![alt text](./docs/nasa.gif)
