<?php
/**
 * Späterer Upgrade-Pfad:
 * Dieses Skript nimmt JSON via POST an und speichert es in /data/...
 * Für die statische GitHub Pages Version wird dieses Skript nicht benötigt.
 */
header('Content-Type: application/json');

// $data = json_decode(file_get_contents('php://input'), true);
// file_put_contents('../../data/grade-7/fach.json', json_encode($data));

echo json_encode(["status" => "success", "message" => "Dies ist nur ein Platzhalter."]);
?>