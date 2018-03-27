# Demo NodeJs/ReactJs/Socket.io sur mquartier.com

### But et possibilités
Le but est de démontrer les possibilités d'utiliser **socket.io** dans les applications simultanées comme Facebook. Il y a une foule d'application potentielle que l'on peut faire avec socket.io. On peut intéragir directement avec le client et l'informer de quelque chose en temps réel. Par exemple, si le client active un GPS, il est possible de lui proposer selon sa position quels sont les magasins intéressant autour de lui. Etc...  

Pour montrer un peu tout ca, cette petite démo permet de prendre des **photos (caméra)** et de les **afficher (écran)** automatiquement via **socket.io**.

### Interaction entre back-end et front-end

L'application est découplée à l'aide d'un **back-end** et de **2 clients front-end**. Voici comment ils sont interreliés :

le **back-end** reçoit des nouvelles images et affichent automatiquement la dernière photo envoyée sur tous les clients connectés.

Par exemple si des clients sont connecté au serveur à l'adresse **'/screen'**. Les clients verront la dernière photo envoyée. Or, si par la suite un utilisateur utilise la caméra à l'adresse **'/camera'** et envoie une nouvelle photo via un POST, les clients **'/screen'** sera en mesure d'afficher automatiquement cette dernière photo. Pour permettre le rafraichissement automatique de la photo envoyé par les clients **'/camera'**, les clients **'/screen'** se connectent au serveur sur un canal de socket.io.

Les deux clients permettant d'interagir avec le back-end son donc situé aux URL **'/screen'** et **'/camera'**:

ainsi, l'URL **'/screen'** permet d'afficher la dernière image (mode écran) et l'URL **'/camera'** permet d'envoyer des photos au serveur (mode caméra).

Par exemple, pour envoyer un POST à **https://mquartier.com/api/photos** de cette icon ![alt nasa icon](./nasa.gif) encodé en base64 à l'aide de la ligne de commande :

```
$ curl -H "Content-Type: application/json" -X POST -d '{"dataUri":"data:image/gif;base64,R0lGODlhIAAgAFUAACH5BAEAADIALAAAAAAgACAAhf7//wtAmhJGnSxcqRJBlAg/mT5or3GQxAQ7mFl8uPAALRhLnwFDnx5RpI+o0A5AlfEZI50mTszc7u/v9QE4lWYzZj43f7HE4ZkzZsVkffTN0ihEkwo+lhs/k8wzZswzM//MzJlmmax7m0w3dwlIosyZmWZmmcyswP9mmf+ZmZmZzPqtsZlmZmaZzDNmmcxmmcxmZv8zMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb/QJlwSCwaj8ikcslsOp/QqFRGeDwIVcKUSAh4Cw2vIPCYdgOIQmDRWBgG6oD2eeYM3INGY+z1locKCkhnAQcHCQ4GFAsCfH0FQoFJfQ0HDQYGhwiNfQEMHYGCg2MFBgkCBgsICQdxDJ8VEBCiSJ2VFGlomQgMGxiyEB9KXQUUBQIHAsW8qyERwBARHRxJBAKIA4iYDgkWFRkgKR4RHyUNDH9HDwgOAA4Oh+0aEDEAFxcmERoABxQBSesOAJgggcWHFRMAhHAxAQQKESYkEAxADQkDBAdKAADgAcOEfRcEZIABQsIFiQASUECioEKFEyJUTEjQQoIDCRo8ZDh5QIIBhQcTHKQjEqiChTwCBiit9CLC0TuFML2ZYxFBGlwMLETI4OBinANvEkAaFkAPiQAYnC5wMABNAGQLygpg8naALwwbGBQ4ltRUgmxzmTzoFaHCAjgL4iYd8CYp1SUjnJJIdewRgrcUnygYwSCAAUedEg9dIolKHDF9HpshhGWL69ewY8s2EgQAOw=="}' https://mquartier.com/api/photos
```

Par exemple, pour voir l'icon en mode screen : https://mquartier.com/screen/

### Technologie utilisé
```
  Back-End :
    - NodeJs
    - Api REST
    - Socket.io
  Front-End :
    - '/Camera' :
        - React
        - Api REST
        - Caméra HTML5
    - '/Screen' :
        - Jquery
        - Socket.io
```

### Description Front-End & Back-End
Pour le **back-end** les images sont recu via l'api REST **'/api/photos'** qui reçoit les posts via un JSON contenant l'image encodée en base64. L'image est ensuite sauvegardée sur le serveur dans le dossier **'/media'**. Toutes les images sont sauvegardés et incrémentées du nom de fichier **(-1, -2, -3...)** mais seulement la dernière image est affiché.


Pour le **front-end** **'/camera'** : l'application est fait en **ReactJS** et utilise un module npm ['react-html5-camera-photo'](https://www.npmjs.com/package/react-html5-camera-photo) qui peut être réutiliser dans d'autre applications.

Pour le **front-end** **'/screen'** : la page web est simplement fait avec **Jquery** et se rafraichis automatiquement à l'aide de **socket.io** à tout les fois que le serveur recoit une nouvelle images, sinon le serveur rafraichis la page à tout les minutes pour remettre à jours le temps que la photo à été mis sur le serveur.


### Liens et codes source
Le code source **back-end** [node-socketio-photo](https://github.com/MABelanger/node-socketio-photo)

L'application de client **front-end '/camera'** [react-send-photo](https://github.com/MABelanger/react-send-photo)

La page index.html de client **front-end '/screen'** inclus dans [le dossier '/public'](https://github.com/MABelanger/node-socketio-photo/blob/master/public/screen/index.html) de node-socketio-photo

La **demo** sur [mquartier](https://mquartier.com)
