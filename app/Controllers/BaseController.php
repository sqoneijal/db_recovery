<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

abstract class BaseController extends Controller
{
   /**
    * Instance of the main Request object.
    *
    * @var CLIRequest|IncomingRequest
    */
   protected $request;

   /**
    * An array of helpers to be loaded automatically upon
    * class instantiation. These helpers will be available
    * to all other controllers that extend BaseController.
    *
    * @var array
    */
   protected $helpers = ['style', 'filesystem', 'array', 'number'];

   /**
    * Be sure to declare properties for any property fetch you initialized.
    * The creation of dynamic property is deprecated in PHP 8.2.
    */
   // protected $session;

   /**
    * Constructor.
    */

   protected $post;
   protected $getVar;
   protected $env = 'development';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
   {
      // Do Not Edit This Line
      parent::initController($request, $response, $logger);

      $this->post = $request->getPost();
      $this->getVar = $request->getVar();
   }

   public function template($content = [])
   {
      $data['title'] = $content['title'];
      $data['webpack_css'] = $this->generateWebpackCss();
      $data['webpack_js'] = $this->generateWebpackJS();

      echo view('MainTemplate', $data);
   }

   protected function generateWebpackCss()
   {
      if ($this->env === 'development') {
         return css_tag([
            'http://localhost:8081/main.css',
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $css_tag[] = base_url("bundle/{$set['main.css']}");

         return css_tag($css_tag);
      }
   }

   protected function generateWebpackJS()
   {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/main.js',
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $script_tag[] = base_url("bundle/{$set['runtime.js']}");
         $script_tag[] = base_url("bundle/{$set['main.js']}");

         return script_tag($script_tag);
      }
   }

   public function internalCss($content = [])
   {
      $internalCss = [];
      if (@$content['internalCss']) {
         foreach ($content['internalCss'] as $path) {
            $internalCss[] = $path;
         }
      }
      return $internalCss;
   }

   public function internalJs($content = [])
   {
      $internalJs = [];
      if (@$content['internalJs']) {
         foreach ($content['internalJs'] as $path) {
            $internalJs[] = $path;
         }
      }
      return $internalJs;
   }

   public function respond($data)
   {
      return $this->response->setJSON($data);
   }
}
