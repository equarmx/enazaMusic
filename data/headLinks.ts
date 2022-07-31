export default {
  headLinks: [
    /* Bulma.css */
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css',
    },
    /** mdi icons from google for better usability
     * if we want to change color/size/state of icons
     * alternative - use @nuxtjs/fontawesome or custom svg
     * from folder's directory /assets/svg **/
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
  ],
}
