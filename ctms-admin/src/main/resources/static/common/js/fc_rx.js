/* ---------rx add by zhougy----------- */
var fc_rx = {
    observerMap: {},//观察者集合 key:页面名称+方法名 value:观察者Obj
    subscribeIns : null,//订阅实例
    fc_observable : Rx.Observable.create(function(observer){
        try {
            observer.next();
        }catch(e){
            observer.error(e);
        }
        //取消订阅
        if (fc_rx.subscribeIns) {
            fc_rx.subscribeIns.unsubscribe();
        }
        fc_rx.subscribeIns = null;
    }),
    addObserver : function(observerKey, observerObj){
        fc_rx.observerMap[observerKey] = observerObj;
    },
    subscribe : function(observerKey){
        fc_rx.subscribeIns = fc_rx.fc_observable.subscribe(fc_rx.observerMap[observerKey]);
    }
};