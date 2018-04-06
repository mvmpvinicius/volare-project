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
			case 'buscaConteudo':
				if ($_POST['id'] != '-1') {
					$data = $database->select('conteudos', '*', [
						'id' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data['conteudos'] = $database->select('conteudos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaConteudo':
				$database->update('conteudos', [
					'nome' => $_POST['data']['nome'],
					'id_pai' => $_POST['data']['id_pai']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiConteudo':
				$database->delete('conteudos', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiConteudo':
				$database->insert('conteudos', [
					'nome' => $_POST['data']['nome'],
					'id_pai' => $_POST['data']['id_pai']
				]);
				break;
		}
	}
?>