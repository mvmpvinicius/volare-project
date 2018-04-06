<?php
	require 'medoo.min.php';

	$database = new medoo([
		'database_type' => 'mysql',
		'database_name' => 'osuc',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',
	]);

	if (isset($_POST['acao'])) {
		switch ($_POST['acao']) {
			case 'buscaPrototipo':
				if ($_POST['id'] != '-1') {
					$data = $database->select('prototipos', '*', [
						'id' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data = $database->select('prototipos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaPrototipo':
				$database->update('prototipos', [
					'campo' => $_POST['data']['campo']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiPrototipo':
				$database->delete('prototipos', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiBanco':
				$database->insert('prototipos', [
					'campo' => $_POST['data']['campo']
				]);
				break;
		}
	}
?>