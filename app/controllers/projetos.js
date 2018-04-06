(function() {
    var app = angular.module('projetos', []);
    app.directive('projetos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/projetos.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var projetos = this;

                    projetos.titulo = '';
                    projetos.id_orientador = '-1';
                    projetos.data_inicio = '';
                    projetos.data_prevista = '';
                    projetos.data_termino = '';
                    projetos.objetivo = '';
                    projetos.comentarios = '';
                    projetos.habilidades = '';
                    projetos.acompanhamento = '';
                    projetos.fontes = '';

                    projetos.conteudos = [];
                    projetos.conteudos_selecionados = [];
                    projetos.orientadores = [];
                    projetos.participantes = [];
                    projetos.participantes_selecionados = [];
                    projetos.projetos = [];
                    projetos.acao = 'incluiProjeto';
                    projetos.id_projeto = '';

                    this.buscar_projetos = function(id_projeto) {
                        $scope.projeto = '';
                        $http({
                            url: 'app/ajax/projetos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaProjeto',
                                id: id_projeto
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                projetos.titulo = response.data[0].titulo;
                                projetos.id_orientador = response.data[0].id_orientador;
                                projetos.data_inicio = response.data[0].data_inicio;
                                projetos.data_prevista = response.data[0].data_prevista;
                                projetos.data_termino = response.data[0].data_termino;
                                projetos.objetivo = response.data[0].objetivo;
                                projetos.comentarios = response.data[0].comentarios;
                                projetos.habilidades = response.data[0].habilidades;
                                projetos.acompanhamento = response.data[0].acompanhamento;
                                projetos.fontes = response.data[0].fontes;

                                projetos.conteudos = response.data.conteudos;
                                projetos.participantes = response.data.participantes;

                                projetos.participantes_selecionados = [];
                                for (participante in response.data.projetos_participantes) {
                                    projetos.seleciona_participante(response.data.projetos_participantes[participante][0].id, response.data.projetos_participantes[participante][0].nome);
                                }

                                projetos.conteudos_selecionados = [];
                                for (conteudo in response.data.projetos_conteudos) {
                                    projetos.seleciona_conteudo(response.data.projetos_conteudos[conteudo][0].id, response.data.projetos_conteudos[conteudo][0].nome);
                                }

                                projetos.acao = 'editaProjeto';
                                projetos.id_projeto = response.data[0].id;
                            } else {
                                projetos.conteudos = response.data.conteudos;
                                projetos.orientadores = response.data.orientadores;
                                projetos.participantes = response.data.participantes;
                                projetos.projetos = response.data.projetos;
                            }
                        });
                    }

                    this.deseleciona_participante = function(id, nome) {
                        for (var i = 0; i < projetos.participantes_selecionados.length; i++) {
                            if (projetos.participantes_selecionados[i].id && projetos.participantes_selecionados[i].id === id) {
                                projetos.participantes_selecionados.splice(i, 1);
                                break;
                            }
                        }
                        projetos.participantes.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.deseleciona_conteudo = function(id, nome) {
                        for (var i = 0; i < projetos.conteudos_selecionados.length; i++) {
                            if (projetos.conteudos_selecionados[i].id && projetos.conteudos_selecionados[i].id === id) {
                                projetos.conteudos_selecionados.splice(i, 1);
                                break;
                            }
                        }
                        projetos.conteudos.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.excluir_projeto = function(id_projeto) {
                        if (confirm('Excluir projeto?')) {
                            $http({
                                url: 'app/ajax/projetos.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiProjeto',
                                    id: id_projeto
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                projetos.buscar_projetos('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        projetos.titulo = '';
                        projetos.id_orientador = '-1';
                        projetos.data_inicio = '';
                        projetos.data_prevista = '';
                        projetos.data_termino = '';
                        projetos.objetivo = '';
                        projetos.comentarios = '';
                        projetos.habilidades = '';
                        projetos.acompanhamento = '';
                        projetos.fontes = '';
                        projetos.conteudos_selecionados = [];
                        projetos.participantes_selecionados = [];
                    }

                    this.salvar_projeto = function() {
                        $http({
                            url: 'app/ajax/projetos.php',
                            method: 'POST',
                            data: $.param({
                                acao: projetos.acao,
                                data: {
                                    id: projetos.id_projeto,
                                    titulo: projetos.titulo,
                                    id_orientador: projetos.id_orientador,
                                    participante: projetos.participantes_selecionados,
                                    data_inicio: projetos.data_inicio,
                                    data_prevista: projetos.data_prevista,
                                    data_termino: projetos.data_termino,
                                    objetivo: projetos.objetivo,
                                    comentarios: projetos.comentarios,
                                    habilidades: projetos.habilidades,
                                    acompanhamento: projetos.acompanhamento,
                                    fontes: projetos.fontes,
                                    conteudo: projetos.conteudos_selecionados
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            projetos.acao = 'incluiProjeto';
                            projetos.buscar_projetos('-1');
                            projetos.limpar_tela();
                        });
                    }

                    this.seleciona_participante = function(id, nome) {
                        for (var i = 0; i < projetos.participantes.length; i++) {
                            if (projetos.participantes[i].id && projetos.participantes[i].id === id) {
                                projetos.participantes.splice(i, 1);
                                break;
                            }
                        }
                        projetos.participantes_selecionados.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.seleciona_conteudo = function(id, nome) {
                        for (var i = 0; i < projetos.conteudos.length; i++) {
                            if (projetos.conteudos[i].id && projetos.conteudos[i].id === id) {
                                projetos.conteudos.splice(i, 1);
                                break;
                            }
                        }
                        projetos.conteudos_selecionados.push({
                            id: id,
                            nome: nome
                        });
                    }

                    projetos.buscar_projetos('-1');
                }
            ],
            controllerAs: 'projetosCtrl'
        }
    });
})();