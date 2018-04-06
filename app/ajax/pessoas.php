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
			case 'buscaPessoa':
				if ($_POST['id'] != '-1') {
					$data['pessoa'] = $database->select('pessoas', '*', [
						'id' => $_POST['id']
					]);

					$pessoa_projetos = $database->select('projetos_participantes', '*', [
						'id_pessoa' => $_POST['id']
					]);

					foreach ($pessoa_projetos as $key) {
						$data['projetos'][] = $database->select('projetos', ['id', 'titulo'], [
							'id' => $key['id_projeto']
						]);
					}

					if (!empty($data['projetos'])) {
						foreach ($data['projetos'] as $key => $value) {
							$data['projetos'][$key]['conteudos'] = $database->select('projetos_conteudos', '*', [
								'id_projeto' => $value[0]['id']
							]);
							foreach ($data['projetos'][$key]['conteudos'] as $key2 => $value2) {
								$data['projetos'][$key]['conteudos'][$key2]['nome'] = $database->select('conteudos', ['nome'], [
									'id' => $value2['id_conteudo']
								]);
							}
						}
					}

					$data['editar'] = true;
				} else {
					$data['pessoas'] = $database->select('pessoas', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaPessoa':
				$database->update('pessoas', [
					'nome' => $_POST['data']['nome'],
					'sobrenome' => $_POST['data']['sobrenome'],
					'data_nascimento' => $_POST['data']['data_nascimento'],
					'data_entrada' => $_POST['data']['data_entrada'],
					'funcao' => $_POST['data']['funcao'],
					'registro_aluno' => $_POST['data']['registro_aluno'],
					'sexo' => $_POST['data']['sexo'],
					'telefone' => $_POST['data']['telefone'],
					'email' => $_POST['data']['email'],
					'responsavel_1' => $_POST['data']['responsavel_1'],
					'responsavel_2' => $_POST['data']['responsavel_2'],
					'serie' => $_POST['data']['serie']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiPessoa':
				$database->delete('pessoas', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiPessoa':
				$database->insert('pessoas', [
					'nome' => $_POST['data']['nome'],
					'sobrenome' => $_POST['data']['sobrenome'],
					'data_nascimento' => $_POST['data']['data_nascimento'],
					'data_entrada' => $_POST['data']['data_entrada'],
					'funcao' => $_POST['data']['funcao'],
					'registro_aluno' => $_POST['data']['registro_aluno'],
					'sexo' => $_POST['data']['sexo'],
					'telefone' => $_POST['data']['telefone'],
					'email' => $_POST['data']['email'],
					'responsavel_1' => $_POST['data']['responsavel_1'],
					'responsavel_2' => $_POST['data']['responsavel_2'],
					'serie' => $_POST['data']['serie']
				]);
				break;
		}
	}
?>