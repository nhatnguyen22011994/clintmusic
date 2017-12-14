exports.config = {
    bundles: [
      { components: ['tsx-progress-bar'] }
    ],
    collections: [
      { name: '@stencil/router' },
      { name: '@ionic/core' }
    ],
    serviceWorker: {
      globPatterns: [
        '**/*.{js,css,json,html,ico,png}'
      ],
      globIgnores: [
        'build/app/svg/*.js'
      ]
    }
  };
  
  exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
  }
  