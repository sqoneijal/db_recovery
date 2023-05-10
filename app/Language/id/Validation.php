<?php

/**
 * Validation language strings.
 *
 * @package    CodeIgniter
 * @author     CodeIgniter Dev Team
 * @copyright  2019 CodeIgniter Foundation
 * @license    https://opensource.org/licenses/MIT	MIT License
 * @link       https://codeigniter.com
 * @since      Version 4.0.0
 * @filesource
 *
 * @codeCoverageIgnore
 */

return [
	// Core Messages
   'noRuleSets'            => 'No rulesets specified in Validation configuration.',
   'ruleNotFound'          => '{0} is not a valid rule.',
   'groupNotFound'         => '{0} is not a validation rules group.',
   'groupNotArray'         => '{0} rule group must be an array.',
   'invalidTemplate'       => '{0} is not a valid Validation template.',

	// Rule Messages
   'alpha'                 => '{field} hanya boleh berisi karakter alfabet.',
   'alpha_dash'            => '{field} hanya boleh berisi karakter alfa-numerik, garis bawah, dan garis putus-putus.',
   'alpha_numeric'         => '{field} hanya boleh berisi karakter alfanumerik.',
   'alpha_numeric_space'   => '{field} hanya boleh berisi karakter dan spasi alfanumerik.',
   'alpha_space'           => '{field} hanya boleh berisi karakter dan spasi alfabet.',
   'decimal'               => '{field} harus berisi angka desimal.',
   'differs'               => '{field} harus berbeda dari {param}.',
   'equals'                => '{field} harus persis: {param}.',
   'exact_length'          => 'Panjang {field} harus tepat {param} karakter.',
   'greater_than'          => '{field} harus mengandung angka yang lebih besar dari {param}.',
   'greater_than_equal_to' => '{field} harus berisi angka yang lebih besar atau sama dengan {param}.',
   'in_list'               => '{field} harus salah satu dari: {param}.',
   'integer'               => '{field} harus berisi bilangan bulat.',
   'is_natural'            => '{field} hanya boleh berisi digit.',
   'is_natural_no_zero'    => '{field} hanya boleh berisi angka dan harus lebih besar dari nol.',
   'is_not_unique'         => '{field} harus berisi nilai yang sudah ada sebelumnya dalam database.',
   'is_unique'             => '{field} sudah terdaftar. Silahkan gunakan yang lain.',
   'less_than'             => '{field} harus mengandung angka kurang dari {param}.',
   'less_than_equal_to'    => '{field} harus mengandung angka kurang dari atau sama dengan {param}.',
   'matches'               => '{field} tidak cocok dengan {param}.',
   'max_length'            => '{field} maksimal {param} karakter.',
   'min_length'            => '{field} minimal {param} karakter.',
   'not_equals'            => '{field} tidak boleh: {param}.',
   'numeric'               => '{field} harus berisi angka.',
   'regex_match'           => '{field} tidak dalam format yang benar.',
   'required'              => '{field} tidak boleh kosong.',
   'required_with'         => '{field} diperlukan saat {param} ada.',
   'required_without'      => '{field} diperlukan saat {param} tidak ada.',
   'timezone'              => '{field} harus merupakan zona waktu yang valid.',
   'valid_base64'          => '{field} harus berupa string base64 yang valid.',
   'valid_email'           => '{field} harus berisi alamat yang valid.',
   'valid_emails'          => '{field} harus berisi semua alamat email yang valid.',
   'valid_ip'              => '{field} harus berisi IP yang valid.',
   'valid_url'             => '{field} harus berisi URL yang valid.',
   'valid_date'            => '{field} tanggal tidak valid.',

	// Credit Cards
   'valid_cc_num'          => '{field} tampaknya bukan nomor kartu kredit yang valid.',

	// Files
   'uploaded'              => '{field} bukan file unggahan yang valid.',
   'max_size'              => '{field} file terlalu besar.',
   'is_image'              => '{field} bukan file gambar yang diunggah dan valid.',
   'mime_in'               => '{field} tidak memiliki tipe mime yang valid.',
   'ext_in'                => '{field} tidak memiliki ekstensi file yang valid.',
   'max_dims'              => '{field} bukan gambar, atau terlalu lebar atau tinggi.',
];