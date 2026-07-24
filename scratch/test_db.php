<?php
$start = microtime(true);
echo "Testing MySQL Connection with localhost...\n";

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=browky_rental', 'root', '');
    echo "Connected successfully with localhost in " . round(microtime(true) - $start, 3) . " seconds!\n";
    $stmt = $pdo->query("SELECT COUNT(*) FROM products");
    echo "Products count: " . $stmt->fetchColumn() . "\n";
} catch (Exception $e) {
    echo "PDO Error: " . $e->getMessage() . "\n";
}
