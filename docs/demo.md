# Demo
Le but est de démontrer les possibilités d'utiliser **socket.io** dans les applications simultanées un peu comme Facebook. Il y a une foule d'application potentielle que l'on peut faire avec socket.io.

Pour ce faire, cette petite démo permet de prendre des photos (caméra) et de les afficher automatiquement (écran)

L'application est découplée à l'aide d'un back-end et de 2 clients front-end. Voici comment elles sont interreliés :

le back-end reçoit des nouvelles images et affichent automatiquement la dernière photo envoyée sur tous les clients connectés.

Par exemple si des clients sont connecté au serveur à l'adresse '/screen'. Les clients verront la dernière photo envoyée. Or, si par la suite un utilisateur utilise la caméra à l'adresse '/camera' et envoie une nouvelle photo via un POST les clients '/screen' sera en mesure d'afficher automatiquement cette dernière photo. Pour permettre le rafraichissement automatique de la photo envoyé par les clients '/camera', les clients '/screen' se connectent au serveur sur un canal de socket.io.

Les deux clients permettant d'interagir avec le back-end son donc situé aux URL '/screen' et '/camera':

ainsi, l'URL '/screen' permet affichait la dernière image (mode écrant) et l'URL '/camera' permet d'envoyer des photos au serveur (mode caméra). Il est possible d'envoyer une photo avec Curl par exemple (voir github back-end).

```
Les techniques utilisé sont :
  pour le back End :
    - NodeJs
    - api REST
    - Socket.Io
  pour le front-end :
    - '/Caméra' :
        - React
        - api REST
        - Caméra HTML5
    - '/Screen' :
        - Jquery
        - socket.io.
```

Au niveau back-end les images sont recu via l'api REST '/api/photos' qui reçoit les posts via un JSON contenant l'image encodée en base64. L'image est ensuite sauvegardée sur le serveur dans le dossier '/media'. Toutes les images sont sauvegardés et incrémentées du nom de fichier (-1, -2, -3...) mais seulement la dernière image est affiché.


Au niveau front-end '/camera' react utilise un sous module **'react-html5-camera-photo'** disponible sur npm :
https://www.npmjs.com/package/react-html5-camera-photo

Le code source back-end est disponible sur github :
https://github.com/MABelanger/node-socketio-photo

Le client '/camera' est disponible sur github :
https://github.com/MABelanger/react-send-photo

Le client '/screen' est disponible sur github (inclus dans le dossier '/public' du back-end):
https://github.com/MABelanger/node-socketio-photo/tree/master/public

L'adresse de la démo est : https://mquartier.com