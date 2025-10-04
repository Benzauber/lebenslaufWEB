<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ip       = $_SERVER['REMOTE_ADDR'];          // IP-Adresse
    $path     = $_POST['path'] ?? '-';            // Pfad/Seite
    $datetime = date("d.m.Y H:i:s");              // Datum & Zeit

    // Land bestimmen (optional, wenn GeoIP installiert ist)
    $country = '-';
    if (function_exists('geoip_country_name_by_name')) {
        $country = geoip_country_name_by_name($ip);
    }

    // Log-Eintrag zusammenbauen
    $entry = "$datetime ; $ip ; $country ; $path\n";

    // In Datei speichern
    file_put_contents("statistics.txt", $entry, FILE_APPEND | LOCK_EX);

    echo "OK";
    exit;
}
?>

