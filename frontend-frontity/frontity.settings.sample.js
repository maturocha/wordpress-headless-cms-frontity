const settings = {
  "name": "charco-frontity",
  "state": {
    "frontity": {
      "url": "https://www.charco.studio",
      "title": "Charco Studio",
      "description": "Graphic Design Studio"
    }
  },
  "packages": [
    {
      "name": "charco-theme"
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": "https://charco.studio/wp/wp-json",
          "homepage": "/home",
          "languages": [
            {
              locale: "en_US",
              title: {
                "en_US": "English",
                "es_ES": "Inglés"  
              }
            },
            {
              locale: "es_ES",
              title: {
                "en_US": "Spanish",
                "es_ES": "Español"  
              }
            }
          ],
          "postTypes": [
            {
              type: "work",
              endpoint: "works",
              archive: "/works"
            },
            {
              type: "content",
              endpoint: "contents",
              archive: "/contents"
            },
          ],
          "taxonomies": [
            {
              taxonomy: "deliverables",
              endpoint: "deliverables", 
              postTypeEndpoint: "work",
            }
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/head-tags",
    "frontity-contact-form-7"
  ]
};

export default settings;