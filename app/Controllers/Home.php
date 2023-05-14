<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Libraries\Git;
use CodeIgniter\CLI\CLI;
use App\Validation\Home as Validate;
use App\Models\Home as Model;

class Home extends BaseController {

   protected $data;

   protected $db_config = [
      'DSN'      => '',
		'hostname' => '',
		'username' => '',
		'password' => '',
		'database' => '',
		'DBDriver' => '',
		'DBPrefix' => '',
		'pConnect' => false,
		'DBDebug'  => true,
		'charset'  => 'utf8',
		'DBCollat' => 'utf8_general_ci',
		'swapPre'  => '',
		'encrypt'  => false,
		'compress' => false,
		'strictOn' => false,
		'failover' => [],
		'port'     => 3306,
   ];

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);

      if ($request->isAjax()) {
         $this->db_config = [
            'DSN'      => '',
            'hostname' => @$request->getPost('hostname'),
            'username' => @$request->getPost('username'),
            'password' => @$request->getPost('password'),
            'database' => @$request->getPost('database'),
            'DBDriver' => @$request->getPost('dbdriver'),
            'DBPrefix' => '',
            'pConnect' => false,
            'DBDebug'  => true,
            'charset'  => 'utf8',
            'DBCollat' => 'utf8_general_ci',
            'swapPre'  => '',
            'encrypt'  => false,
            'compress' => false,
            'strictOn' => false,
            'failover' => [],
            'port'     => @$request->getPost('port'),
         ];
      }
   }

   public function index() {
      $this->data = [
         'title' => 'Overview'
      ];

      $this->template($this->data);
   }

   public function hapus() {
      $overview = json_decode(file_get_contents(WRITEPATH . 'logs/overview.json'), true);

      $content = [];
      foreach ($overview as $row) {
         if ($row['id'] != $this->post['id']) {
            array_push($content, $row);
         }
      }

      file_put_contents(WRITEPATH.'logs/overview.json', json_encode($content, JSON_PRETTY_PRINT));
      return $this->respond(['status' => true, 'msg_response' => 'Data berhasil dihapus.']);
   }

   public function resetDatabase() {
      $this->createDatabaseFile([
         'hostname' => '',
         'username' => '',
         'password' => '',
         'database' => '',
         'dbdriver' => '',
         'port' => 3306
      ]);
   }

   public function handleBackup() {
      try {
         $limit = 5000;
         $page = (int) $this->post['page'];
         $offset = $page * $limit;

         $db = \Config\Database::connect($this->db_config);
         $table = $db->table($this->post['tablename']);
         $table->limit($limit, $offset);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $response = ['next_row' => false, 'status' => true];
         if (count($result) > 0) {
            $csv_path = WRITEPATH . 'logs/'.$this->post['database'].'/'.$this->post['tablename'].'/data_'.$page.'.csv';

            $csv_header = [];
            foreach ($fieldNames as $field) {
               $csv_header[] = $field;
            }

            $csv_row = [];
            foreach ($result as $key => $val) {
               foreach ($fieldNames as $field) {
                  $csv_row[$key][] = $val[$field] ? trim($val[$field]) : null;
               }
            }

            $fp = fopen($csv_path, 'w');
            foreach ([$csv_header, ...$csv_row] as $fields) {
               fputcsv($fp, $fields, ",", '"');
            }
            fclose($fp);

            $counting = [];
            $data_counting = json_decode(file_get_contents(WRITEPATH . 'logs/data_counting.json'), true);
            foreach ($data_counting as $db => $val) {
               if ($db == $this->post['database']) {
                  foreach ($data_counting[$db] as $tb => $val_tb) {
                     if ($tb == $this->post['tablename']) {
                        $counting[$db][$tb] = ['old_count' => (int) $val_tb['old_count'] + count($result)];
                     } else {
                        $counting[$db][$tb] = $val_tb;
                     }
                  }
               } else {
                  $counting[$db] = $val;
               }
            }

            file_put_contents(WRITEPATH . 'logs/data_counting.json', json_encode($counting, JSON_PRETTY_PRINT));

            $response['content'] = [$csv_header, ...$csv_row];
            $response['next_row'] = true;
         }
         return $this->respond($response);
      } catch (\Exception $e) {
         return $this->respond(['status' => false, 'msg_response' => $e->getMessage()]);
      }
   }

   public function connectToDB() {
      $db_path = WRITEPATH . 'logs/' . $this->post['database'];
      if (!file_exists($db_path)) {
         @mkdir($db_path, 0777);
      }

      $db = \Config\Database::connect($this->db_config);

      $response = [];
      foreach ($db->listTables() as $tb) {
         array_push($response, [
            'tablename' => $tb,
            'count' => $tb,
            'status' => 'skip'
         ]);
      }

      $counting = [];
      $data_counting = json_decode(file_get_contents(WRITEPATH . 'logs/data_counting.json'), true);
      foreach ($data_counting as $key => $val) {
         $counting[$key] = $val;
      }

      $counting[$this->post['database']] = [];
      foreach ($db->listTables() as $tb) {
         $counting[$this->post['database']][$tb] = [
            'old_count' => (@$data_counting[$this->post['database']][$tb] ? $data_counting[$this->post['database']][$tb]['old_count'] : 0)
         ];
      }
      file_put_contents(WRITEPATH . 'logs/data_counting.json', json_encode($counting, JSON_PRETTY_PRINT));

      return $this->respond($response);
   }

   public function countDataRows() {
      $tb_path = WRITEPATH . 'logs/' . $this->post['database'].'/'.$this->post['tablename'];
      if (!file_exists($tb_path)) {
         @mkdir($tb_path, 0777);
      }

      $data_counting = json_decode(file_get_contents(WRITEPATH . 'logs/data_counting.json'), true);

      $db = \Config\Database::connect($this->db_config);
      $table = $db->table($this->post['tablename']);
      $count = $table->countAllResults();

      $response['next'] = true;
      $response['count'] = $count;
      $response['old_count'] = @$data_counting[$this->post['database']][$this->post['tablename']]['old_count'] ?? 0;

      return $this->respond($response);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => []];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $data = [];
         foreach ($this->post as $key => $val) {
            if ($val) $data[$key] = trim($val);
            else $data[$key] = is_numeric($val) ? $val : null;
         }
         unset($data['pageType']);
         
         $savePath = $this->readSavePath();

         if (count($savePath) > 0) {
            $set_data = [];
            foreach ($savePath as $row) {
               array_push($set_data, $row);
            }

            file_put_contents(WRITEPATH.'logs/overview.json', json_encode(array_merge($set_data, [array_merge(['id' => count($savePath) + 1, 'datetime' => date('Y-m-d H:i:s')], $data)]), JSON_PRETTY_PRINT));
            $response['set_data'] = array_merge($set_data, [$data]);
         } else {
            file_put_contents(WRITEPATH.'logs/overview.json', '['.json_encode(array_merge(['id' => 1, 'datetime' => date('Y-m-d H:i:s')], $data), JSON_PRETTY_PRINT).']');
         }
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   private function readSavePath() {
      $path = WRITEPATH . 'logs';
      $file_name = 'overview.json';

      if (file_exists($path.'/'. $file_name)) {
         $get_file = file_get_contents($path.'/'. $file_name);
         return json_decode($get_file, true);
      } else {
         $data = '[]';
         write_file($path.'/'. $file_name, $data);
         return [];
      }
   }

   public function getData() {
      try {
         $file_content = file_get_contents(WRITEPATH.'logs/overview.json');

         return $this->respond([
            'status' => true,
            'content' => json_decode($file_content, true)
         ]);
      } catch (\Exception $e) {
         return $this->respond(['status' => false, 'msg_response' => $e->getMessage()]);
      }
   }

   public function checkAppUpdate() {
      $local_version_path = ROOTPATH . 'public/app_version.json';

      $git = new Git();
      $git_data = $git->read('public/app_version.json');

      $local_version = 0;
      if (file_exists($local_version_path)) {
         $decode_local = json_decode(file_get_contents($local_version_path), true);
         $local_version = (double) $decode_local['version'];
      }

      $response['update'] = 'not_available';
      if ((double) $git_data['version'] > $local_version) {
         $response['update'] = 'available';
      }

      $response['online_version'] = (double) $git_data['version'];
      $response['local_version'] = (double) $local_version;

      return $this->respond($response);
   }

   public function getManifestUpgrade() {
      $git = new Git();
      $manifest = $git->read('public/bundle/manifest.json');

      $content = [];
      foreach ($manifest as $key => $val) {
         array_push($content, str_replace('auto/', '', $val));
      }
      return $this->respond($content);
   }

   public function upgradeApp() {
      $git = new Git();

      $finish_download = false;
      foreach (json_decode($this->post['file'], true) as $file) {
         $content = $git->get('public/bundle/' . $file);
         file_put_contents(ROOTPATH . 'public/bundle/' . $file, $content);
         $finish_download = true;
      }

      $response['status'] = false;
      if ($finish_download) {
         $sw = $git->get('public/sw.js');
         file_put_contents(ROOTPATH . 'public/sw.js', $sw);

         $app_version = $git->get('public/app_version.json');
         file_put_contents(ROOTPATH . 'public/app_version.json', $app_version);

         $manifest = $git->get('public/bundle/manifest.json');
         file_put_contents(ROOTPATH . 'public/bundle/manifest.json', $manifest);

         $routes = $git->get('app/Config/Routes.php');
         file_put_contents(APPPATH . 'Config/Routes.php', $routes);

         $database = $git->get('app/Controllers/Database.php');
         file_put_contents(APPPATH . 'Controllers/Database.php', $database);

         $home = $git->get('app/Controllers/Home.php');
         file_put_contents(APPPATH . 'Controllers/Home.php', $home);

         $response['status'] = true;
      }
      return $this->respond($response);
   }

}