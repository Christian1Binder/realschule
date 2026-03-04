<?php
/**
 * Späterer Upgrade-Pfad:
 * Dieses Skript lädt JSON aus /data/... und gibt es zurück.
 * Für die statische GitHub Pages Version wird dieses Skript nicht benötigt.
 */
header('Content-Type: application/json');

// $file = $_GET['file'] ?? 'mathematik';
// $data = file_get_contents("../../data/grade-7/{$file}.json");
// echo $data;

echo json_encode(["status" => "success", "message" => "Dies ist nur ein Platzhalter."]);
?>