<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->group('/', function ($routes) {
   $routes->get('getdata', 'Home::getData');
   $routes->get('resetdatabase', 'Home::resetDatabase');
   $routes->get('checkappupdate', 'Home::checkAppUpdate');
   $routes->get('getmanifestupgrade', 'Home::getManifestUpgrade');

   $routes->post('upgradeapp', 'Home::upgradeApp');
   $routes->post('submit', 'Home::submit');
   $routes->post('connecttodb', 'Home::connectToDB');
   $routes->post('countdatarows', 'Home::countDataRows');
   $routes->post('handlebackup', 'Home::handleBackup');
   $routes->post('hapus', 'Home::hapus');
   $routes->post('getstructuretable', 'Home::getStructureTable');

   $routes->group('database', function ($routes) {
      $routes->get('/', 'Database::index');
      $routes->get('getdata', 'Database::getData');
      $routes->get('downloadcsvfile', 'Database::downloadCSVFile');
      $routes->get('download', 'Database::download');

      $routes->post('loadtable', 'Database::loadTable');
      $routes->post('loadcsv', 'Database::loadCSV');
   });
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
   require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
