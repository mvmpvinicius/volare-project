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
			//						//
			//		OUTROS AJAX		//
			//						//
			case 'buscaFuncoes':
				$data = $database->select('funcoes', [
					'id',
					'funcao'
				]);
				echo $json_response = json_encode($data);
				break;
			////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////
		}
	}
?>