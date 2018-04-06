(function() {
    var app = angular.module('assistentes', []);
    app.directive('assistentes', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/assistentes.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var assistentes = this;

                    assistentes.id_assistente = '';
                    assistentes.id_projeto = '';
                    assistentes.gostei_projeto = '';
                    assistentes.eu_cresci = '';
                    assistentes.comentario = '';

                    assistentes.assistentes = [];
                    assistentes.acao = 'incluiAssistente';
                    assistentes.id = '';

                    this.buscar_assistentes = function(id_assistente) {
                        $http({
                            url: 'app/ajax/assistentes.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaAssistente',
                                id: id_assistente
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                assistentes.id_assistente = response.data[0].id_assistente;
                                assistentes.id_projeto = response.data[0].id_projeto;
                                assistentes.gostei_projeto = response.data[0].gostei_projeto;
                                assistentes.eu_cresci = response.data[0].eu_cresci;
                                assistentes.comentario = response.data[0].comentario;

                                assistentes.acao = 'editaAssistente';
                                assistentes.id = response.data[0].id;
                            } else {
                                assistentes.assistentes = response.data;
                            }
                        });
                    }

                    this.excluir_assistente = function(id_assistente) {
                        if (confirm('Excluir assistente?')) {
                        $http({
                            url: 'app/ajax/assistentes.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'excluiAssistente',
                                id: id_assistente
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            assistentes.buscar_assistentes('-1');
                        });
                    }
                    }

                    this.limpar_tela = function() {
                        assistentes.id_assistente = '';
                        assistentes.id_projeto = '';
                        assistentes.gostei_projeto = '';
                        assistentes.eu_cresci = '';
                        assistentes.comentario = '';
                    }

                    this.salvar_assistente = function() {
                        $http({
                            url: 'app/ajax/assistentes.php',
                            method: 'POST',
                            data: $.param({
                                acao: assistentes.acao,
                                data: {
                                    id: assistentes.id,
                                    id_assistente: assistentes.id_assistente,
                                    id_projeto: assistentes.id_projeto,
                                    gostei_projeto: assistentes.gostei_projeto,
                                    eu_cresci: assistentes.eu_cresci,
                                    comentario: assistentes.comentario
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            assistentes.acao = 'incluiAssistente';
                            assistentes.buscar_assistentes('-1');
                            assistentes.limpar_tela();
                        });
                    }

                    assistentes.buscar_assistentes('-1');
                }
            ],
            controllerAs: 'assistentesCtrl'
        }
    });
})();