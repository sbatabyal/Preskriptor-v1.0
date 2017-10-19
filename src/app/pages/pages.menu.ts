export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
          path: 'header',
          data: {
              menu: {
                  title: 'general.menu.header',
                  icon: 'ion-compose',
                  selected: false,
                  expanded: false,
                  order: 0
              }
          },
          children: [
              {
                  path: 'post',
                  data: {
                      menu: {
                          title: 'general.menu.postHeader',
                          icon: 'ion-edit'
                      }
                  }
              },
              {
                  path: 'get',
                  data: {
                      menu: {
                          title: 'general.menu.getHeaders',
                          icon: 'fa fa-search'
                      }
                  }
              }
          ]
      },
      {
          path: 'drug',
          data: {
              menu: {
                  title: 'general.menu.drug',
                  icon: 'fa fa-medkit',
                  selected: false,
                  expanded: false,
                  order: 0
              }
          },
          children: [
              {
                  path: 'post',
                  data: {
                      menu: {
                          title: 'general.menu.postDrug',
                          icon: 'ion-edit'
                      }
                  }
              },
              {
                  path: 'get',
                  data: {
                      menu: {
                          title: 'general.menu.getDrugs',
                          icon: 'fa fa-search'
                      }
                  }
              }
          ]
      },
      {
          path: 'test',
          data: {
              menu: {
                  title: 'general.menu.test',
                  icon: 'fa fa-stethoscope',
                  selected: false,
                  expanded: false,
                  order: 0
              }
          },
          children: [
              {
                  path: 'post',
                  data: {
                      menu: {
                          title: 'general.menu.postTest',
                          icon: 'ion-edit'
                      }
                  }
              },
              {
                  path: 'get',
                  data: {
                      menu: {
                          title: 'general.menu.getTests',
                          icon: 'fa fa-search'
                      }
                  }
              }
          ]
      },
      {
          path: 'about',
          data: {
              menu: {
                  title: 'general.menu.about',
                  icon: 'fa fa-user-md',
                  selected: false,
                  expanded: false,
                  order: 250,
              }
          }
      },  
      {
          path: 'contact',
          data: {
              menu: {
                  title: 'general.menu.contact',
                  icon: 'fa fa-phone',
                  selected: false,
                  expanded: false,
                  order: 250,
              }
          }
      },       
      {
        path: 'logout',
        data: {
          menu: {
            title: 'general.menu.signOut',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        }        
      }  
    ]
  }
];
