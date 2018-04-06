<?php
	require 'medoo.min.php';

	$database = new medoo([
		'database_type' => 'mysql',
		'database_name' => 'volare',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',
	]);

	if(isset($_POST['acao'])){
		switch($_POST['acao']){
			case 'buscaAssistente':
				if ($_POST['id'] != '-1') {
					$data = $database->select('assistentes', '*', [
						'id' => $_POST['id']
					]);

					$data['editar'] = true;
				} else {
					$data = $database->select('assistentes', '*');
					
					foreach ($data as $key1 => $value) {
						$data_nome = $database->select('pessoas', '*', [
							'id' => $data[$key1]['id_assistente']
						]);
						foreach ($data_nome as $key2 => $value) {
							$data[$key1]['nome'] = $value['nome'];
						}
					}
										
					foreach ($data as $key1 => $value) {
						$data_titulo = $database->select('projetos', '*', [
							'id' => $data[$key1]['id_projeto']
						]);
						foreach ($data_titulo as $key2 => $value) {
							$data[$key1]['titulo'] = $value['titulo'];
						}
					}
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaAssistente':
				$database->update('assistentes', [
					'id_assistente' => $_POST['data']['id_assistente'],
					'id_projeto' => $_POST['data']['id_projeto'],
					'gostei_projeto' => $_POST['data']['gostei_projeto'],
					'eu_cresci' => $_POST['data']['eu_cresci'],
					'comentario' => $_POST['data']['comentario']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiAssistente':
				$database->delete('assistentes', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiAssistente':
				$database->insert('assistentes', [
					'id_assistente' => $_POST['data']['id_assistente'],
					'id_projeto' => $_POST['data']['id_projeto'],
					'gostei_projeto' => $_POST['data']['gostei_projeto'],
					'eu_cresci' => $_POST['data']['eu_cresci'],
					'comentario' => $_POST['data']['comentario']
				]);
		}
	}
?>