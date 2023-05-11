# Database Backup

## Persyaratan Server

Diperlukan PHP versi 8.0 atau lebih tinggi, dengan ekstensi berikut terpasang:

-  [intl](http://php.net/manual/en/intl.requirements.php)
-  [mbstring](http://php.net/manual/en/mbstring.installation.php)

Selain itu, pastikan ekstensi berikut diaktifkan di PHP Anda:

-  json (diaktifkan secara default - jangan matikan)
-  [mysqlnd](http://php.net/manual/en/mysqlnd.install.php) jika Anda berencana menggunakan MySQL
-  [psql](https://www.php.net/manual/en/book.pgsql.php) jika Anda berencana menggunakan Postgre
-  [libcurl](http://php.net/manual/en/curl.requirements.php) jika Anda berencana menggunakan pustaka HTTP\CURLRequest

`php spark serve` untuk menjalankan aplikasi `http://localhost:8080`
