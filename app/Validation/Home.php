<?php

namespace App\Validation;

class Home {

   public function submit() {
      return [
         'hostname' => [
            'label' => 'Hostname',
            'rules' => 'required'
         ],
         'username' => [
            'label' => 'Username',
            'rules' => 'required'
         ],
         'password' => [
            'label' => 'Password',
            'rules' => 'required'
         ],
         'database' => [
            'label' => 'Database',
            'rules' => 'required'
         ],
         'port' => [
            'label' => 'Port',
            'rules' => 'required|numeric'
         ],
         'dbdriver' => [
            'label' => 'DB driver',
            'rules' => 'required'
         ],
      ];
   }
   
}