(function() {
    var app = angular.module('conteudos', []);
    app.directive('conteudos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/conteudos.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var conteudos = this;

                    conteudos.nome = '';
                    conteudos.id_pai = '-1';

                    conteudos.conteudos = [];
                    conteudos.acao = 'incluiConteudo';
                    conteudos.id_conteudo = '';

                    this.buscar_conteudos = function(id_conteudo) {
                        $http({
                            url: 'app/ajax/conteudos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaConteudo',
                                id: id_conteudo
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                conteudos.nome = response.data[0].nome;
                                conteudos.id_pai = response.data[0].id_pai;

                                conteudos.acao = 'editaConteudo';
                                conteudos.id_conteudo = response.data[0].id;
                            } else {
                                conteudos.conteudos = response.data.conteudos;
                                conteudos.conteudos_projetos = response.data.conteudos_projetos;
                            }
                        });
                    }

                    this.excluir_conteudo = function(id_conteudo) {
                        if (confirm('Excluir conteúdo?')) {
                            $http({
                                url: 'app/ajax/conteudos.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiConteudo',
                                    id: id_conteudo
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                conteudos.buscar_conteudos('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        conteudos.nome = '';
                        conteudos.id_pai = '-1';
                    }

                    this.salvar_conteudo = function() {
                        $http({
                            url: 'app/ajax/conteudos.php',
                            method: 'POST',
                            data: $.param({
                                acao: conteudos.acao,
                                data: {
                                    id: conteudos.id_conteudo,
                                    nome: conteudos.nome,
                                    id_pai: conteudos.id_pai
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            conteudos.acao = 'incluiConteudo';
                            conteudos.buscar_conteudos('-1');
                            conteudos.limpar_tela();
                        });
                    }

                    // Chamada de funções automáticas
                    conteudos.buscar_conteudos('-1');
                }
            ],
            controllerAs: 'conteudosCtrl'
        }
    });
})();