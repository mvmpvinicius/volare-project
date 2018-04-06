(function() {
    var app = angular.module('prototipos', []);
    app.directive('prototipos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/prototipos.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var prototipos = this;

                    prototipos.cidades = [];

                    prototipos.prototipos = [];
                    prototipos.acao = 'incluiPrototipo';
                    prototipos.id_prototipo = '';

                    this.buscar_prototipos = function(id_prototipo) {
                        $http({
                            url: 'app/ajax/prototipos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaPrototipo',
                                id: id_prototipo
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                prototipos.campo = response.data[0].campo;

                                prototipos.acao = 'editaPrototipo';
                                prototipos.id_prototipo = response.data[0].id;
                            } else {
                                prototipos.prototipos = [];
                                prototipos.prototipos = response.data;
                            }
                        });
                    }

                    this.excluir_prototipo = function(id_prototipo) {
                        $http({
                            url: 'app/ajax/prototipos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'excluiPrototipo',
                                id: id_prototipo
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            prototipos.buscar_prototipos('-1');
                        });
                    }

                    this.limpar_tela = function() {
                        prototipos.campo = '';
                    }

                    this.salvar_prototipo = function() {
                        $http({
                            url: 'app/ajax/prototipos.php',
                            method: 'POST',
                            data: $.param({
                                acao: prototipos.acao,
                                data: {
                                    id: prototipos.id_prototipo,
                                    campo: prototipos.campo
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            prototipos.acao = 'incluiPrototipo';
                            prototipos.buscar_prototipos('-1');
                            prototipos.limpar_tela();
                        });
                    }

                    prototipos.buscar_prototipos('-1');
                }
            ],
            controllerAs: 'prototiposCtrl'
        }
    });
})();