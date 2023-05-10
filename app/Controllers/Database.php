<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Database extends BaseController {

   protected $data;

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Database'
      ];

      $this->template($this->data);
   }

   public function sizeFormat($bytes) {
      $kb = 1024;
      $mb = $kb * 1024;
      $gb = $mb * 1024;
      $tb = $gb * 1024;

      if (($bytes >= 0) && ($bytes < $kb)) {
         return $bytes . ' B';
      } elseif (($bytes >= $kb) && ($bytes < $mb)) {
         return ceil($bytes / $kb) . ' KB';
      } elseif (($bytes >= $mb) && ($bytes < $gb)) {
         return ceil($bytes / $mb) . ' MB';
      } elseif (($bytes >= $gb) && ($bytes < $tb)) {
         return ceil($bytes / $gb) . ' GB';
      } elseif ($bytes >= $tb) {
         return ceil($bytes / $tb) . ' TB';
      } else {
         return $bytes . ' B';
      }
   }

   public function folderSize($dir) {
      $count_size = 0;
      $count = 0;
      $dir_array = scandir($dir);
      foreach ($dir_array as $key => $filename){
         if ($filename != ".." && $filename != ".") {
            if (is_dir($dir."/".$filename)) {
               $new_foldersize = $this->foldersize($dir."/".$filename);
               $count_size = $count_size + $new_foldersize;
            } else if (is_file($dir."/".$filename)) {
               $count_size = $count_size + filesize($dir."/".$filename);
               $count++;
            }
         }
      }
      return $count_size;
   }

   public function loadCSV() {
      $path = WRITEPATH . 'logs/' . $this->post['database'] . '/' . $this->post['tablename'];
      $map = directory_map($path, 1);

      $content = [];
      foreach ($map as $row) {
         array_push($content, [
            'name' => $row,
            'size' => number_to_size(get_file_info($path . '/' . $row, 'size', 'string')['size']),
            'timestamp' => date('Y-m-d H:i:s', get_file_info($path . '/' . $row, 'date')['date'])
         ]);
      }
      array_sort_by_multiple_keys($content, ['name' => SORT_ASC]);
      return $this->respond($content);
   }

   public function loadTable() {
      $path = WRITEPATH . 'logs/' . $this->post['database'];
      $map = directory_map($path, 1);

      $content = [];
      foreach ($map as $row) {
         array_push($content, [
            'tablename' => str_replace('/', '', $row),
            'timestamp' => date('Y-m-d H:i:s', filemtime($path . '/' . str_replace('/', '', $row))),
            'size' => number_to_size($this->folderSize($path . '/' . str_replace('/', '', $row)))
         ]);
      }

      array_sort_by_multiple_keys($content, ['tablename' => SORT_ASC]);
      return $this->respond($content);
   }

   public function getData() {
      try {
         $file = json_decode(file_get_contents(WRITEPATH . 'logs/overview.json'), true);

         $content = [];
         foreach ($file as $row) {
            array_push($content, array_merge($row, [
               'size' => file_exists(WRITEPATH . 'logs/' . $row['database']) ? number_to_size($this->folderSize(WRITEPATH . 'logs/' . $row['database'])) : '0 B'
            ]));
         }

         array_sort_by_multiple_keys($content, ['database' => SORT_ASC]);
         return $this->respond(['status' => true, 'content' => $content]);
      } catch (\Exception $e) {
         return $this->respond(['status' => false, 'msg_response' => $e->getMessage()]);
      }
   }

   public function downloadCSVFile() {
      $data = WRITEPATH . 'logs/' . $this->getVar['path'];
      return $this->response->download($data, null);
   }

}