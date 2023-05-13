<?php

namespace App\Libraries;

class Git {

   protected $path = 'https://raw.githubusercontent.com/sqoneijal/db_recovery/master/';

   public function read($url) {
      $options = [
         'baseURI' => $this->path,
         'timeout' => 3,
      ];
      $client = \Config\Services::curlrequest($options);
      $get = $client->request('GET', $url);
      $body = json_decode($get->getBody(), true);
      return $body;
   }

   public function get($url) {
      $options = [
         'baseURI' => $this->path,
         'timeout' => 3,
      ];
      $client = \Config\Services::curlrequest($options);
      $get = $client->request('GET', $url);
      return $get->getBody();
   }

}