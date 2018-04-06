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
			case 'buscaProjeto':
				if ($_POST['id'] != '-1') {
					$data = $database->select('projetos', '*', [
						'id' => $_POST['id']
					]);

					$data['projetos_orientadores'] = $database->select('projetos_orientadores', '*', [
						'id_projeto' => $_POST['id']
					]);

					$projetos_participantes = $database->select('projetos_participantes', '*', [
						'id_projeto' => $_POST['id']
					]);
					foreach ($projetos_participantes as $key) {
						$data['projetos_participantes'][] = $database->select('pessoas', '*', [
							'id' => $key['id_pessoa']
						]);
					}

					$projetos_conteudos = $database->select('projetos_conteudos', '*', [
						'id_projeto' => $_POST['id']
					]);
					foreach ($projetos_conteudos as $key) {
						$data['projetos_conteudos'][] = $database->select('conteudos', '*', [
							'id' => $key['id_conteudo']
						]);
					}

					$data['conteudos'] = $database->select('conteudos', '*');
					$data['participantes'] = $database->select('pessoas', '*');
					$data['editar'] = true;
				} else {
					$data['conteudos'] = $database->select('conteudos', '*');
					$data['orientadores'] = $database->select('pessoas', '*');
					$data['participantes'] = $database->select('pessoas', '*');
					$data['projetos'] = $database->select('projetos', '*');

				}
				echo $json_response = json_encode($data);
				break;
			case 'editaProjeto':
				$database->update('projetos', [
					'id_orientador' => $_POST['data']['id_orientador'],
					'titulo' => $_POST['data']['titulo'],
					'data_inicio' => $_POST['data']['data_inicio'],
					'data_prevista' => $_POST['data']['data_prevista'],
					'data_termino' => $_POST['data']['data_termino'],
					'objetivo' => $_POST['data']['objetivo'],
					'comentarios' => $_POST['data']['comentarios'],
					'habilidades' => $_POST['data']['habilidades'],
					'acompanhamento' => $_POST['data']['acompanhamento'],
					'fontes' => $_POST['data']['fontes']
				], [
					'id' => $_POST['data']['id']
				]);

				$database->delete('projetos_orientadores', [
					'id_projeto' => $_POST['data']['id']
				]);
				$database->insert('projetos_orientadores', [
					'id_pessoa' => $_POST['data']['orientador'],
					'id_projeto' => $_POST['data']['id']
				]);

				$database->delete('projetos_participantes', [
					'id_projeto' => $_POST['data']['id']
				]);
				foreach ($_POST['data']['participante'] as $key) {
					$database->insert('projetos_participantes', [
						'id_pessoa' => $key['id'],
						'id_projeto' => $_POST['data']['id']
					]);
				}

				$database->delete('projetos_conteudos', [
					'id_projeto' => $_POST['data']['id']
				]);
				foreach ($_POST['data']['conteudo'] as $key) {
					$database->insert('projetos_conteudos', [
						'id_conteudo' => $key['id'],
						'id_projeto' => $_POST['data']['id']
					]);
				}
				break;
			case 'excluiProjeto':
				$database->delete('projetos', [
					'id' => $_POST['id']
				]);
				$database->delete('projetos_participantes', [
					'id_projeto' => $_POST['id']
				]);
				$database->delete('projetos_conteudos', [
					'id_projeto' => $_POST['id']
				]);
				$database->delete('projetos_orientadores', [
					'id_projeto' => $_POST['id']
				]);
				break;
			case 'incluiProjeto':
				$insertId = $database->insert('projetos', [
					'id_orientador' => $_POST['data']['id_orientador'],
					'titulo' => $_POST['data']['titulo'],
					'data_inicio' => $_POST['data']['data_inicio'],
					'data_prevista' => $_POST['data']['data_prevista'],
					'data_termino' => $_POST['data']['data_termino'],
					'objetivo' => $_POST['data']['objetivo'],
					'comentarios' => $_POST['data']['comentarios'],
					'habilidades' => $_POST['data']['habilidades'],
					'acompanhamento' => $_POST['data']['acompanhamento'],
					'fontes' => $_POST['data']['fontes']
				]);
				if ($_POST['data']['orientador'] != '-1') {
					$database->insert('projetos_orientadores', [
						'id_pessoa' => $_POST['data']['orientador'],
						'id_projeto' => $insertId
					]);
				}
				foreach ($_POST['data']['participante'] as $key) {
					$database->insert('projetos_participantes', [
						'id_pessoa' => $key['id'],
						'id_projeto' => $insertId
					]);
				}
				foreach ($_POST['data']['conteudo'] as $key) {
					$database->insert('projetos_conteudos', [
						'id_conteudo' => $key['id'],
						'id_projeto' => $insertId
					]);
				}
				break;
		}
	}
?>