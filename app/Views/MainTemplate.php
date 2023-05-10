<!DOCTYPE html>
<html lang="id" data-bs-theme="dark">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title><?php echo $title;?></title>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"/>
   <?php echo $webpack_css;?>
</head>
<body id="kt_body" class="header-fixed" data-kt-app-page-loading-enabled="true">
   <div class="d-flex flex-column flex-root" id="root"></div>
   <?php echo $webpack_js;?>
</body>
</html>