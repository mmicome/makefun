angular.module('taskList', []).controller('TaskController', function ($scope, dateFilter) {
    var tmp = localStorage.getItem('taskList');

    $scope.taskList = tmp ? angular.fromJson(tmp) : [];

    //统计未完成
    $scope.count = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += task.done ? 0 : 1;
        });
        return count;
    };

    //统计已完成
    $scope.countDone = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += task.done ? 1 : 0;
        });
        return count;
    };

    //标记全部完成
    $scope.allDone = function () {
        angular.forEach($scope.taskList, function (task) {
            task.done = $scope.isAllDone;
        });
        $scope.save();
    }

    $scope.hasTask = function () {
        return $scope.taskList.length > 0;
    }

    //新增
    $scope.addTask = function () {
        $scope.taskList.push({ id: $scope.taskList.length + 1, text: $scope.taskText, done: false, time: getNowTime() });
        $scope.taskText = '';
        $scope.save();
    };

    //删除
    $scope.removeTask = function (todo) {
        $scope.taskList.splice($scope.taskList.indexOf(todo), 1);
        $scope.save();
    };

    //保存
    $scope.save = function () {
        //序列化的时候使用angular.toJson，因为ng-repeat会在对象内部添加$$hashkey属性，使用JSON.stringify序列化不会过滤
        localStorage.setItem('taskList', angular.toJson($scope.taskList));
    }

    function getNowTime() {
        return dateFilter(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
});

