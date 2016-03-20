var povmt = angular.module('povmt');

povmt.controller('AtividadesCtrl',
    function($scope, $timeout, $ionicModal, $ionicPopup, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, FirebaseService) {
        var self = this;
        $scope.atividade = { prioridade: 10 };
        $scope.atividades = [];
        $scope.tiAtividades = []

        $scope.Ti = { qtdHoras:1, dataTI: new Date(2016, 2, 2) };

        FirebaseService.getArrayEntidades("atividades").$loaded().then(function(info) {
            $scope.atividades = info;

            $scope.$parent.showHeader();
            $scope.$parent.clearFabs();
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
            $scope.$parent.setHeaderFab('right');
        });


        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $scope.addAtividade = function() {
            $scope.modal.show();
        };

        $scope.salvarAtividade = function() {
            $scope.atividades.$add(angular.copy($scope.atividade)).then(function() {
                $ionicLoading.show({ template: 'Atividade adicionada!', noBackdrop: true, duration: 2000 });
                $scope.modal.hide();
                $scope.atividade = { prioridade: 10 };
            })
        };

        $scope.removeAtividade = function(atividade) {
            $scope.atividades.$remove(atividade).then(function(ref) {
                $ionicLoading.show({ template: 'Atividade Removida!', noBackdrop: true, duration: 2000 });
            });
        };

        $ionicModal.fromTemplateUrl('templates/addAtividadeModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/addTiModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalTi = modal;
        });

        $scope.addTi= function (atividade) {
            $scope.modalTi.show()
            $scope.atividade = atividade;
        };

        $scope.salvarTi = function (id) {
            var uri = id+'/tempoInvestido';
            console.log(uri);
            FirebaseService.getArraySubEntidades("atividades", uri).$loaded().then(function(info) {
            $scope.tiAtividades = info;
            });
            console.log($scope.tiAtividades);
            // $scope.atividades.$add(angular.copy($scope.tiAtividades)).then(function() {
            //     $ionicLoading.show({ template: 'Atividade adicionada!', noBackdrop: true, duration: 2000 });
            //     $scope.modalTi.hide();
            // })

        };

        $scope.closeModalTi = function() {
            $scope.modalTi.hide();
        };

        
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    });
