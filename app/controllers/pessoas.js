(function() {
    var app = angular.module('pessoas', []);
    app.directive('pessoas', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/pessoas.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var pessoas = this;

                    pessoas.nome = '';
                    pessoas.sobrenome = '';
                    pessoas.data_nascimento = '';
                    pessoas.data_entrada = '';
                    pessoas.funcao = '-1';
                    pessoas.funcoes = [];
                    pessoas.registro_aluno = '';
                    pessoas.sexo = '';
                    pessoas.telefone = '';
                    pessoas.email = '';
                    pessoas.serie = '';
                    pessoas.responsavel_1 = '';
                    pessoas.responsavel_2 = '';
                    pessoas.observacao = '';

                    pessoas.pessoas = [];
                    pessoas.acao = 'incluiPessoa';
                    pessoas.id_pessoa = '';

                    this.buscar_funcoes = function() {
                        $http({
                            url: 'app/ajax/ajax.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaFuncoes',
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            pessoas.funcoes = response.data;
                        });
                    }

                    this.buscar_pessoas = function(id_pessoa) {
                        $scope.pessoa = '';
                        $http({
                            url: 'app/ajax/pessoas.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaPessoa',
                                id: id_pessoa
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                pessoas.nome = response.data.pessoa[0].nome;
                                pessoas.sobrenome = response.data.pessoa[0].sobrenome;
                                pessoas.data_nascimento = response.data.pessoa[0].data_nascimento;
                                pessoas.data_entrada = response.data.pessoa[0].data_entrada;
                                pessoas.funcao = response.data.pessoa[0].funcao;
                                pessoas.registro_aluno = response.data.pessoa[0].registro_aluno;
                                pessoas.sexo = response.data.pessoa[0].sexo;
                                pessoas.telefone = response.data.pessoa[0].telefone;
                                pessoas.email = response.data.pessoa[0].email;
                                pessoas.serie = response.data.pessoa[0].serie;
                                pessoas.responsavel_1 = response.data.pessoa[0].responsavel_1;
                                pessoas.responsavel_2 = response.data.pessoa[0].responsavel_2;
                                pessoas.observacao = response.data.pessoa[0].observacao;
                                pessoas.foto = response.data.pessoa[0].foto;

                                pessoas.acao = 'editaPessoa';
                                pessoas.id_pessoa = response.data.pessoa[0].id;
                                pessoas.projetos = response.data.projetos;
                            } else {
                                pessoas.pessoas = response.data.pessoas;
                            }
                        });
                    }

                    this.excluir_pessoa = function(id_pessoa) {
                        if (confirm('Excluir pessoa?')) {
                            $http({
                                url: 'app/ajax/pessoas.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiPessoa',
                                    id: id_pessoa
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                pessoas.buscar_pessoas('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        pessoas.nome = '';
                        pessoas.sobrenome = '';
                        pessoas.data_nascimento = '';
                        pessoas.data_entrada = '';
                        pessoas.funcao = '-1';
                        pessoas.registro_aluno = '';
                        pessoas.sexo = '';
                        pessoas.telefone = '';
                        pessoas.email = '';
                        pessoas.serie = '';
                        pessoas.responsavel_1 = '';
                        pessoas.responsavel_2 = '';
                        pessoas.observacao = '';
                    }

                    this.salvar_pessoa = function() {
                        $http({
                            url: 'app/ajax/pessoas.php',
                            method: 'POST',
                            data: $.param({
                                acao: pessoas.acao,
                                data: {
                                    id: pessoas.id_pessoa,
                                    nome: pessoas.nome,
                                    sobrenome: pessoas.sobrenome,
                                    data_nascimento: pessoas.data_nascimento,
                                    data_entrada: pessoas.data_entrada,
                                    funcao: pessoas.funcao,
                                    registro_aluno: pessoas.registro_aluno,
                                    sexo: pessoas.sexo,
                                    telefone: pessoas.telefone,
                                    email: pessoas.email,
                                    responsavel_1: pessoas.responsavel_1,
                                    responsavel_2: pessoas.responsavel_2,
                                    observacao: pessoas.observacao,
                                    serie: pessoas.serie
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            pessoas.acao = 'incluiPessoa';
                            pessoas.buscar_pessoas('-1');
                            pessoas.limpar_tela();
                        });
                    }

                    // Chamada de funções automáticas
                    pessoas.buscar_funcoes();
                    pessoas.buscar_pessoas('-1');
                }
            ],
            controllerAs: 'pessoasCtrl'
        }
    });
})();