<?php

use Config\App;

function css_tag($href = '', $type = 'text/css', $index_page = false) {
   $config = new App();

   $link = '';
   if (is_array($href)) {
      foreach ($href as $v) {
         $link .= css_tag($v, $type, $index_page);
      }
   } else {
      $link .= '<link ';
      if (strpos($href, '://') !== false) {
         $link .= 'href="'.$href.'"';
      } elseif ($index_page === true) {
         $link .= 'href="'.$config->baseURL . $href.'"';
      } else {
         $link .= 'href="'.$config->baseURL . $href.'"';
      }
      $link .= " type=\"{$type}\" rel=\"stylesheet\" />";
   }
   return $link;
}

function script_tag($src = '', $type = "text/javascript", $index_page = false) {
   $config = new App();
   
   $link = '';
   if (is_array($src)) {
      foreach ($src as $v) {
         $link .= script_tag($v, $type, $index_page);
      }
   } else {
      $link .= '<script ';
      if (strpos($src, '://') !== false) {
         $link .= 'src="'.$src.'"';
      } elseif ($index_page === true) {
         $link .= 'src="'.$config->baseURL . $src.'"';
      } else {
         $link .= 'src="'.$config->baseURL . $src.'"';
      }
      $link .= " type=\"{$type}\" rel=\"preload\" as=\"script\"></script>";
   }
   return $link;
}